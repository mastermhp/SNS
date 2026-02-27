// All calls go through /api/proxy/[...path] which forwards to https://api.slicenshare.com/api/*
const P = "/api/proxy";

export const API = {
  // v1 Auth (email/OTP)
  SIGNUP:         `${P}/v1/auth/users/signup`,
  SIGNUP_VERIFY:  `${P}/v1/auth/users/signup/verify`,
  LOGIN:          `${P}/v1/auth/users/login`,
  LOGIN_VERIFY:   `${P}/v1/auth/users/login/verify`,
  SET_PASSWORD:   `${P}/v1/auth/users/set-password`,
  REFRESH_TOKEN:  `${P}/v1/auth/users/refresh-token`,
  LOGOUT:         `${P}/v1/auth/users/logout`,
  LOGOUT_ALL:     `${P}/v1/auth/users/logout-all`,

  // v1 Firebase (Google)
  FIREBASE_AUTH:    `${P}/v1/auth/firebase`,
  FIREBASE_REFRESH: `${P}/v1/auth/refresh`,
  FIREBASE_LOGOUT:  `${P}/v1/auth/logout`,

  // v2 Profile
  PROFILE: `${P}/v2/auth/me`,

  // Events
  EVENT_INTERESTED: `${P}/v1/events/event-interested`,
};

/**
 * Make an authenticated API request with automatic token refresh on 401
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
    console.log("[v0] Access token expired, attempting refresh...");
    const refreshed = await refreshAccessToken(tokens);
    if (refreshed) {
      console.log("[v0] Token refreshed successfully");
      headers.Authorization = `Bearer ${refreshed.accessToken}`;
      res = await fetch(url, { ...options, headers });
    } else {
      console.log("[v0] Token refresh failed, clearing session");
      clearTokens();
      throw new Error("Session expired. Please login again.");
    }
  }

  return res;
}

/**
 * Token storage in memory + sessionStorage for persistence across page loads
 * sessionStorage clears when the tab closes for better security
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
      console.log("[v0] Tokens stored in sessionStorage");
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
      console.log("[v0] Tokens and user data cleared from sessionStorage");
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
 * Uses different endpoints for email vs firebase auth methods
 */
async function refreshAccessToken(tokens) {
  try {
    const authMethod = getStoredUser()?.authMethod;
    const url =
      authMethod === "firebase" ? API.FIREBASE_REFRESH : API.REFRESH_TOKEN;

    console.log(`[v0] Refreshing token via ${authMethod === "firebase" ? "Firebase" : "Email"} endpoint: ${url}`);

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: tokens.refreshToken }),
    });

    if (!res.ok) {
      console.log("[v0] Token refresh response not OK:", res.status);
      return null;
    }

    const data = await res.json();
    console.log("[v0] Token refresh response data:", { hasAccessToken: !!data.accessToken, hasRefreshToken: !!data.refreshToken });
    
    const newTokens = {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
    setTokens(newTokens);
    return newTokens;
  } catch (err) {
    console.error("[v0] Token refresh error:", err);
    return null;
  }
}
