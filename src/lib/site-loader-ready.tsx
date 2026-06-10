"use client";

import { createContext, useContext } from "react";

const SiteLoaderReadyContext = createContext(false);

export function useSiteLoaderReady() {
  return useContext(SiteLoaderReadyContext);
}

export { SiteLoaderReadyContext };
