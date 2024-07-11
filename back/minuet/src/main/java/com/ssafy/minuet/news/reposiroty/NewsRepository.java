package com.ssafy.minuet.news.reposiroty;


import com.ssafy.minuet.news.entity.Category;
import com.ssafy.minuet.news.entity.News;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {

    Page<News> findAllByCategory(Category category, Pageable pageable);

    @Query("SELECT n FROM News n WHERE n.category= :category AND n.id NOT IN(SELECT l.news.id FROM NewsDislike l WHERE l.member.id = :memberId)")
    Page<News> findAll(@Param("memberId")Long memberId, @Param("category")Category category, Pageable pageable);

    List<News> findByTitleContainingOrContentContaining(String title, String content);

    Page<News> findByTitleContainingOrContentContaining(String title, String content, Pageable pageable);

    @Query("SELECT n FROM News n WHERE n.publishDate = :publishDate ORDER BY n.likeCount DESC limit 10")
    List<News> findByPublishDate(LocalDate publishDate);

    @Query("select n from News n where n.publishDate >= :publishDate and (n.title like %:title% or n.content like %:content%)")
    List<News> findByPublishDateAfterAndTitleContainingOrContentContaining(LocalDate publishDate, String title, String content);
}
