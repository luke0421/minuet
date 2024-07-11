package com.ssafy.minuet.hotTopic.repository;

import com.ssafy.minuet.hotTopic.entity.HotTopic;
import com.ssafy.minuet.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HotTopicRepository extends JpaRepository<HotTopic, Long> {
    List<HotTopic> findByMemberId(Long memberId);
}
