import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://ritikshah-portfolio.netlify.app";
const SITE_NAME = "Ritik Shah";
const DEFAULT_IMAGE = `${SITE_URL}/assets/images/sidelogo.jpg`;

interface PageMeta {
  title: string;
  description: string;
  image?: string;
  structuredData?: Record<string, unknown>;
}

const setMeta = (attr: "name" | "property", key: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
};

const setCanonical = (href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
};

const STRUCTURED_DATA_ID = "route-structured-data";

const usePageMeta = ({ title, description, image, structuredData }: PageMeta) => {
  const location = useLocation();
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const url = `${SITE_URL}${location.pathname}`;
    const socialImage = image
      ? image.startsWith("http")
        ? image
        : `${SITE_URL}${image}`
      : DEFAULT_IMAGE;
    document.title = fullTitle;
    setMeta("name", "title", fullTitle);
    setMeta("name", "description", description);
    setCanonical(url);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", socialImage);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:url", url);
    setMeta("name", "twitter:image", socialImage);
  }, [location.pathname, title, description, image]);

  const serialized = structuredData ? JSON.stringify(structuredData) : null;
  useEffect(() => {
    if (!serialized) return;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = STRUCTURED_DATA_ID;
    script.textContent = serialized;

    document.getElementById(STRUCTURED_DATA_ID)?.remove();
    document.head.appendChild(script);
    return () => script.remove();
  }, [serialized]);
};

export default usePageMeta;
