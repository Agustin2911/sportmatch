import { useState, useEffect } from "react";
import { useMatches, useUserMatches } from "@/hooks/useMatches";
import { useAuth } from "@/hooks/useAuth";
import { MatchCard } from "@/components/MatchCard";
import { FiltersBar, type Filters } from "@/components/FiltersBar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarCheck, Trophy, Grid3X3, List } from "lucide-react";
import { useApply, useApplyFilters } from "@/hooks/useMatches";

interface HomeProps {
  onOpenLogin: () => void;
}

export function Home({ onOpenLogin }: HomeProps) {
  const { isAuthenticated } = useAuth();
  const {
    data: matches = [],
    isLoading,
    refetch: refetchMatches,
  } = useMatches();
  const { data: userMatches = [], refetch: refetchUserMatches } =
    useUserMatches();
  const [filteredMatches, setFilteredMatches] = useState<any[]>([]);
  const [filters, setFilters] = useState<Filters>({
    matchsWon: 0,
    difficulty: "all",
    location: "",
    matchType: "TODOS",
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const applyMatchType = useApply();
  const applyMatchValue = useApplyFilters();

  // Refresca partidos si hubo cambios recientes
  useEffect(() => {
    if (localStorage.getItem("match_success") === "true") {
      refetchMatches();
      refetchUserMatches();
      localStorage.removeItem("match_success");
    }
  }, [refetchMatches, refetchUserMatches]);

  // Filtra partidos eliminando los terminados por defecto
  useEffect(() => {
    if (matches.length > 0) {
      const activos = matches.filter(
        (match) =>
          match.estadoPartido !== "partido terminado" &&
          match.estadoPartido !== "Necesitamos jugadores" &&
          match.estadoPartido !== "partido cancelado" &&
          match.estadoPartido !== "partido confirmado"
      );
      setFilteredMatches(activos);
    }
  }, [matches]);
  const applyFilters = async () => {
    try {
      console.log("🔍 Aplicando filtros con:", filters);

      await applyMatchType.mutateAsync(filters.matchType);

      let filterValue;
      switch (filters.matchType) {
        case "nivel":
          filterValue = filters.difficulty;
          break;
        case "ubicacion":
          filterValue = filters.location;
          break;
        case "partidos":
          filterValue = filters.matchsWon;
          break;
        default:
          filterValue = "";
      }

      if (filters.matchType !== "TODOS") {
        const resultFromApi = await applyMatchValue.mutateAsync(filterValue);
        console.log("📦 Partidos desde la API:", resultFromApi);

        // Aplicar directamente los partidos recibidos al estado
        const activos = resultFromApi.filter(
          (match: any) =>
            match.estadoPartido !== "partido terminado" ||
            match.estadoPartido !== "Necesitamos jugadores" ||
            match.estadoPartido !== "partido cancelado" ||
            match.estadoPartido !== "partido confirmado"
        );

        setFilteredMatches(activos);
      } else {
        const activos = matches.filter(
          (match: any) => match.estadoPartido !== "partido terminado"
        );
        setFilteredMatches(activos);
      }
    } catch (error) {
      console.error("❌ Error aplicando filtros:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* skeletons */}
        <Skeleton className="h-12 w-96 mx-auto mb-4" />
        <Skeleton className="h-6 w-[600px] mx-auto" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Encuentra tu próximo partido
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Únete a eventos deportivos en tu ciudad y conoce otros deportistas
            como tú
          </p>
        </div>

        {/* Filters */}
        <FiltersBar
          filters={filters}
          onFilterChange={setFilters}
          onApplyFilters={applyFilters}
        />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 justify-center">
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-sport-blue bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <CalendarCheck className="h-6 w-6 text-sport-blue" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {
                filteredMatches.filter(
                  (match) => match.cantidadJugadores > match.jugadores.length
                ).length
              }
            </div>
            <div className="text-sm text-gray-600">Partidos Activos</div>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-sport-orange bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Trophy className="h-6 w-6 text-sport-orange" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {
                filteredMatches.filter(
                  (match) => match.cantidadJugadores <= match.jugadores.length
                ).length
              }
            </div>
            <div className="text-sm text-gray-600">Partidos llenos</div>
          </div>
        </div>

        {/* Lista de partidos */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Partidos Disponibles
              <span className="text-lg font-normal text-gray-600 ml-2">
                ({filteredMatches.length})
              </span>
            </h2>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">Vista:</span>
              <Button
                size="sm"
                variant={viewMode === "grid" ? "default" : "ghost"}
                onClick={() => setViewMode("grid")}
                className={
                  viewMode === "grid" ? "bg-sport-blue hover:bg-blue-800" : ""
                }
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant={viewMode === "list" ? "default" : "ghost"}
                onClick={() => setViewMode("list")}
                className={
                  viewMode === "list" ? "bg-sport-blue hover:bg-blue-800" : ""
                }
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {filteredMatches.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarCheck className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No hay partidos disponibles
              </h3>
              <p className="text-gray-600">
                Aún no hay partidos creados o no coinciden con los filtros
              </p>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {filteredMatches.map((match) => {
                console.log("🧩 Renderizando MatchCard:", match);
                return (
                  <MatchCard
                    key={match.idPartido}
                    match={match}
                    onOpenLogin={onOpenLogin}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
