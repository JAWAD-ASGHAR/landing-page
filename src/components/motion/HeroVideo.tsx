"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getHeroVideoSrc, HERO_VIDEOS } from "@/lib/hero-videos";
import { useSiteLoaderReady } from "@/lib/site-loader-ready";
import { useDeviceCapabilities } from "@/lib/use-device-capabilities";
import { useMounted } from "@/lib/use-mounted";

const CROSSFADE_MS = 9000;
const FADE_DURATION_MS = 1800;
const MOBILE_VIDEO_DELAY_MS = 500;

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

/**
 * Mobile hero — Everlab-style: poster in CSS, one native <video>, browser-managed
 * decode. No JS load(), no carousel swaps, no hidden preload element.
 */
function HeroNativeMobileVideo({ className }: { className?: string }) {
  const siteLoaderReady = useSiteLoaderReady();
  const [videoAllowed, setVideoAllowed] = useState(false);
  const asset = HERO_VIDEOS[0];
  const videoSrc = getHeroVideoSrc(asset, true);

  useEffect(() => {
    if (!siteLoaderReady) {
      setVideoAllowed(false);
      return;
    }

    const timer = window.setTimeout(
      () => setVideoAllowed(true),
      MOBILE_VIDEO_DELAY_MS,
    );

    return () => window.clearTimeout(timer);
  }, [siteLoaderReady]);

  return (
    <div className={cn("absolute inset-0 bg-[#111111]", className)} aria-hidden>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${asset.poster})` }}
      />
      {videoAllowed ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={asset.poster}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ backgroundImage: `url(${asset.poster})` }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}
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

function HeroStaticPoster({ className }: { className?: string }) {
  const asset = HERO_VIDEOS[0];

  return (
    <div className={cn("absolute inset-0 bg-[#111111]", className)} aria-hidden>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${asset.poster})` }}
      />
    </div>
  );
}

export function HeroVideo({ className }: HeroVideoProps) {
  const reducedMotion = useReducedMotion();
  const mounted = useMounted();
  const { playHeroVideo, isMobile, isIOSPhone } = useDeviceCapabilities();

  if (!mounted) {
    return (
      <div className={cn("absolute inset-0 bg-[#111111]", className)} aria-hidden>
        <HeroPoster asset={HERO_VIDEOS[0]} isActive />
      </div>
    );
  }

  if (!playHeroVideo) {
    return isIOSPhone ? (
      <HeroStaticPoster className={className} />
    ) : (
      <HeroPosterOnly className={className} />
    );
  }

  if (reducedMotion) {
    return <HeroSingleVideo className={className} />;
  }

  if (isMobile) {
    return <HeroNativeMobileVideo className={className} />;
  }

  return <HeroMultiVideoCarousel className={className} />;
}
