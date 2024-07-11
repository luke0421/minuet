package com.ssafy.minuet.regionLike.service;

import com.ssafy.minuet.member.entity.Member;
import com.ssafy.minuet.member.repository.MemberRepository;
import com.ssafy.minuet.news.entity.News;
import com.ssafy.minuet.news.reposiroty.NewsRepository;
import com.ssafy.minuet.newsLike.dto.NewsLikeReponseDto;
import com.ssafy.minuet.newsLike.dto.NewsLikeRequestDto;
import com.ssafy.minuet.newsLike.entity.NewsLike;
import com.ssafy.minuet.regionLike.dto.RegionLikeRequestDto;
import com.ssafy.minuet.regionLike.dto.RegionLikeResponseDto;
import com.ssafy.minuet.regionLike.entity.RegionLike;
import com.ssafy.minuet.regionLike.repository.RegionLikeRepository;
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
public class RegionLikeServiceImpl implements RegionLikeService{

    private final RegionLikeRepository regionLikeRepository;
    private final MemberRepository memberRepository;
    private final RegionNewsRepository regionNewsRepository;
    //===========좋아요 추가===========//
    @Transactional
    @Override
    public void addRegionLike(RegionLikeRequestDto.reqRegionLikeDto reqDto) {
        log.info("[RegionLikeServiceImpl.addLike] start...");

        //연관시킬 member, news찾기
        Member member = memberRepository.findById(reqDto.getMemberId())
                .orElseThrow(()-> new IllegalArgumentException("[RegionLikeServiceImpl.addLike] 해당 Id와 일치하는 member가 존재하지 않습니다."));

        RegionNews regionNews = regionNewsRepository.findById(reqDto.getRegionNewsId())
                .orElseThrow(()-> new IllegalArgumentException("[RegionLikeServiceImpl.addLike] 해당 Id와 일치하는 news가 존재하지 않습니다."));

        //이미 존재하면 추가x
        if(regionLikeRepository.findByMemberAndRegionNews(member, regionNews).isPresent())
            throw new IllegalArgumentException("이미 존재하는 좋아요입니다.");

        //newslike생성
        RegionLike regionLike = RegionLike.builder()
                .regionNews(regionNews)
                .build();

        //member에 likelist추가
        member.addRegionLikeList(regionLike);

        //newsLike 저장
        regionLikeRepository.save(regionLike);

        //news의 좋아요 수 증가
        regionNews.plusRegionLikeCount();

        log.info("[RegionLikeServiceImpl.addLike] end...");
    }

    //=======좋아요 삭제===========//
    @Transactional
    @Override
    public void deleteRegionLike(RegionLikeRequestDto.reqRegionLikeDto reqLikeDto) {
        log.info("[RegionLikeServiceImpl.deleteLike] start...");

        //count수 감소를 위해 news, member찾기
        RegionNews regionNews = regionNewsRepository.findById(reqLikeDto.getRegionNewsId())
                .orElseThrow(()-> new IllegalArgumentException("[NewsLikeServiceImpl.deleteLike] 해당 Id와 일치하는 news 이 존재하지 않습니다."));

        Member member = memberRepository.findById(reqLikeDto.getMemberId())
                .orElseThrow(()-> new IllegalArgumentException("[NewsLikeServiceImpl.deleteLike] 해당 Id와 일치하는 member 이 존재하지 않습니다."));

        //newsLike찾기
        RegionLike regionLike = regionLikeRepository.findByMemberAndRegionNews(member, regionNews)
                .orElseThrow(()-> new IllegalArgumentException("[NewsLikeServiceImpl.deleteLike] 해당 Id와 일치하는 newsLike 이 존재하지 않습니다."));

        //member의 list에 있는 newsLike삭제
        member.deleteRegionLike(regionLike);

        //newsLike삭제
        regionLikeRepository.delete(regionLike);

        //news의 like수 감소
        regionNews.minusRegionLikeCount();

        log.info("[NewsLikeServiceImpl.deleteLike] end...");
    }

    //==========좋아요 표시를 위해 조회시 likelist 조회==========//
    @Override
    public List<RegionLikeResponseDto.list> regionLikeList(Long memberId) {
        log.info("[NewsLikeServiceImpl.likeList] start...");

        //member찾기
        Member member = memberRepository.findById(memberId)
                .orElseThrow(()-> new IllegalArgumentException("[NewsLikeServiceImpl.likeList] 해당 Id와 일치하는 member 이 존재하지 않습니다."));

        //member에서 likelist조회
        List<RegionLike> regionLikeList = member.getRegionLikeList();

        //to Dto
        List<RegionLikeResponseDto.list> list = new ArrayList<>();

        for(RegionLike regionLike : regionLikeList){
            list.add(RegionLikeResponseDto.list.builder()
                    .id(regionLike.getId())
                    .regionNewsId(regionLike.getRegionNews().getId())
                    .build());
        }
        log.info("[NewsLikeServiceImpl.likeList] end...");
        return list;
    }

}
