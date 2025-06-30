package com.uade.tpo.pds.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Deportes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDeporte;

    private String nombre;

    @Column(length = 2000)
    private String reglamento;

    @JsonIgnore
    @OneToMany(mappedBy = "deporte")
    private List<Usuario> usuarios;

    @JsonIgnore
    @OneToMany(mappedBy = "deporte")
    private List<Partido> partidos;


    public Deportes() {
    }

    public Long getIdDeporte() {
        return idDeporte;
    }

    public String getNombre() {
        return nombre;
    }

    public String getReglamento() {
        return reglamento;
    }

    public List<Usuario> getUsuarios() {
        return usuarios;
    }

    public List<Partido> getPartidos() {
        return partidos;
    }

    public void setIdDeporte(Long idDeporte) {
        this.idDeporte = idDeporte;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setReglamento(String reglamento) {
        this.reglamento = reglamento;
    }

    public void setUsuarios(List<Usuario> usuarios) {
        this.usuarios = usuarios;
    }

    public void setPartidos(List<Partido> partidos) {
        this.partidos = partidos;
    }
}
