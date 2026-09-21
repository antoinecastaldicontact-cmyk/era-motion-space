export type PlaylistSource = "marie" | "antoine" | "era" | "direct";

const ALLOWED_SOURCES = new Set<PlaylistSource>(["marie", "antoine", "era"]);

export function getPlaylistSource(search: string): PlaylistSource {
  const source = new URLSearchParams(search).get("src") as PlaylistSource | null;
  return source && ALLOWED_SOURCES.has(source) ? source : "direct";
}

export function trackClick(slug: string, dsp: string, src: PlaylistSource) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent("era:playlist-click", {
      detail: { slug, dsp, src },
    }),
  );

  const analyticsWindow = window as Window & {
    plausible?: (event: string, options: { props: Record<string, string> }) => void;
  };
  analyticsWindow.plausible?.("Playlist Click", {
    props: { slug, dsp, src },
  });
}