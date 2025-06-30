package com.uade.tpo.pds.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String nombreUsuario;

    @Column(name = "email")
    private String email;

    @JsonIgnore
    @Column(name = "contraseña")
    private String contraseña;


    private Long nivelJuego;

    public Usuario() {
    }

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_deporte", nullable = false)
    private Deportes deporte;

    @JsonIgnore
    @OneToOne(mappedBy = "usuario", cascade = CascadeType.ALL)
    private Estadisticas estadisticas;

    @JsonIgnore
    @OneToMany(mappedBy = "usuario")
    private List<Partido_Jugadores> partidos;

    public Long getId() {
        return id;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public String getEmail() {
        return email;
    }

    public String getContraseña() {
        return contraseña;
    }

    public long getNivelJuego() {
        return nivelJuego;
    }

    public Deportes getDeporte() {
        return deporte;
    }

    public Estadisticas getEstadisticas() {
        return estadisticas;
    }

    public List<Partido_Jugadores> getPartidos() {
        return partidos;
    }

    public void setId(Long id) {

        this.id = id;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
    }

    public void setNivelJuego(long nivelJuego) {
        this.nivelJuego = nivelJuego;
    }

    public void setDeporte(Deportes deporte) {
        this.deporte = deporte;
    }

    public void setEstadisticas(Estadisticas estadisticas) {
        this.estadisticas = estadisticas;
    }

    public void setPartidos(List<Partido_Jugadores> partidos) {
        this.partidos = partidos;
    }
}
