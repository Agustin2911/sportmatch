package com.uade.tpo.pds.service;

import com.uade.tpo.pds.entity.Partido;
import com.uade.tpo.pds.entity.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class NotificadorPush implements Observer {

    private pushService pushStrategy;

    public NotificadorPush( pushService pushService){
        this.pushStrategy=pushService;
    }

    @Override
    public void actualizar(Partido partido, Usuario usuario, String estado) {
        pushStrategy.actualizar(partido, usuario, estado);
    }

    @Override
    public void avisar_la_creacion(Partido partido) {
        pushStrategy.avisar_la_creacion(partido);
    }

    @Override
    public void avisar_la_creacion_de_partido_deporte(Partido partido, Usuario usuario) {
        pushStrategy.avisar_la_creacion_de_partido_deporte(partido, usuario);
    }
}
