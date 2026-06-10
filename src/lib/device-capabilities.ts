type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
};

function getNavigator() {
  return typeof navigator !== "undefined" ? navigator : undefined;
}

/** iPhone / iPod — most prone to Safari tab crashes with heavy video + 3D. */
export function isIOSPhone(): boolean {
  const nav = getNavigator();
  if (!nav) return false;
  return /iPhone|iPod/i.test(nav.userAgent);
}

export function isMobileDevice(): boolean {
  const nav = getNavigator();
  if (!nav) return false;

  if (/Android|iPhone|iPod|Mobile/i.test(nav.userAgent)) return true;

  return nav.maxTouchPoints > 1 && window.matchMedia("(max-width: 768px)").matches;
}

export function hasSaveDataEnabled(): boolean {
  const nav = getNavigator();
  const connection = (nav as Navigator & { connection?: NetworkInformation })
    ?.connection;
  if (!connection?.saveData) return false;
  return true;
}

export function hasSlowConnection(): boolean {
  const nav = getNavigator();
  const connection = (nav as Navigator & { connection?: NetworkInformation })
    ?.connection;
  if (!connection?.effectiveType) return false;
  return connection.effectiveType === "2g" || connection.effectiveType === "slow-2g";
}

export function hasLimitedMemory(): boolean {
  const nav = getNavigator();
  const deviceMemory = (nav as Navigator & { deviceMemory?: number })
    ?.deviceMemory;
  if (deviceMemory === undefined) return false;
  return deviceMemory <= 4;
}

/** Skip video on iOS (WebKit decode crashes) and data-saver / slow connections. */
export function shouldPlayHeroVideo(): boolean {
  if (isIOSPhone()) return false;
  if (hasSaveDataEnabled()) return false;
  if (hasSlowConnection()) return false;
  return true;
}

/** Skip 3D loader / GSAP deck effects that crash older mobile WebKit. */
export function shouldUseHeavyMotion(): boolean {
  if (isMobileDevice()) return false;
  if (hasLimitedMemory()) return false;
  return true;
}

export type DeviceCapabilities = {
  isMobile: boolean;
  isIOSPhone: boolean;
  playHeroVideo: boolean;
  useHeavyMotion: boolean;
};

export function getDeviceCapabilities(): DeviceCapabilities {
  return {
    isMobile: isMobileDevice(),
    isIOSPhone: isIOSPhone(),
    playHeroVideo: shouldPlayHeroVideo(),
    useHeavyMotion: shouldUseHeavyMotion(),
  };
}
