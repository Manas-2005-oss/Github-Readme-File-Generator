import { ReadmeData, TechItem } from './types';

export function getBadgeUrl(item: TechItem, style: string): string {
  // Extract shield path config if it contains query parameters already or format manually
  const cleanedBadge = item.badgeUrl || `${item.name}-38B2AC`;
  const base = 'https://img.shields.io/badge/';
  
  // If the path already has a style parameter, we replace it with the chosen style
  let path = cleanedBadge;
  if (path.includes('style=')) {
    path = path.replace(/style=[a-zA-Z0-9-]+/g, `style=${style}`);
  } else {
    // Append or format style parameter
    const parts = path.split('?');
    if (parts.length > 1) {
      path = `${parts[0]}?style=${style}&${parts[1]}`;
    } else {
      path = `${parts[0]}?style=${style}`;
    }
  }
  
  return `${base}${path}`;
}

export function generateReadmeMarkdown(data: ReadmeData): string {
  let md = '';

  // 1. Project Header & Logo
  if (data.logoUrl) {
    const alignStyle = data.logoAlign === 'center' ? 'align="center"' : data.logoAlign === 'right' ? 'align="right"' : '';
    md += `<p ${alignStyle}>\n  <img src="${data.logoUrl}" alt="${data.projectName} Logo" width="120" height="120" />\n</p>\n\n`;
  }

  const centerHead = data.logoUrl && data.logoAlign === 'center';
  if (centerHead) {
    md += `<h1 align="center">${data.projectName}</h1>\n`;
    md += `<p align="center"><strong>${data.tagline}</strong></p>\n\n`;
  } else {
    md += `# ${data.projectName}\n\n`;
    md += `> ${data.tagline}\n\n`;
  }

  // 1b. Badge Row
  const socialUser = data.githubUser || 'username';
  const socialRepo = data.githubRepo || 'repository';
  const rawStyle = data.badgeStyle || 'flat';

  let badges = '';
  // GitHub standard repo badges
  badges += `![GitHub Release](https://img.shields.io/github/v/release/${socialUser}/${socialRepo}?style=${rawStyle}) `;
  badges += `![GitHub license](https://img.shields.io/github/license/${socialUser}/${socialRepo}?style=${rawStyle}) `;
  badges += `![GitHub Issues](https://img.shields.io/github/issues/${socialUser}/${socialRepo}?style=${rawStyle}) `;
  badges += `![GitHub Stars](https://img.shields.io/github/stars/${socialUser}/${socialRepo}?style=${rawStyle}) `;

  if (centerHead) {
    md += `<p align="center">\n  ${badges.trim()}\n</p>\n\n`;
  } else {
    md += `${badges.trim()}\n\n`;
  }

  // 2. Project Description
  md += `## Description\n\n`;
  md += `${data.description}\n\n`;
  
  if (data.demoUrl) {
    md += `🔗 **Live Demo Link:** [Explore ${data.projectName}](${data.demoUrl})\n\n`;
  }

  // Table of Contents (Professional Addition)
  md += `## Table of Contents\n\n`;
  md += `- [Features](#features)\n`;
  md += `- [Tech Stack](#tech-stack)\n`;
  md += `- [Installation](#installation)\n`;
  md += `- [Usage](#usage)\n`;
  if (data.includePrerequisites) md += `- [Prerequisites](#prerequisites)\n`;
  if (data.includeContributing) md += `- [Contributing](#contributing)\n`;
  if (data.includeSupport) md += `- [Support](#support)\n`;
  md += `- [License](#license)\n\n`;

  md += `---\n\n`;

  // 3. Features
  md += `## Features\n\n`;
  if (data.features && data.features.length > 0) {
    data.features.forEach(item => {
      md += `### ⚡ ${item.title}\n`;
      md += `${item.description}\n\n`;
    });
  } else {
    md += `_No features listed yet._\n\n`;
  }

  md += `---\n\n`;

  // 4. Tech Stack
  md += `## Tech Stack\n\n`;
  if (data.techStack && data.techStack.length > 0) {
    // Render as colorful badge badges
    let badgesList = '';
    data.techStack.forEach(item => {
      const badgeLink = getBadgeUrl(item, rawStyle);
      badgesList += `![${item.name}](${badgeLink}) `;
    });
    md += `**Core Technologies:**\n\n${badgesList.trim()}\n\n`;
  } else {
    md += `_No specified tech stacks selected._\n\n`;
  }

  md += `---\n\n`;

  // 5. Prerequisites (If Toggled)
  if (data.includePrerequisites) {
    md += `## Prerequisites\n\n`;
    md += `${data.prerequisites || 'None specified.'}\n\n`;
    md += `---\n\n`;
  }

  // 6. Installation
  md += `## Installation\n\n`;
  if (data.installation && data.installation.length > 0) {
    data.installation.forEach((step, index) => {
      md += `### Step ${index + 1}: ${step.description}\n`;
      md += `\`\`\`bash\n${step.command}\n\`\`\`\n\n`;
    });
  } else {
    md += `_No installation fields configured._\n\n`;
  }

  md += `---\n\n`;

  // 7. Usage Instructions
  md += `## Usage\n\n`;
  md += `${data.usage || 'Refer to documentation.'}\n\n`;

  if (data.usageSteps && data.usageSteps.length > 0) {
    md += `### Common Commands / Examples:\n\n`;
    data.usageSteps.forEach(step => {
      md += `#### 💡 ${step.title}\n`;
      md += `${step.desc}\n`;
      md += `\`\`\`bash\n${step.code}\n\`\`\`\n\n`;
    });
  }

  md += `---\n\n`;

  // 8. Dynamic Toggle Sections: Contributing
  if (data.includeContributing) {
    md += `## Contributing\n\n`;
    md += `${data.contributing || 'PRs welcome.'}\n\n`;
    md += `Please check standard documentation guidelines.\n\n`;
    md += `---\n\n`;
  }

  // 9. Support (If Toggled)
  if (data.includeSupport) {
    md += `## Support\n\n`;
    md += `${data.supportText || 'Email author.'}\n\n`;
    md += `---\n\n`;
  }

  // 10. License
  md += `## License\n\n`;
  md += `Distributed under the **${data.license || 'MIT'}** License. See \`LICENSE\` for more details.\n\n`;
  md += `Copyright © ${data.licenseYear || new Date().getFullYear().toString()} [${data.licenseAuthor || 'Owner'}](mailto:${data.email || 'author@email.com'}).\n`;

  return md;
}
