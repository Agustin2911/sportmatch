package com.uade.tpo.pds.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Partido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPartido;

    private int cantidadJugadores;

    private long duracion;

    private LocalDateTime horario;

    private String ubicacion;

    private String estadoPartido;

    private int cantidadPatidosGanados;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id", nullable = false)
    private Usuario id_usuario;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_deporte", nullable = false)
    private Deportes deporte;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "dificultad", nullable = false)
    private Dificultades dificultad;


    @OneToMany(mappedBy = "partido",fetch = FetchType.EAGER)
    private List<Partido_Jugadores> jugadores;

    public Partido() {
    }

    public Long getIdPartido() {
        return idPartido;
    }

    public int getCantidadJugadores() {
        return cantidadJugadores;
    }

    public long getDuracion() {
        return duracion;
    }

    public LocalDateTime getHorario() {
        return horario;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public String getEstadoPartido() {
        return estadoPartido;
    }

    public Deportes getDeporte() {
        return deporte;
    }

    public Dificultades getDificultad() {
        return dificultad;
    }

    public List<Partido_Jugadores> getJugadores() {
        return jugadores;
    }

    public int getCantidadPatidosGanados() {
        return cantidadPatidosGanados;
    }

    public void setIdPartido(Long idPartido) {
        this.idPartido = idPartido;
    }

    public void setCantidadJugadores(int cantidadJugadores) {
        this.cantidadJugadores = cantidadJugadores;
    }

    public void setDuracion(long duracion) {
        this.duracion = duracion;
    }

    public void setHorario(LocalDateTime horario) {
        this.horario = horario;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public void setEstadoPartido(String estadoPartido) {
        this.estadoPartido = estadoPartido;
    }

    public void setDeporte(Deportes deporte) {
        this.deporte = deporte;
    }

    public void setDificultad(Dificultades dificultad) {
        this.dificultad = dificultad;
    }

    public void setJugadores(List<Partido_Jugadores> jugadores) {
        this.jugadores = jugadores;
    }



    public void setCantidadPatidosGanados(int cantidadPatidosGanados) {
        this.cantidadPatidosGanados = cantidadPatidosGanados;
    }

    public Usuario getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(Usuario id_usuario) {
        this.id_usuario = id_usuario;
    }
}
