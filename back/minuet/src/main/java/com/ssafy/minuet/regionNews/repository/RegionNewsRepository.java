package com.ssafy.minuet.regionNews.repository;
import com.ssafy.minuet.news.entity.Category;
import com.ssafy.minuet.news.entity.News;
import com.ssafy.minuet.regionNews.entity.Region;
import com.ssafy.minuet.regionNews.entity.RegionNews;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegionNewsRepository extends JpaRepository<RegionNews, Long> {

    //List<RegionNews> findByRegion(@Param(value="region")Region region);
    //Page<RegionNews> findAllByRegion(Region region, Pageable pageable);
    @Query("SELECT n FROM RegionNews n WHERE n.region= :region AND n.id NOT IN(SELECT r.regionNews.id FROM RegionDislike r WHERE r.member.id = :memberId)")
    Page<RegionNews> findAll(@Param("memberId")Long memberId, @Param("region") Region region, Pageable pageable);

    Page<RegionNews> findByTitleContainingOrContentContaining(String title, String content,Pageable pageable);

    //Page<RegionNews> findByTitleContainingOrArticleContaining(String title, String article, Pageable pageable);
}