"use client";

import {
  getVideoEmbedInfo,
  isEmbedUrl,
  type EmbedInfo,
} from "@/lib/video-embed";

type VideoEmbedProps = {
  /** YouTube, Vimeo, Dailymotion watch URL or direct video URL (e.g. .mp4). */
  url: string;
  /** Hero-style: autoplay, mute, loop (no controls). Default false = show controls. */
  hero?: boolean;
  className?: string;
  title?: string;
};

export function VideoEmbed({
  url,
  hero = false,
  className = "",
  title = "Video",
}: VideoEmbedProps) {
  const info: EmbedInfo = getVideoEmbedInfo(url, {
    autoplay: hero,
    mute: hero,
    loop: hero,
  });

  if (isEmbedUrl(info)) {
    return (
      <iframe
        src={info.embedUrl}
        title={title}
        allow={
          hero
            ? "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            : "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        }
        allowFullScreen
        className={`absolute inset-0 h-full w-full rounded-2xl ${className}`}
      />
    );
  }

  // Native video (direct file URL)
  return (
    <video
      src={info.url}
      autoPlay={hero}
      muted={hero}
      loop={hero}
      playsInline
      controls={!hero}
      className={`absolute inset-0 h-full w-full object-cover rounded-2xl ${className}`}
    />
  );
}
