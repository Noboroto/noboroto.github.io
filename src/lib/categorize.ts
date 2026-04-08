import type { RepoData } from './types';

const repoModules = import.meta.glob<RepoData>('../data/repos/*.json', { eager: true, import: 'default' });
const reposData: RepoData[] = Object.values(repoModules);

export function getAllRepos(): RepoData[] {
  return reposData.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export function getVisibleRepos(): RepoData[] {
  return getAllRepos().filter((r) => r.visible);
}

export function getByTier(tier: RepoData['tier']): RepoData[] {
  return getVisibleRepos().filter((r) => r.tier === tier);
}

export function getLearningRepos(): RepoData[] {
  return getAllRepos().filter((r) => r.tier === 'learning' && r.visible);
}

export function getFeatured(): RepoData[] {
  return getByTier('featured').sort((a, b) => {
    const pDiff = (b.priority ?? 0) - (a.priority ?? 0);
    if (pDiff !== 0) return pDiff;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

export function getRepoLanguages(r: RepoData): string[] {
  if (r.languages && r.languages.length > 0) return r.languages;
  return r.language ? [r.language] : [];
}

export function getLanguages(): string[] {
  const langs = new Set(getVisibleRepos().flatMap(getRepoLanguages));
  return Array.from(langs).filter((lang) => !['HTML', 'CSS'].includes(lang)).sort();
}

export function getDomains(): string[] {
  const domains = new Set(getVisibleRepos().flatMap((r) => r.domain));
  return Array.from(domains).sort();
}
