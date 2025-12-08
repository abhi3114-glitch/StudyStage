# StudyStage — Minimal Daily Learning Journal

A clean, fast web app to log "One thing I learned today" and visualize your knowledge growth over time.

## Features

- **Quick Entry**: Single textarea (max 200 chars) to capture daily learnings
- **Smart Tagging**: Extract tags from hashtags or add manually (comma-separated)
- **Timeline View**: Chronological history grouped by date
- **Topics Cloud**: Visual word cloud sized by topic frequency
- **CSV Export**: Download all entries for backup or analysis
- **Offline-First**: All data stored in browser localStorage
- **Premium UI**: Dark theme with gradients and smooth animations

## Tech Stack

- Next.js 15 (App Router, TypeScript)
- Vanilla CSS
- localStorage for persistence

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone or download the project
cd StudyStage

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port shown in terminal).

### Production Build

```bash
npm run build
npm start
```

## Usage

1. **Log Learning**: Type what you learned (max 200 chars) and add topic tags
2. **View Timeline**: Scroll down to see all entries grouped by date
3. **Explore Topics**: Check the word cloud to see your most-studied areas
4. **Export Data**: Click "Export CSV" to download your learning history

## Project Structure

```
src/
├── app/
│   ├── globals.css         # Design system and theme
│   ├── page.tsx            # Main application
│   └── page.module.css     # Page-specific styles
├── components/
│   ├── EntryForm.tsx       # Learning entry input
│   ├── Timeline.tsx        # Chronological entry display
│   └── TopicsCloud.tsx     # Tag frequency visualization
└── utils/
    └── storage.ts          # localStorage utilities
```

## Data Persistence

All data is stored in browser localStorage under the key `studystage_entries`. Clearing browser data will delete all entries. Use CSV export for backups.

## Browser Compatibility

Works on all modern browsers (Chrome, Firefox, Safari, Edge) with localStorage support.

## License

MIT

## Author

Built to track learning progress
