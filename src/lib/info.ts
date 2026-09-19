export interface ContactLink {
    label: string;
    text: string;
    href: string;
    target?: string;
    rel?: string;
}

export interface DownloadItem {
    label: string;
    text: string;
    href: string;
    filename?: string;
}

export interface ExperienceItem {
    role: string;
    company?: string;
    location?: string;
    period: string;
    description: string[];
}

export interface EducationItem {
    degree: string;
    institution: string;
    period: string;
    details?: string[];
}

export interface SkillCategory {
    category: string;
    items: string[];
}

export interface ResumeData {
    name: string;
    role: string;
    bio: string;
    downloads: {
        cv: DownloadItem;
        pgp: DownloadItem;
    };
    pgpFingerprint?: string;
    experience: ExperienceItem[];
    skills: SkillCategory[];
    education?: EducationItem[];
    certifications?: string[];
}

export interface SiteInfo {
    name: string;
    role: string;
    contacts: ContactLink[];
    resume: ResumeData;
}

export const info: SiteInfo = {
    name: "wqqz",
    role: "Cybersecurity Specialist & Security Enthusiast",
    contacts: [
        {
            label: "email",
            text: "test@mail.com",
            href: "mailto:test@mail.com",
        },
        {
            label: "github",
            text: "@imwqqz",
            href: "@wwz",
            target: "_blank",
            rel: "noopener noreferrer",
        },
        {
            label: "twitter",
            text: "@imwqqz",
            href: "@wwzx",
            target: "_blank",
            rel: "noopener noreferrer",
        },
        {
            label: "discord",
            text: "@wwww",
            href: "/",
            target: "_blank",
            rel: "noopener noreferrer",
        },
    ],
    resume: {
        name: "wqqz",
        role: "Cybersecurity Specialist",
        bio: "Security enthusiast and researcher specializing in penetration testing, threat analysis, security architecture, and vulnerability research. Passionate about distributed systems, resilient computing, and adversarial security.",
        downloads: {
            cv: {
                label: "download cv",
                text: "cv.pdf",
                href: "/cv.pdf",
                filename: "wqqz-cv.pdf",
            },
            pgp: {
                label: "download pgp",
                text: "publickey.asc",
                href: "/pgp/publickey.asc",
                filename: "publickey.asc",
            },
        },
        pgpFingerprint: "7E06 5BFC 3D45 6AB4 FA66 44E0 E763 FF98 8533 5C77",
        experience: [
            {
                role: "Cybersecurity Specialist",
                company: "Independent / Security Research",
                period: "2023 — Present",
                description: [
                    "Performed offensive security assessments, vulnerability research, and penetration tests across cloud and web infrastructures.",
                    "Designed threat intelligence pipelines and automated incident response playbooks.",
                    "Researched 0-day and 1-day vulnerability vectors in modern architectures.",
                ],
            },
            {
                role: "Security & Systems Engineer",
                company: "Infrastructure & Security",
                period: "2021 — 2023",
                description: [
                    "Architected secure containerized environments and hardening baselines for Linux and Kubernetes clusters.",
                    "Implemented continuous monitoring, SIEM detection rules, and proactive threat hunting methodologies.",
                ],
            },
        ],
        skills: [
            {
                category: "Offensive Security",
                items: [
                    "Penetration Testing",
                    "Vulnerability Assessment",
                    "Red Teaming",
                    "0-Day / 1-Day Research",
                    "Web & API Security",
                ],
            },
            {
                category: "Defensive & Operations",
                items: [
                    "Threat Analysis",
                    "Incident Response",
                    "SIEM & Detection Engineering",
                    "Hardening",
                    "Network Forensics",
                ],
            },
            {
                category: "Systems & Infrastructure",
                items: [
                    "Linux / Unix",
                    "Kubernetes",
                    "Docker",
                    "Cloud Security (AWS/GCP)",
                    "Distributed Systems",
                ],
            },
            {
                category: "Languages & Tools",
                items: [
                    "Python",
                    "Go",
                    "Rust",
                    "Bash",
                    "Wireshark",
                    "Burp Suite",
                ],
            },
        ],
        education: [
            {
                degree: "B.S. in Computer Science / Cybersecurity",
                institution: "University Studies",
                period: "2019 — 2023",
            },
        ],
    },
};

export const contacts = info.contacts;
export const resume = info.resume;

export default info;
