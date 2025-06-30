import React, { useState, useEffect, createContext, useContext } from "react";
import { authService, type User } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: {
    email: string;
    contraseña: string;
    deporteFavorito: String;
    nombreUsuario: string;
    nivelJuego: Number;
  }) => Promise<Boolean>;
  logout: () => Promise<void>;
}
interface DecodedToken {
  username: string;
  id_user: number;
  email: string;
  nivel_de_juego: number;
  deporte: string;
  estadistica: any;
  sub: string;
  exp: number;
  iat: number;
}

const decodeAndLogTokenInfo = (token: string) => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    console.log("Token decodificado:", decoded);

    localStorage.setItem("username", decoded.username);
    localStorage.setItem("id_user", String(decoded.id_user));
    localStorage.setItem("email", decoded.email);
    localStorage.setItem("nivel_de_juego", String(decoded.nivel_de_juego));
    localStorage.setItem("deporte", decoded.deporte);
  } catch (error) {
    console.error("Error al decodificar el token:", error);
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Boolean>();
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = await authService.getMe();
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, contraseña: string): Promise<boolean> => {
    try {
      const response = await authService.login({ email, contraseña });
      if (response) {
        toast({
          title: "¡Bienvenido!",
          description: "Has iniciado sesión correctamente",
        });
        setUser(true);
        const dato = localStorage.getItem("token");
        decodeAndLogTokenInfo(dato || " ");

        return true;
      } else {
        toast({
          title: "Error de inicio de sesión",
          description: "Credenciales incorrectas",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Error de inicio de sesión",
        description: "Credenciales incorrectas",
        variant: "destructive",
      });
      return false;
    }
  };

  const register = async (data: {
    email: string;
    contraseña: string;
    deporteFavorito: String;
    nombreUsuario: string;
    nivelJuego: Number;
  }): Promise<Boolean> => {
    try {
      const response = await authService.register(data);
      if (response) {
        toast({
          title: "¡Cuenta creada!",
          description: "Tu cuenta ha sido creada exitosamente",
        });
        setUser(true);
        decodeAndLogTokenInfo(localStorage.getItem("token") || " ");
        return true;
      } else {
        toast({
          title: "Error de registro",
          description: "No se pudo crear la cuenta",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Error de registro",
        description: "No se pudo crear la cuenta",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
      setUser(false);
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente",
      });
      localStorage.setItem("token", " ");

      localStorage.setItem("username", " ");
      localStorage.setItem("id_user", " ");
      localStorage.setItem("email", " ");
      localStorage.setItem("nivel_de_juego", " ");
      localStorage.setItem("deporte", " ");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return React.createElement(
    AuthContext.Provider,
    {
      value: {
        isLoading,
        isAuthenticated: user === true ? true : false,
        login,
        register,
        logout,
      },
    },
    children
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
