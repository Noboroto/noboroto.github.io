import fs from 'fs';
import path from 'path';

const dir = 'src/data/repos';
const profile = JSON.parse(fs.readFileSync('src/data/profile.json', 'utf8'));
const repos = fs.readdirSync(dir)
  .map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')))
  .filter(r => r.visible)
  .sort((a, b) => (b.priority || 0) - (a.priority || 0) || new Date(b.updatedAt) - new Date(a.updatedAt));

const featured = repos.filter(r => r.tier === 'featured');
const core = repos.filter(r => r.tier === 'core');
const specialized = repos.filter(r => r.tier === 'specialized');
const learning = repos.filter(r => r.tier === 'learning');
const langs = [...new Set(repos.flatMap(r => r.languages || (r.language ? [r.language] : [])))].sort();
const dockerCount = repos.filter(r => r.topics && r.topics.includes('docker')).length;

// llms.txt - brief
let brief = `# ${profile.name}

> ${profile.tagline}

${profile.bio}

## Links

- Portfolio: https://noboroto.github.io/Portfolio
- GitHub: ${profile.github}
- LinkedIn: ${profile.linkedin}
- Email: ${profile.email}

## Featured Projects

`;
featured.forEach(r => {
  const name = r.displayName || r.name;
  brief += `- [${name}](${r.url}): ${r.displayDescription || r.description || ''}\n`;
});
brief += `\n## Languages\n\n${langs.join(', ')}\n`;
brief += `\n## Full Content\n\n- [/llms-full.txt](/llms-full.txt)\n`;

// llms-full.txt - comprehensive
function writeSection(title, list) {
  if (!list.length) return '';
  let s = `\n## ${title} (${list.length})\n\n`;
  list.forEach(r => {
    const name = r.displayName || r.name;
    const tags = (r.topics || []).join(', ');
    s += `### ${name}\n\n`;
    if (r.displayDescription) s += `${r.displayDescription}\n\n`;
    if (tags) s += `**Tags:** ${tags}\n`;
    s += `**URL:** ${r.url}\n`;
    if (r.homepage) s += `**Live:** ${r.homepage}\n`;
    const rl = r.languages || (r.language ? [r.language] : []);
    if (rl.length) s += `**Languages:** ${rl.join(', ')}\n`;
    s += `**Updated:** ${r.updatedAt.split('T')[0]}\n\n`;
  });
  return s;
}

let full = `# ${profile.name} — Full Portfolio

> ${profile.tagline}

${profile.bio}

## Contact

- Email: ${profile.email}
- GitHub: ${profile.github}
- LinkedIn: ${profile.linkedin}

## Education

`;
profile.education.forEach(e => {
  full += `- **${e.institution}** — ${e.degree}, ${e.field} (${e.startDate} – ${e.endDate})\n`;
});
full += `\n## Languages (${langs.length})\n\n${langs.join(', ')}\n`;
full += `\n## Stats\n\n`;
full += `- ${repos.length} visible projects\n`;
full += `- ${featured.length} featured projects\n`;
full += `- ${dockerCount} dockerized projects\n`;
full += writeSection('Featured Projects', featured);
full += writeSection('Core Projects', core);
full += writeSection('Specialized Projects', specialized);
full += writeSection('Learning Projects', learning);

fs.writeFileSync('public/llms.txt', brief);
fs.writeFileSync('public/llms-full.txt', full);
console.log(`llms.txt: ${brief.length} chars`);
console.log(`llms-full.txt: ${full.length} chars`);
