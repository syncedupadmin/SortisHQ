export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

const UTM_STORAGE_KEY = "sortisiq_utm";
const DEBUG = process.env.NEXT_PUBLIC_DEBUG_UTM === "true";

export function captureUTMParams(): UTMParams | null {
  if (typeof window === "undefined") return null;

  try {
    const params = new URLSearchParams(window.location.search);
    const utmParams: UTMParams = {};
    let hasUTM = false;

    const utmKeys: (keyof UTMParams)[] = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
    ];

    utmKeys.forEach((key) => {
      const value = params.get(key);
      if (value) {
        utmParams[key] = value;
        hasUTM = true;
      }
    });

    if (hasUTM) {
      localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmParams));
      if (DEBUG) {
        console.log("[UTM] Captured and stored:", utmParams);
      }
      return utmParams;
    }

    return null;
  } catch (error) {
    console.error("[UTM] Error capturing params:", error);
    return null;
  }
}

export function getStoredUTMParams(): UTMParams {
  if (typeof window === "undefined") return {};

  try {
    const stored = localStorage.getItem(UTM_STORAGE_KEY);
    if (stored) {
      const params = JSON.parse(stored);
      if (DEBUG) {
        console.log("[UTM] Retrieved from storage:", params);
      }
      return params;
    }
  } catch (error) {
    console.error("[UTM] Error reading storage:", error);
  }

  return {};
}

export function clearUTMParams(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(UTM_STORAGE_KEY);
  if (DEBUG) {
    console.log("[UTM] Cleared storage");
  }
}
