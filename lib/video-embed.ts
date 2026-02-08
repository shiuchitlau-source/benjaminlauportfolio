/**
 * Detects YouTube, Vimeo, and other embed URLs and returns the iframe embed URL.
 * Direct video URLs (e.g. .mp4) are treated as "native" and rendered with <video>.
 */

export type EmbedKind = "youtube" | "vimeo" | "dailymotion" | "native";

export interface EmbedInfo {
  kind: EmbedKind;
  /** For YouTube/Vimeo/etc.: use in iframe src. For native: use in <video src>. */
  url: string;
  /** For embed iframes, optional params (e.g. autoplay, mute) can be appended. */
  embedUrl: string;
}

/**
 * Normalize and detect video URL. Returns embed info for iframe or native video.
 */
export function getVideoEmbedInfo(
  inputUrl: string,
  options?: { autoplay?: boolean; mute?: boolean; loop?: boolean }
): EmbedInfo {
  const url = inputUrl.trim();
  const autoplay = options?.autoplay ?? false;
  const mute = options?.mute ?? false;
  const loop = options?.loop ?? false;

  // YouTube: watch, youtu.be, embed, shorts
  const ytWatch = url.match(/(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/);
  const ytShort = url.match(/(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  const ytEmbed = url.match(/(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  const ytShorts = url.match(/(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/);
  const ytId = ytWatch?.[1] ?? ytShort?.[1] ?? ytEmbed?.[1] ?? ytShorts?.[1];
  if (ytId) {
    const params = new URLSearchParams();
    if (autoplay) params.set("autoplay", "1");
    if (mute) params.set("mute", "1");
    if (loop) params.set("loop", "1");
    if (loop) params.set("playlist", ytId); // required for loop to work on YouTube
    const qs = params.toString();
    return {
      kind: "youtube",
      url,
      embedUrl: `https://www.youtube.com/embed/${ytId}${qs ? `?${qs}` : ""}`,
    };
  }

  // Vimeo: vimeo.com/123 or player.vimeo.com/video/123
  const vimeo = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/);
  if (vimeo) {
    const id = vimeo[1];
    const params = new URLSearchParams();
    if (autoplay) params.set("autoplay", "1");
    if (mute) params.set("muted", "1");
    if (loop) params.set("loop", "1");
    const qs = params.toString();
    return {
      kind: "vimeo",
      url,
      embedUrl: `https://player.vimeo.com/video/${id}${qs ? `?${qs}` : ""}`,
    };
  }

  // Dailymotion: dailymotion.com/video/x123abc
  const dm = url.match(/(?:dailymotion\.com\/video\/)([a-zA-Z0-9]+)/);
  if (dm) {
    const params = new URLSearchParams();
    if (autoplay) params.set("autoplay", "1");
    if (mute) params.set("mute", "1");
    if (loop) params.set("repeat", "1");
    const qs = params.toString();
    return {
      kind: "dailymotion",
      url,
      embedUrl: `https://www.dailymotion.com/embed/video/${dm[1]}${qs ? `?${qs}` : ""}`,
    };
  }

  // Native: direct video file or unknown URL (try as video src)
  return {
    kind: "native",
    url,
    embedUrl: url,
  };
}

/** Whether this URL should be rendered as an iframe (embed) vs <video>. */
export function isEmbedUrl(info: EmbedInfo): boolean {
  return info.kind !== "native";
}
