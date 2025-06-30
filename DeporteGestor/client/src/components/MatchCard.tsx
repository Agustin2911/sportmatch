import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useJoinMatch } from "@/hooks/useMatches";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, MapPin, Users, Plus, Check } from "lucide-react";
import type { Match } from "@/hooks/useMatches";
import { useEffect } from "react";

interface MatchCardProps {
  match: Match;
  isJoined?: boolean;
  onOpenLogin?: () => void;
}

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

const DIFFICULTY_LABELS: Record<string, string> = {
  principiante: "Principiante",
  intermedio: "Intermedio",
  avanzado: "Avanzado",
};

export function MatchCard({
  match,
  isJoined = false,
  onOpenLogin,
}: MatchCardProps) {
  const { isAuthenticated } = useAuth();
  const id_usuario = localStorage.getItem("id_user") || null;
  const joinMatchMutation = useJoinMatch();
  const [isHovered, setIsHovered] = useState(false);

  const isFull =
    Number(match.cantidadJugadores) <= Number(match.jugadores.length);

  const progressPercentage =
    (Number(match.jugadores.length) / Number(match.cantidadJugadores)) * 100;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "short",
    });
  };
  const isJoinedMatch = match.jugadores.some(
    (jugador) => jugador.usuario?.id === id_usuario
  );
  const handleJoin = () => {
    if (!isAuthenticated && onOpenLogin) {
      onOpenLogin();
      return;
    }

    if (!isFull && !isJoinedMatch) {
      joinMatchMutation.mutate(match.idPartido);
    }
  };
  useEffect(() => {
    const shouldReload = localStorage.getItem("match_success") === "true";
    if (shouldReload) {
      window.location.reload();
      localStorage.removeItem("match_success");
    }
  }, [localStorage.getItem("match_success")]);

  const getButtonText = () => {
    if (isJoinedMatch) return "Ya unido";
    if (isFull) return "Partido Completo";
    return "Unirse al Partido";
  };

  const getButtonIcon = () => {
    if (isJoinedMatch) return <Check className="h-4 w-4 mr-2" />;
    if (isFull) return <Check className="h-4 w-4 mr-2" />;
    return <Plus className="h-4 w-4 mr-2" />;
  };

  return (
    <Card
      className={`transition-all duration-300 hover:shadow-lg border border-gray-100 ${
        isFull ? "opacity-75" : ""
      } ${isHovered ? "transform hover:scale-[1.02]" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6">
        {/* Match Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">
                {SPORT_EMOJIS[match.deporte.nombre] || "🏃"}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                Partido de {match.deporte.nombre} en {match.ubicacion}
              </h3>
              <p className="text-sm text-gray-600 flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {match.ubicacion}
              </p>
            </div>
          </div>
          <Badge
            className={
              DIFFICULTY_COLORS[match.dificultad.dificultad] ||
              "bg-gray-100 text-gray-800"
            }
          >
            {DIFFICULTY_LABELS[match.dificultad.dificultad] ||
              match.dificultad.dificultad}
          </Badge>
        </div>

        {/* Match Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <span className="capitalize">{formatDate(match.horario)}</span>
            <Clock className="h-4 w-4 ml-4 mr-2 text-gray-400" />
            <span>{match.horario}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-2 text-gray-400" />
              <span>
                {match.jugadores.length}/{match.cantidadJugadores} jugadores
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Progress value={progressPercentage} className="w-20 h-2" />
              <span className="text-sm text-gray-600">
                {Math.round(progressPercentage)}%
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={handleJoin}
          disabled={isFull || isJoinedMatch || joinMatchMutation.isPending}
          className={`w-full font-semibold transition-colors ${
            isJoinedMatch
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : isFull
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-sport-blue hover:bg-blue-800 text-white"
          }`}
          variant={isJoinedMatch ? "secondary" : "default"}
        >
          {joinMatchMutation.isPending ? (
            "Uniéndose..."
          ) : (
            <>
              {getButtonIcon()}
              {isJoinedMatch
                ? "Ya unido"
                : isFull
                ? "Partido Completo"
                : "Unirse al Partido"}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
