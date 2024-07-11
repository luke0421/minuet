package com.ssafy.minuet.bookMark.repository;

import com.ssafy.minuet.bookMark.dto.BookMarkResponseDto;
import com.ssafy.minuet.bookMark.entity.BookMark;
import com.ssafy.minuet.member.entity.Member;
import com.ssafy.minuet.news.entity.News;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookMarkRepository extends JpaRepository<BookMark, Long> {

    public List<BookMark> findByMember(Member member);

    public Optional<BookMark> findByMemberAndNews(Member member, News news);

    Page<BookMark> findByMember(Member member, Pageable pageable);
}
