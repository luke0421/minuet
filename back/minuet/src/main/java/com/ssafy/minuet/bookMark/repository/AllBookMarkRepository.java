package com.ssafy.minuet.bookMark.repository;

import com.ssafy.minuet.bookMark.entity.AllBookMark;
import com.ssafy.minuet.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AllBookMarkRepository extends JpaRepository<AllBookMark, Long> {
    public Page<AllBookMark> findByMember(Member member, Pageable pageable);
}
