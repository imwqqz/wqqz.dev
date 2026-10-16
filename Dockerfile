# syntax=docker/dockerfile:1

# --- build: static Astro site ---
FROM node:24-alpine AS build
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.34.7 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# --- runtime: nginx (non-root) serves the static files ---
FROM nginxinc/nginx-unprivileged:1-alpine
# No access log: the container never stores visitor data. Errors only, 404s excluded.
COPY <<"EOF" /etc/nginx/conf.d/default.conf
server {
    listen 8080;
    server_name _;
    root /usr/share/nginx/html;

    server_tokens off;
    absolute_redirect off;
    access_log off;
    error_log /dev/stderr error;
    log_not_found off;

    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;

    add_header X-Content-Type-Options nosniff always;
    add_header Referrer-Policy strict-origin-when-cross-origin always;

    error_page 404 /404.html;

    location / {
        try_files $uri $uri/ =404;
    }

    location /_astro/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
        add_header X-Content-Type-Options nosniff always;
    }

    # keep the legal pages (home address) out of search engines
    location ~ ^/(impressum|datenschutz)(/|$) {
        add_header X-Robots-Tag "noindex, nofollow" always;
        add_header X-Content-Type-Options nosniff always;
        add_header Referrer-Policy strict-origin-when-cross-origin always;
        try_files $uri $uri/ =404;
    }
}
EOF
COPY --from=build /app/dist /usr/share/nginx/html
RUN nginx -t
EXPOSE 8080
