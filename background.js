// Restore saved pinned tabs on browser startup
browser.runtime.onStartup.addListener(async () => {
  const { pinnedUrls } = await browser.storage.local.get("pinnedUrls");
  if (!pinnedUrls || !pinnedUrls.length) return;

  // Get currently open pinned tabs to avoid duplicates
  const existingPinned = await browser.tabs.query({ pinned: true });
  const existingUrls = new Set(existingPinned.map(t => t.url));

  for (const url of pinnedUrls) {
    if (!existingUrls.has(url)) {
      await browser.tabs.create({ url, pinned: true, active: false });
    }
  }
});

// Save current pinned tabs to storage
async function savePinnedTabs() {
  const pinnedTabs = await browser.tabs.query({ pinned: true });
  const pinnedUrls = pinnedTabs
    .map(t => t.url)
    .filter(url => url && !url.startsWith("about:"));
  await browser.storage.local.set({ pinnedUrls });
}

// Listen for tab pin/unpin changes
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.pinned !== undefined || (tab.pinned && changeInfo.url)) {
    savePinnedTabs();
  }
});

// A pinned tab was closed
browser.tabs.onRemoved.addListener(() => {
  setTimeout(savePinnedTabs, 500);
});

// A new tab was created as pinned
browser.tabs.onCreated.addListener((tab) => {
  if (tab.pinned) {
    savePinnedTabs();
  }
});