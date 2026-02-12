import { buildSupabaseRestUrl, getSupabaseHeaders, hasSupabaseConfig } from "./supabase";

export interface DesignItem {
  id: string;
  image: string;
  cardImages: string[];
  title: string;
  category: string;
  price?: string;
  subtitle?: string;
  description?: string;
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
const TEMPLATE_SUBTITLE_COLUMN =
  import.meta.env.VITE_SUPABASE_TEMPLATE_SUBTITLE_COLUMN || "Subtitle";
const TEMPLATE_DESCRIPTION_COLUMN =
  import.meta.env.VITE_SUPABASE_TEMPLATE_DESCRIPTION_COLUMN || "Description";
const TEMPLATE_WHATSAPP_COLUMN =
  import.meta.env.VITE_SUPABASE_TEMPLATE_WHATSAPP_COLUMN || "";
const TEMPLATE_CATEGORY_ID_COLUMN =
  import.meta.env.VITE_SUPABASE_TEMPLATE_CATEGORY_ID_COLUMN || "category_id";
const TEMPLATE_CATEGORY_NAME_COLUMN =
  import.meta.env.VITE_SUPABASE_TEMPLATE_CATEGORY_NAME_COLUMN || "category_name";
const TEMPLATE_CARD_IMAGE_1_COLUMN =
  import.meta.env.VITE_SUPABASE_TEMPLATE_CARD_IMAGE_1_COLUMN || "card_image1";
const TEMPLATE_CARD_IMAGE_2_COLUMN =
  import.meta.env.VITE_SUPABASE_TEMPLATE_CARD_IMAGE_2_COLUMN || "card_image2";
const TEMPLATE_CARD_IMAGE_3_COLUMN =
  import.meta.env.VITE_SUPABASE_TEMPLATE_CARD_IMAGE_3_COLUMN || "card_image3";
const TEMPLATE_CARD_IMAGE_4_COLUMN =
  import.meta.env.VITE_SUPABASE_TEMPLATE_CARD_IMAGE_4_COLUMN || "card_image4";

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
  const cardImages = [
    pickString(row, [TEMPLATE_CARD_IMAGE_1_COLUMN, "card_image1", "cardImage1", "card_image_1"]),
    pickString(row, [TEMPLATE_CARD_IMAGE_2_COLUMN, "card_image2", "cardImage2", "card_image_2"]),
    pickString(row, [TEMPLATE_CARD_IMAGE_3_COLUMN, "card_image3", "cardImage3", "card_image_3"]),
    pickString(row, [TEMPLATE_CARD_IMAGE_4_COLUMN, "card_image4", "cardImage4", "card_image_4"]),
  ].filter((value): value is string => Boolean(value));
  const primaryImage = image ?? cardImages[0] ?? thumbnail ?? "/placeholder.svg";
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
    id: String(row[TEMPLATE_ID_COLUMN]),
    image: primaryImage,
    cardImages: cardImages.length > 0 ? cardImages : [primaryImage],
    title,
    category: fallbackCategory,
    price: toPriceLabel(pickValue(row, [TEMPLATE_PRICE_COLUMN, "price", "Price"])),
    subtitle: pickString(row, [TEMPLATE_SUBTITLE_COLUMN, "subtitle", "Subtitle"]) ?? undefined,
    description: pickString(row, [TEMPLATE_DESCRIPTION_COLUMN, "description", "Description"]) ?? undefined,
    videoSrc,
    whatsappMessage: TEMPLATE_WHATSAPP_COLUMN
      ? asString(row[TEMPLATE_WHATSAPP_COLUMN]) ?? undefined
      : undefined,
  };
};

const selectedTemplateColumns = [
  TEMPLATE_ID_COLUMN,
  TEMPLATE_TITLE_COLUMN,
  TEMPLATE_VIDEO_COLUMN,
  TEMPLATE_PRICE_COLUMN,
  TEMPLATE_SUBTITLE_COLUMN,
  TEMPLATE_DESCRIPTION_COLUMN,
  TEMPLATE_CATEGORY_ID_COLUMN,
  TEMPLATE_CATEGORY_NAME_COLUMN,
  TEMPLATE_CARD_IMAGE_1_COLUMN,
  TEMPLATE_CARD_IMAGE_2_COLUMN,
  TEMPLATE_CARD_IMAGE_3_COLUMN,
  TEMPLATE_CARD_IMAGE_4_COLUMN,
  ...(TEMPLATE_IMAGE_COLUMN ? [TEMPLATE_IMAGE_COLUMN] : []),
  ...(TEMPLATE_WHATSAPP_COLUMN ? [TEMPLATE_WHATSAPP_COLUMN] : []),
];

const fetchTemplateRows = async (query: URLSearchParams): Promise<DesignItem[]> => {
  if (!hasSupabaseConfig) return [];

  const headers = getSupabaseHeaders();
  const templateRes = await fetch(buildSupabaseRestUrl(TEMPLATE_TABLE, query), { headers });

  if (!templateRes.ok) {
    const body = await templateRes.text();
    throw new Error(`Supabase template query failed (${templateRes.status}): ${body}`);
  }

  const templateRows = (await templateRes.json()) as GenericRow[];
  return templateRows.map(mapTemplateToDesign).filter((item): item is DesignItem => item !== null);
};

export const fetchFeaturedDesigns = async (limit = 4): Promise<DesignItem[]> => {
  const query = new URLSearchParams({
    select: selectedTemplateColumns.join(","),
    order: `${TEMPLATE_ID_COLUMN}.asc`,
    limit: String(limit),
  });

  return fetchTemplateRows(query);
};

export const fetchDesignsByCategoryName = async (
  categoryName: string,
  limit = 50,
): Promise<DesignItem[]> => {
  const query = new URLSearchParams({
    select: selectedTemplateColumns.join(","),
    order: `${TEMPLATE_ID_COLUMN}.asc`,
    limit: String(limit),
  });
  query.set(TEMPLATE_CATEGORY_NAME_COLUMN, `eq.${categoryName}`);
  return fetchTemplateRows(query);
};

export const fetchDesignById = async (id: string): Promise<DesignItem | null> => {
  const query = new URLSearchParams({
    // Use all columns for details page to avoid schema-name mismatch issues.
    select: "*",
    limit: "1",
  });
  query.set(TEMPLATE_ID_COLUMN, `eq.${id}`);

  const rows = await fetchTemplateRows(query);
  return rows[0] ?? null;
};
