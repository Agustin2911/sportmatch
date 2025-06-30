package com.uade.tpo.pds.service;

import com.uade.tpo.pds.entity.Partido;
import com.uade.tpo.pds.entity.Usuario;
import com.uade.tpo.pds.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EmailService implements AdapterEmail {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private UsuarioRepository repositorioUsuario;

    @Override
    public void crear_partido(Partido partido){
        Optional<Usuario> usuario=repositorioUsuario.findById(partido.getId_usuario().getId());
        if(usuario.isPresent()) {
            SimpleMailMessage mensaje = new SimpleMailMessage();
            mensaje.setTo(usuario.get().getEmail());
            mensaje.setSubject("🎉 ¡Tu partido ha sido creado con éxito!");
            mensaje.setText(
                    "Hola " + usuario.get().getNombreUsuario() + ",\n\n" +
                            "¡Felicitaciones! Tu partido ha sido creado exitosamente.\n\n" +
                            "📍 Ubicación: " + partido.getUbicacion() + "\n" +
                            "📅 Fecha y hora: " + partido.getHorario() + "\n\n" +
                            "¡Te deseamos mucha suerte y que disfrutes el encuentro!\n\n" +
                            "Saludos,\n" +
                            "El equipo de SportsMatch"
            );
            mensaje.setFrom("agustinezequielromer2004@gmail.com");

            javaMailSender.send(mensaje);
        }
    }

    @Override
    public void actualizar(Partido partido,Usuario usuario, String estado ){

            SimpleMailMessage mensaje = new SimpleMailMessage();
            mensaje.setTo(usuario.getEmail());
        mensaje.setSubject("🔄 Actualización del estado de tu partido");
        mensaje.setText(
                "Hola " + usuario.getNombreUsuario() + ",\n\n" +
                        "Queremos informarte que el estado de tu partido ha cambiado.\n\n" +
                        "📍 Ubicación: " + partido.getUbicacion() + "\n" +
                        "📅 Fecha y hora: " + partido.getHorario() + "\n" +
                        "📌 Nuevo estado: " + estado + "\n\n" +
                        "Revisá la aplicación para más detalles.\n\n" +
                        "Saludos,\n" +
                        "El equipo de SportsMatch"
        );
            mensaje.setFrom("agustinezequielromer2004@gmail.com");

            javaMailSender.send(mensaje);

    }

    public void avisar_la_creacion_de_partido_deporte(Partido partido, Usuario usuario){
        SimpleMailMessage mensaje = new SimpleMailMessage();
        mensaje.setTo(usuario.getEmail());
        mensaje.setSubject("⚽ ¡Nuevo partido de tu deporte favorito!");
        mensaje.setText(
                "Hola " + usuario.getNombreUsuario() + ",\n\n" +
                        "¡Tenemos buenas noticias! Se ha creado un nuevo partido del deporte que te apasiona.\n\n" +
                        "📅 Fecha y hora: " + partido.getHorario() + "\n" +
                        "📍 Ciudad: " + partido.getUbicacion() + "\n\n" +
                        "¡No pierdas la oportunidad de participar!\n\n" +
                        "Saludos,\n" +
                        "El equipo de SportsMatch"
        );
        mensaje.setFrom("agustinezequielromer2004@gmail.com");

        javaMailSender.send(mensaje);
    }

}