package com.ssafy.minuet.hotTopic.service;

import com.ssafy.minuet.hotTopic.dto.HotTopicRequestDto;
import com.ssafy.minuet.hotTopic.dto.HotTopicResponseDto;
import com.ssafy.minuet.hotTopic.entity.HotTopic;
import com.ssafy.minuet.hotTopic.repository.HotTopicRepository;
import com.ssafy.minuet.member.entity.Member;
import com.ssafy.minuet.member.repository.MemberRepository;
import com.ssafy.minuet.news.dto.NewsResponseDto;
import com.ssafy.minuet.news.entity.News;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class HotTopicServiceImpl implements HotTopicService{

    private final HotTopicRepository hotTopicRepository;
    private final MemberRepository memberRepository;

    //@Operation(summary = )

    @Override
    public List<HotTopicResponseDto.hotTopicList> hotTopic(HotTopicRequestDto.hotTopic reqDto){
        log.info("[HotTopicServiceImpl.hotTopic] start...");
        //member가 hotTopic을 가지고 있을지 , 그냥 id로 해당 hotTopic을 바로 찾을지는 고민이 됨

        //List<HotTopic> hotTopicNews  = hotTopicRepository.findByMemberId(reqDto.getMemberId());
        Member member = memberRepository.findById(reqDto.getMemberId())
                            .orElseThrow(()-> new IllegalArgumentException("no such member. MemberId:"+reqDto.getMemberId()));

        List<HotTopic> hotTopic = member.getMyHotTopicList();
        List<HotTopicResponseDto.hotTopicList> list = new ArrayList<>();

        for(HotTopic n : hotTopic){
            list.add(HotTopicResponseDto.hotTopicList.builder()
                    .newsId(n.getId())
                    .title(n.getTitle())
                    .content(n.getContent())
                    .publishDate(n.getPublishDate())
                    .build());
        }

        log.info("[HotTopicServiceImpl.hotTopic] end...");
        return list;
    }
}