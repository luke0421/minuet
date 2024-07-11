package com.ssafy.minuet.preSearch.service;

import com.ssafy.minuet.member.entity.Member;
import com.ssafy.minuet.member.repository.MemberRepository;
import com.ssafy.minuet.preSearch.dto.PreSearchRequestDto;
import com.ssafy.minuet.preSearch.dto.PreSearchResponseDto;
import com.ssafy.minuet.preSearch.entity.PreSearch;
import com.ssafy.minuet.preSearch.repository.PreSearchRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class PreSearchServiceImpl implements PreSearchService{

    private final MemberRepository memberRepository;
    private final PreSearchRepository preSearchRepository;

    @Override
    @Transactional
    public void addWord(PreSearchRequestDto.add reqDto) {
        Member member = memberRepository.findById(reqDto.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("[PreSearchServiceImpl.add] 해당 member가 없습니다."));

        PreSearch preSearch = PreSearch.builder()
                .word(reqDto.getWord())
                .build();

        //10개 이상이면 하나 지우고 하기
        if(member.getPreSearches().size() >= 10){
            member.getPreSearches().remove(0);
        }

        member.addPreSearch(preSearch);

        preSearchRepository.save(preSearch);
    }

    @Override
    public PreSearchResponseDto.list wordList(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("[PreSearchServiceImpl.list] 해당 member가 없습니다."));

        //Sort sort = Sort.by(Sort.Direction.DESC, "id");

        //List<PreSearch> preSearches = preSearchRepository.findByMember(member, sort);

        List<PreSearch> preSearches = member.getPreSearches();
        Collections.reverse(preSearches);

        PreSearchResponseDto.list list = PreSearchResponseDto.list.builder().build();
        for(PreSearch pre : preSearches){
            list.getWords().add(pre.getWord());
        }
        return list;

    }
}
