package com.uade.tpo.pds.service;

import com.uade.tpo.pds.DTOS.NuevoPartido;
import com.uade.tpo.pds.entity.Partido;
import com.uade.tpo.pds.entity.Partido_Jugadores;
import com.uade.tpo.pds.entity.Usuario;
import com.uade.tpo.pds.repository.PartidoRepository;
import com.uade.tpo.pds.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.logging.Logger;
import java.util.List;

@Service
public class PartidoService {


    @Scheduled(initialDelay = 60000, fixedRate = 60000) // cada 60 segundos
    public void actualizarEstados() {
        actualizarEstadosAutomaticamente();
    }

    @Autowired
    private NotificationService notificador;

    private static final Logger logger = Logger.getLogger("PartidoService");

    @Autowired
    private  PartidoRepository repositoryPartido;
    private final Map<String, Emparejamiento> estrategias;
    private Emparejamiento emparejamiento;

    @Autowired
    private UsuarioRepository repositoryUsuario;

    @Autowired
    public PartidoService(

            emparejamientoXNivel porNivel,
            emparejamientoXUbicacion porUbicacion,
            emparejamientoXpartidosGanados porPartidos
    ) {

        this.estrategias = new HashMap<>();
        this.estrategias.put("nivel", porNivel);
        this.estrategias.put("ubicacion", porUbicacion);
        this.estrategias.put("partidos", porPartidos);
        this.emparejamiento = porUbicacion;
    }

    public void seleccionar_emparejamiento(String tipo) {
        if (estrategias.containsKey(tipo)) {
            this.emparejamiento = estrategias.get(tipo);
            logger.info("Emparejamiento cambiado a: " + tipo);
        } else {
            logger.warning("Emparejamiento no encontrado: " + tipo);
        }
    }

    public List<Partido> buscar_por_emparejamiento(Object x) {
        if (emparejamiento == null) {
            logger.warning("Estrategia de emparejamiento no seleccionada");
            return List.of();
        }

        List<Partido> partidos = emparejamiento.buscar_partido(x);
        if (partidos == null) {
            logger.warning("La estrategia devolvió null, retornando lista vacía");
            return List.of();
        }

        logger.info("El tamaño de la lista es: " + partidos.size());
        return partidos;
    }

    public List<Partido> buscar_todos_los_partidos() {
        return repositoryPartido.todos_los_partidos();
    }

    @Transactional
    public Boolean crearPartido(NuevoPartido x) {
        logger.info("idddddddddddddddddddddddddddddd" + x.getId_jugadores());
        repositoryPartido.crearPartido(x.getCantidad_jugadores(), x.getDuracion(),
                x.getHorario(), x.getUbicacion(), x.getId_deporte(), x.getDificultad(), x.getcantidadPatidosGanados(),x.getId_jugadores());

        Partido partido = repositoryPartido.obtenerUltimoPartido();

        if(partido != null){
            boolean resultado=agregar_jugador(x.getId_jugadores(),partido.getIdPartido());
            if(resultado==true) {
                notificador.avisar_de_la_creacion(partido);
                List<Usuario> jugadores=repositoryUsuario.findAll();
                for (int i=0; i!= jugadores.size();i++) {
                    if (jugadores.get(i).getDeporte().getIdDeporte() == x.getId_deporte() && x.getId_jugadores()!=jugadores.get(i).getId()) {
                        notificador.avisar_la_creacion_de_partido_deporte(partido, jugadores.get(i));
                    }
                }
                return true;
            }
            else {
                return false;
            }
        }
        return  false;
    }

    public List<Partido> buscar_por_emparejamiento(Object x, Object y, Object z) {
        if (x instanceof Integer && y instanceof String && z instanceof Long) {
            return repositoryPartido.aplicar_todos_los_filtros((Integer) x, (String) y, (Long) z);
        }
        return null;
    }

    @Transactional
    public Boolean actualizar_estado(long id, String nuevo_estado) {
        Optional<Partido> partido= repositoryPartido.findById(id);
        List<Partido_Jugadores> jugadores= partido.get().getJugadores();
        for(int i=0;i!=jugadores.size();i++){

            Optional<Usuario> jugador_a_notificar=repositoryUsuario.findById(jugadores.get(i).getId().getIdUsuario());
            notificador.notificar(partido.get(),jugador_a_notificar.get(),nuevo_estado);
        }

        repositoryPartido.actualizarEstado(partido.get().getIdPartido(), nuevo_estado);


        return partido != null;
    }

    @Transactional
    public Boolean agregar_jugador(long id_user, long id_partido) {
        repositoryPartido.registrar(id_partido, id_user);
        Partido_Jugadores jugador = repositoryPartido.buscar_judaror_en_partido(id_partido, id_user);

        if (jugador != null) {

            Partido partido=repositoryPartido.partido_by_id(id_partido);
            if( repositoryPartido.cant_jugadores(partido.getIdPartido())==partido.getCantidadJugadores()) {
                actualizar_estado(partido.getIdPartido(),"Partido armando");
            }
            return true;
        }
        return false;
    }

    @Transactional
    public void actualizarEstadosAutomaticamente() {
        List<Partido> partidos = repositoryPartido.findAll();
        logger.info("toy aca");
        LocalDateTime ahora = LocalDateTime.now();
        logger.info("hora:"+ahora);
        String nuevoEstado=" ";
        for (Partido p : partidos) {
            LocalDateTime inicio = p.getHorario();
            LocalDateTime fin = inicio.plusMinutes(p.getDuracion());
            nuevoEstado = " ";

            if (ahora.isAfter(fin)) {
                nuevoEstado = "partido terminado";
            } else if (!ahora.isBefore(inicio)) {
                nuevoEstado = "partido iniciado";
            }

            if (!p.getEstadoPartido().equals(nuevoEstado) && !nuevoEstado.equals(" ")) {
                actualizar_estado(p.getIdPartido(), nuevoEstado);
            }
        }
    }
}
