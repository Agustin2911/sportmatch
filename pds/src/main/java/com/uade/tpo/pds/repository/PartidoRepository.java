package com.uade.tpo.pds.repository;

import com.uade.tpo.pds.entity.Partido;
import com.uade.tpo.pds.entity.Partido_Jugadores;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface PartidoRepository extends JpaRepository<Partido,Long> {



    @Query(value = "SELECT COUNT(*) FROM partido_jugadores ps WHERE ps.id_partido = ?1;",nativeQuery = true)
    public int cant_jugadores(long id);

    @Query(value = "select * from partido where id_partido=?1" , nativeQuery = true)
    public Partido partido_by_id(long id);

    @Query(value = "SELECT * FROM partido ORDER BY id_partido DESC LIMIT 1", nativeQuery = true)
    public Partido obtenerUltimoPartido();


    @Query(value = "select * from partido where cantidad_partidos_ganados=?1 and ubicacion=?2 and dificultad=?3",nativeQuery = true)
    public List<Partido> aplicar_todos_los_filtros(int cant, String ubicacion , long id);

    @Query(value = "select * from partido",nativeQuery = true)
    public List<Partido> todos_los_partidos();


    @Modifying
    @Transactional
    @Query(value ="insert into partido (cantidad_jugadores,duracion,estado_partido,horario,ubicacion,id_deporte,dificultad,cantidad_patidos_ganados,id) values(?1,?2,'Necesitamos jugadores',?3,?4,?5,?6,?7,?8)", nativeQuery = true)
    public void crearPartido(int cantidadJugadores , float duracion, LocalDateTime horario, String ubicacion, long deporte, long dificultad,int cantidad_de_partidos,long id );



    @Modifying
    @Transactional
    @Query(value="update  partido set estado_partido=?2 where id_partido=?1",nativeQuery = true)
    public void actualizarEstado(long id, String  estado_partido);


    @Query(value="select * from partido where  id_deporte=?1 and cantidad_jugadores=?2 and duracion=?3 and ubicacion=?4 and horario=?5", nativeQuery = true)
    public List<Partido> buscar_partido_x_datos( long deporte , int cantidadJugadores ,  float duracion ,String ubicacion, LocalDateTime horario);

    @Modifying
    @Transactional
    @Query(value="insert into partido_jugadores (id_partido,id_usuario) values(?1,?2)",nativeQuery = true)
    public void registrar(long id_partido,long id_usuario);

    @Query(value="select * from partido_jugadores where id_partido=?1 and id_usuario=?2",nativeQuery = true)
    public Partido_Jugadores buscar_judaror_en_partido(long id_partido,long id_usuario);


    @Modifying
    @Transactional
    @Query(value="update  partido set cantidad_jugadores =?1 where id_partido=?2",nativeQuery = true)
    public void aumentar_cantidad_jugadores(int nueva_cantidad,long id_partido);

    @Query(value = "SELECT * FROM partido WHERE dificultad = ?1", nativeQuery = true)
    List<Partido> emparejamiento_x_nivel(long nivel);

    @Query(value = "SELECT * FROM partido WHERE ubicacion = ?1", nativeQuery = true)
    List<Partido> emparejamiento_x_ubicacion(String ubicacion);

    @Query(value = "SELECT * FROM partido WHERE cantidad_patidos_ganados = ?1", nativeQuery = true)
    List<Partido> emparejamiento_x_partidos_ganados(Integer cant);
}
