package com.ssafy.minuet.newsLike.repository;

import com.ssafy.minuet.member.entity.Member;
import com.ssafy.minuet.news.entity.News;
import com.ssafy.minuet.newsDislike.entity.NewsDislike;
import com.ssafy.minuet.newsLike.entity.NewsLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NewsLikeRepository extends JpaRepository<NewsLike, Long> {
    Optional<NewsLike> findByMemberAndNews(Member member, News news);
}
