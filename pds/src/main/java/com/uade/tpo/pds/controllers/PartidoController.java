package com.uade.tpo.pds.controllers;

import com.uade.tpo.pds.DTOS.FailedResponse;
import com.uade.tpo.pds.DTOS.NuevoPartido;
import com.uade.tpo.pds.DTOS.SuccesResponse;
import com.uade.tpo.pds.entity.Partido;

import com.uade.tpo.pds.service.PartidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("partidos")
public class PartidoController {
    private static final Logger logger = Logger.getLogger("PartidoController");
    @Autowired
    private PartidoService service;

    @PostMapping("/crear")
    public ResponseEntity<?> crearPartido(@RequestBody NuevoPartido nuevoPartido) {
        if (service.crearPartido(nuevoPartido)) {
            return ResponseEntity.ok(new SuccesResponse("Partido creado exitosamente."));
        } else {
            return ResponseEntity.badRequest().body(new FailedResponse("No se pudo crear el partido."));
        }
    }

    @GetMapping("/todos")
    public ResponseEntity<List<Partido>> obtenerTodosLosPartidos() {
        return ResponseEntity.ok(service.buscar_todos_los_partidos());
    }

    @GetMapping("/emparejamiento/{valor}")
    public ResponseEntity<List<Partido>> obtenerPorEmparejamiento(@PathVariable("valor") Object valor) {
        List<Partido> partidos= service.buscar_por_emparejamiento(valor);
        logger.info("largo lista"+partidos.size());
        return ResponseEntity.ok(partidos);
    }

    @GetMapping("/emparejamiento/seleccionar/{tipo}")
    public ResponseEntity<SuccesResponse> seleccionarEmparejamiento(@PathVariable("tipo") String tipo) {
        service.seleccionar_emparejamiento(tipo);
        return ResponseEntity.ok(new SuccesResponse("Emparejamiento actualizado a: " + tipo));
    }

    @GetMapping("/filtros")
    public ResponseEntity<?> buscarConFiltros(
            @RequestParam("dificultad") Integer dificultad,
            @RequestParam("ubicacion") String ubicacion,
            @RequestParam("deporte") Long deporteId) {

        List<Partido> resultado = service.buscar_por_emparejamiento(dificultad, ubicacion, deporteId);
        if (resultado != null) {
            return ResponseEntity.ok(resultado);
        } else {
            return ResponseEntity.badRequest().body(new FailedResponse("Parámetros inválidos para búsqueda con filtros."));
        }
    }

    @PutMapping("/estado/{id}/{estado}")
    public ResponseEntity<?> actualizarEstado(
            @PathVariable("id") Long id,
            @PathVariable("estado") String nuevoEstado) {

        if (service.actualizar_estado(id, nuevoEstado)) {
            return ResponseEntity.ok(new SuccesResponse("Estado actualizado correctamente."));
        } else {
            return ResponseEntity.badRequest().body(new FailedResponse("No se pudo actualizar el estado."));
        }
    }

    @PostMapping("/agregar-jugador/{id_usuario}/{id_partido}")
    public ResponseEntity<?> agregarJugador(
            @PathVariable("id_usuario") Long idUsuario,
            @PathVariable("id_partido") Long idPartido) {

        if (service.agregar_jugador(idUsuario, idPartido)) {
            return ResponseEntity.ok(new SuccesResponse("Jugador agregado correctamente."));
        } else {
            return ResponseEntity.badRequest().body(new FailedResponse("No se pudo agregar el jugador."));
        }
    }
}
