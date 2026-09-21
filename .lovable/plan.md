# Refine the `/bio` playlist page

## Scope
- Add the requested playlist data model and replace the placeholder with “Running Songs.”
- Build `/bio` as a focused, single-playlist page without changing `/` or `/manifesto`.
- Add route-specific metadata using the supplied cover image.

## Page design
- Use the playlist cover as a fixed, blurred, saturated full-screen background beneath a dark scrim.
- Center a safe-area-aware column containing the square cover, title, description, available streaming links, and the small ERA Music home logo.
- Render Spotify as the solid primary action; render Apple Music and Deezer only when their URLs are non-empty, using the specified glass treatment.

## Interaction and accessibility
- Preserve `trackClick(slug, dsp, src)` on every rendered streaming link.
- Apply immediate pressed feedback, visible keyboard focus, and the requested staged entrance.
- Respect reduced-motion, reduced-transparency, and increased-contrast preferences.
- Verify the page at mobile and desktop sizes, plus the current build status.

## Technical details
- Add `src/data/playlists.ts` with the expanded `Playlist` type and supplied entry.
- Add a small reusable analytics helper only if no existing `trackClick` implementation is present.
- Keep the styling scoped to `/bio` so existing pages remain visually unchanged.
