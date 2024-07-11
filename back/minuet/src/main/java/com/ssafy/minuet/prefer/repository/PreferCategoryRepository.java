package com.ssafy.minuet.prefer.repository;

import com.ssafy.minuet.member.entity.Member;
import com.ssafy.minuet.news.entity.Category;
import com.ssafy.minuet.newsLike.entity.NewsLike;
import com.ssafy.minuet.prefer.entity.PreferCategory;
import com.ssafy.minuet.prefer.service.PreferCategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface PreferCategoryRepository extends JpaRepository<PreferCategory, Long> {

    List<PreferCategory> findByMember(Member member);

    Optional<PreferCategory> findByMemberAndCategory(Member member, Category category);
}
