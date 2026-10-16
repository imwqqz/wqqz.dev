import rawSiteInfo from "../../public/0user.json";

export interface ContactLink {
    label: string;
    text: string;
    href: string;
    target?: string;
    rel?: string;
}

export interface ExperienceItem {
    role: string;
    company?: string;
    location?: string;
    period: string;
    description: string[];
}

export interface VolunteeringItem {
    role: string;
    company: string;
    href?: string;
    period?: string;
    description: string[];
}

export interface EducationItem {
    degree: string;
    institution: string;
    period: string;
    details?: string[];
}

export interface CertificationItem {
    name: string;
    issuer: string;
    date: string;
}

export interface SkillCategory {
    category: string;
    items: string[];
}

export interface ResumeData {
    name: string;
    role: string;
    location?: string;
    bio: string;
    experience: ExperienceItem[];
    volunteering?: VolunteeringItem[];
    skills: SkillCategory[];
    education?: EducationItem[];
    certifications?: CertificationItem[];
}

export interface SiteMeta {
    name: string;
    url: string;
    title: string;
    description: string;
    locale?: string;
    ogImage?: string;
}

export interface SiteInfo {
    name: string;
    role: string;
    site: SiteMeta;
    contacts: ContactLink[];
    resume: ResumeData;
}

export const info: SiteInfo = rawSiteInfo as SiteInfo;

export const contacts = info.contacts;
export const resume = info.resume;

export default info;