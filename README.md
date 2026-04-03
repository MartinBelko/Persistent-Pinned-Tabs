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

> [!NOTE]
> The extension does not account for tab groups or containers that the tabs may be a member of, this primarily stems from the extension needing `cookies` permission and the complexity it adds, which goes against the motive of the extension, which is simplicity and privacy.

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

1. Download the latest `.xpi` from [Releases](../../releases)
2. Open Firefox → `about:addons` → gear icon ⚙️ → **"Install Add-on From File…"**
3. Select the `.xpi` file

> [!NOTE]
> Firefox on my Mac and Windows (version 148+) automatically installs the extension once you press the `.xpi` file. So step 2 and 3 may be not necessary.

## Files

```
persistent-pinned-tabs/
├── manifest.json    # Extension manifest (MV3, Firefox)
├── background.js    # All extension logic
└── README.md
```
