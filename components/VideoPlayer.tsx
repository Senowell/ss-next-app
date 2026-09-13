export interface VideoFieldData {
  provider: string;
  providerUid: string;
  url: string;
}

type VideoPlayerProps = {
  video: VideoFieldData | null | undefined;
};

export default function VideoPlayer({ video }: VideoPlayerProps) {
  if (!video || !video.providerUid) {
    return null;
  }

  let embedUrl: string;

  switch (video.provider) {
    case "youtube":
      embedUrl = `https://www.youtube.com/embed/${video.providerUid}`;
      break;
    case "vimeo":
      embedUrl = `https://player.vimeo.com/video/${video.providerUid}`;
      break;
    case "facebook":
      embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(video.url)}&show_text=false`;
      break;
    default:
      return null;
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="relative w-full aspect-video">
        <iframe
          src={embedUrl}
          className="absolute inset-0 w-full h-full rounded-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          title="Video player"
        />
      </div>
    </div>
  );
}
