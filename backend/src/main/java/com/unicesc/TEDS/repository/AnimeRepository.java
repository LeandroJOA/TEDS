package com.unicesc.TEDS.repository;

import com.unicesc.TEDS.domain.Anime;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimeRepository extends PagingAndSortingRepository<Anime, String> {

}
