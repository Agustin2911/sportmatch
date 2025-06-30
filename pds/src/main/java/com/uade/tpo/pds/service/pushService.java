package com.uade.tpo.pds.service;

import com.uade.tpo.pds.entity.Partido;
import com.uade.tpo.pds.entity.Usuario;
import com.uade.tpo.pds.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.logging.Logger;
@Service
public class pushService {

    private static final Logger logger = Logger.getLogger("pushService");

    @Autowired
    private UsuarioRepository repositorioUsuario;

    public void actualizar(Partido partido, Usuario usuario, String estado) {
        logger.info(
                String.format(
                        "📌 %s: el estado de su partido en %s a las %s ha cambiado a '%s'.",
                        usuario.getNombreUsuario(),
                        partido.getUbicacion(),
                        partido.getHorario(),
                        estado
                )
        );
    }


    public void avisar_la_creacion(Partido partido) {
        Optional<Usuario> usuario=repositorioUsuario.findById(partido.getId_usuario().getId());
        if(usuario.isPresent()) {
            logger.info(
                    String.format(
                            "✅ %s: tu partido del día %s en %s se ha creado exitosamente.",
                            usuario.get().getNombreUsuario(),
                            partido.getHorario(),
                            partido.getUbicacion()
                    )
            );
        }
        }


    public void avisar_la_creacion_de_partido_deporte(Partido partido, Usuario usuario) {
        logger.info(
                String.format(
                        "📣 %s: se ha creado un nuevo partido del deporte que te gusta el %s en la ciudad de %s. ¡Sumate!",
                        usuario.getNombreUsuario(),
                        partido.getHorario(),
                        partido.getUbicacion()
                )
        );
    }

}
