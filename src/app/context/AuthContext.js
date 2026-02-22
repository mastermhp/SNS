"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  API,
  getTokens,
  setTokens,
  clearTokens,
  getStoredUser,
  setStoredUser,
  authFetch,
} from "@/lib/api";

const AuthContext = createContext(null);

export { AuthContext };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from storage on mount
  useEffect(() => {
    const storedUser = getStoredUser();
    const tokens = getTokens();
    console.log("[v0] AuthProvider init - stored user:", storedUser?.email, "has tokens:", !!tokens?.accessToken);
    if (storedUser && tokens?.accessToken) {
      setUser(storedUser);
      // Fetch fresh profile in background
      fetchProfile().catch((err) => {
        console.log("[v0] Background profile fetch failed, keeping stored user:", err.message);
      });
    }
    setLoading(false);
  }, []);

  /**
   * Fetch user profile from API (GET /api/v2/auth/me)
   */
  const fetchProfile = useCallback(async () => {
    try {
      console.log("[v0] Fetching profile from:", API.PROFILE);
      const res = await authFetch(API.PROFILE);
      const data = await res.json();
      console.log("[v0] Profile API response:", JSON.stringify(data, null, 2));

      if (res.ok) {
        const userData = data.data || data;
        const userObj = {
          id: userData.id || userData._id,
          email: userData.email,
          fullName: userData.fullName || userData.name || "",
          phone: userData.phone || "",
          avatar: userData.avatar || "",
          authMethod: userData.authMethod || getStoredUser()?.authMethod || "email",
          firebaseUid: userData.firebaseUid || getStoredUser()?.firebaseUid || null,
        };
        console.log("[v0] Profile parsed user object:", userObj);
        setUser(userObj);
        setStoredUser(userObj);
        return userObj;
      } else {
        console.log("[v0] Profile fetch failed with status:", res.status, data);
      }
    } catch (err) {
      console.error("[v0] Profile fetch error:", err.message);
    }
    return null;
  }, []);

  // ============================================
  // EMAIL/OTP AUTH METHODS
  // ============================================

  /**
   * Email/OTP Login: Step 1 - Send OTP
   * POST /api/v1/auth/users/login  body: { email }
   */
  const loginSendOTP = useCallback(async (email) => {
    setError(null);
    console.log("[v0] Login - sending OTP to:", email);
    const res = await fetch(API.LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    console.log("[v0] Login send OTP response:", JSON.stringify(data, null, 2));
    if (!res.ok) {
      const msg = data.message || "Failed to send OTP";
      setError(msg);
      throw new Error(msg);
    }
    return data;
  }, []);

  /**
   * Email/OTP Login: Step 2 - Verify OTP
   * POST /api/v1/auth/users/login/verify  body: { email, otp }
   */
  const loginVerifyOTP = useCallback(async (email, otp) => {
    setError(null);
    console.log("[v0] Login - verifying OTP for:", email);
    const res = await fetch(API.LOGIN_VERIFY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();
    console.log("[v0] Login verify OTP response:", JSON.stringify(data, null, 2));
    if (!res.ok) {
      const msg = data.message || "Invalid OTP";
      setError(msg);
      throw new Error(msg);
    }

    // Extract tokens - handle nested response: data.data.tokens or data.tokens or top-level
    const nestedData = data.data || data;
    const tokens = nestedData.tokens || data.tokens || { accessToken: data.accessToken, refreshToken: data.refreshToken };
    console.log("[v0] Login tokens received - accessToken:", tokens.accessToken?.substring(0, 20) + "...", "refreshToken:", tokens.refreshToken?.substring(0, 20) + "...");
    setTokens(tokens);

    const userObj = {
      id: nestedData.id || nestedData._id || data.user?.id || data.id,
      email: nestedData.email || data.user?.email || email,
      fullName: nestedData.fullName || nestedData.name || data.user?.fullName || "",
      phone: nestedData.phone || data.user?.phone || "",
      avatar: nestedData.avatar || data.user?.avatar || "",
      authMethod: nestedData.authMethod || "email",
    };
    console.log("[v0] Login user object:", userObj);
    setUser(userObj);
    setStoredUser(userObj);

    // Fetch full profile in background
    fetchProfile().catch(() => {});

    return { user: userObj, tokens };
  }, [fetchProfile]);

  /**
   * Email/OTP Signup: Step 1 - Send OTP
   * POST /api/v1/auth/users/signup  body: { email, phone }
   */
  const signupSendOTP = useCallback(async (email, phone) => {
    setError(null);
    console.log("[v0] Signup - sending OTP to:", email, "phone:", phone);
    const body = { email };
    if (phone) body.phone = phone;
    console.log("[v0] Signup - POST URL:", API.SIGNUP, "body:", JSON.stringify(body));
    const res = await fetch(API.SIGNUP, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    console.log("[v0] Signup - response status:", res.status, "statusText:", res.statusText);
    const text = await res.text();
    console.log("[v0] Signup - raw response body:", text);
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text || `Server error (${res.status})` };
    }
    console.log("[v0] Signup send OTP response:", JSON.stringify(data, null, 2));
    if (!res.ok) {
      const msg = data.message || "Failed to send OTP";
      setError(msg);
      throw new Error(msg);
    }
    return data;
  }, []);

  /**
   * Email/OTP Signup: Step 2 - Verify OTP
   * POST /api/v1/auth/users/signup/verify  body: { email, otp }
   */
  const signupVerifyOTP = useCallback(async (email, otp) => {
    setError(null);
    console.log("[v0] Signup - verifying OTP for:", email);
    const res = await fetch(API.SIGNUP_VERIFY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();
    console.log("[v0] Signup verify OTP response:", JSON.stringify(data, null, 2));
    if (!res.ok) {
      const msg = data.message || "Invalid OTP";
      setError(msg);
      throw new Error(msg);
    }

    // Extract tokens - handle nested response: data.data.tokens or data.tokens or top-level
    const nestedData = data.data || data;
    const tokens = nestedData.tokens || data.tokens || { accessToken: data.accessToken, refreshToken: data.refreshToken };
    console.log("[v0] Signup tokens received - accessToken:", tokens.accessToken?.substring(0, 20) + "...", "refreshToken:", tokens.refreshToken?.substring(0, 20) + "...");
    setTokens(tokens);

    const userObj = {
      id: nestedData.id || nestedData._id || data.user?.id || data.id,
      email: nestedData.email || data.user?.email || email,
      fullName: nestedData.fullName || nestedData.name || data.user?.fullName || "",
      phone: nestedData.phone || data.user?.phone || "",
      avatar: nestedData.avatar || data.user?.avatar || "",
      authMethod: nestedData.authMethod || "email",
    };
    console.log("[v0] Signup user object:", userObj);
    setUser(userObj);
    setStoredUser(userObj);

    // Fetch full profile in background
    fetchProfile().catch(() => {});

    return { user: userObj, tokens };
  }, [fetchProfile]);

  // ============================================
  // GOOGLE / FIREBASE AUTH
  // ============================================

  /**
   * Google Sign-In via Firebase
   * 1. signInWithPopup(Firebase) -> get idToken
   * 2. POST /api/v1/auth/firebase { idToken } -> get our tokens + user
   */
  const loginWithGoogle = useCallback(async () => {
    setError(null);
    console.log("[v0] Starting Google sign-in via Firebase...");

    const { auth } = await import("@/lib/firebase");
    const { signInWithPopup, GoogleAuthProvider } = await import("firebase/auth");

    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();
    console.log("[v0] Firebase ID token obtained, exchanging with API...");
    console.log("[v0] Firebase user email:", result.user.email, "displayName:", result.user.displayName);

    // Exchange Firebase token for our API tokens
    const res = await fetch(API.FIREBASE_AUTH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });

    const data = await res.json();
    console.log("[v0] Firebase auth API response:", JSON.stringify(data, null, 2));

    if (!res.ok) {
      const msg = data.message || "Google sign-in failed";
      setError(msg);
      throw new Error(msg);
    }

    // Store tokens
    const tokens = {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
    console.log("[v0] Google auth tokens received - accessToken:", tokens.accessToken?.substring(0, 20) + "...");
    setTokens(tokens);

    // Build user object
    const userObj = {
      id: data.user?.id || data.user?._id,
      email: data.user?.email || result.user.email,
      fullName: data.user?.name || result.user.displayName || "",
      phone: data.user?.phone || "",
      avatar: data.user?.avatar || result.user.photoURL || "",
      firebaseUid: data.user?.firebaseUid,
      authMethod: "firebase",
      isNewUser: data.isNewUser,
      provider: data.provider,
      linkedProviders: data.linkedProviders,
    };
    console.log("[v0] Google auth user object:", userObj);
    setUser(userObj);
    setStoredUser(userObj);

    return { user: userObj, tokens, isNewUser: data.isNewUser };
  }, []);

  // ============================================
  // LOGOUT
  // ============================================

  /**
   * Logout from current device
   * - Firebase users: POST /api/v1/auth/logout { refreshToken }
   * - Email users: POST /api/v1/auth/users/logout (Bearer token)
   */
  const logout = useCallback(async () => {
    const tokens = getTokens();
    const storedUser = getStoredUser();
    console.log("[v0] Logging out - authMethod:", storedUser?.authMethod);

    if (tokens?.refreshToken) {
      try {
        if (storedUser?.authMethod === "firebase") {
          console.log("[v0] Logging out via Firebase endpoint");
          await fetch(API.FIREBASE_LOGOUT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken: tokens.refreshToken }),
          });
        } else {
          console.log("[v0] Logging out via email endpoint");
          await fetch(API.LOGOUT, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokens.accessToken}`,
            },
          });
        }
        console.log("[v0] Logout API call successful");
      } catch (err) {
        console.error("[v0] Logout API error (continuing with local logout):", err.message);
      }
    }

    // Sign out from Firebase if applicable
    try {
      const { auth } = await import("@/lib/firebase");
      const { signOut } = await import("firebase/auth");
      await signOut(auth);
      console.log("[v0] Firebase sign-out complete");
    } catch {
      // ignore
    }

    clearTokens();
    setUser(null);
    setError(null);
    console.log("[v0] Local session cleared");
  }, []);

  /**
   * Logout from all devices
   * POST /api/v1/auth/users/logout-all (Bearer token)
   */
  const logoutAll = useCallback(async () => {
    const tokens = getTokens();
    console.log("[v0] Logging out from all devices...");

    if (tokens?.accessToken) {
      try {
        const res = await fetch(API.LOGOUT_ALL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens.accessToken}`,
          },
        });
        const data = await res.json();
        console.log("[v0] Logout all response:", data);
      } catch (err) {
        console.error("[v0] Logout all error:", err.message);
      }
    }

    // Sign out from Firebase
    try {
      const { auth } = await import("@/lib/firebase");
      const { signOut } = await import("firebase/auth");
      await signOut(auth);
    } catch {
      // ignore
    }

    clearTokens();
    setUser(null);
    setError(null);
    console.log("[v0] All device logout complete, local session cleared");
  }, []);

  // ============================================
  // PROFILE MANAGEMENT
  // ============================================

  /**
   * Update user profile
   * PUT /api/v2/auth/me  body: { fullName?, phone? }
   */
  const updateProfile = useCallback(async (updates) => {
    setError(null);
    console.log("[v0] Updating profile with:", updates);
    const res = await authFetch(API.PROFILE, {
      method: "PUT",
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    console.log("[v0] Update profile response:", JSON.stringify(data, null, 2));
    if (!res.ok) {
      const msg = data.message || "Failed to update profile";
      setError(msg);
      throw new Error(msg);
    }
    // Refresh the profile data
    await fetchProfile();
    return data;
  }, [fetchProfile]);

  const value = {
    // State
    user,
    loading,
    error,
    isAuthenticated: !!user,

    // Email/OTP methods (matching API naming)
    loginSendOTP,
    loginVerifyOTP,
    signupSendOTP,
    signupVerifyOTP,

    // Aliases used by AuthModal
    loginWithEmail: loginSendOTP,
    verifyLoginOTP: loginVerifyOTP,
    signupWithEmail: signupSendOTP,
    verifySignupOTP: signupVerifyOTP,

    // Google/Firebase
    loginWithGoogle,
    signInWithGoogle: loginWithGoogle, // alias

    // Logout
    logout,
    logoutAll,

    // Profile
    fetchProfile,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
