export type TemplateId = 'minimal' | 'standard' | 'professional';

export interface TechItem {
  id: string;
  name: string;
  category: string; // e.g. 'Frontend', 'Backend', 'Database', 'Tools'
  badgeUrl?: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
}

export interface InstallationStep {
  id: string;
  command: string;
  description: string;
}

export interface ReadmeData {
  projectName: string;
  tagline: string;
  description: string;
  logoUrl: string;
  logoAlign: 'left' | 'center' | 'right';
  badgeStyle: 'flat' | 'flat-square' | 'plastic' | 'for-the-badge' | 'social';
  
  // Dynamic sections
  techStack: TechItem[];
  features: FeatureItem[];
  installation: InstallationStep[];
  usage: string;
  usageSteps: { id: string; title: string; code: string; desc: string }[];
  license: string;
  licenseYear: string;
  licenseAuthor: string;
  
  // Custom metadata
  githubUser: string;
  githubRepo: string;
  email: string;
  demoUrl: string;
  
  // Extra toggle sections
  includePrerequisites: boolean;
  prerequisites: string;
  includeContributing: boolean;
  contributing: string;
  includeSupport: boolean;
  supportText: string;
  includeChangelog: boolean;
}

export interface Template {
  id: TemplateId;
  name: string;
  description: string;
  icon: string;
  data: ReadmeData;
}
