package com.uade.tpo.pds.service;

import com.uade.tpo.pds.entity.Partido;
import com.uade.tpo.pds.entity.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    private final List<Observer> observers;

    @Autowired
    public NotificationService(List<Observer> observers) {
        this.observers = observers;
    }

    public void notificar(Partido partido,Usuario usuario, String estado) {
        for (Observer o : observers) {
            o.actualizar(partido,usuario,estado);
        }
    }
    public void avisar_de_la_creacion(Partido partido){
        for (Observer o : observers) {
            o.avisar_la_creacion(partido);
        }
    }

    public void avisar_la_creacion_de_partido_deporte(Partido partido, Usuario usuario){
        for (Observer o : observers) {
            o.avisar_la_creacion_de_partido_deporte(partido,usuario);
        }
    }
}