"use client";

import { useEffect, useState } from "react";
import {
  getDeviceCapabilities,
  type DeviceCapabilities,
} from "@/lib/device-capabilities";

const SERVER_CAPABILITIES: DeviceCapabilities = {
  isMobile: false,
  isIOSPhone: false,
  playHeroVideo: true,
  useHeavyMotion: true,
};

export function useDeviceCapabilities() {
  const [capabilities, setCapabilities] = useState(SERVER_CAPABILITIES);

  useEffect(() => {
    setCapabilities(getDeviceCapabilities());

    const update = () => setCapabilities(getDeviceCapabilities());
    const media = window.matchMedia("(max-width: 768px)");

    media.addEventListener("change", update);
    window.addEventListener("orientationchange", update);

    return () => {
      media.removeEventListener("change", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return capabilities;
}
