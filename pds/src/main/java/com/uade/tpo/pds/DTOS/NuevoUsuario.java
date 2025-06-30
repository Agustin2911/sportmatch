package com.uade.tpo.pds.DTOS;



public class NuevoUsuario {
    private String nombreUsuario;
    private String email;
    private String contraseña;
    private String deporteFavorito; // se busca por nombre
    private Long nivelJuego;

    public NuevoUsuario() {
    }

    public NuevoUsuario(String nombreUsuario, String email, String contraseña, String deporteFavorito, long nivelJuego) {
        this.nombreUsuario = nombreUsuario;
        this.email = email;
        this.contraseña = contraseña;
        this.deporteFavorito = deporteFavorito;
        this.nivelJuego = nivelJuego;
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

    public String getDeporteFavorito() {
        return deporteFavorito;
    }

    public Long getNivelJuego() {
        return nivelJuego;
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

    public void setDeporteFavorito(String deporteFavorito) {
        this.deporteFavorito = deporteFavorito;
    }

    public void setNivelJuego(Long nivelJuego) {
        this.nivelJuego = nivelJuego;
    }
}
