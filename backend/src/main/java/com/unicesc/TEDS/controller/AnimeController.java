package com.unicesc.TEDS.controller;

import com.unicesc.TEDS.canonical.AnimeCanonical;
import com.unicesc.TEDS.domain.Anime;
import com.unicesc.TEDS.service.AnimeService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/animes")
public class AnimeController {

    @Autowired
    private AnimeService animeService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Anime save(@RequestBody AnimeCanonical canonical) {
        Anime anime = new Anime();
        BeanUtils.copyProperties(canonical, anime);
        animeService.save(anime);

        return anime;
    }

    @GetMapping
    public List<Anime> findAll() {
        return animeService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity findById(@PathVariable String id) {
        Optional<Anime> optional = animeService.findById(id);

        return optional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity merge(@PathVariable String id, @RequestBody AnimeCanonical canonical) {
        Optional<Anime> optional = animeService.findById(id);

        if (optional.isEmpty()) {
            Map<String, Object> body = new HashMap<>();
            body.put("message", "ID [" + id + "] não encotrado!");

            return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
        }

        Anime anime = optional.get();
        anime.setStatus(canonical.getStatus());
        anime.setScore(canonical.getScore());

        return new ResponseEntity(animeService.merge(anime), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable String id) {
        animeService.delete(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
