import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

interface AuthContextType {
  session: any;
  role: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  role: null,
  loading: true,
  signIn: async () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [session, setSession] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRole = async (userId: string) => {
    try {
      console.log("Memulai query tabel users...");
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

  useEffect(() => {
    let isMounted = true;

    const handleAuth = async (currentSession: any) => {
      if (!isMounted) return;
      
      try {
        if (currentSession) {
          setSession(currentSession);
          const r = await fetchRole(currentSession.user.id);
          if (isMounted) setRole(r);
        } else {
          setSession(null);
          setRole(null);
        }
      } finally {
        if (isMounted) {
          console.log("Semua proses selesai, mematikan loading...");
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
    <AuthContext.Provider value={{ session, role, loading, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);