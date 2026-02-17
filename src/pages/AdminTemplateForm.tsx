import { FormEvent, useMemo, useState } from "react";
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
  TEMPLATE_CATEGORY_ID_COLUMN,
  TEMPLATE_CATEGORY_NAME_COLUMN,
  TEMPLATE_DESCRIPTION_COLUMN,
  TEMPLATE_HEADING_COLUMN,
  TEMPLATE_IMAGE_COLUMN,
  TEMPLATE_ORIGINAL_PRICE_COLUMN,
  TEMPLATE_PRICE_COLUMN,
  TEMPLATE_SUBTITLE_COLUMN,
  TEMPLATE_TITLE_COLUMN,
  TEMPLATE_VIDEO_COLUMN,
  TEMPLATE_WHATSAPP_COLUMN,
  insertProductTemplate,
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

  const keyConfigured = useMemo(() => Boolean(ADMIN_FORM_KEY), []);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

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
      setSession(nextSession);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(nextSession));
      }
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
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(ADMIN_SESSION_KEY);
    }
    setFeedback({ type: "ok", message: "Logged out." });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFeedback(null);

    if (!form.title.trim() || !form.categoryName.trim()) {
      setFeedback({ type: "error", message: "Title and Category Name are required." });
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

      await insertProductTemplate(payload, activeSession.access_token);
      setFeedback({ type: "ok", message: "Template saved to ProductTemplate." });
      setForm((prev) => ({
        ...initialState,
        adminKey: prev.adminKey,
        email: prev.email,
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to save template.";
      setFeedback({ type: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <section className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 md:p-8 shadow-card">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Admin Product Template Form</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Add a row in Supabase <code>ProductTemplate</code>. Required: Title, Category Name.
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
                    <Input
                      id="categoryName"
                      value={form.categoryName}
                      onChange={(e) => updateField("categoryName", e.target.value)}
                      placeholder="Birthday"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="categoryId">Category ID</Label>
                    <Input
                      id="categoryId"
                      value={form.categoryId}
                      onChange={(e) => updateField("categoryId", e.target.value)}
                      placeholder="1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      value={form.price}
                      onChange={(e) => updateField("price", e.target.value)}
                      placeholder="999"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="originalPrice">Original Price</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      value={form.originalPrice}
                      onChange={(e) => updateField("originalPrice", e.target.value)}
                      placeholder="1499"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subtitle">Subtitle</Label>
                    <Input
                      id="subtitle"
                      value={form.subtitle}
                      onChange={(e) => updateField("subtitle", e.target.value)}
                      placeholder="Delivered in 48 hrs"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="heading">Heading</Label>
                    <Input
                      id="heading"
                      value={form.heading}
                      onChange={(e) => updateField("heading", e.target.value)}
                      placeholder="Premium Invite"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="videoUrl">Video URL</Label>
                    <Input
                      id="videoUrl"
                      value={form.videoUrl}
                      onChange={(e) => updateField("videoUrl", e.target.value)}
                      placeholder="https://..."
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="imageUrl">Primary Image URL</Label>
                    <Input
                      id="imageUrl"
                      value={form.imageUrl}
                      onChange={(e) => updateField("imageUrl", e.target.value)}
                      placeholder="https://..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardImage1">Card Image 1</Label>
                    <Input
                      id="cardImage1"
                      value={form.cardImage1}
                      onChange={(e) => updateField("cardImage1", e.target.value)}
                      placeholder="https://..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardImage2">Card Image 2</Label>
                    <Input
                      id="cardImage2"
                      value={form.cardImage2}
                      onChange={(e) => updateField("cardImage2", e.target.value)}
                      placeholder="https://..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardImage3">Card Image 3</Label>
                    <Input
                      id="cardImage3"
                      value={form.cardImage3}
                      onChange={(e) => updateField("cardImage3", e.target.value)}
                      placeholder="https://..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardImage4">Card Image 4</Label>
                    <Input
                      id="cardImage4"
                      value={form.cardImage4}
                      onChange={(e) => updateField("cardImage4", e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    placeholder="Template description"
                    rows={4}
                  />
                </div>

                {TEMPLATE_WHATSAPP_COLUMN && (
                  <div className="space-y-2">
                    <Label htmlFor="whatsappMessage">WhatsApp Message</Label>
                    <Textarea
                      id="whatsappMessage"
                      value={form.whatsappMessage}
                      onChange={(e) => updateField("whatsappMessage", e.target.value)}
                      placeholder="Hi! I want to order this design"
                      rows={3}
                    />
                  </div>
                )}

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

                <Button type="submit" disabled={isSubmitting || !hasSupabaseConfig || !session?.access_token}>
                  {isSubmitting ? "Saving..." : "Save Template"}
                </Button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AdminTemplateForm;
