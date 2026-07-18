// Reuse the Open Graph card for Twitter/X. Metadata fields must be literals in this
// file (Next can't read a re-exported `runtime`), so declare them here and re-export
// only the image renderer.
export { default } from "./opengraph-image";

export const runtime = "edge";
export const alt = "Krystal Brook Coterie — editorial luxury web design, custom-coded";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
