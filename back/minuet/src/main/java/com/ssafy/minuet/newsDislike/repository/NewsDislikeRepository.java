package com.ssafy.minuet.newsDislike.repository;

import com.ssafy.minuet.member.entity.Member;
import com.ssafy.minuet.news.entity.News;
import com.ssafy.minuet.newsDislike.entity.NewsDislike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NewsDislikeRepository extends JpaRepository<NewsDislike, Long> {
    Optional<NewsDislike> findByMemberAndNews(Member member, News news);
}
