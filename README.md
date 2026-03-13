# Persistent Pinned Tabs

A minimal, privacy-focused Firefox extension that automatically remembers your pinned tabs across browser restarts — even when history is disabled.

## Why?

Firefox ties pinned tab restoration to session/history data. If you use **"Never remember history"** or clear history on close, your pinned tabs are lost every time you restart the browser.

This extension solves that with zero configuration.

## How It Works

- **Automatically saves** your pinned tabs whenever you pin, unpin, close, or navigate within a pinned tab
- **Restores them on startup**, skipping any that Firefox already restored to avoid duplicates
- Uses `browser.storage.local` — extension-private storage that is **not** affected by history clearing

There are no buttons, no options page, no manual "grab" step. Just pin your tabs and they persist.

## Performance

The extension registers lightweight event listeners that only fire when tab state changes. When nothing is happening, it executes **zero code**. Each save is a single storage write of a small array of URLs.

- No polling or background loops
- No network requests
- No DOM or background page
- Memory footprint under 1 MB

## Privacy

- **No data leaves your machine** — all storage is local (`browser.storage.local`)
- **No sync** — URLs are never sent to Mozilla or any server
- **No analytics or tracking**
- **No permissions beyond what's needed** — only `tabs` and `storage`
- `about:` pages are filtered out and never saved
- Declared `data_collection_permissions: none` in the manifest

## Installation

### From Signed .xpi

1. Download the latest `.xpi` from [Releases](../../releases)
2. Open Firefox → `about:addons` → gear icon ⚙️ → **"Install Add-on From File…"**
3. Select the `.xpi` file

### Temporary (for development)

1. Open `about:debugging` → **This Firefox** → **Load Temporary Add-on…**
2. Select `manifest.json`

> ⚠️ Temporary add-ons are removed when Firefox closes.

## Files

```
persistent-pinned-tabs/
├── manifest.json    # Extension manifest (MV3, Firefox)
├── background.js    # All extension logic (~30 lines)
└── README.md
```

## Alternative: No Extension Needed

Before using this extension, try Firefox's **Custom History** settings:

1. **Settings → Privacy & Security → History**
2. Change to **"Use custom settings for history"**
3. Uncheck "Remember browsing and download history"
4. Uncheck "Remember search and form history"
5. **Settings → General → Startup** → check **"Open previous windows and tabs"**

This preserves session restore (including pinned tabs) while still clearing history. If that works for you, no extension is needed.

## License

MIT
