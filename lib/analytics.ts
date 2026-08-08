declare global {
  interface Window {
    gtag: (command: string, ...args: unknown[]) => void;
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const initGA = () => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(
    ...args: [string, ...unknown[]]
  ) {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
    anonymize_ip: true,
  });
};

export const trackEvent = (
  eventName: string,
  params?: Record<string, string | number | boolean>
) => {
  if (!window.gtag) return;
  window.gtag('event', eventName, params || {});
};
