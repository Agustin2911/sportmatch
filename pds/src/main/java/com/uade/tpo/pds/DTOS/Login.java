package com.uade.tpo.pds.DTOS;

public class Login {

    private String email;
    private String contraseña;

    public Login() {
    }

    public Login(String nombreUsuario, String contraseña) {
        this.email = nombreUsuario;
        this.contraseña = contraseña;
    }


    public String getEmail() {
        return email;
    }

    public String getContraseña() {
        return contraseña;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
    }
}
