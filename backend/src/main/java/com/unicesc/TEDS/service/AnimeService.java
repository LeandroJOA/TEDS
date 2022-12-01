package com.unicesc.TEDS.service;

import com.unicesc.TEDS.domain.Anime;
import com.unicesc.TEDS.repository.AnimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AnimeService {

    @Autowired
    private AnimeRepository animeRepository;

    public Anime save(Anime anime) {
        anime.setId(UUID.randomUUID().toString());

        return animeRepository.save(anime);
    }

    public List<Anime> findAll() {
        List<Anime> animes = new ArrayList<>();
        animeRepository.findAll().iterator().forEachRemaining(animes::add);

        return animes;
    }

    public Optional<Anime> findById(String id) {
        return animeRepository.findById(id);
    }

    public Anime merge(Anime anime) {
        return animeRepository.save(anime);
    }

    public void delete(String id) {
        animeRepository.deleteById(id);
    }

}
