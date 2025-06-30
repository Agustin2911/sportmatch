package com.uade.tpo.pds.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Dificultades {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDificultad;

    private String dificultad;

    @JsonIgnore
    @OneToMany(mappedBy = "dificultad")
    private List<Partido> partidos;

    public Dificultades() {
    }

    public Long getIdDificultad() {
        return idDificultad;
    }

    public String getDificultad() {
        return dificultad;
    }

    public List<Partido> getPartidos() {
        return partidos;
    }

    public void setIdDificultad(Long idDificultad) {
        this.idDificultad = idDificultad;
    }

    public void setDificultad(String dificultad) {
        this.dificultad = dificultad;
    }

    public void setPartidos(List<Partido> partidos) {
        this.partidos = partidos;
    }
}