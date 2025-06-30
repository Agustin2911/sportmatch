package com.uade.tpo.pds.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class Partido_Jugadores {

    @JsonIgnore
    @EmbeddedId
    private PartidoJugadorId id;

    @JsonIgnore
    @ManyToOne
    @MapsId("idPartido")
    @JoinColumn(name = "id_partido")
    private Partido partido;


    @ManyToOne
    @MapsId("idUsuario")
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    public Partido_Jugadores() {
    }

    public PartidoJugadorId getId() {
        return id;
    }

    public Partido getPartido() {
        return partido;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setId(PartidoJugadorId id) {
        this.id = id;
    }

    public void setPartido(Partido partido) {
        this.partido = partido;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}