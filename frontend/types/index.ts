export type NavSection =
  | 'home'
  | 'about'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'contact';

export type SkillCategory = 'Frontend' | 'Backend' | 'Mobile' | 'Tools';

export type Skill = {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
};

export type ProjectCategory = 'All' | 'Full Stack' | 'Mobile' | 'Web' | 'API';

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: Exclude<ProjectCategory, 'All'>;
  image: string;
  technologies: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
};

export type ExperienceItem = {
  id: string;
  type: 'work' | 'internship' | 'education' | 'certification' | 'achievement';
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
};

export type SocialLink = {
  id: string;
  label: string;
  url: string;
  icon: 'github' | 'linkedin' | 'instagram' | 'mail';
};

export type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ThemePreference = 'light' | 'dark' | 'system';
