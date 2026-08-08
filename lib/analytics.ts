declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const trackEvent = (
  eventName: string,
  params?: Record<string, string | number | boolean>
) => {
  if (typeof window === 'undefined' || !window.gtag) {
    console.debug(`[GA4] Event tracked (gtag not loaded): ${eventName}`, params);
    return;
  }

  window.gtag('event', eventName, params || {});
};
