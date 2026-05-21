package com.reto.eldendevs.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.reto.eldendevs.model.Libro;

public interface LibroRepository extends JpaRepository<Libro, Long>{
    List<Libro> findByAutorId(Long autorId);
}
