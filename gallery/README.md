# gallery

Local web UI for browsing pieces. Built in Phase 6.

```
gallery/
├── index.html
├── package.json (shared with root)
├── vite.config.js
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── components/
    │   ├── PieceGrid.tsx
    │   ├── PiecePlayer.tsx
    │   └── CaptionPanel.tsx
    └── hooks/
        └── usePieces.ts   chokidar watcher for pieces/*/dist/
```

Run with: `npm run dev:gallery` (once the gallery is built).
