package com.ssafy.minuet.regionDisLike.repository;

import com.ssafy.minuet.member.entity.Member;
import com.ssafy.minuet.regionDisLike.entity.RegionDislike;
import com.ssafy.minuet.regionNews.entity.RegionNews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RegionDislikeRepository extends JpaRepository<RegionDislike, Long> {
    Optional<RegionDislike> findByMemberAndRegionNews(Member member, RegionNews regionNews);
}
