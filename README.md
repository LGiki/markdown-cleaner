# Markdown Cleaner

A high-performance, offline-ready PWA that strips Markdown formatting from text. Built with React + Vite, Tailwind CSS, Shadcn UI, and Bun.

## Features
- Split-column layout: raw Markdown input and clean text output.
- Configurable stripping options (persisted in `localStorage`).
- Handles non-standard headers like `#header`.
- One-click copy and real-time word counts.
- Dark Mode with saved preference.
- PWA with offline access and install support.
- Fully responsive for mobile and desktop.

## Screenshot

![](https://github.com/user-attachments/assets/9f474d6e-f6f6-4394-a7c4-8f2680b32284)

## Tech Stack
- React + Vite (TypeScript)
- Tailwind CSS + Shadcn UI (Radix)
- Bun (package manager)
- `vite-plugin-pwa`

## Getting Started

### Install dependencies
```bash
bun install
```

### Run the dev server
```bash
bun dev
```

### Build for production
```bash
bun run build
```

### Preview production build
```bash
bun run preview
```

## Project Structure
- `src/App.tsx` – main UI layout and interactions
- `src/hooks/useMarkdownStripper.ts` – regex-based stripping logic
- `src/hooks/useLocalStorage.ts` – persisted settings
- `src/components/ui/*` – Shadcn UI components
- `public/*` – PWA icons

## PWA Notes
The app is configured for offline usage and installability via `vite-plugin-pwa`. Service worker registration happens automatically in `src/main.tsx`.

## License
MIT
