package com.uade.tpo.pds.service;

import com.uade.tpo.pds.entity.Partido;
import com.uade.tpo.pds.entity.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class NotificadorEmail implements  Observer{

    private final AdapterEmail adapterEmail;

    @Autowired
    public NotificadorEmail(AdapterEmail adapterEmail) {
        this.adapterEmail = adapterEmail;
    }

    @Override
    public void avisar_la_creacion(Partido partido){
        adapterEmail.crear_partido(partido);
    }

    @Override
    public void actualizar(Partido partido,Usuario usuario, String estado) {
        adapterEmail.actualizar(partido,usuario,estado); // El adapter llama a JavaMail o cualquier librería futura
    }

    @Override
    public void avisar_la_creacion_de_partido_deporte(Partido partido, Usuario usuario){
        adapterEmail.avisar_la_creacion_de_partido_deporte(partido,usuario);
    }

}
