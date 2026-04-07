export interface RepoData {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  languages?: string[];
  topics: string[];
  stars: number;
  forks: number;
  updatedAt: string;
  createdAt: string;
  isFork: boolean;
  visible: boolean;
  private?: boolean;
  tier: 'featured' | 'core' | 'specialized' | 'learning';
  domain: string[];
  displayName?: string;
  displayDescription?: string;
  coverImage?: string;
  priority?: number;
}

export interface ProfileData {
  name: string;
  tagline: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  facebook: string;
  resumeUrl?: string;
  avatarUrl: string;
}
