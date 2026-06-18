# GitHub README Generator

A highly polished, intuitive, and modern single-screen web application designed to craft pixel-perfect, structured GitHub `README.md` portfolios with zero friction.

Written in **React**, **TypeScript**, and **Tailwind CSS**, it features full layout styling conforming to the **Editorial Aesthetic** theme, offering standard interactive builders, custom technology selection grids, inline markdown previews, live downloads, and raw edits.

---

## ⚡ Features

- **Live Multi-State Generator:** Fill formatted inputs (description, tech stacks, logo assets, alignments, and workflows) and witness immediate markdown synchronization on a custom-designed canvas.
- **Custom-Compiled Tech-Stack Badges:** Select core tools from custom database templates or append custom badges styled as `flat`, `plastic`, or `flat-square`.
- **Bespoke Markdown Reader:** Includes a secure, custom-written, high-performance regex-based inline rendering engine.
- **Privacy First, Fully Offline:** Runs completely in the browser sandbox. No telemetry track logs, no database calls, and no secret keys required.
- **Editorial Aesthetic Design Theme:** Built with spacious margins, elegant typography pairings (sans-serif and playfair-serif italics), dark slate card layouts, and responsive transitions.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 6
- **Styles:** Tailwind CSS v4
- **Icons:** Lucide React
- **Animations:** Motion (Framer Motion)

---

## 🚀 Installation & Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/manas-ippalpalli/readme-generator.git
   cd readme-generator
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run Development Server:**
   ```bash
   npm run dev
   ```

4. **Production Build:**
   ```bash
   npm run build
   ```

---

## 🔒 Security & Safe Release Checklist

- **No Hardcoded Secrets:** Zero API keys, passwords, or endpoints compiled in code assets.
- **Safe Sandboxing:** Completely client-side code execution. Prevents XSS via secure React element bindings rather than `dangerouslySetInnerHTML`.
- **Exclusion Rules:** Standard `.env*`, code settings, and security files are ignored via `.gitignore`.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
