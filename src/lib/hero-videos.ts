export const HERO_VIDEOS = ["/hero1.mp4", "/hero2.mp4", "/hero3.mp4"] as const;
export const HERO_POSTER = "/chairarm.avif";

export function preloadHeroVideos(timeoutMs = 18000): Promise<void> {
  const minimumDisplay = new Promise<void>((resolve) => {
    window.setTimeout(resolve, 1400);
  });

  const videoLoads = HERO_VIDEOS.map(
    (src) =>
      new Promise<void>((resolve) => {
        const video = document.createElement("video");
        video.muted = true;
        video.playsInline = true;
        video.preload = "auto";

        let settled = false;
        const finish = () => {
          if (settled) return;
          settled = true;
          resolve();
        };

        video.addEventListener("canplaythrough", finish, { once: true });
        video.addEventListener("loadeddata", finish, { once: true });
        video.addEventListener("error", finish, { once: true });

        window.setTimeout(finish, timeoutMs);
        video.src = src;
        video.load();
      }),
  );

  return Promise.all([minimumDisplay, ...videoLoads]).then(() => undefined);
}
