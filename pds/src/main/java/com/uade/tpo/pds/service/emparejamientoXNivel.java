package com.uade.tpo.pds.service;

import com.uade.tpo.pds.entity.Partido;
import com.uade.tpo.pds.entity.Usuario;
import com.uade.tpo.pds.repository.PartidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Component("nivel")
public class emparejamientoXNivel implements Emparejamiento {

    private static final Logger logger = Logger.getLogger("emparejamientoXNivel");

    @Autowired
    private PartidoRepository repositoryPartido;

    @Override
    public List<Partido> buscar_partido(Object x) {
        logger.info("Tipo recibido: " + x.getClass());

        try {
            Long id = (x instanceof Long) ? (Long) x : Long.parseLong(x.toString());
            return repositoryPartido.emparejamiento_x_nivel(id);
        } catch (NumberFormatException | ClassCastException e) {
            logger.warning("Error al convertir el parámetro a Long: " + e.getMessage());
            return List.of();
        }
    }
}