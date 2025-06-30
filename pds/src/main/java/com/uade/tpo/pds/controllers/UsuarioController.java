package com.uade.tpo.pds.controllers;




import com.uade.tpo.pds.DTOS.FailedResponse;
import com.uade.tpo.pds.DTOS.Login;
import com.uade.tpo.pds.DTOS.NuevoUsuario;

import com.uade.tpo.pds.DTOS.SuccesResponse;
import com.uade.tpo.pds.entity.Partido;
import com.uade.tpo.pds.entity.Partido_Jugadores;
import com.uade.tpo.pds.entity.Usuario;
import com.uade.tpo.pds.service.UsuarioService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Data
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    private static final Logger logger = Logger.getLogger(UsuarioService.class.getName());


    @PostMapping("/register")
    public ResponseEntity<?> registrar(@RequestBody NuevoUsuario nuevoUsuario) {
        try {
            logger.info("Registrando nuevo usuario1: " + nuevoUsuario.getNombreUsuario());
            String token = usuarioService.registrarUsuario(nuevoUsuario);
            logger.info("se Registro un nuevo usuario1: " + nuevoUsuario.getNombreUsuario());
            return ResponseEntity.ok(new SuccesResponse(token));
        }
        catch (Exception e){
            return ResponseEntity.status(412).body(new FailedResponse("Hubo un error al crear al registrarse"));
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Login loginUsuario) {
        try {
            String token = usuarioService.login(loginUsuario.getEmail(), loginUsuario.getContraseña());
            System.out.println(token);
            if (token != null) {
                return ResponseEntity.ok(new SuccesResponse(token));
            } else {
                return ResponseEntity.status(401).body(new FailedResponse("Credenciales inválidas"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new FailedResponse("Error al procesar el login"));
        }
    }





    @GetMapping("/{id}")
    public ResponseEntity<Object> buscarUsuario(@PathVariable long id) {
        Optional<Usuario> usuario = usuarioService.buscar(id);
        if (usuario.isPresent()) {
            return ResponseEntity.ok(usuario.get());
        } else {
            return ResponseEntity.status(412).body(new FailedResponse("Usuario no encontrado"));
        }
    }


    @GetMapping("/partidos/{id}")
    public ResponseEntity<Object> buscarpartidos(@PathVariable long id) {
        Optional<List<Partido>> lista_partidos = usuarioService.partidos_jugador(id);
        if (lista_partidos.isPresent()) {
            return ResponseEntity.ok(lista_partidos.get());
        } else {
            return ResponseEntity.ok(List.of());
        }
    }


}