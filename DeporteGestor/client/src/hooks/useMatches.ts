import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authenticatedRequest } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

export interface Match {
  idPartido: number;
  deporte: any;
  dificultad: any;
  ubicacion: string;
  horario: any;
  estadoPartido: string;
  cantidadPartidosGanados: number;
  id_usuario: any;
  jugadores: any;
  cantidadJugadores: any;
  duracion: any;
}

export interface CreateMatchData {
  cantidad_jugadores: number;
  dificultad: number;
  ubicacion: string;
  horario: string; // tipo ISO-8601: "2025-06-29T18:00"
  duracion: number; // en minutos
  id_deporte: number;
  cantidadPatidosGanados: number;
  id_jugadores: number;
}

export function useUpdateMatchStatus() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, estado }: { id: number; estado: string }) => {
      const response = await authenticatedRequest(
        "PUT",
        `http://localhost:1273/partidos/estado/${id}/${estado}`
      );
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Estado actualizado",
        description: "El estado del partido se actualizó correctamente",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/matches"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user/matches"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado del partido",
        variant: "destructive",
      });
    },
  });
}

export function useMatches() {
  return useQuery({
    queryKey: ["http://localhost:1273/partidos/todos"],
    queryFn: async () => {
      const response = await fetch("http://localhost:1273/partidos/todos");
      if (!response.ok) {
        throw new Error("Failed to fetch matches");
      }
      return response.json() as Promise<Match[]>;
    },
  });
}

export function useUserMatches() {
  return useQuery({
    queryKey: [
      `http://localhost:1273/usuarios/partidos/${Number(
        localStorage.getItem("id_user")
      )}`,
    ],
    queryFn: async () => {
      const response = await authenticatedRequest(
        "GET",
        `http://localhost:1273/usuarios/partidos/${Number(
          localStorage.getItem("id_user")
        )}`
      );
      return response.json() as Promise<Match[]>;
    },
  });
}

export function useCreateMatch() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: CreateMatchData) => {
      const response = await authenticatedRequest(
        "POST",
        "http://localhost:1273/partidos/crear",
        data
      );
      return response.json() as Promise<Match>;
    },
    onSuccess: () => {
      localStorage.setItem("match_success", "true");
      queryClient.invalidateQueries({ queryKey: ["/api/matches"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user/matches"] });
      toast({
        title: "¡Partido creado!",
        description: "Tu partido ha sido creado exitosamente",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo crear el partido",
        variant: "destructive",
      });
    },
  });
}

export function useApply() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: any) => {
      console.log("📤 Enviando tipo de emparejamiento:", data);
      const response = await authenticatedRequest(
        "GET",
        `http://localhost:1273/partidos/emparejamiento/seleccionar/${data}`
      );
      console.log("📥 Respuesta tipo de emparejamiento:", response);
      return response.json();
    },
    onSuccess: () => {
      console.log("✅ Tipo de emparejamiento aplicado correctamente.");
      queryClient.invalidateQueries({ queryKey: ["/api/matches"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user/matches"] });
      toast({
        title: "¡filtro aplicado!",
        description: "filtro aplicado",
      });
    },
    onError: (error) => {
      console.error("❌ Error al aplicar tipo de emparejamiento:", error);
      toast({
        title: "Error",
        description: "No se pudo aplicar el filtro",
        variant: "destructive",
      });
    },
  });
}

export function useApplyFilters() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: any) => {
      console.log("📤 Enviando filtro (valor):", data);
      const response = await authenticatedRequest(
        "GET",
        `http://localhost:1273/partidos/emparejamiento/${data}`
      );
      console.log("📥 Respuesta filtro (valor):", response);
      return response.json() as Promise<Match[]>;
    },
    onSuccess: () => {
      console.log("✅ Filtro aplicado exitosamente.");
      queryClient.invalidateQueries({ queryKey: ["/api/matches"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user/matches"] });
      toast({
        title: "¡filtro aplicado!",
        description: "filtro aplicado",
      });
    },
    onError: (error) => {
      console.error("❌ Error al aplicar el filtro:", error);
      toast({
        title: "Error",
        description: "No se pudo aplicar el filtro",
        variant: "destructive",
      });
    },
  });
}

export function useJoinMatch() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (matchId: number) => {
      const response = await authenticatedRequest(
        "POST",
        `http://localhost:1273/partidos/agregar-jugador/${localStorage.getItem(
          "id_user"
        )}/${matchId}`
      );
      return response.json();
    },
    onSuccess: () => {
      localStorage.setItem("match_success", "true");
      queryClient.invalidateQueries({ queryKey: ["/api/matches"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user/matches"] });
      toast({
        title: "¡Te has unido!",
        description: "Te has unido al partido exitosamente",
      });
    },

    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message.includes("Cannot join")
          ? "Este partido ya está completo"
          : "No se pudo unir al partido",
        variant: "destructive",
      });
    },
  });
}

export function useLeaveMatch() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (matchId: number) => {
      const response = await authenticatedRequest(
        "POST",
        `/api/matches/${matchId}/leave`
      );
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/matches"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user/matches"] });
      toast({
        title: "Has dejado el partido",
        description: "Te has retirado del partido",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo dejar el partido",
        variant: "destructive",
      });
    },
  });
}
