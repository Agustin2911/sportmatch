import { useState } from "react";
import { useCreateMatch } from "@/hooks/useMatches";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

interface CreateMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const deportes = [
  { value: 1, label: "⚽ Fútbol" },
  { value: 2, label: "🏀 Básquet" },
  { value: 3, label: "🎾 Tenis" },
  { value: 4, label: "🏐 Vóley" },
];

const DIFFICULTIES = [
  { value: 1, label: "🟢 Principiante" },
  { value: 2, label: "🟡 Intermedio" },
  { value: 3, label: "🔴 Avanzado" },
];

export function CreateMatchModal({ isOpen, onClose }: CreateMatchModalProps) {
  const createMatchMutation = useCreateMatch();

  const [formData, setFormData] = useState({
    cantidad_jugadores: "",
    difucultad: "",
    ubicacion: "",
    horario: "",
    duracion: "",
    estado_partido: "sin iniciar",
    id_deporte: "",
    cantidadPatidosGanados: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createMatchMutation.mutateAsync({
        cantidad_jugadores: Number(formData.cantidad_jugadores),
        dificultad: Number(formData.difucultad),
        ubicacion: formData.ubicacion,
        horario: formData.horario,
        duracion: parseFloat(formData.duracion),
        id_deporte: parseInt(formData.id_deporte),
        cantidadPatidosGanados: parseInt(formData.cantidadPatidosGanados),
        id_jugadores: Number(localStorage.getItem("id_user")) || 0,
      });

      // Reset form and close modal
      setFormData({
        cantidad_jugadores: "",
        difucultad: "",
        ubicacion: "",
        estado_partido: "sin iniciar",
        horario: "",
        duracion: "",
        id_deporte: "",
        cantidadPatidosGanados: "",
      });
      onClose();
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    if (!createMatchMutation.isPending) {
      onClose();
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-screen overflow-y-auto">
        <DialogHeader>
          <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
            <Plus className="h-8 w-8 text-white" />
          </div>
          <DialogTitle className="text-center text-2xl">
            Crear Nuevo Partido
          </DialogTitle>
          <DialogDescription className="text-center">
            Organiza un partido deportivo en tu ciudad
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="id_deporte">Deporte</Label>
              <Select
                value={formData.id_deporte}
                onValueChange={(value) =>
                  handleInputChange("id_deporte", value)
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar deporte" />
                </SelectTrigger>
                <SelectContent>
                  {deportes.map((deporte) => (
                    <SelectItem
                      key={deporte.value}
                      value={deporte.value.toString()}
                    >
                      {deporte.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="difucultad">Dificultad</Label>
              <Select
                value={formData.difucultad}
                onValueChange={(value) =>
                  handleInputChange("difucultad", value)
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar nivel" />
                </SelectTrigger>
                <SelectContent>
                  {DIFFICULTIES.map((diff) => (
                    <SelectItem key={diff.value} value={diff.value.toString()}>
                      {diff.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ubicacion">Ubicación</Label>
            <Input
              id="ubicacion"
              type="text"
              placeholder="Ej: Club deportivo central"
              value={formData.ubicacion}
              onChange={(e) => handleInputChange("ubicacion", e.target.value)}
              required
              disabled={createMatchMutation.isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="horario">Fecha y Hora</Label>
            <Input
              id="horario"
              type="datetime-local"
              min={`${today}T00:00`}
              value={formData.horario}
              onChange={(e) => handleInputChange("horario", e.target.value)}
              required
              disabled={createMatchMutation.isPending}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cantidad_jugadores">Cantidad de Jugadores</Label>
              <Input
                id="cantidad_jugadores"
                type="number"
                min="1"
                placeholder="10"
                value={formData.cantidad_jugadores}
                onChange={(e) =>
                  handleInputChange("cantidad_jugadores", e.target.value)
                }
                required
                disabled={createMatchMutation.isPending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duracion">Duración (minutos)</Label>
              <Input
                id="duracion"
                type="number"
                min="1"
                placeholder="90"
                value={formData.duracion}
                onChange={(e) => handleInputChange("duracion", e.target.value)}
                required
                disabled={createMatchMutation.isPending}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cantidadPatidosGanados">
              Cantidad de partidos ganadores
            </Label>
            <Input
              id="cantidadPatidosGanados"
              type="number"
              min="1"
              placeholder="3"
              value={formData.cantidadPatidosGanados}
              onChange={(e) =>
                handleInputChange("cantidadPatidosGanados", e.target.value)
              }
              required
              disabled={createMatchMutation.isPending}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={createMatchMutation.isPending}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={createMatchMutation.isPending}
            >
              {createMatchMutation.isPending ? "Creando..." : "Crear Partido"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
