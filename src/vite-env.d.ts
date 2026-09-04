/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Absolute API origin, e.g. https://api.zevanto.com. Empty = same-origin. */
  readonly VITE_API_BASE_URL?: string;
  /** Human-readable release shown in the UI footer. */
  readonly VITE_APP_VERSION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
