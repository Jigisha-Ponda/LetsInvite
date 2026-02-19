import { FormEvent, useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  TEMPLATE_CARD_IMAGE_1_COLUMN,
  TEMPLATE_CARD_IMAGE_2_COLUMN,
  TEMPLATE_CARD_IMAGE_3_COLUMN,
  TEMPLATE_CARD_IMAGE_4_COLUMN,
  fetchProductCategories,
  TEMPLATE_CATEGORY_ID_COLUMN,
  TEMPLATE_CATEGORY_NAME_COLUMN,
  TEMPLATE_DESCRIPTION_COLUMN,
  TEMPLATE_HEADING_COLUMN,
  TEMPLATE_ID_COLUMN,
  TEMPLATE_IMAGE_COLUMN,
  TEMPLATE_ORIGINAL_PRICE_COLUMN,
  TEMPLATE_PRICE_COLUMN,
  TEMPLATE_SUBTITLE_COLUMN,
  TEMPLATE_TITLE_COLUMN,
  TEMPLATE_VIDEO_COLUMN,
  TEMPLATE_WHATSAPP_COLUMN,
  deleteProductTemplate,
  fetchProductTemplates,
  insertProductTemplate,
  updateProductTemplate,
} from "../lib/productTemplateAdmin";
import {
  refreshSession,
  hasSupabaseConfig,
  isAdminUser,
  getUserFromAccessToken,
  signInWithPassword,
  SupabaseAuthSession,
} from "../lib/supabase";

type FormState = {
  adminKey: string;
  email: string;
  password: string;
  title: string;
  categoryName: string;
  categoryId: string;
  price: string;
  originalPrice: string;
  subtitle: string;
  heading: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  cardImage1: string;
  cardImage2: string;
  cardImage3: string;
  cardImage4: string;
  whatsappMessage: string;
};

type ProductTemplateRow = Record<string, unknown>;
type ProductCategoryOption = { id: string; name: string };

const ADMIN_FORM_KEY = import.meta.env.VITE_ADMIN_FORM_KEY?.trim();
const ADMIN_SESSION_KEY = "admin-template-session";

const initialState: FormState = {
  adminKey: "",
  email: "",
  password: "",
  title: "",
  categoryName: "",
  categoryId: "",
  price: "",
  originalPrice: "",
  subtitle: "",
  heading: "",
  description: "",
  imageUrl: "",
  videoUrl: "",
  cardImage1: "",
  cardImage2: "",
  cardImage3: "",
  cardImage4: "",
  whatsappMessage: "",
};

const toNumberOrNull = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
};

const toFormString = (value: unknown) => {
  if (value === null || value === undefined) return "";
  return String(value);
};

const deriveCategoriesFromTemplates = (rows: ProductTemplateRow[]): ProductCategoryOption[] => {
  const map = new Map<string, string>();
  for (const row of rows) {
    const name = toFormString(row[TEMPLATE_CATEGORY_NAME_COLUMN]).trim();
    const id = toFormString(row[TEMPLATE_CATEGORY_ID_COLUMN]).trim();
    if (!name) continue;
    if (!map.has(name)) {
      map.set(name, id);
    }
  }
  return Array.from(map.entries())
    .map(([name, id]) => ({ id, name }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

const AdminTemplateForm = () => {
  const [form, setForm] = useState<FormState>(() => {
    if (typeof window === "undefined") return initialState;
    const raw = window.localStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return initialState;
    try {
      const saved = JSON.parse(raw) as SupabaseAuthSession;
      return { ...initialState, email: saved.user.email ?? "" };
    } catch {
      window.localStorage.removeItem(ADMIN_SESSION_KEY);
      return initialState;
    }
  });
  const [isUnlocked, setIsUnlocked] = useState(!ADMIN_FORM_KEY);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [session, setSession] = useState<SupabaseAuthSession | null>(() => {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as SupabaseAuthSession;
    } catch {
      window.localStorage.removeItem(ADMIN_SESSION_KEY);
      return null;
    }
  });
  const [feedback, setFeedback] = useState<{ type: "ok" | "error"; message: string } | null>(null);
  const [templates, setTemplates] = useState<ProductTemplateRow[]>([]);
  const [categories, setCategories] = useState<ProductCategoryOption[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(false);
  const [isAdminAuthorized, setIsAdminAuthorized] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const keyConfigured = useMemo(() => Boolean(ADMIN_FORM_KEY), []);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const loadTemplates = async () => {
    if (!hasSupabaseConfig) return;
    setIsLoadingTemplates(true);
    try {
      const rows = await fetchProductTemplates();
      setTemplates(rows);
      setCategories((prev) => (prev.length > 0 ? prev : deriveCategoriesFromTemplates(rows)));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to load templates.";
      setFeedback({ type: "error", message });
    } finally {
      setIsLoadingTemplates(false);
    }
  };

  const loadCategories = async (accessToken?: string) => {
    if (!hasSupabaseConfig) return;
    setIsLoadingCategories(true);
    try {
      const rows = await fetchProductCategories(accessToken);
      const mapped = rows.map((row) => ({ id: row.id, name: row.name }));
      if (mapped.length > 0) {
        setCategories(mapped);
      } else {
        const templateRows = await fetchProductTemplates();
        setCategories(deriveCategoriesFromTemplates(templateRows));
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to load categories.";
      setFeedback({ type: "error", message });
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const startEdit = (row: ProductTemplateRow) => {
    const nextId = toFormString(row[TEMPLATE_ID_COLUMN]);
    if (!nextId) return;

    setEditingId(nextId);
    setForm((prev) => ({
      ...prev,
      title: toFormString(row[TEMPLATE_TITLE_COLUMN]),
      categoryName: toFormString(row[TEMPLATE_CATEGORY_NAME_COLUMN]),
      categoryId: toFormString(row[TEMPLATE_CATEGORY_ID_COLUMN]),
      price: toFormString(row[TEMPLATE_PRICE_COLUMN]),
      originalPrice: toFormString(row[TEMPLATE_ORIGINAL_PRICE_COLUMN]),
      subtitle: toFormString(row[TEMPLATE_SUBTITLE_COLUMN]),
      heading: toFormString(row[TEMPLATE_HEADING_COLUMN]),
      description: toFormString(row[TEMPLATE_DESCRIPTION_COLUMN]),
      imageUrl: toFormString(row[TEMPLATE_IMAGE_COLUMN]),
      videoUrl: toFormString(row[TEMPLATE_VIDEO_COLUMN]),
      cardImage1: toFormString(row[TEMPLATE_CARD_IMAGE_1_COLUMN]),
      cardImage2: toFormString(row[TEMPLATE_CARD_IMAGE_2_COLUMN]),
      cardImage3: toFormString(row[TEMPLATE_CARD_IMAGE_3_COLUMN]),
      cardImage4: toFormString(row[TEMPLATE_CARD_IMAGE_4_COLUMN]),
      whatsappMessage: TEMPLATE_WHATSAPP_COLUMN
        ? toFormString(row[TEMPLATE_WHATSAPP_COLUMN])
        : prev.whatsappMessage,
    }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetFormOnly = () => {
    setEditingId(null);
    setForm((prev) => ({
      ...initialState,
      adminKey: prev.adminKey,
      email: prev.email,
    }));
  };

  useEffect(() => {
    if (!isUnlocked || !hasSupabaseConfig) return;
    void loadCategories(session?.access_token);
    void loadTemplates();
  }, [isUnlocked, session?.access_token]);

  useEffect(() => {
    if (!session) return;

    const verifyAdmin = async () => {
      try {
        const authUser = await getUserFromAccessToken(session.access_token);
        const hasAdminAccess = await isAdminUser(session.access_token, authUser.id);
        setIsAdminAuthorized(hasAdminAccess);
      } catch {
        setIsAdminAuthorized(false);
      }
    };

    void verifyAdmin();
  }, [session]);

  const unlockAdmin = (event: FormEvent) => {
    event.preventDefault();
    if (!ADMIN_FORM_KEY) {
      setIsUnlocked(true);
      return;
    }

    if (form.adminKey.trim() !== ADMIN_FORM_KEY) {
      setFeedback({ type: "error", message: "Invalid admin key." });
      return;
    }

    setFeedback(null);
    setIsUnlocked(true);
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setFeedback(null);

    if (!form.email.trim() || !form.password.trim()) {
      setFeedback({ type: "error", message: "Email and password are required." });
      return;
    }

    setIsLoggingIn(true);
    try {
      const nextSession = await signInWithPassword(form.email.trim(), form.password);
      const authUser = await getUserFromAccessToken(nextSession.access_token);
      const hasAdminAccess = await isAdminUser(nextSession.access_token, authUser.id);
      if (!hasAdminAccess) {
        throw new Error(
          `Logged-in user ${authUser.id} is not present in admin_users. Add this exact user_id in Supabase.`,
        );
      }

      setSession(nextSession);
      setIsAdminAuthorized(true);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(nextSession));
      }
      await loadCategories(nextSession.access_token);
      await loadTemplates();
      setForm((prev) => ({ ...prev, password: "" }));
      setFeedback({ type: "ok", message: `Logged in as ${nextSession.user.email ?? "admin user"}.` });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed.";
      setFeedback({ type: "error", message });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setSession(null);
    setIsAdminAuthorized(false);
    setTemplates([]);
    setEditingId(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(ADMIN_SESSION_KEY);
    }
    setFeedback({ type: "ok", message: "Logged out." });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFeedback(null);

    const requiredFields: Array<{ key: keyof FormState; label: string }> = [
      { key: "title", label: "Title" },
      { key: "categoryName", label: "Category Name" },
      { key: "categoryId", label: "Category ID" },
      { key: "price", label: "Price" },
      { key: "originalPrice", label: "Original Price" },
      { key: "subtitle", label: "Subtitle" },
      { key: "heading", label: "Heading" },
      { key: "videoUrl", label: "Video URL" },
      { key: "imageUrl", label: "Primary Image URL" },
      { key: "cardImage1", label: "Card Image 1" },
      { key: "cardImage2", label: "Card Image 2" },
      { key: "cardImage3", label: "Card Image 3" },
      { key: "cardImage4", label: "Card Image 4" },
      { key: "description", label: "Description" },
    ];

    if (TEMPLATE_WHATSAPP_COLUMN) {
      requiredFields.push({ key: "whatsappMessage", label: "WhatsApp Message" });
    }

    const missing = requiredFields.find((field) => !form[field.key].trim());
    if (missing) {
      setFeedback({ type: "error", message: `${missing.label} is required.` });
      return;
    }

    const payload: Record<string, unknown> = {
      [TEMPLATE_TITLE_COLUMN]: form.title.trim(),
      [TEMPLATE_CATEGORY_NAME_COLUMN]: form.categoryName.trim(),
    };

    const categoryId = form.categoryId.trim();
    if (categoryId) {
      payload[TEMPLATE_CATEGORY_ID_COLUMN] = /^\d+$/.test(categoryId)
        ? Number(categoryId)
        : categoryId;
    }

    const price = toNumberOrNull(form.price);
    if (price !== null) payload[TEMPLATE_PRICE_COLUMN] = price;

    const originalPrice = toNumberOrNull(form.originalPrice);
    if (originalPrice !== null) payload[TEMPLATE_ORIGINAL_PRICE_COLUMN] = originalPrice;

    if (form.subtitle.trim()) payload[TEMPLATE_SUBTITLE_COLUMN] = form.subtitle.trim();
    if (form.heading.trim()) payload[TEMPLATE_HEADING_COLUMN] = form.heading.trim();
    if (form.description.trim()) payload[TEMPLATE_DESCRIPTION_COLUMN] = form.description.trim();
    if (form.imageUrl.trim()) payload[TEMPLATE_IMAGE_COLUMN] = form.imageUrl.trim();
    if (form.videoUrl.trim()) payload[TEMPLATE_VIDEO_COLUMN] = form.videoUrl.trim();
    if (form.cardImage1.trim()) payload[TEMPLATE_CARD_IMAGE_1_COLUMN] = form.cardImage1.trim();
    if (form.cardImage2.trim()) payload[TEMPLATE_CARD_IMAGE_2_COLUMN] = form.cardImage2.trim();
    if (form.cardImage3.trim()) payload[TEMPLATE_CARD_IMAGE_3_COLUMN] = form.cardImage3.trim();
    if (form.cardImage4.trim()) payload[TEMPLATE_CARD_IMAGE_4_COLUMN] = form.cardImage4.trim();

    if (TEMPLATE_WHATSAPP_COLUMN && form.whatsappMessage.trim()) {
      payload[TEMPLATE_WHATSAPP_COLUMN] = form.whatsappMessage.trim();
    }

    setIsSubmitting(true);
    try {
      if (!session) {
        throw new Error("Please login as admin.");
      }

      let activeSession = session;
      let authUser;
      try {
        authUser = await getUserFromAccessToken(activeSession.access_token);
      } catch {
        activeSession = await refreshSession(activeSession.refresh_token);
        setSession(activeSession);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(activeSession));
        }
        authUser = await getUserFromAccessToken(activeSession.access_token);
      }

      const hasAdminAccess = await isAdminUser(activeSession.access_token, authUser.id);
      if (!hasAdminAccess) {
        throw new Error(
          `Logged-in user ${authUser.id} is not present in admin_users. Add this exact user_id in Supabase.`,
        );
      }

      if (editingId) {
        await updateProductTemplate(editingId, payload, activeSession.access_token);
        setFeedback({ type: "ok", message: "Template updated successfully." });
      } else {
        await insertProductTemplate(payload, activeSession.access_token);
        setFeedback({ type: "ok", message: "Template saved to ProductTemplate." });
      }
      resetFormOnly();
      await loadTemplates();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to save template.";
      setFeedback({ type: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!session || !isAdminAuthorized) {
      setFeedback({ type: "error", message: "Only admin can delete templates." });
      return;
    }
    const confirmed = window.confirm("Delete this template?");
    if (!confirmed) return;

    setIsSubmitting(true);
    setFeedback(null);
    try {
      await deleteProductTemplate(id, session.access_token);
      if (editingId === id) {
        resetFormOnly();
      }
      setFeedback({ type: "ok", message: "Template deleted successfully." });
      await loadTemplates();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to delete template.";
      setFeedback({ type: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-28 pb-10">
        <section className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-white p-6 md:p-8 shadow-card">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Admin Product Template Form</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Add a row in Supabase <code>ProductTemplate</code>. All Fields are required.
            </p>

            {!hasSupabaseConfig && (
              <p className="mt-4 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
                Supabase is not configured. Set <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code>.
              </p>
            )}

            {!isUnlocked && (
              <form onSubmit={unlockAdmin} className="mt-6 space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="admin-key">Admin Key</Label>
                  <Input
                    id="admin-key"
                    type="password"
                    value={form.adminKey}
                    onChange={(e) => updateField("adminKey", e.target.value)}
                    placeholder="Enter admin key"
                  />
                </div>
                <Button type="submit">Unlock Form</Button>
                {!keyConfigured && (
                  <p className="text-xs text-amber-700">
                    Admin key not configured. Set <code>VITE_ADMIN_FORM_KEY</code> in your env for access control.
                  </p>
                )}
              </form>
            )}

            <form onSubmit={handleLogin} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email">Admin Email</Label>
                <Input
                  id="admin-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="admin@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password">Admin Password</Label>
                <Input
                  id="admin-password"
                  type="password"
                  value={form.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="md:col-span-2 flex items-center gap-3">
                <Button type="submit" disabled={!hasSupabaseConfig || isLoggingIn}>
                  {isLoggingIn ? "Logging in..." : session ? "Re-login" : "Login as Admin"}
                </Button>
                {session && (
                  <>
                    <p className="text-sm text-green-700">
                      Logged in: {session.user.email ?? session.user.id}
                    </p>
                    <Button type="button" variant="outline" onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                )}
              </div>
              {feedback && (
                  <p
                    className={`rounded-md px-3 py-2 text-sm ${
                      feedback.type === "ok"
                        ? "border border-green-300 bg-green-50 text-green-700"
                        : "border border-red-300 bg-red-50 text-red-700"
                    }`}
                  >
                    {feedback.message}
                  </p>
                )}
            </form>

            {isUnlocked && (
              <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={form.title}
                      onChange={(e) => updateField("title", e.target.value)}
                      placeholder="Template title"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="categoryName">Category Name *</Label>
                    <select
                      id="categoryName"
                      value={form.categoryName}
                      onChange={(e) => {
                        const selectedName = e.target.value;
                        const matched = categories.find((item) => item.name === selectedName);
                        setForm((prev) => ({
                          ...prev,
                          categoryName: selectedName,
                          categoryId: matched?.id ?? "",
                        }));
                      }}
                      required
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    >
                      <option value="">
                        {isLoadingCategories ? "Loading categories..." : "Select category"}
                      </option>
                      {categories.map((item) => (
                        <option key={`${item.id}-${item.name}`} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="categoryId">Category ID *</Label>
                    <Input
                      id="categoryId"
                      value={form.categoryId}
                      onChange={(e) => updateField("categoryId", e.target.value)}
                      placeholder="1"
                      required
                      readOnly
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={form.price}
                      onChange={(e) => updateField("price", e.target.value)}
                      placeholder="999"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="originalPrice">Original Price *</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      value={form.originalPrice}
                      onChange={(e) => updateField("originalPrice", e.target.value)}
                      placeholder="1499"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subtitle">Subtitle *</Label>
                    <Input
                      id="subtitle"
                      value={form.subtitle}
                      onChange={(e) => updateField("subtitle", e.target.value)}
                      placeholder="Delivered in 48 hrs"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="heading">Heading *</Label>
                    <Input
                      id="heading"
                      value={form.heading}
                      onChange={(e) => updateField("heading", e.target.value)}
                      placeholder="Premium Invite"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="videoUrl">Video URL *</Label>
                    <Input
                      id="videoUrl"
                      value={form.videoUrl}
                      onChange={(e) => updateField("videoUrl", e.target.value)}
                      placeholder="https://..."
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="imageUrl">Primary Image URL *</Label>
                    <Input
                      id="imageUrl"
                      value={form.imageUrl}
                      onChange={(e) => updateField("imageUrl", e.target.value)}
                      placeholder="https://..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardImage1">Card Image 1 *</Label>
                    <Input
                      id="cardImage1"
                      value={form.cardImage1}
                      onChange={(e) => updateField("cardImage1", e.target.value)}
                      placeholder="https://..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardImage2">Card Image 2 *</Label>
                    <Input
                      id="cardImage2"
                      value={form.cardImage2}
                      onChange={(e) => updateField("cardImage2", e.target.value)}
                      placeholder="https://..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardImage3">Card Image 3 *</Label>
                    <Input
                      id="cardImage3"
                      value={form.cardImage3}
                      onChange={(e) => updateField("cardImage3", e.target.value)}
                      placeholder="https://..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardImage4">Card Image 4 *</Label>
                    <Input
                      id="cardImage4"
                      value={form.cardImage4}
                      onChange={(e) => updateField("cardImage4", e.target.value)}
                      placeholder="https://..."
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    placeholder="Template description"
                    rows={4}
                    required
                  />
                </div>

                {TEMPLATE_WHATSAPP_COLUMN && (
                  <div className="space-y-2">
                    <Label htmlFor="whatsappMessage">WhatsApp Message *</Label>
                    <Textarea
                      id="whatsappMessage"
                      value={form.whatsappMessage}
                      onChange={(e) => updateField("whatsappMessage", e.target.value)}
                      placeholder="Hi! I want to order this design"
                      rows={3}
                      required
                    />
                  </div>
                )}

                

                <div className="flex flex-wrap gap-3">
                  <Button type="submit" disabled={isSubmitting || !hasSupabaseConfig || !session?.access_token}>
                    {isSubmitting ? (editingId ? "Updating..." : "Saving...") : (editingId ? "Update Template" : "Save Template")}
                  </Button>
                  {editingId && (
                    <Button type="button" variant="outline" onClick={resetFormOnly} disabled={isSubmitting}>
                      Cancel Edit
                    </Button>
                  )}
                </div>
              </form>
            )}

            {isUnlocked && (
              <div className="mt-10">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold text-foreground">Product Templates</h2>
                  <Button type="button" variant="outline" onClick={() => void loadTemplates()} disabled={isLoadingTemplates}>
                    {isLoadingTemplates ? "Refreshing..." : "Refresh"}
                  </Button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="min-w-full text-sm">
                    <thead className="bg-secondary/40">
                      <tr>
                        <th className="px-3 py-2 text-left">ID</th>
                        <th className="px-3 py-2 text-left">Title</th>
                        <th className="px-3 py-2 text-left">Category</th>
                        <th className="px-3 py-2 text-left">Price</th>
                        <th className="px-3 py-2 text-left">Video URL</th>
                        <th className="px-3 py-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {templates.map((row) => {
                        const rowId = toFormString(row[TEMPLATE_ID_COLUMN]);
                        return (
                          <tr key={rowId || JSON.stringify(row)} className="border-t border-border">
                            <td className="px-3 py-2">{rowId || "-"}</td>
                            <td className="px-3 py-2">{toFormString(row[TEMPLATE_TITLE_COLUMN]) || "-"}</td>
                            <td className="px-3 py-2">{toFormString(row[TEMPLATE_CATEGORY_NAME_COLUMN]) || "-"}</td>
                            <td className="px-3 py-2">{toFormString(row[TEMPLATE_PRICE_COLUMN]) || "-"}</td>
                            <td className="px-3 py-2 max-w-[220px] truncate">{toFormString(row[TEMPLATE_VIDEO_COLUMN]) || "-"}</td>
                            <td className="px-3 py-2">
                              {isAdminAuthorized && rowId ? (
                                <div className="flex gap-2">
                                  <Button type="button" size="sm" variant="outline" onClick={() => startEdit(row)}>
                                    Edit
                                  </Button>
                                  <Button type="button" size="sm" variant="destructive" onClick={() => void handleDelete(rowId)} disabled={isSubmitting}>
                                    Delete
                                  </Button>
                                </div>
                              ) : (
                                <span className="text-xs text-muted-foreground">Login as admin to edit/delete</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                      {!isLoadingTemplates && templates.length === 0 && (
                        <tr>
                          <td className="px-3 py-4 text-muted-foreground" colSpan={6}>
                            No templates found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AdminTemplateForm;
