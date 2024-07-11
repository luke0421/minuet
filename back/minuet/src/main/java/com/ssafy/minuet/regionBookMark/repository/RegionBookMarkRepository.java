package com.ssafy.minuet.regionBookMark.repository;

import com.ssafy.minuet.bookMark.entity.BookMark;
import com.ssafy.minuet.regionBookMark.entity.RegionBookMark;
import com.ssafy.minuet.member.entity.Member;
import com.ssafy.minuet.news.entity.News;
import com.ssafy.minuet.regionNews.entity.RegionNews;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RegionBookMarkRepository extends JpaRepository<RegionBookMark, Long> {

    Page<RegionBookMark> findByMember(Member member, Pageable pageable);

    public Optional<RegionBookMark> findByMemberAndRegionNews(Member member, RegionNews News);
}
