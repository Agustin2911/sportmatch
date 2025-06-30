package com.uade.tpo.pds.repository;

import com.uade.tpo.pds.entity.Deportes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface DeporteRepository extends JpaRepository<Deportes, Long> {


    @Query(value = "select * from deportes where nombre=?1",nativeQuery = true)
    Optional<Deportes> findByNombre(String nombre);
}