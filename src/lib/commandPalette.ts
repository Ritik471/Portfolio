const OPEN_EVENT = "command-palette:open";

export const openCommandPalette = () => {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
};

export const onOpenCommandPalette = (handler: () => void) => {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
};
