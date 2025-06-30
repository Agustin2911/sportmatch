import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useApply, useApplyFilters } from "@/hooks/useMatches";

export interface Filters {
  matchsWon: number;
  difficulty: string; // siempre string como "1", "2", "3"
  location: string;
  matchType: string;
}

interface FiltersBarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onApplyFilters: () => void;
}

const DIFFICULTIES = [
  { value: "1", label: "🟢 Principiante" },
  { value: "2", label: "🟡 Intermedio" },
  { value: "3", label: "🔴 Avanzado" },
];

const EMPAREJAMIENTO = [
  { value: "ubicacion", label: "UBICACION" },
  { value: "nivel", label: "POR NIVEL" },
  { value: "partidos", label: "CANTIDAD DE PARTIDOS GANADOS" },
  { value: "TODOS", label: "TODOS" },
];

export function FiltersBar({
  filters,
  onFilterChange,
  onApplyFilters,
}: FiltersBarProps) {
  const handleFilterChange = (key: keyof Filters, value: string | number) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFilterChange({
      matchsWon: 0,
      difficulty: "all",
      location: "",
      matchType: "TODOS",
    });
  };

  const hasActiveFilters =
    (filters.matchsWon && filters.matchsWon !== 0) ||
    (filters.difficulty && filters.difficulty !== "all") ||
    filters.location;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Ubicación
            </Label>
            <Input
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              disabled={
                filters.matchType !== "ubicacion" &&
                filters.matchType !== "TODOS"
              }
            />
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Dificultad
            </Label>
            <Select
              value={filters.difficulty}
              onValueChange={(value) => handleFilterChange("difficulty", value)}
              disabled={
                filters.matchType !== "nivel" && filters.matchType !== "TODOS"
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Todos los niveles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los niveles</SelectItem>
                {DIFFICULTIES.map((difficulty) => (
                  <SelectItem key={difficulty.value} value={difficulty.value}>
                    {difficulty.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Partidos ganados
            </Label>
            <Input
              type="number"
              value={filters.matchsWon}
              onChange={(e) =>
                handleFilterChange("matchsWon", Number(e.target.value))
              }
              disabled={
                filters.matchType !== "partidos" &&
                filters.matchType !== "TODOS"
              }
              placeholder="Cantidad"
              className="w-full"
            />
          </div>
        </div>

        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Filtro
          </Label>
          <Select
            value={filters.matchType}
            onValueChange={(value) => handleFilterChange("matchType", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tipo de emparejamiento" />
            </SelectTrigger>
            <SelectContent>
              {EMPAREJAMIENTO.map((emparejamiento) => (
                <SelectItem
                  key={emparejamiento.value}
                  value={emparejamiento.value}
                >
                  {emparejamiento.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            onClick={onApplyFilters}
            className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700"
          >
            Aplicar filtros
          </Button>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="px-6 py-2 text-sport-blue hover:bg-blue-50"
            >
              <X className="h-4 w-4 mr-2" />
              Limpiar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
