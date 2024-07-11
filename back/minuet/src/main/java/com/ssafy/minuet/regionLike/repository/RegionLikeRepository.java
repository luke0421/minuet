package com.ssafy.minuet.regionLike.repository;

import com.ssafy.minuet.member.entity.Member;
import com.ssafy.minuet.regionLike.entity.RegionLike;
import com.ssafy.minuet.regionNews.entity.RegionNews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RegionLikeRepository extends JpaRepository <RegionLike,Long>{
    Optional<RegionLike> findByMemberAndRegionNews(Member member, RegionNews regionNews);
}
