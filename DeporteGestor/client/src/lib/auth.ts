import { apiRequest } from "./queryClient";

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface LoginData {
  email: string;
  contraseña: string;
}

export interface RegisterData {
  email: string;
  contraseña: string;
  deporteFavorito: String;
  nombreUsuario: string;
  nivelJuego: Number;
}

export interface AuthResponse {
  message: String;
}

class AuthService {
  private sessionId: string | null = null;

  constructor() {
    this.sessionId = localStorage.getItem("sessionId");
  }

  async login(data: LoginData): Promise<Boolean> {
    const response = await apiRequest(
      "POST",
      "http://localhost:1273/usuarios/login",
      data
    );
    const result: AuthResponse = await response.json();

    localStorage.setItem("token", String(result.message));

    return result.message !== "Credenciales inválidas";
  }

  async register(data: RegisterData): Promise<Boolean> {
    const response = await apiRequest(
      "POST",
      "http://localhost:1273/usuarios/register",
      data
    );
    const result: AuthResponse = await response.json();

    localStorage.setItem("token", String(result.message));

    return result.message !== "Hubo un error al crear al registrarse";
  }

  async logout(): Promise<void> {
    if (this.sessionId) {
      try {
        await apiRequest("POST", "/api/auth/logout");
      } catch (error) {
        // Continue with logout even if request fails
      }
    }

    this.sessionId = null;
    localStorage.removeItem("sessionId");
  }

  async getMe(): Promise<User | null> {
    if (!this.sessionId) {
      return null;
    }

    try {
      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${this.sessionId}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          this.logout();
          return null;
        }
        throw new Error("Failed to fetch user");
      }

      return await response.json();
    } catch (error) {
      this.logout();
      return null;
    }
  }

  getSessionId(): string | null {
    return this.sessionId;
  }

  isAuthenticated(): boolean {
    return !!this.sessionId;
  }
}

export const authService = new AuthService();

// Override the default apiRequest to include authorization header
export async function authenticatedRequest(
  method: string,
  url: string,
  data?: unknown | undefined
): Promise<Response> {
  const sessionId = authService.getSessionId();
  const headers: Record<string, string> = {};

  if (data) {
    headers["Content-Type"] = "application/json";
  }

  const token = localStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  console.log("==== API REQUEST ====");
  console.log("METHOD:", method);
  console.log("URL:", url);
  console.log("HEADERS:", headers);
  console.log("BODY:", data);
  console.log("=====================");

  const res = await fetch(url, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    console.error("❌ API ERROR:", res.status, text);
    throw new Error(`${res.status}: ${text}`);
  }

  console.log("✅ API RESPONSE:", res.status, res.statusText);
  return res;
}
