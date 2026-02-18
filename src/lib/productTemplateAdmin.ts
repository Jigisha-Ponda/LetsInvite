import { buildSupabaseRestUrl, hasSupabaseConfig } from "./supabase";

export const TEMPLATE_TABLE =
  import.meta.env.VITE_SUPABASE_TEMPLATE_TABLE ||
  import.meta.env.VITE_SUPABASE_DESIGNS_TABLE ||
  "ProductTemplate";

export const TEMPLATE_TITLE_COLUMN =
  import.meta.env.VITE_SUPABASE_TEMPLATE_TITLE_COLUMN || "Title";
export const TEMPLATE_IMAGE_COLUMN =
  import.meta.env.VITE_SUPABASE_TEMPLATE_IMAGE_COLUMN || "image_url";
export const TEMPLATE_VIDEO_COLUMN =
  import.meta.env.VITE_SUPABASE_TEMPLATE_VIDEO_COLUMN || "video_url";
export const TEMPLATE_PRICE_COLUMN =
  import.meta.env.VITE_SUPABASE_TEMPLATE_PRICE_COLUMN || "Price";
export const TEMPLATE_ORIGINAL_PRICE_COLUMN =
  import.meta.env.VITE_SUPABASE_TEMPLATE_ORIGINAL_PRICE_COLUMN || "OriginalPrice";
export const TEMPLATE_SUBTITLE_COLUMN =
  import.meta.env.VITE_SUPABASE_TEMPLATE_SUBTITLE_COLUMN || "Subtitle";
export const TEMPLATE_HEADING_COLUMN =
  import.meta.env.VITE_SUPABASE_TEMPLATE_HEADING_COLUMN || "Heading";
export const TEMPLATE_DESCRIPTION_COLUMN =
  import.meta.env.VITE_SUPABASE_TEMPLATE_DESCRIPTION_COLUMN || "Description";
export const TEMPLATE_WHATSAPP_COLUMN =
  import.meta.env.VITE_SUPABASE_TEMPLATE_WHATSAPP_COLUMN || "";
export const TEMPLATE_CATEGORY_ID_COLUMN =
  import.meta.env.VITE_SUPABASE_TEMPLATE_CATEGORY_ID_COLUMN || "category_id";
export const TEMPLATE_CATEGORY_NAME_COLUMN =
  import.meta.env.VITE_SUPABASE_TEMPLATE_CATEGORY_NAME_COLUMN || "category_name";
export const TEMPLATE_CARD_IMAGE_1_COLUMN =
  import.meta.env.VITE_SUPABASE_TEMPLATE_CARD_IMAGE_1_COLUMN || "card_image1";
export const TEMPLATE_CARD_IMAGE_2_COLUMN =
  import.meta.env.VITE_SUPABASE_TEMPLATE_CARD_IMAGE_2_COLUMN || "card_image2";
export const TEMPLATE_CARD_IMAGE_3_COLUMN =
  import.meta.env.VITE_SUPABASE_TEMPLATE_CARD_IMAGE_3_COLUMN || "card_image3";
export const TEMPLATE_CARD_IMAGE_4_COLUMN =
  import.meta.env.VITE_SUPABASE_TEMPLATE_CARD_IMAGE_4_COLUMN || "card_image4";

export const insertProductTemplate = async (
  payload: Record<string, unknown>,
  accessToken: string
) => {
  if (!hasSupabaseConfig) {
    throw new Error("Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
  }
 const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const response = await fetch(buildSupabaseRestUrl(TEMPLATE_TABLE), {
    method: "POST",
    headers: {
    apikey: supabaseAnonKey,
  Authorization: `Bearer ${accessToken}`, // ✅ THIS IS THE FIX
  "Content-Type": "application/json",
  Prefer: "return=minimal",
      },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `Failed to insert row. HTTP ${response.status}`);
  }

  const raw = await response.text();
  if (!raw.trim()) return null;
  return JSON.parse(raw);
};
