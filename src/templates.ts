import { Template, ReadmeData } from './types';

export const INITIAL_TECH_OPTIONS = [
  { sName: 'React', sCategory: 'Frontend', sBadge: 'React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB' },
  { sName: 'Vue.js', sCategory: 'Frontend', sBadge: 'Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D' },
  { sName: 'Next.js', sCategory: 'Frontend', sBadge: 'next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white' },
  { sName: 'TypeScript', sCategory: 'Languages', sBadge: 'TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white' },
  { sName: 'JavaScript', sCategory: 'Languages', sBadge: 'JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black' },
  { sName: 'Tailwind CSS', sCategory: 'Frontend', sBadge: 'Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white' },
  { sName: 'HTML5', sCategory: 'Frontend', sBadge: 'HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white' },
  { sName: 'Node.js', sCategory: 'Backend', sBadge: 'Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white' },
  { sName: 'Express.js', sCategory: 'Backend', sBadge: 'Express.js-404D59?style=for-the-badge' },
  { sName: 'FastAPI', sCategory: 'Backend', sBadge: 'FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white' },
  { sName: 'Python', sCategory: 'Languages', sBadge: 'Python-3776AB?style=for-the-badge&logo=python&logoColor=white' },
  { sName: 'Rust', sCategory: 'Languages', sBadge: 'Rust-000000?style=for-the-badge&logo=rust&logoColor=white' },
  { sName: 'Go', sCategory: 'Languages', sBadge: 'Go-00ADD8?style=for-the-badge&logo=go&logoColor=white' },
  { sName: 'PostgreSQL', sCategory: 'Database', sBadge: 'PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white' },
  { sName: 'MongoDB', sCategory: 'Database', sBadge: 'MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white' },
  { sName: 'Redis', sCategory: 'Database', sBadge: 'redis-CC0000?style=for-the-badge&logo=redis&logoColor=white' },
  { sName: 'Docker', sCategory: 'Tools', sBadge: 'docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white' },
  { sName: 'GitHub Actions', sCategory: 'Tools', sBadge: 'github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white' },
  { sName: 'AWS', sCategory: 'Tools', sBadge: 'AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white' },
  { sName: 'Supabase', sCategory: 'Database', sBadge: 'Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white' },
];

export const TEMPLATES: Template[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Perfect for small scripts, components, libraries, or quick code gists.',
    icon: 'Terminal',
    data: {
      projectName: 'FastAPI Clean Template',
      tagline: 'High-performance API skeletal scaffold in FastAPI.',
      description: 'A minimal, light architectural starter template for constructing highly scalable backends with Python 3.12 and FastAPI. Includes pre-wired async database hooks, live API monitoring endpoints, and database seed commands in a single local package.',
      logoUrl: '',
      logoAlign: 'left',
      badgeStyle: 'flat',
      techStack: [
        { id: 't1', name: 'FastAPI', category: 'Backend', badgeUrl: 'FastAPI-005571?style=flat&logo=fastapi&logoColor=white' },
        { id: 't2', name: 'Python', category: 'Languages', badgeUrl: 'Python-3776AB?style=flat&logo=python&logoColor=white' },
        { id: 't3', name: 'PostgreSQL', category: 'Database', badgeUrl: 'PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white' },
      ],
      features: [
        { id: 'f1', title: 'Modular Architecture', description: 'Separation of concerns cleanly dividing views, schemas, triggers, and query-builders.' },
        { id: 'f2', title: 'Asynchronous Session Broker', description: 'Native SQLQLchemy non-blocking pooling engineered for low connection overhead.' },
        { id: 'f3', title: 'Docker Containers Built-in', description: 'Standard multi-stage workspace configurations with quick local volume mappings.' },
      ],
      installation: [
        { id: 'i1', command: 'git clone https://github.com/manas/fastapi-scaffold.git\ncd fastapi-scaffold', description: 'Clone the repository and enter directory' },
        { id: 'i2', command: 'python -m venv .venv\nsource .venv/bin/activate', description: 'Create and activate virtual environment' },
        { id: 'i3', command: 'pip install -r requirements.txt', description: 'Install dependencies' }
      ],
      usage: 'Boot the server using Uvicorn in real-time hot reload mode:\n```bash\nuvicorn app.main:app --reload --port 8000\n```\nNavigate your web browser to `http://localhost:8000/docs` to interact directly with the self-documenting FastAPI Swagger playground interface.',
      usageSteps: [
        { id: 'u1', title: 'Start Dev Environment', code: 'uvicorn app.main:app --reload', desc: 'Runs local server with hot reloader active' },
        { id: 'u2', title: 'Execute database seeds', code: 'alembic upgrade head', desc: 'Performs migrations to live target SQL instance' }
      ],
      license: 'MIT',
      licenseYear: '2026',
      licenseAuthor: 'Manas Ippalpalli',
      githubUser: 'manas-ippalpalli',
      githubRepo: 'fastapi-scaffold',
      email: 'manasippalpalli758@gmail.com',
      demoUrl: 'https://fastapi-scaffold.demo',
      includePrerequisites: false,
      prerequisites: 'Python 3.10+\nDocker Desktop',
      includeContributing: false,
      contributing: 'Fork this repo, commit custom enhancements, and submit a PR pointing to active branches.',
      includeSupport: false,
      supportText: 'For urgent structural support, drop an email at manasippalpalli758@gmail.com.',
      includeChangelog: false
    }
  },
  {
    id: 'standard',
    name: 'Standard',
    description: 'A versatile standard structure perfect for utility tools and web apps.',
    icon: 'Layers',
    data: {
      projectName: 'React Ambient Audio',
      tagline: 'Modern, state-driven browser audio library for microtonal looping.',
      description: 'A beautifully-crafted background sound loop generator and multi-track player client. Engineered for high performance, React Ambient Audio integrates browser-optimized WebAudio components, local cache management, stream buffer queues, and cross-fade timer routines.',
      logoUrl: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=100&h=100&fit=crop&q=80',
      logoAlign: 'center',
      badgeStyle: 'flat-square',
      techStack: [
        { id: 't1', name: 'React', category: 'Frontend', badgeUrl: 'React-20232A?style=flat-square&logo=react&logoColor=61DAFB' },
        { id: 't2', name: 'TypeScript', category: 'Languages', badgeUrl: 'TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white' },
        { id: 't3', name: 'Tailwind CSS', category: 'Frontend', badgeUrl: 'Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white' },
        { id: 't4', name: 'Vite', category: 'Tools', badgeUrl: 'Vite-646CFF?style=flat-square&logo=vite&logoColor=white' }
      ],
      features: [
        { id: 'f1', title: 'High Fidelity Looping Node', description: 'Zero-latency seam welding utilizing the browser\'s advanced Web Audio API context scheduler.' },
        { id: 'f2', title: 'State Synchronization', description: 'Responsive volume levels, visualizers, and state synchronization across multiple tabs.' },
        { id: 'f3', title: 'Dynamic Track Layering', description: 'Stack background frequencies (ocean waves, white noise, rain cascades) dynamically.' },
        { id: 'f4', title: 'Responsive Design', description: 'Mobile ready touch surfaces optimized with standard 48px padding boundaries.' }
      ],
      installation: [
        { id: 'i1', command: 'git clone https://github.com/manas/react-ambient-audio.git\ncd react-ambient-audio', description: 'Clone project files and move into the destination workspace directory' },
        { id: 'i2', command: 'npm install', description: 'Install NPM dependencies listed in package manager configuration' },
        { id: 'i3', command: 'npm run dev', description: 'Launch the development server' }
      ],
      usage: 'Configure audio paths inside component configuration and pass audio arrays directly:\n\n```tsx\nimport { AmbientPlayer } from \'react-ambient-audio\';\n\nconst tracks = [\n  { id: \'rain\', src: \'/audio/rain.mp3\', volume: 0.8 },\n  { id: \'waves\', src: \'/audio/waves.mp3\', volume: 0.5 }\n];\n\nexport default function App() {\n  return <AmbientPlayer tracks={tracks} theme="calm" />;\n}\n```',
      usageSteps: [
        { id: 'u1', title: 'Import Module', code: 'import { AmbientPlayer } from \'react-ambient-audio\';', desc: 'Import component to use inside any React view' },
        { id: 'u2', title: 'Run and Test', code: 'npm run test:ui', desc: 'Starts sound simulation tests with Playwright' }
      ],
      license: 'MIT',
      licenseYear: '2026',
      licenseAuthor: 'Manas Ippalpalli',
      githubUser: 'manas-ippalpalli',
      githubRepo: 'react-ambient-audio',
      email: 'manasippalpalli758@gmail.com',
      demoUrl: 'https://ambient-audio.manas.io',
      includePrerequisites: true,
      prerequisites: '- Node.js v18.0.0 or higher\n- Modern web browser supporting Web Audio API\n- npm, yarn, or pnpm package manager',
      includeContributing: true,
      contributing: '1. Fork the Project\n2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)\n3. Commit your Changes (`git commit -m \'Add some AmazingFeature\'`)\n4. Push to the Branch (`git push origin feature/AmazingFeature`)\n5. Open a Pull Request pointing directly to the development branch.',
      includeSupport: true,
      supportText: 'If you enjoy this library, star the repository! For developer workspace integration or custom support pipelines, write directly to: manasippalpalli758@gmail.com.',
      includeChangelog: true
    }
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Enterprise layout with detailed badges, tables, and troubleshooting blueprints.',
    icon: 'ShieldCheck',
    data: {
      projectName: 'Solidity price Oracle Bridge',
      tagline: 'High-throughput secure price feed bridge for EVM state rollups.',
      description: 'A formal enterprise-grade, high-throughput decentralized pricing relay. Utilizing cryptographically-proven off-chain consensus, the Bridge aggregates live price feeds from decentralized liquidity sources, packages state proofs with advanced gas optimization rules, and publishes safe updates onto EVM layer-2 environments.',
      logoUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=120&h=120&fit=crop&q=80',
      logoAlign: 'center',
      badgeStyle: 'for-the-badge',
      techStack: [
        { id: 't1', name: 'Solidity', category: 'Languages', badgeUrl: 'Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white' },
        { id: 't2', name: 'Rust', category: 'Languages', badgeUrl: 'Rust-000000?style=for-the-badge&logo=rust&logoColor=white' },
        { id: 't3', name: 'Docker', category: 'Tools', badgeUrl: 'docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white' },
        { id: 't4', name: 'PostgreSQL', category: 'Database', badgeUrl: 'PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white' }
      ],
      features: [
        { id: 'f1', title: 'Gas-Optimized Consensus', description: 'Saves up to 45% contract processing gas through recursive zero-knowledge state-proof validations.' },
        { id: 'f2', title: 'Fault-Tolerant Redundancy', description: 'Multi-node quorum aggregation prevents single-point-of-failure or localized API front-running attacks.' },
        { id: 'f3', title: 'Cryptographic Signature Auditing', description: 'Every package payload includes on-chain validation proofs against verifiable multi-sig wallets.' },
        { id: 'f4', title: 'Grafana & Prometheus Exporters', description: 'Comes fully packed with real-time logging telemetry to alert operators on gas cost escalations.' }
      ],
      installation: [
        { id: 'i1', command: 'git clone https://github.com/manas/oracle-bridge.git\ncd oracle-bridge', description: 'Clone standard package' },
        { id: 'i2', command: 'cp .env.example .env\n# Fill in private keys and endpoint coordinates', description: 'Initialize secure environment values' },
        { id: 'i3', command: 'docker-compose up -d --build', description: 'Spin up Postgres container databases, Prometheus listeners, and local Go relayers' },
        { id: 'i4', command: 'npx hardhat compile', description: 'Compile Solidity Smart Contracts.' }
      ],
      usage: 'Deploy contract with customized network configs and initiate price update cycles:\n\n```bash\n# Deploy to Arbitrum Sepolia network\nnpx hardhat run scripts/deploy.js --network arbitrumSepolia\n\n# Trigger local Go price aggregate daemon\n./bin/bridge-relayer --config ./config.yaml --daemon\n```\n\nMonitor logs and gas fees using the integrated local web dashboard at `http://localhost:3000` (Grafana template loaded automatically).',
      usageSteps: [
        { id: 'u1', title: 'Execute smart contract audit tests', code: 'npx hardhat test', desc: 'Validates integrity across mock lending pools.' },
        { id: 'u2', title: 'Launch monitoring exporter', code: 'prometheus --config.file=prometheus.yml', desc: 'Gathers gas metrics and peer-connection metrics' }
      ],
      license: 'Apache 2.0',
      licenseYear: '2026',
      licenseAuthor: 'Manas Ippalpalli',
      githubUser: 'manas-ippalpalli',
      githubRepo: 'oracle-bridge',
      email: 'manasippalpalli758@gmail.com',
      demoUrl: 'https://oracle-bridge.digitalheroes.io',
      includePrerequisites: true,
      prerequisites: '### Blockchain Environment\n- Hardhat / Foundry framework\n- Local Ethereum RPC Provider (Forking mainnet recommended)\n### Host Server\n- Docker & Docker Compose v2.0+\n- Golang 1.21+\n- Rust Toolchain (stable cargo compiler)',
      includeContributing: true,
      contributing: 'We welcome contributors from all backgrounds! Please adhere to our project Code of Conduct and review `CONTRIBUTING.md` before making any contributions. Ensure you provide comprehensive Unit tests for any core structural changes.',
      includeSupport: true,
      supportText: 'Active development is overseen by Digital Heroes and led by Manas Ippalpalli. For commercial or private audit inquiry pipelines, reach out directly at: manasippalpalli758@gmail.com.',
      includeChangelog: true
    }
  }
];
