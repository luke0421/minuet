package com.ssafy.minuet.briefing.repository;

import com.ssafy.minuet.briefing.entity.Briefing;
import com.ssafy.minuet.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BriefingRepository extends JpaRepository<Briefing, Long> {


    Optional<Briefing> findByMemberAndId(Member member, Long id);

}
