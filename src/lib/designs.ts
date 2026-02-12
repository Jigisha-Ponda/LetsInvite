import { buildSupabaseRestUrl, getSupabaseHeaders, hasSupabaseConfig } from "./supabase";

export interface DesignItem {
  image: string;
  title: string;
  category: string;
  price?: string;
  whatsappMessage?: string;
  videoSrc?: string;
}

type GenericRow = Record<string, unknown>;

const TEMPLATE_TABLE =
  import.meta.env.VITE_SUPABASE_TEMPLATE_TABLE ||
  import.meta.env.VITE_SUPABASE_DESIGNS_TABLE ||
  "ProductTemplate";

const TEMPLATE_ID_COLUMN = import.meta.env.VITE_SUPABASE_TEMPLATE_ID_COLUMN || "id";
const TEMPLATE_TITLE_COLUMN = import.meta.env.VITE_SUPABASE_TEMPLATE_TITLE_COLUMN || "Title";
const TEMPLATE_IMAGE_COLUMN = import.meta.env.VITE_SUPABASE_TEMPLATE_IMAGE_COLUMN || "image_url";
const TEMPLATE_VIDEO_COLUMN = import.meta.env.VITE_SUPABASE_TEMPLATE_VIDEO_COLUMN || "video_url";
const TEMPLATE_PRICE_COLUMN = import.meta.env.VITE_SUPABASE_TEMPLATE_PRICE_COLUMN || "Price";
const TEMPLATE_WHATSAPP_COLUMN =
  import.meta.env.VITE_SUPABASE_TEMPLATE_WHATSAPP_COLUMN || "";
const TEMPLATE_CATEGORY_ID_COLUMN =
  import.meta.env.VITE_SUPABASE_TEMPLATE_CATEGORY_ID_COLUMN || "category_id";
const TEMPLATE_CATEGORY_NAME_COLUMN =
  import.meta.env.VITE_SUPABASE_TEMPLATE_CATEGORY_NAME_COLUMN || "category_name";

const toPriceLabel = (price: unknown) => {
  if (price === null || price === undefined || price === "") return undefined;
  if (typeof price === "number") return `₹${price.toLocaleString("en-IN")}`;
  if (typeof price !== "string") return undefined;
  if (price.startsWith("₹")) return price;
  return `₹${price}`;
};

const asString = (value: unknown) => (typeof value === "string" && value.trim() ? value.trim() : null);
const asNumber = (value: unknown) => (typeof value === "number" ? value : null);

const pickString = (row: GenericRow, keys: string[]) => {
  for (const key of keys) {
    const value = asString(row[key]);
    if (value) return value;
  }
  return null;
};

const pickValue = (row: GenericRow, keys: string[]) => {
  for (const key of keys) {
    const value = row[key];
    if (value !== undefined && value !== null && value !== "") return value;
  }
  return null;
};

const getYouTubeId = (url: string) => {
  const patterns = [
    /youtube\.com\/watch\?v=([^?&/]+)/,
    /youtube\.com\/shorts\/([^?&/]+)/,
    /youtu\.be\/([^?&/]+)/,
    /youtube\.com\/embed\/([^?&/]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
};

const thumbnailFromVideo = (videoUrl: string | null) => {
  if (!videoUrl) return null;
  const ytId = getYouTubeId(videoUrl);
  if (ytId) return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  return null;
};

const mapTemplateToDesign = (row: GenericRow): DesignItem | null => {
  const image = TEMPLATE_IMAGE_COLUMN ? asString(row[TEMPLATE_IMAGE_COLUMN]) : null;
  const title = pickString(row, [TEMPLATE_TITLE_COLUMN, "title", "Title", "name"]);
  const videoSrc = pickString(row, [TEMPLATE_VIDEO_COLUMN, "video_url", "videoUrl"]) ?? undefined;
  const categoryId = pickValue(row, [TEMPLATE_CATEGORY_ID_COLUMN, "category_id", "categoryId"]);

  if (!title) return null;

  const thumbnail = thumbnailFromVideo(videoSrc ?? null);
  const fallbackCategory =
    pickString(row, [
      TEMPLATE_CATEGORY_NAME_COLUMN,
      "category_name",
      "categoryName",
      "category",
      "Category",
    ]) ||
    (typeof categoryId === "string" || typeof categoryId === "number"
      ? `Category ${String(categoryId)}`
      : null) ||
    (asNumber(categoryId) !== null || asString(categoryId) ? "Category" : "General");

  return {
    image: image ?? thumbnail ?? "/placeholder.svg",
    title,
    category: fallbackCategory,
    price: toPriceLabel(pickValue(row, [TEMPLATE_PRICE_COLUMN, "price", "Price"])),
    videoSrc,
    whatsappMessage: TEMPLATE_WHATSAPP_COLUMN
      ? asString(row[TEMPLATE_WHATSAPP_COLUMN]) ?? undefined
      : undefined,
  };
};

export const fetchFeaturedDesigns = async (limit = 4): Promise<DesignItem[]> => {
  if (!hasSupabaseConfig) return [];

  const headers = getSupabaseHeaders();

  const selectedTemplateColumns = [
    TEMPLATE_ID_COLUMN,
    TEMPLATE_TITLE_COLUMN,
    TEMPLATE_VIDEO_COLUMN,
    TEMPLATE_PRICE_COLUMN,
    TEMPLATE_CATEGORY_ID_COLUMN,
    TEMPLATE_CATEGORY_NAME_COLUMN,
    ...(TEMPLATE_IMAGE_COLUMN ? [TEMPLATE_IMAGE_COLUMN] : []),
    ...(TEMPLATE_WHATSAPP_COLUMN ? [TEMPLATE_WHATSAPP_COLUMN] : []),
  ];

  const templateQuery = new URLSearchParams({
    select: selectedTemplateColumns.join(","),
    order: `${TEMPLATE_ID_COLUMN}.asc`,
    limit: String(limit),
  });
  const templateRes = await fetch(buildSupabaseRestUrl(TEMPLATE_TABLE, templateQuery), { headers });

  if (!templateRes.ok) {
    const body = await templateRes.text();
    throw new Error(`Supabase template query failed (${templateRes.status}): ${body}`);
  }

  const templateRows = (await templateRes.json()) as GenericRow[];
  return templateRows.map(mapTemplateToDesign).filter((item): item is DesignItem => item !== null);
};
