package com.uade.tpo.pds.service;

import com.uade.tpo.pds.entity.Partido;
import com.uade.tpo.pds.entity.Usuario;
import com.uade.tpo.pds.repository.PartidoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;


@Component("partidos")
public class emparejamientoXpartidosGanados implements Emparejamiento {

    private static final Logger logger = Logger.getLogger("emparejamientoXpartidosGanados");

    @Autowired
    private PartidoRepository repositorypartido;

    @Override
    public List<Partido> buscar_partido(Object x) {
        logger.info("Tipo recibido: " + x.getClass());

        try {
            Integer partidos_ganados = (x instanceof Integer) ? (Integer) x : Integer.parseInt(x.toString());
            logger.info("Número de partidos ganados: " + partidos_ganados);
            List<Partido> partido = repositorypartido.emparejamiento_x_partidos_ganados(partidos_ganados);
            return partido != null ? partido : List.of();
        } catch (NumberFormatException | ClassCastException e) {
            logger.warning("Error al convertir el parámetro a Integer: " + e.getMessage());
            return List.of();
        }
    }
}