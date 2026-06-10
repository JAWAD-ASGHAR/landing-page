"use client";

import { useSyncExternalStore } from "react";
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

function subscribe() {
  return () => {};
}

function getClientCapabilities() {
  return getDeviceCapabilities();
}

export function useDeviceCapabilities() {
  return useSyncExternalStore(
    subscribe,
    getClientCapabilities,
    () => SERVER_CAPABILITIES,
  );
}
