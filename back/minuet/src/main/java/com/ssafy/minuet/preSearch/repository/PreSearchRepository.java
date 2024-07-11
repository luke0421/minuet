package com.ssafy.minuet.preSearch.repository;


import com.ssafy.minuet.member.entity.Member;
import com.ssafy.minuet.preSearch.entity.PreSearch;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PreSearchRepository extends JpaRepository<PreSearch, Long> {

    public List<PreSearch> findByMember(Member member);

    public List<PreSearch> findByMember(Member member, Sort sort);

    public Optional<PreSearch> findByMemberAndWord(Member member, String word);

}
