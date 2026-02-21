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

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from storage on mount
  useEffect(() => {
    const storedUser = getStoredUser();
    const tokens = getTokens();
    if (storedUser && tokens?.accessToken) {
      setUser(storedUser);
      // Optionally fetch fresh profile
      fetchProfile().catch(() => {
        // If profile fetch fails, keep stored user data
      });
    }
    setLoading(false);
  }, []);

  /**
   * Fetch user profile from API
   */
  const fetchProfile = useCallback(async () => {
    try {
      const res = await authFetch(API.PROFILE);
      if (res.ok) {
        const data = await res.json();
        const userData = data.data || data;
        const userObj = {
          id: userData.id || userData._id,
          email: userData.email,
          fullName: userData.fullName || userData.name,
          phone: userData.phone,
          avatar: userData.avatar,
          authMethod: userData.authMethod || getStoredUser()?.authMethod || "email",
        };
        setUser(userObj);
        setStoredUser(userObj);
        return userObj;
      }
    } catch {
      // ignore - will use stored user
    }
    return null;
  }, []);

  /**
   * Email/OTP Login: Step 1 - Send OTP
   */
  const loginSendOTP = useCallback(async (email) => {
    const res = await fetch(API.LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to send OTP");
    }
    return data;
  }, []);

  /**
   * Email/OTP Login: Step 2 - Verify OTP
   */
  const loginVerifyOTP = useCallback(async (email, otp) => {
    const res = await fetch(API.LOGIN_VERIFY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Invalid OTP");
    }

    // Store tokens and user
    const tokens = data.tokens || { accessToken: data.accessToken, refreshToken: data.refreshToken };
    setTokens(tokens);

    const userObj = {
      id: data.user?.id || data.user?._id || data.id,
      email: data.user?.email || email,
      fullName: data.user?.fullName || data.user?.name || "",
      phone: data.user?.phone || "",
      avatar: data.user?.avatar || "",
      authMethod: "email",
    };
    setUser(userObj);
    setStoredUser(userObj);

    return { user: userObj, tokens };
  }, []);

  /**
   * Email/OTP Signup: Step 1 - Send OTP
   */
  const signupSendOTP = useCallback(async (email, phone) => {
    const res = await fetch(API.SIGNUP, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, phone }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to send OTP");
    }
    return data;
  }, []);

  /**
   * Email/OTP Signup: Step 2 - Verify OTP
   */
  const signupVerifyOTP = useCallback(async (email, otp) => {
    const res = await fetch(API.SIGNUP_VERIFY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Invalid OTP");
    }

    // Store tokens and user
    const tokens = data.tokens || { accessToken: data.accessToken, refreshToken: data.refreshToken };
    setTokens(tokens);

    const userObj = {
      id: data.user?.id || data.user?._id || data.id,
      email: data.user?.email || email,
      fullName: data.user?.fullName || data.user?.name || "",
      phone: data.user?.phone || "",
      avatar: data.user?.avatar || "",
      authMethod: "email",
    };
    setUser(userObj);
    setStoredUser(userObj);

    return { user: userObj, tokens };
  }, []);

  /**
   * Google Sign-In via Firebase
   */
  const loginWithGoogle = useCallback(async () => {
    const { auth } = await import("@/lib/firebase");
    const { signInWithPopup, GoogleAuthProvider } = await import("firebase/auth");

    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();

    // Exchange Firebase token for our API tokens
    const res = await fetch(API.FIREBASE_AUTH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Google sign-in failed");
    }

    // Store tokens
    const tokens = {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
    setTokens(tokens);

    // Store user
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
    setUser(userObj);
    setStoredUser(userObj);

    return { user: userObj, tokens, isNewUser: data.isNewUser };
  }, []);

  /**
   * Logout
   */
  const logout = useCallback(async () => {
    const tokens = getTokens();
    const storedUser = getStoredUser();

    if (tokens?.refreshToken) {
      try {
        const url =
          storedUser?.authMethod === "firebase"
            ? API.FIREBASE_LOGOUT
            : API.LOGOUT;

        if (storedUser?.authMethod === "firebase") {
          await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken: tokens.refreshToken }),
          });
        } else {
          await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokens.accessToken}`,
            },
          });
        }
      } catch {
        // Continue with local logout even if API call fails
      }
    }

    // Sign out from Firebase if applicable
    try {
      const { auth } = await import("@/lib/firebase");
      const { signOut } = await import("firebase/auth");
      await signOut(auth);
    } catch {
      // ignore
    }

    clearTokens();
    setUser(null);
  }, []);

  /**
   * Update user profile
   */
  const updateProfile = useCallback(async (updates) => {
    const res = await authFetch(API.PROFILE, {
      method: "PUT",
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to update profile");
    }
    // Refresh profile
    await fetchProfile();
    return data;
  }, [fetchProfile]);

  const value = {
    user,
    loading,
    loginSendOTP,
    loginVerifyOTP,
    signupSendOTP,
    signupVerifyOTP,
    loginWithGoogle,
    logout,
    fetchProfile,
    updateProfile,
    isAuthenticated: !!user,
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
