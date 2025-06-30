import { useMemo } from "react";
import { useUserMatches, useLeaveMatch, useMatches } from "@/hooks/useMatches";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useUpdateMatchStatus } from "@/hooks/useMatches";
import {
  CalendarCheck,
  Trophy,
  Flame,
  Star,
  MapPin,
  Calendar,
  Clock,
  X,
} from "lucide-react";

const SPORT_EMOJIS: Record<string, string> = {
  futbol: "⚽",
  basquet: "🏀",
  tenis: "🎾",
  padel: "🏓",
  voley: "🏐",
};

const DIFFICULTY_COLORS: Record<string, string> = {
  principiante: "bg-green-100 text-green-800",
  intermedio: "bg-yellow-100 text-yellow-800",
  avanzado: "bg-red-100 text-red-800",
};

export function Dashboard() {
  const { data: userMatches = [], isLoading } = useUserMatches();
  const leaveMatchMutation = useLeaveMatch();

  // Separate upcoming and past matches
  const { upcomingMatches, pastMatches, createdMatches } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming: typeof userMatches = [];
    const past: typeof userMatches = [];
    const created: typeof userMatches = [];

    userMatches.forEach((match) => {
      const matchDate = new Date(match.horario);
      matchDate.setHours(0, 0, 0, 0);

      if (match.idPartido === Number(localStorage.getItem("id_user")) || 0) {
        created.push(match);
      }

      if (matchDate >= today) {
        upcoming.push(match);
      } else {
        past.push(match);
      }
    });

    return {
      upcomingMatches: upcoming,
      pastMatches: past,
      createdMatches: created,
    };
  }, [userMatches, Number(localStorage.getItem("id_user")) || 0]);

  // Calculate user stats
  const userStats = useMemo(() => {
    const joinedMatches = userMatches.length;
    const createdMatchesCount = createdMatches.length;
    const completedMatches = pastMatches.length;
    const streak = Math.min(upcomingMatches.length, 5); // Simple streak calculation

    return {
      joinedMatches,
      createdMatches: createdMatchesCount,
      completedMatches,
      streak,
      rating: 4.8, // Mock rating
    };
  }, [
    userMatches.length,
    createdMatches.length,
    pastMatches.length,
    upcomingMatches.length,
  ]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "short",
    });
  };

  const handleLeaveMatch = (matchId: number) => {
    leaveMatchMutation.mutate(matchId);
  };
  const updateStatusMutation = useUpdateMatchStatus();

  const handleUpdateStatus = (id: number, estado: string) => {
    updateStatusMutation.mutate({ id, estado });
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="text-center mb-8">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>

          <div className="space-y-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  console.log(userMatches);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Mi Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Gestiona tus partidos y revisa tu actividad deportiva
          </p>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-sport-blue bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <CalendarCheck className="h-6 w-6 text-sport-blue" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {userStats.joinedMatches}
            </div>
            <div className="text-sm text-gray-600">Partidos Unidos</div>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-sport-green bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Trophy className="h-6 w-6 text-sport-green" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {userStats.createdMatches}
            </div>
            <div className="text-sm text-gray-600">Partidos Creados</div>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-sport-orange bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Flame className="h-6 w-6 text-sport-orange" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {userStats.streak}
            </div>
            <div className="text-sm text-gray-600">Racha Activa</div>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Star className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {userStats.rating}
            </div>
            <div className="text-sm text-gray-600">Rating Promedio</div>
          </div>
        </div>

        {/* Upcoming Matches */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Mis Próximos Partidos ({userMatches.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userMatches.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CalendarCheck className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No tienes partidos próximos
                </h3>
                <p className="text-gray-600">
                  ¡Únete a un partido para comenzar a jugar!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {userMatches.map((match) => (
                  <div
                    key={match.idPartido}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">
                          {SPORT_EMOJIS[match.deporte] || "🏃"}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center text-sm text-gray-600 space-x-4">
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(match.horario)}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {match.horario}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {match.ubicacion}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge
                        className={
                          DIFFICULTY_COLORS[match.dificultad.dificultad] ||
                          "bg-gray-100 text-gray-800"
                        }
                      >
                        {match.dificultad.dificultad.dificultad}
                      </Badge>
                      <Badge variant="outline">
                        {match.jugadores.length}/{match.cantidadJugadores}
                      </Badge>
                      {match.idPartido !==
                        Number(localStorage.getItem("id_user")) ||
                        (0 && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleLeaveMatch(match.idPartido)}
                            disabled={leaveMatchMutation.isPending}
                            className="text-red-600 hover:text-red-800 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Created Matches */}
        {createdMatches.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Partidos que Organizo ({userMatches.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {createdMatches.map((match) => (
                  <div
                    key={match.idPartido}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">
                            {SPORT_EMOJIS[match.deporte.nombre] || "🏃"}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center text-sm text-gray-600 space-x-4">
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {formatDate(match.horario)}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {match.horario}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {match.ubicacion}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">Organizador</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <span>
                          {match.cantidadJugadores}/{match.jugadores.length}{" "}
                          jugadores
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-sport-green h-2 rounded-full transition-all"
                            style={{
                              width: `${
                                (match.cantidadJugadores /
                                  match.jugadores.length) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">
                          {Math.round(
                            (match.cantidadJugadores / match.jugadores.length) *
                              100
                          )}
                          %
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-2">
                      <Button
                        size="sm"
                        onClick={() =>
                          handleUpdateStatus(
                            match.idPartido,
                            "partido confirmado"
                          )
                        }
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        Confirmar
                      </Button>
                      <Button
                        size="sm"
                        onClick={() =>
                          handleUpdateStatus(
                            match.idPartido,
                            "partido cancelado"
                          )
                        }
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
