package com.uade.tpo.pds.service;

import com.uade.tpo.pds.DTOS.NuevoUsuario;
import com.uade.tpo.pds.entity.Deportes;
import com.uade.tpo.pds.entity.Partido;
import com.uade.tpo.pds.entity.Partido_Jugadores;
import com.uade.tpo.pds.entity.Usuario;
import com.uade.tpo.pds.repository.DeporteRepository;
import com.uade.tpo.pds.repository.UsuarioRepository;
import com.uade.tpo.pds.security.JwtUtil;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class UsuarioService {

    private static final
    Logger logger = Logger.getLogger(UsuarioService.class.getName());

    private final String jwtSecret = "estoesunaclavesupersecretaquedebetenermasde64caracteres1234567890abcDEFw";
    private final long jwtExpirationMs = 360000000;

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private DeporteRepository deporteRepo;



    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Transactional
    public String registrarUsuario(NuevoUsuario nuevoUsuario) {
        logger.info("Registrando nuevo usuario: " + nuevoUsuario.getNombreUsuario());

        Optional<Deportes> deporteOpt = deporteRepo.findByNombre(nuevoUsuario.getDeporteFavorito());
        String password=passwordEncoder.encode(nuevoUsuario.getContraseña());

        usuarioRepository.insertUsuario(nuevoUsuario.getNombreUsuario(),nuevoUsuario.getEmail(),password,nuevoUsuario.getNivelJuego(),deporteOpt.get().getIdDeporte());
        entityManager.flush();
        Optional<Usuario> usuario=usuarioRepository.findByEmail(nuevoUsuario.getEmail());
        logger.info("Registrando nuevo usuario: " + usuario.get().getDeporte());
        if (usuario.isPresent()) {
            logger.info("Usuario registrado correctamente: " + usuario.get().getNombreUsuario());
            String token = jwtUtil.generateToken(usuario.get().getNombreUsuario(),usuario.get().getId(),usuario.get().getEmail(),usuario.get().getNivelJuego(),usuario.get().getDeporte(),usuario.get().getEstadisticas());
            logger.info("Token generado: " + token);
            return token;
        } else {
            logger.warning("No se pudo registrar el usuario.");
            return null;
        }
    }

    public String login(String email, String password) {
        logger.info("Intentando login para usuario: " + email);
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);

        if (usuario.isPresent() ) {
            logger.info("Usuario encontrado en base de datos: " + usuario.get().getNombreUsuario());
            if (passwordEncoder.matches(password, usuario.get().getContraseña())) {
                String token = jwtUtil.generateToken(usuario.get().getNombreUsuario(),usuario.get().getId(),usuario.get().getEmail(),usuario.get().getNivelJuego(),usuario.get().getDeporte(),usuario.get().getEstadisticas());
                logger.info("Login exitoso. Token generado: " + token);
                return token;
            } else {
                logger.warning("Contraseña incorrecta para usuario: " + email);
            }
        } else {
            logger.warning("Usuario no encontrado: " + email);
        }
        return null;
    }

    public Usuario obtenerPorUsername(String username) {
        logger.info("Buscando usuario por username: " + username);
        return usuarioRepository.findByUsername(username);
    }

    public Optional<Usuario> buscar(long id) {
        logger.info("Buscando usuario por ID: " + id);
        Optional<Usuario> encontrado = usuarioRepository.findById(id);
        if (encontrado.isPresent()) {
            logger.info("Usuario encontrado: " + encontrado.get().getNombreUsuario());
        } else {
            logger.warning("No se encontró usuario con ID: " + id);
        }
        return encontrado;
    }


    public Optional<List<Partido>> partidos_jugador(long id){

        return usuarioRepository.partidos_jugador(id);
    }
}
