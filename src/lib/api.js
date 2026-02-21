const API_BASE = "https://api.slicenshare.com";

export const API = {
  // v1 Auth (email/OTP)
  SIGNUP: `${API_BASE}/api/v1/auth/users/signup`,
  SIGNUP_VERIFY: `${API_BASE}/api/v1/auth/users/signup/verify`,
  LOGIN: `${API_BASE}/api/v1/auth/users/login`,
  LOGIN_VERIFY: `${API_BASE}/api/v1/auth/users/login/verify`,
  REFRESH_TOKEN: `${API_BASE}/api/v1/auth/users/refresh-token`,
  LOGOUT: `${API_BASE}/api/v1/auth/users/logout`,
  LOGOUT_ALL: `${API_BASE}/api/v1/auth/users/logout-all`,

  // v1 Firebase (Google)
  FIREBASE_AUTH: `${API_BASE}/api/v1/auth/firebase`,
  FIREBASE_REFRESH: `${API_BASE}/api/v1/auth/refresh`,
  FIREBASE_LOGOUT: `${API_BASE}/api/v1/auth/logout`,

  // v2 Profile
  PROFILE: `${API_BASE}/api/v2/auth/me`,

  // Events
  EVENT_INTERESTED: `${API_BASE}/api/v1/events/event-interested`,
};

/**
 * Make an authenticated API request
 */
export async function authFetch(url, options = {}) {
  const tokens = getTokens();
  if (!tokens?.accessToken) {
    throw new Error("Not authenticated");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${tokens.accessToken}`,
    ...options.headers,
  };

  let res = await fetch(url, { ...options, headers });

  // If 401, try refreshing the token
  if (res.status === 401) {
    const refreshed = await refreshAccessToken(tokens);
    if (refreshed) {
      headers.Authorization = `Bearer ${refreshed.accessToken}`;
      res = await fetch(url, { ...options, headers });
    } else {
      clearTokens();
      throw new Error("Session expired");
    }
  }

  return res;
}

/**
 * Token storage in memory + sessionStorage for persistence across page loads
 * We use sessionStorage (not localStorage) for security - tokens cleared when tab closes
 */
let memoryTokens = null;

export function getTokens() {
  if (memoryTokens) return memoryTokens;
  if (typeof window === "undefined") return null;
  try {
    const stored = sessionStorage.getItem("sns_auth_tokens");
    if (stored) {
      memoryTokens = JSON.parse(stored);
      return memoryTokens;
    }
  } catch {
    // ignore
  }
  return null;
}

export function setTokens(tokens) {
  memoryTokens = tokens;
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem("sns_auth_tokens", JSON.stringify(tokens));
    } catch {
      // ignore
    }
  }
}

export function clearTokens() {
  memoryTokens = null;
  if (typeof window !== "undefined") {
    try {
      sessionStorage.removeItem("sns_auth_tokens");
      sessionStorage.removeItem("sns_user");
    } catch {
      // ignore
    }
  }
}

export function getStoredUser() {
  if (typeof window === "undefined") return null;
  try {
    const stored = sessionStorage.getItem("sns_user");
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return null;
}

export function setStoredUser(user) {
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem("sns_user", JSON.stringify(user));
    } catch {
      // ignore
    }
  }
}

/**
 * Refresh the access token using the refresh token
 */
async function refreshAccessToken(tokens) {
  try {
    // Determine which refresh endpoint to use based on the token source
    const authMethod = getStoredUser()?.authMethod;
    const url =
      authMethod === "firebase" ? API.FIREBASE_REFRESH : API.REFRESH_TOKEN;

    const body =
      authMethod === "firebase"
        ? { refreshToken: tokens.refreshToken }
        : { refreshToken: tokens.refreshToken };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) return null;

    const data = await res.json();
    const newTokens = {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
    setTokens(newTokens);
    return newTokens;
  } catch {
    return null;
  }
}
