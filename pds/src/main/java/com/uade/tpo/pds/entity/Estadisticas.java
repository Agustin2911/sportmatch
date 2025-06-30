package com.uade.tpo.pds.entity;

import jakarta.persistence.*;

@Entity
public class Estadisticas {

    @Id
    private Long idUsuario;

    private int partidosGanados;

    private int partidosPerdidos;

    private int partidosEmpatados;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    public Estadisticas() {

    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public int getPartidosGanados() {
        return partidosGanados;
    }

    public int getPartidosPerdidos() {
        return partidosPerdidos;
    }

    public int getPartidosEmpatados() {
        return partidosEmpatados;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public void setPartidosGanados(int partidosGanados) {
        this.partidosGanados = partidosGanados;
    }

    public void setPartidosPerdidos(int partidosPerdidos) {
        this.partidosPerdidos = partidosPerdidos;
    }

    public void setPartidosEmpatados(int partidosEmpatados) {
        this.partidosEmpatados = partidosEmpatados;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}