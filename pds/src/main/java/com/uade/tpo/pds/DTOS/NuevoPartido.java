package com.uade.tpo.pds.DTOS;

import java.time.LocalDateTime;

public class NuevoPartido {


    private int cantidad_jugadores;

    private float duracion;

    private String estado_partido;

    private LocalDateTime horario;

    private String ubicacion ;
    private long id_deporte;

    private long dificultad;

    private int cantidadPatidosGanados;

    private  long id_jugadores;


    public NuevoPartido() {
    }

    public NuevoPartido(int cantidad_jugadores, float duracion, String estado_partido, LocalDateTime horario, String ubicacion, long id_deporte, long dificultad, int cantidadPatidosGanados,long id) {
        this.cantidad_jugadores = cantidad_jugadores;
        this.duracion = duracion;
        this.estado_partido = estado_partido;
        this.horario = horario;
        this.ubicacion = ubicacion;
        this.id_deporte = id_deporte;
        this.dificultad = dificultad;
        this.cantidadPatidosGanados = cantidadPatidosGanados;
        this.id_jugadores=id;
    }

    public int getCantidad_jugadores() {
        return cantidad_jugadores;
    }

    public float getDuracion() {
        return duracion;
    }

    public String getEstado_partido() {
        return estado_partido;
    }

    public LocalDateTime getHorario() {
        return horario;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public long getId_deporte() {
        return id_deporte;
    }

    public long getDificultad() {
        return dificultad;
    }

    public int getcantidadPatidosGanados() {
        return cantidadPatidosGanados;
    }

    public void setCantidad_jugadores(int cantidad_jugadores) {
        this.cantidad_jugadores = cantidad_jugadores;
    }

    public void setDuracion(float duracion) {
        this.duracion = duracion;
    }

    public void setEstado_partido(String estado_partido) {
        this.estado_partido = estado_partido;
    }

    public void setHorario(LocalDateTime horario) {
        this.horario = horario;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public void setId_deporte(long id_deporte) {
        this.id_deporte = id_deporte;
    }

    public void setDificultad(long dificultad) {
        this.dificultad = dificultad;
    }

    public void setcantidadPatidosGanados(int cantidadPatidosGanados) {
        this.cantidadPatidosGanados = cantidadPatidosGanados;
    }



    public long getId_jugadores() {
        return id_jugadores;
    }



    public void setId_jugadores(long id_jugadores) {
        this.id_jugadores = id_jugadores;
    }
}
