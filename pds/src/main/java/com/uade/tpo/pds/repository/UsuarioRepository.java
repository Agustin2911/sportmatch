package com.uade.tpo.pds.repository;


import com.uade.tpo.pds.entity.Partido;
import com.uade.tpo.pds.entity.Partido_Jugadores;
import com.uade.tpo.pds.entity.Usuario;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    @Query(value = "select * from usuario where nombre_usuario=?1", nativeQuery = true)
    Usuario findByUsername(String username);

    // Buscar por email
    @Query("SELECT u FROM Usuario u WHERE u.email = :email")
    Optional<Usuario> findByEmail(@Param("email") String email);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO usuario (nombre_usuario, email, contraseña, nivel_juego, id_deporte) VALUES (?1,?2,?3,?4,?5)", nativeQuery = true)
    void insertUsuario(String nombreUsuario,String email, String contraseña, long nivelJuego, long idDeporte);


    @Query(value = "select p.* from partido_jugadores pj join partido p on p.id_partido=pj.id_partido where pj.id_usuario=?1;",nativeQuery = true)
    Optional<List<Partido>> partidos_jugador(long id_jugador);
}