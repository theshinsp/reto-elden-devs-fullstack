package com.reto.eldendevs.controller;

import com.reto.eldendevs.model.Libro;
import com.reto.eldendevs.repository.LibroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/libros")
public class LibroController {

    @Autowired
    private LibroRepository repo;

    @GetMapping
    public List<Libro> getAll() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Libro> getById(@PathVariable Long id) {
        return repo.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/autor/{autorId}")
    public List<Libro> getByAutor(@PathVariable Long autorId) {
        return repo.findByAutorId(autorId);
    }

    @PostMapping
    public ResponseEntity<Libro> create(@RequestBody Libro libro) {
        Libro saved = repo.save(libro);
        return ResponseEntity.status(201).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Libro> update(@PathVariable Long id,
                                        @RequestBody Libro libro) {
        if (!repo.existsById(id))
            return ResponseEntity.notFound().build();
        libro.setId(id);
        return ResponseEntity.ok(repo.save(libro));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id))
            return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
