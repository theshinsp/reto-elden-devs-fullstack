package com.reto.eldendevs.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="libros")
public class Libro {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String titulo;

    @Column(name="anio_publicacion")
    private Integer aniopublicacion;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="autor_id", nullable=false)
    private Autor autor;

    public Libro(Long id, String titulo, Integer aniopublicacion, Autor autor) {
        this.id = id;
        this.titulo = titulo;
        this.aniopublicacion = aniopublicacion;
        this.autor = autor;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Integer getAniopublicacion() {
        return aniopublicacion;
    }

    public void setAniopublicacion(Integer aniopublicacion) {
        this.aniopublicacion = aniopublicacion;
    }

    public Autor getAutor() {
        return autor;
    }

    public void setAutor(Autor autor) {
        this.autor = autor;
    }

    
}
