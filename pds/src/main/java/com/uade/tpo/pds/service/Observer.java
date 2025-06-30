package com.uade.tpo.pds.service;

import com.uade.tpo.pds.entity.Partido;
import com.uade.tpo.pds.entity.Usuario;

public interface Observer {
    void actualizar(Partido partido,Usuario usuario, String estado);

    void avisar_la_creacion(Partido partido);


    void avisar_la_creacion_de_partido_deporte(Partido partido, Usuario usuario);
}
