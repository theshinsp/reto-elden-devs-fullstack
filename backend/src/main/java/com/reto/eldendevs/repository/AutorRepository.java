package com.reto.eldendevs.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.reto.eldendevs.model.Autor;
public interface AutorRepository extends JpaRepository<Autor, Long>{
    
}
