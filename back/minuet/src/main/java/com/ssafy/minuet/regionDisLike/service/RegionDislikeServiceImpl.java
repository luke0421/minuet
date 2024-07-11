package com.ssafy.minuet.regionDisLike.service;

import com.ssafy.minuet.member.entity.Member;
import com.ssafy.minuet.member.repository.MemberRepository;
import com.ssafy.minuet.news.entity.News;
import com.ssafy.minuet.news.reposiroty.NewsRepository;
import com.ssafy.minuet.newsDislike.dto.NewsDislikeRequestDto;
import com.ssafy.minuet.newsDislike.dto.NewsDislikeResponseDto;
import com.ssafy.minuet.newsDislike.entity.NewsDislike;
import com.ssafy.minuet.newsDislike.repository.NewsDislikeRepository;
import com.ssafy.minuet.regionDisLike.dto.RegionDislikeRequestDto;
import com.ssafy.minuet.regionDisLike.dto.RegionDislikeResponseDto;
import com.ssafy.minuet.regionDisLike.entity.RegionDislike;
import com.ssafy.minuet.regionDisLike.repository.RegionDislikeRepository;
import com.ssafy.minuet.regionNews.entity.RegionNews;
import com.ssafy.minuet.regionNews.repository.RegionNewsRepository;
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
public class RegionDislikeServiceImpl implements RegionDislikeService{
    private final RegionDislikeRepository regionDislikeRepository;
    private final MemberRepository memberRepository;
    private final RegionNewsRepository regionNewsRepository;

    //===========싫어요 추가==========//
    @Transactional
    @Override
    public void addRegionDislike(RegionDislikeRequestDto.reqRegionDislikeDto reqDto) {
        log.info("[RegionDislikeServiceImpl.addDislike] start...");

        //연관된 member, news찾기
        Member member = memberRepository.findById(reqDto.getMemberId())
                .orElseThrow(()-> new IllegalArgumentException("[NewsDislikeServiceImpl.addDislike] 해당 Id와 일치하는 member가 존재하지 않습니다."));

        RegionNews regionNews = regionNewsRepository.findById(reqDto.getRegionNewsId())
                .orElseThrow(()-> new IllegalArgumentException("[NewsDislikeServiceImpl.addDislike] 해당 Id와 일치하는 news가 존재하지 않습니다."));

        //이미 존재하면 추가x
        if(regionDislikeRepository.findByMemberAndRegionNews(member, regionNews).isPresent())
            throw new IllegalArgumentException("이미 존재하는 싫어요입니다. ");
        //dislike생성
        RegionDislike regionDislike = RegionDislike.builder()
                .regionNews(regionNews)
                .build();

        //member에 dislikelist추가
        member.addRegionDislikeList(regionDislike);

        //newsDislike저장
        regionDislikeRepository.save(regionDislike);

        //news가 싫어요 된 횟수 감소
        regionNews.plusRegionDislikeCount();

        log.info("[RegionDislikeServiceImpl.addRegionDislike] end...");
    }

    //=======싫어요 삭제==========//
    @Transactional
    @Override
    public void deleteRegionDislike(RegionDislikeRequestDto.reqRegionDislikeDto reqDislikeDto) {
        log.info("[RegionDislikeServiceImpl.deleteRegionDislike] start...");

        //count값들을 지우기 위해 연관된 news, member 찾기
        RegionNews regionNews = regionNewsRepository.findById(reqDislikeDto.getRegionNewsId())
                .orElseThrow(()-> new IllegalArgumentException("[RegionDislikeServiceImpl.deleteDislike] 해당 Id와 일치하는 news 이 존재하지 않습니다."));

        Member member = memberRepository.findById(reqDislikeDto.getMemberId())
                .orElseThrow(()-> new IllegalArgumentException("[RegionDislikeServiceImpl.deleteDislike] 해당 Id와 일치하는 member 이 존재하지 않습니다."));

        //해당 dislike찾기
        RegionDislike regionDislike = regionDislikeRepository.findByMemberAndRegionNews(member, regionNews)
                .orElseThrow(()-> new IllegalArgumentException("[RegionDislikeServiceImpl.deleteDislike] 해당 Id와 일치하는 newsDislike 이 존재하지 않습니다."));

        //member의 list에서 삭제
        member.deleteRegionDislike(regionDislike);

        //dislike삭제
        regionDislikeRepository.delete(regionDislike);

        //news의 dislike횟수 감소
        regionNews.minusRegionDislikeCount();

        log.info("[RegionDislikeServiceImpl.deleteRegionDislike] end...");
    }

    //==========뉴스 조회시 하트 유무를 표시하기 위한 dislike list 조회//
    @Override
    public List<RegionDislikeResponseDto.list> regionDislikeList(Long memberId) {
        log.info("[RegionDislikeServiceImpl.regionDislikeList] start...");

        //member찾기
        Member member = memberRepository.findById(memberId)
                .orElseThrow(()-> new IllegalArgumentException("[RegionDislikeServiceImpl.dislikeList] 해당 Id와 일치하는 member 이 존재하지 않습니다."));

        //member의 dislike목록 찾기
        List<RegionDislike> regionDislikeList = member.getRegionDislikeList();

        //to Dto
        List<RegionDislikeResponseDto.list> list = new ArrayList<>();

        for(RegionDislike regionDisLike : regionDislikeList){
            list.add(RegionDislikeResponseDto.list.builder()
                    .id(regionDisLike.getId())
                    .regionNewsId(regionDisLike.getRegionNews().getId())
                    .build());
        }
        log.info("[RegionDislikeServiceImpl.regionDislikeList] end...");
        return list;
    }

}
