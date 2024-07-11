package com.ssafy.minuet.briefing.service;

import com.ssafy.minuet.briefing.dto.BriefingRequestDto;
import com.ssafy.minuet.briefing.dto.BriefingResponseDto;
import com.ssafy.minuet.briefing.entity.Briefing;
import com.ssafy.minuet.briefing.repository.BriefingRepository;
import com.ssafy.minuet.member.entity.Member;
import com.ssafy.minuet.member.repository.MemberRepository;
import com.ssafy.minuet.news.entity.Category;
import com.ssafy.minuet.news.reposiroty.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class BriefingServiceImpl implements BriefingService {

    private final BriefingRepository briefingRepository;
    private final MemberRepository memberRepository;
    private final CategoryRepository categoryRepository;

    //==========브리핑 추가========//
    @Transactional
        @Override
        public void addBriefing(BriefingRequestDto.briefingAdd reqDto) {
            log.info("[BriefingServiceImpl.addBriefing] start...");

            //연관시킬 member, briefingId찾기
            Member member = memberRepository.findById(reqDto.getMemberId())
                    .orElseThrow(() -> new IllegalArgumentException("[BriefingServiceImpl.addBriefing] 해당 Id와 일치하는 member가 존재하지 않습니다."));

            Category category = categoryRepository.findByCategoryName(reqDto.getCategory())
                    .orElseThrow(() -> new IllegalArgumentException("[BriefingServiceImpl.addBriefing] 해당 Id와 일치하는 briefing가 존재하지 않습니다."));


            //briefing생성
        //LocalTime time= reqDto.getTime();

        Briefing briefing = Briefing.builder()
                .category(category)
                .time(reqDto.getTime())
                .build();

        //member에 briefing 추가
        member.addBriefing(briefing);

        //저장
        briefingRepository.save(briefing);





    }


    //=======브리핑 수정===========//
    @Transactional
    @Override
    public void updateBriefing(BriefingRequestDto.briefingUpdate reqDto) {
        log.info("[BriefingServiceImpl.updateBriefing] start...");

        Briefing briefing=briefingRepository.findById(reqDto.getBriefingId())
                .orElseThrow(()-> new IllegalArgumentException("[RegionBookMarkServiceImpl.addRegionBookMark] 해당 Id와 일치하는 member가 존재하지 않습니다."));


        Category category=categoryRepository.findByCategoryName(reqDto.getCategory())
                .orElseThrow(()-> new IllegalArgumentException("[RegionBookMarkServiceImpl.addRegionBookMark] 해당 Id와 일치하는 member가 존재하지 않습니다."));


        //member에 있는 briefing 업데이트

        briefing.setTime(reqDto.getTime());
        briefing.setCategory(category);


//
//        briefing.getMember().updateBriefing(reqDto.getTime(time));

        //삭제
        //briefingRepository.delete(briefing);

    }


    //=======브리핑 삭제===========//
    @Transactional
    @Override
    public void deleteBriefing(BriefingRequestDto.briefingDelete reqDto) {
        log.info("[BriefingServiceImpl.deleteBriefing] start...");

        Briefing briefing=briefingRepository.findById(reqDto.getBriefingId())
                .orElseThrow(()-> new IllegalArgumentException("[RegionBookMarkServiceImpl.addRegionBookMark] 해당 Id와 일치하는 member가 존재하지 않습니다."));

        //member에 있는 briefing 삭제

        briefing.getMember().deleteBriefing(briefing);

        //삭제
        briefingRepository.delete(briefing);

    }

    @Transactional
    @Override
    public List<BriefingResponseDto.list> briefingList(Long memberId) {
        log.info("BriefingServiceImpl.briefingList] start...");

        //member찾기
        Member member = memberRepository.findById(memberId)
                .orElseThrow(()-> new IllegalArgumentException("[BriefingServiceImpl.briefingList] 해당 Id와 일치하는 member 이 존재하지 않습니다."));

        //member에서 briefinglist조회
        List<Briefing> briefingList = member.getBriefingList();

        List<BriefingResponseDto.list> list = new ArrayList<>();

        for(Briefing briefing:briefingList){
            list.add(BriefingResponseDto.list.builder()
                    .id(briefing.getId())
                    .memberId(member.getId())
                    .time(briefing.getTime())
                    .category(briefing.getCategory().getCategoryName())
                    .state(briefing.getIsOn())
                    .build());
        }
        log.info("[BriefingServiceImpl.briefingList] end...");
        return list;
    }

    @Transactional
    @Override
    public BriefingResponseDto.onoff onOff(BriefingRequestDto.onOff reqDto) {
        Briefing briefing = briefingRepository.findById(reqDto.getBriefingId())
                .orElseThrow(() -> new IllegalArgumentException("[onOff]해당 브리핑 없음"));

        briefing.turnOnOff();

        BriefingResponseDto.onoff state = BriefingResponseDto.onoff.builder()
                .state(briefing.getIsOn())
                .build();

        return state;

    }

}