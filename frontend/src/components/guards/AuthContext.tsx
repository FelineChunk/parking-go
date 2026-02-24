import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

interface AuthContextType {
  session: any;
  role: string | null;
  username: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  role: null,
  username: null,
  loading: true,
  signIn: async () => { },
});

export const AuthProvider = ({ children }: any) => {
  const [session, setSession] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);

  const fetchRole = async (userId: string) => {
    try {

      // Tambahkan timeout manual agar tidak gantung selamanya
      const { data, error } = await supabase
        .from("users")
        .select("role")
        .eq("id_user", userId)
        .maybeSingle();

      if (error) throw error;
      return data?.role || null;
    } catch (err) {
      console.error("FetchRole Error:", err);
      return null;
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      // Jangan set role di sini, biarkan onAuthStateChange yang menangani 
      // agar tidak terjadi tabrakan (race condition)
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  //   const signOut = async () => {
  //   try {
  //     await supabase.auth.signOut();
  //     // Reset state agar RoleRedirect langsung bereaksi
  //     setSession(null);
  //     setRole(null);
  //     window.location.href = "/signin"; 
  //   } catch (error) {
  //     console.error("Error signing out:", error);
  //   }
  // };

  useEffect(() => {
    let isMounted = true;

    const handleAuth = async (currentSession: any) => {
      if (!isMounted) return;

      try {
        if (currentSession) {
          setSession(currentSession);
          const r = await fetchRole(currentSession.user.id);
          const uname =
            currentSession.user.user_metadata?.username ||
            currentSession.user.email;
            setUsername(uname);

          if (isMounted) setRole(r);
        } else {
          setSession(null);
          setRole(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // 1. Jalankan sekali saat start
    supabase.auth.getSession().then(({ data }) => {
      handleAuth(data.session);
    });

    // 2. Dengarkan perubahan (termasuk hasil dari signIn)
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, sess) => {
      console.log("Auth Event:", event);
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        handleAuth(sess);
      } else if (event === 'SIGNED_OUT') {
        setSession(null);
        setRole(null);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, role, username, loading, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);