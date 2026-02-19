import { buildSupabaseRestUrl, getSupabaseApiKey, hasSupabaseConfig } from "./supabase";

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
export const TEMPLATE_ID_COLUMN =
  import.meta.env.VITE_SUPABASE_TEMPLATE_ID_COLUMN || "id";
export const CATEGORY_TABLE =
  import.meta.env.VITE_SUPABASE_CATEGORY_TABLE || "ProductCategory";
export const CATEGORY_ID_COLUMN =
  import.meta.env.VITE_SUPABASE_CATEGORY_ID_COLUMN || "id";
export const CATEGORY_NAME_COLUMN =
  import.meta.env.VITE_SUPABASE_CATEGORY_NAME_COLUMN || "category_name";

const parseJsonOrNull = async (response: Response) => {
  const raw = await response.text();
  if (!raw.trim()) return null;
  return JSON.parse(raw);
};

export const insertProductTemplate = async (
  payload: Record<string, unknown>,
  accessToken: string
) => {
  if (!hasSupabaseConfig) {
    throw new Error("Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
  }
  const supabaseAnonKey = getSupabaseApiKey();
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

  return parseJsonOrNull(response);
};

export const fetchProductTemplates = async (limit = 200) => {
  if (!hasSupabaseConfig) return [];

  const query = new URLSearchParams({
    select: "*",
    order: `${TEMPLATE_ID_COLUMN}.desc`,
    limit: String(limit),
  });
  const response = await fetch(buildSupabaseRestUrl(TEMPLATE_TABLE, query), {
    method: "GET",
    headers: {
      apikey: getSupabaseApiKey(),
      Authorization: `Bearer ${getSupabaseApiKey()}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `Failed to fetch templates. HTTP ${response.status}`);
  }

  const parsed = await parseJsonOrNull(response);
  return (parsed ?? []) as Array<Record<string, unknown>>;
};

export const fetchProductCategories = async (accessToken?: string) => {
  if (!hasSupabaseConfig) return [];

  const query = new URLSearchParams({
    select: "*",
    order: `${CATEGORY_NAME_COLUMN}.asc`,
    limit: "200",
  });
  const response = await fetch(buildSupabaseRestUrl(CATEGORY_TABLE, query), {
    method: "GET",
    headers: {
      apikey: getSupabaseApiKey(),
      Authorization: `Bearer ${accessToken || getSupabaseApiKey()}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `Failed to fetch categories. HTTP ${response.status}`);
  }

  const rows = ((await parseJsonOrNull(response)) ?? []) as Array<Record<string, unknown>>;
  return rows.map((row) => {
    const idValue =
      row[CATEGORY_ID_COLUMN] ??
      row["id"] ??
      row["category_id"] ??
      row["categoryId"] ??
      row["CategoryId"] ??
      row["CategoryID"] ??
      row["categoryID"];
    const nameValue =
      row[CATEGORY_NAME_COLUMN] ??
      row["category_name"] ??
      row["name"] ??
      row["categoryName"] ??
      row["CategoryName"] ??
      row["category"] ??
      row["Category"] ??
      row["title"] ??
      row["Title"];
    return {
      id: String(idValue ?? ""),
      name: String(nameValue ?? ""),
      raw: row,
    };
  }).filter((item) => item.id && item.name);
};

export const updateProductTemplate = async (
  id: string,
  payload: Record<string, unknown>,
  accessToken: string,
) => {
  if (!hasSupabaseConfig) {
    throw new Error("Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
  }

  const query = new URLSearchParams({
    [TEMPLATE_ID_COLUMN]: `eq.${id}`,
    select: TEMPLATE_ID_COLUMN,
  });
  const response = await fetch(buildSupabaseRestUrl(TEMPLATE_TABLE, query), {
    method: "PATCH",
    headers: {
      apikey: getSupabaseApiKey(),
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `Failed to update row. HTTP ${response.status}`);
  }

  const updatedRows = (await parseJsonOrNull(response)) as Array<Record<string, unknown>> | null;
  if (!updatedRows || updatedRows.length === 0) {
    throw new Error(
      `No row updated for ${TEMPLATE_ID_COLUMN}=${id}. Check row id and Supabase UPDATE RLS policy.`,
    );
  }

  return updatedRows;
};

export const deleteProductTemplate = async (id: string, accessToken: string) => {
  if (!hasSupabaseConfig) {
    throw new Error("Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
  }

  const query = new URLSearchParams({
    [TEMPLATE_ID_COLUMN]: `eq.${id}`,
  });
  const response = await fetch(buildSupabaseRestUrl(TEMPLATE_TABLE, query), {
    method: "DELETE",
    headers: {
      apikey: getSupabaseApiKey(),
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `Failed to delete row. HTTP ${response.status}`);
  }

  return parseJsonOrNull(response);
};
