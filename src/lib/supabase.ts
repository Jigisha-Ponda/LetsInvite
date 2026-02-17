const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

export const buildSupabaseRestUrl = (path: string, query?: URLSearchParams) => {
  if (!supabaseUrl) {
    throw new Error("Missing VITE_SUPABASE_URL");
  }
  if (!supabaseAnonKey) {
    throw new Error("Missing VITE_SUPABASE_ANON_KEY");
  }

  const url = new URL(`/rest/v1/${path}`, supabaseUrl);
  const params = query ? new URLSearchParams(query) : new URLSearchParams();
  params.set("apikey", supabaseAnonKey);
  url.search = params.toString();
  return url.toString();
};

export const getSupabaseHeaders = () => {
  if (!supabaseAnonKey) {
    throw new Error("Missing VITE_SUPABASE_ANON_KEY");
  }

  return {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`,
    "Content-Type": "application/json",
  };
};

export const getSupabaseApiKey = () => {
  if (!supabaseAnonKey) {
    throw new Error("Missing VITE_SUPABASE_ANON_KEY");
  }
  return supabaseAnonKey;
};

export const getSupabaseAuthUrl = (path: string) => {
  if (!supabaseUrl) {
    throw new Error("Missing VITE_SUPABASE_URL");
  }
  if (!supabaseAnonKey) {
    throw new Error("Missing VITE_SUPABASE_ANON_KEY");
  }

  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`/auth/v1${cleanPath}`, supabaseUrl);
  url.searchParams.set("apikey", supabaseAnonKey);
  return url.toString();
};

export type SupabaseAuthSession = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: {
    id: string;
    email?: string;
  };
};

export type SupabaseAuthUser = {
  id: string;
  email?: string;
  role?: string;
};

export const signInWithPassword = async (email: string, password: string) => {
  const response = await fetch(getSupabaseAuthUrl("/token?grant_type=password"), {
    method: "POST",
    headers: getSupabaseHeaders(),
    body: JSON.stringify({ email, password }),
  });

  const body = await response.json();
  if (!response.ok) {
    const message = typeof body?.error_description === "string"
      ? body.error_description
      : "Login failed.";
    throw new Error(message);
  }

  return body as SupabaseAuthSession;
};

export const getUserFromAccessToken = async (accessToken: string) => {
  if (!accessToken) {
    throw new Error("Missing access token.");
  }

  const response = await fetch(getSupabaseAuthUrl("/user"), {
    method: "GET",
    headers: {
      apikey: getSupabaseApiKey(),
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const body = await response.json();
  if (!response.ok) {
    const message =
      typeof body?.msg === "string"
        ? body.msg
        : typeof body?.message === "string"
          ? body.message
          : "Unable to fetch auth user.";
    throw new Error(message);
  }

  return body as SupabaseAuthUser;
};

export const refreshSession = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new Error("Missing refresh token.");
  }

  const response = await fetch(getSupabaseAuthUrl("/token?grant_type=refresh_token"), {
    method: "POST",
    headers: getSupabaseHeaders(),
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  const body = await response.json();
  if (!response.ok) {
    const message =
      typeof body?.error_description === "string"
        ? body.error_description
        : "Session refresh failed.";
    throw new Error(message);
  }

  return body as SupabaseAuthSession;
};

export const isAdminUser = async (accessToken: string, userId: string) => {
  const query = new URLSearchParams({
    select: "user_id",
    user_id: `eq.${userId}`,
    limit: "1",
  });

  const response = await fetch(buildSupabaseRestUrl("admin_users", query), {
    method: "GET",
    headers: {
      apikey: getSupabaseApiKey(),
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || "Unable to verify admin access.");
  }

  const rows = (await response.json()) as Array<{ user_id: string }>;
  return rows.length > 0;
};
