package com.uade.tpo.pds.entity;

import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class PartidoJugadorId implements Serializable {
    private Long idPartido;
    private Long idUsuario;

    public Long getIdPartido() {
        return idPartido;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdPartido(Long idPartido) {
        this.idPartido = idPartido;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }
}