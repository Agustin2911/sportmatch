package com.uade.tpo.pds.security;

import com.uade.tpo.pds.entity.Deportes;
import com.uade.tpo.pds.entity.Estadisticas;
import com.uade.tpo.pds.service.UsuarioService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.logging.Logger;

@Component
public class JwtUtil {
    private static final Logger logger = Logger.getLogger(UsuarioService.class.getName());
    private final String SECRET_KEY = "estoesunaclavesupersecretaquedebetenermasde64caracteres1234567890abcDEFw"; // podés moverla a application.properties
    private final long EXPIRATION_TIME = 360000000; // 1 hora

    public String generateToken(String username, long id_user, String email, long nivel_de_juego, Deportes deporte, Estadisticas estadistica) {

        return Jwts.builder()
                .setSubject(username)
                .claim("username",username)
                .claim("id_user",id_user)
                .claim("email",email)
                .claim("nivel_de_juego",nivel_de_juego)
                .claim("deporte",deporte.getNombre())
                .claim("estadistica",estadistica)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}