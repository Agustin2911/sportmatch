package com.uade.tpo.pds.service;

import com.uade.tpo.pds.entity.Partido;
import com.uade.tpo.pds.entity.Usuario;
import com.uade.tpo.pds.repository.PartidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import java.util.List;

@Component("ubicacion")
public class emparejamientoXUbicacion implements Emparejamiento{

    @Autowired
    private PartidoRepository repositoryPartido;


    @Override
    public List<Partido> buscar_partido(Object x) {

        if(x instanceof String) {
            String ubicacion=(String) x;
            return repositoryPartido.emparejamiento_x_ubicacion(ubicacion);
        }
        else {
            return List.of();
        }
    }
}
