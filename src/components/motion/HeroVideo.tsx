"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HERO_VIDEOS } from "@/lib/hero-videos";
import { useDeviceCapabilities } from "@/lib/use-device-capabilities";
import { useMounted } from "@/lib/use-mounted";

const CROSSFADE_MS = 9000;
const FADE_DURATION_MS = 1800;
const PRELOAD_BEFORE_END_MS = 5000;

type HeroVideoProps = {
  className?: string;
};

function HeroPoster({
  asset,
  isActive,
}: {
  asset: (typeof HERO_VIDEOS)[number];
  isActive: boolean;
}) {
  return (
    <div
      className={cn(
        "absolute inset-0 bg-cover bg-center transition-opacity ease-in-out",
        isActive ? "opacity-100" : "opacity-0",
      )}
      style={{
        backgroundImage: `url(${asset.poster})`,
        transitionDuration: `${FADE_DURATION_MS}ms`,
      }}
      aria-hidden
    />
  );
}

/** One video element — swaps source on change. Safer on iPhone memory limits. */
function HeroSingleVideoCarousel({ className }: { className?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const preloadRef = useRef<HTMLVideoElement>(null);
  const asset = HERO_VIDEOS[activeIndex] ?? HERO_VIDEOS[0];

  useEffect(() => {
    const nextIndex = (activeIndex + 1) % HERO_VIDEOS.length;
    const nextAsset = HERO_VIDEOS[nextIndex] ?? HERO_VIDEOS[0];
    const preloadDelay = CROSSFADE_MS - PRELOAD_BEFORE_END_MS;

    const preloadTimer = window.setTimeout(() => {
      const preloadVideo = preloadRef.current;
      if (!preloadVideo) return;
      preloadVideo.src = nextAsset.src;
      preloadVideo.load();
    }, preloadDelay);

    const switchTimer = window.setTimeout(() => {
      setActiveIndex(nextIndex);
    }, CROSSFADE_MS);

    return () => {
      window.clearTimeout(preloadTimer);
      window.clearTimeout(switchTimer);
    };
  }, [activeIndex]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setVideoReady(false);
    video.src = asset.src;
    video.load();

    const handleReady = () => {
      setVideoReady(true);
      void video.play().catch(() => undefined);
    };

    video.addEventListener("loadeddata", handleReady, { once: true });
    video.addEventListener("canplay", handleReady, { once: true });

    return () => {
      video.removeEventListener("loadeddata", handleReady);
      video.removeEventListener("canplay", handleReady);
    };
  }, [asset.src]);

  return (
    <div className={cn("absolute inset-0 bg-[#111111]", className)} aria-hidden>
      {HERO_VIDEOS.map((item, index) => (
        <HeroPoster key={item.poster} asset={item} isActive={index === activeIndex} />
      ))}
      <video
        ref={videoRef}
        poster={asset.poster}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out",
          videoReady ? "opacity-100" : "opacity-0",
        )}
        style={{ transitionDuration: `${FADE_DURATION_MS}ms` }}
      />
      <video
        ref={preloadRef}
        muted
        playsInline
        preload="none"
        className="pointer-events-none absolute h-0 w-0 opacity-0"
        aria-hidden
      />
    </div>
  );
}

function HeroSingleVideo({ className }: { className?: string }) {
  const asset = HERO_VIDEOS[0];

  return (
    <div className={cn("absolute inset-0 bg-[#111111]", className)} aria-hidden>
      <HeroPoster asset={asset} isActive />
      <video
        src={asset.src}
        poster={asset.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}

function HeroVideoElement({
  asset,
  isActive,
  shouldLoad,
  autoPlay,
}: {
  asset: (typeof HERO_VIDEOS)[number];
  isActive: boolean;
  shouldLoad: boolean;
  autoPlay?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    if (isActive) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [isActive, shouldLoad]);

  return (
    <>
      <HeroPoster asset={asset} isActive={isActive} />
      {shouldLoad ? (
        <video
          ref={videoRef}
          src={asset.src}
          poster={asset.poster}
          autoPlay={autoPlay}
          muted
          loop
          playsInline
          preload={isActive ? "auto" : "metadata"}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out",
            isActive ? "opacity-100" : "opacity-0",
          )}
          style={{ transitionDuration: `${FADE_DURATION_MS}ms` }}
        />
      ) : null}
    </>
  );
}

function HeroMultiVideoCarousel({ className }: { className?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedIndices, setLoadedIndices] = useState<Set<number>>(
    () => new Set([0]),
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % HERO_VIDEOS.length);
    }, CROSSFADE_MS);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const nextIndex = (activeIndex + 1) % HERO_VIDEOS.length;
    setLoadedIndices((current) => {
      if (current.has(nextIndex)) return current;
      const updated = new Set(current);
      updated.add(nextIndex);
      return updated;
    });
  }, [activeIndex]);

  return (
    <div className={cn("absolute inset-0 bg-[#111111]", className)} aria-hidden>
      {HERO_VIDEOS.map((asset, index) => (
        <HeroVideoElement
          key={asset.src}
          asset={asset}
          isActive={index === activeIndex}
          shouldLoad={loadedIndices.has(index)}
          autoPlay={index === 0}
        />
      ))}
    </div>
  );
}

function HeroPosterOnly({ className }: { className?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % HERO_VIDEOS.length);
    }, CROSSFADE_MS);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className={cn("absolute inset-0 bg-[#111111]", className)} aria-hidden>
      {HERO_VIDEOS.map((item, index) => (
        <HeroPoster
          key={item.poster}
          asset={item}
          isActive={index === activeIndex}
        />
      ))}
    </div>
  );
}

export function HeroVideo({ className }: HeroVideoProps) {
  const reducedMotion = useReducedMotion();
  const mounted = useMounted();
  const { playHeroVideo, isMobile } = useDeviceCapabilities();

  if (!mounted) {
    return (
      <div className={cn("absolute inset-0 bg-[#111111]", className)} aria-hidden>
        <HeroPoster asset={HERO_VIDEOS[0]} isActive />
      </div>
    );
  }

  if (!playHeroVideo) {
    return <HeroPosterOnly className={className} />;
  }

  if (reducedMotion) {
    return <HeroSingleVideo className={className} />;
  }

  if (isMobile) {
    return <HeroSingleVideoCarousel className={className} />;
  }

  return <HeroMultiVideoCarousel className={className} />;
}
