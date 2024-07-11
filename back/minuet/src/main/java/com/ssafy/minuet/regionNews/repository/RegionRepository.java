package com.ssafy.minuet.regionNews.repository;
import com.ssafy.minuet.regionNews.entity.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RegionRepository extends JpaRepository<Region, Long> {
    public Optional<Region> findByRegionName(String regionName);

    public boolean existsByRegionName(String regionName);
}