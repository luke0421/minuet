package com.ssafy.minuet.festival.repository;

import com.ssafy.minuet.festival.entity.Festival;
import com.ssafy.minuet.regionNews.entity.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FestivalRepository extends JpaRepository<Festival, Long> {

    List<Festival> findByRegion(Region region);
}
