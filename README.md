# Stillroom — Minimal Viable Product

> **Tagline:** *You deserve to be heard.*

Stillroom is a privacy-first emotional reflection and peer-support web application designed for a calm, mature, and serene presentation.

---

## ⚡ Quick Start

### Windows
Double-click [`start.bat`](./start.bat) or run from Command Prompt / PowerShell:
```cmd
start.bat
```
This automatically verifies dependencies, starts the local server, and opens [http://127.0.0.1:5173/](http://127.0.0.1:5173/) in your default browser.

### macOS & Linux
Make the script executable (if needed) and run [`start.sh`](./start.sh):
```bash
chmod +x start.sh
./start.sh
```
This checks dependencies, starts the dev server, and automatically opens your browser.

---

## 🛠 Manual Start

```bash
npm install
npm run dev
```
Open [http://127.0.0.1:5173/](http://127.0.0.1:5173/) in any browser.

---

## 🎨 Color Palette
- Blush pink: `#F9E7EB`
- Pale sage: `#DDEDE1`
- Soft sage: `#BBD9C5`
- Warm white: `#FFF9F7`
- Forest green: `#294737`
- Dark text: `#26342C`

---

## 🌟 Core Features

1. **Dashboard:** 3 primary navigation options (**Reflect · Community · Sessions**), recent reflections preview, live session counter, and featured community story.
2. **Reflect:**
   - **Private Reflections:** Offline journaling with feeling tags (*Calm*, *Grateful*, *Hopeful*, *Reflective*, *Anxious*, etc.), history view, edit, and delete.
   - **Colour Tapestry:** Generative SVG abstract artwork tuned with intuitive pink warmth and sage depth sliders, with a saved tapestries gallery.
3. **Community:** 6 relatable, anonymized lived experiences with topic filter pills, full-story reading modal, and working interactive reactions (*"I hear you"*, *"I relate"*, *"Holding space"*).
4. **Sessions:** Personal therapy notes recorder with focus areas, takeaways, next steps, live counter, and **Markdown (.md) / plain-text (.txt) export**.
5. **Privacy:** Zero registration, zero tracking. All data is saved exclusively to browser `localStorage` with a demo data reset/clear utility.
