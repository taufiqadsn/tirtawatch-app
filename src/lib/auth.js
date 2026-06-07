"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabaseClient";

const AuthContext = createContext(null);

function setCookie(name, value, maxAge = 60 * 60 * 24 * 7) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function removeCookie(name) {
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
}

function setAuthCookies(profile) {
  setCookie("tw_user_session", "true");
  setCookie("tw_user_role", profile?.role || "warga");
}

function clearAuthCookies() {
  removeCookie("tw_user_session");
  removeCookie("tw_user_role");
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadUserProfile(authUser) {
    if (!authUser) {
      setUser(null);
      clearAuthCookies();
      return;
    }

    const { data } = await supabaseClient
      .from("profiles")
      .select("*")
      .eq("id", authUser.id)
      .single();

    const profile = data
      ? {
          id: authUser.id,
          name: data.name,
          email: data.email,
          role: data.role,
        }
      : {
          id: authUser.id,
          name: authUser.user_metadata?.name || "Warga",
          email: authUser.email,
          role: "warga",
        };

    setUser(profile);
    setAuthCookies(profile);
  }

  useEffect(() => {
    async function initAuth() {
      const { data } = await supabaseClient.auth.getUser();
      await loadUserProfile(data.user);
      setLoading(false);
    }

    initAuth();

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange(async (_event, session) => {
      await loadUserProfile(session?.user || null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function register({ name, email, password }) {
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    const authUser = data.user;

    if (authUser) {
      const { error: profileError } = await supabaseClient
        .from("profiles")
        .insert([
          {
            id: authUser.id,
            name,
            email,
            role: "warga",
          },
        ]);

      if (profileError) {
        return {
          success: false,
          message: profileError.message,
        };
      }

      await loadUserProfile(authUser);
    }

    return {
      success: true,
      message: "Registrasi berhasil.",
    };
  }

  async function login({ email, password }) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    await loadUserProfile(data.user);

    return {
      success: true,
      message: "Login berhasil.",
    };
  }

  async function logout() {
    await supabaseClient.auth.signOut();
    setUser(null);
    clearAuthCookies();
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth harus digunakan di dalam <AuthProvider>");
  }

  return context;
}