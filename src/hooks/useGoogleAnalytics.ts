import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useGoogleAnalytics = (measurementId: string) => {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", measurementId, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location, measurementId]);
};

export default useGoogleAnalytics;

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}
