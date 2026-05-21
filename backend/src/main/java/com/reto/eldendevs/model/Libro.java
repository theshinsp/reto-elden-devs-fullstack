package com.reto.eldendevs.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
    private Integer anioPublicacion;

    @Column(nullable=false)
    private String genero;

    @Column(nullable=false)
    private String isbn;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="autor_id", nullable=false)
    private Autor autor;

    public Libro() {}

    public Libro(Long id, String titulo, Integer anioPublicacion, String genero, String isbn, Autor autor) {
        this.id = id;
        this.titulo = titulo;
        this.anioPublicacion = anioPublicacion;
        this.genero = genero;
        this.isbn = isbn;
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

    public Integer getAnioPublicacion() {
        return anioPublicacion;
    }

    public void setAnioPublicacion(Integer anioPublicacion) {
        this.anioPublicacion = anioPublicacion;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    @JsonIgnore
    public Autor getAutor() {
        return autor;
    }

    public void setAutor(Autor autor) {
        this.autor = autor;
    }

    public Long getAutorId() {
        return autor != null ? autor.getId() : null;
    }

    public String getAutorNombre() {
        return autor != null ? autor.getAutor() : null;
    }
}
