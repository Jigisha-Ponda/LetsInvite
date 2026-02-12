/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_SUPABASE_DESIGNS_TABLE?: string;
  readonly VITE_SUPABASE_TEMPLATE_TABLE?: string;
  readonly VITE_SUPABASE_CATEGORY_TABLE?: string;
  readonly VITE_SUPABASE_TEMPLATE_ID_COLUMN?: string;
  readonly VITE_SUPABASE_TEMPLATE_TITLE_COLUMN?: string;
  readonly VITE_SUPABASE_TEMPLATE_IMAGE_COLUMN?: string;
  readonly VITE_SUPABASE_TEMPLATE_VIDEO_COLUMN?: string;
  readonly VITE_SUPABASE_TEMPLATE_PRICE_COLUMN?: string;
  readonly VITE_SUPABASE_TEMPLATE_WHATSAPP_COLUMN?: string;
  readonly VITE_SUPABASE_TEMPLATE_CATEGORY_ID_COLUMN?: string;
  readonly VITE_SUPABASE_TEMPLATE_CATEGORY_NAME_COLUMN?: string;
  readonly VITE_SUPABASE_CATEGORY_ID_COLUMN?: string;
  readonly VITE_SUPABASE_CATEGORY_NAME_COLUMN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}
declare module "*.jpeg" {
  const src: string;
  export default src;
}
declare module "*.png" {
  const src: string;
  export default src;
}
declare module "*.webp" {
  const src: string;
  export default src;
}
declare module "*.mp4" {
  const src: string;
  export default src;
}
