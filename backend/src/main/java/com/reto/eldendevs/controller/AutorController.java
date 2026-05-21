package com.reto.eldendevs.controller;

import com.reto.eldendevs.model.Autor;
import com.reto.eldendevs.repository.AutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/autores")
@CrossOrigin(origins = "http://localhost:4200")
public class AutorController {

    @Autowired
    private AutorRepository repo;

    @GetMapping
    public List<Autor> getAll() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Autor> getById(@PathVariable Long id) {
        return repo.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Autor> create(@RequestBody Autor autor) {
        Autor saved = repo.save(autor);
        return ResponseEntity.status(201).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Autor> update(@PathVariable Long id,
                                        @RequestBody Autor autor) {
        if (!repo.existsById(id))
            return ResponseEntity.notFound().build();
        autor.setId(id);
        return ResponseEntity.ok(repo.save(autor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id))
            return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}