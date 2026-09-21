# Rebuild the dynamic playlist bio page

## Scope
- Replace `/bio` with `/bio/$slug` and show a minimal ERA-branded not-found state for unknown playlists.
- Expand the playlist model and update the running playlist copy while retaining its current remote cover as the fallback.
- Move click tracking into a shared helper and derive its source from the allowed `?src` values.

## Page experience
- Build a scrollable two-section playlist page: a centered listening screen followed by editorial details, moments, sharing, and ERA attribution.
- Use official Simple Icons marks, conditional platform links and stats, a static scroll cue, and a sticky Spotify bar after the main actions leave view.
- Extract a saturated accent from the displayed cover in the browser and apply it to focus, chips, and the primary-button glow.
- Add static film grain and preserve accessible motion, transparency, contrast, keyboard, and pressed states.

## Sharing and metadata
- Share the current URL, including its source query; copy it temporarily when native sharing is unavailable.
- Generate slug-specific title and social metadata from the matching playlist.

## Verification
- Confirm the known playlist, unknown-slug 404, source tracking, sharing fallback, sticky bar, and desktop/mobile layouts.
- Check the final preview build diagnostics without changing `/` or `/manifesto`.
