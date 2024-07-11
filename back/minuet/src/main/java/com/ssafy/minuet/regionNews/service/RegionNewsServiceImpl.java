package com.ssafy.minuet.regionNews.service;

import com.ssafy.minuet.member.entity.Member;
import com.ssafy.minuet.member.repository.MemberRepository;
import com.ssafy.minuet.regionBookMark.repository.RegionBookMarkRepository;
import com.ssafy.minuet.regionDisLike.repository.RegionDislikeRepository;
import com.ssafy.minuet.regionLike.repository.RegionLikeRepository;
import com.ssafy.minuet.regionNews.dto.RegionNewsRequestDto;
import com.ssafy.minuet.regionNews.dto.RegionNewsResponseDto;
import com.ssafy.minuet.regionNews.entity.Region;
import com.ssafy.minuet.regionNews.entity.RegionNews;
import com.ssafy.minuet.regionNews.repository.RegionNewsRepository;
import com.ssafy.minuet.regionNews.repository.RegionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class RegionNewsServiceImpl implements RegionNewsService {
    
    private final RegionNewsRepository regionNewsRepository;
    private final RegionRepository regionRepository;
    private final MemberRepository memberRepository;

    private final RegionLikeRepository regionLikeRepository;
    private final RegionDislikeRepository regionDislikeRepository;
    private final RegionBookMarkRepository regionBookMarkRepository;
    @Override
    public RegionNewsResponseDto.newsListWithTotalPage news(RegionNewsRequestDto.regionNews reqDto){
        log.info("[RegionNewsServiceImpl.regionNews] start...");

        //지역 찾기
        Region region = regionRepository.findByRegionName(reqDto.getRegion())
                .orElseThrow(()-> new IllegalArgumentException("[RegionNewsServiceImpl.regionNews] 해당 Id와 일치하는 bookmark 이 존재하지 않습니다."));


        //List<RegionNews> regionNews = regionNewsRepository.findByRegion(region);

        //10개 단위로 페이징을 위해 pageable생성
        //pageNo, 10개 단위, 최신순을 위해 id기준으로 내림차순
        Pageable pageable = PageRequest.of(reqDto.getPageNo(), 10, Sort.by(Sort.Direction.DESC, "id"));

        Page<RegionNews> regionNews = regionNewsRepository.findAll(reqDto.getMemberId(), region, pageable);

        //to Dto
        RegionNewsResponseDto.newsListWithTotalPage newsListWithTotalPage = RegionNewsResponseDto.newsListWithTotalPage.builder()
                .totalPage(regionNews.getTotalPages())
                .build();

        //List<NewsResponseDto.newsList> list = new ArrayList<>();
        for(RegionNews n : regionNews){
            newsListWithTotalPage.getNewsLists().add(RegionNewsResponseDto.toNewsDto(n));
        }



        log.info("[NewsServiceImpl.categoryNews] end...");
        return newsListWithTotalPage;
    }


    //============기사 검색========//
    @Override
    public RegionNewsResponseDto.newsListWithTotalPage searchRegionNews(RegionNewsRequestDto.searchRegionNews reqDto) {
        log.info("[NewsServiceImpl.searchNews] start...");

        //10개 단위로 페이징을 위해 pageable생성
        //pageNo, 10개 단위, 최신순을 위해 id기준으로 내림차순
        Pageable pageable = PageRequest.of(reqDto.getPageNo(), 10, Sort.by(Sort.Direction.DESC, "id"));

        //내용이나 제목에 word가 있는 기사 검색
        //List<News> newsList = newsRepository.findByTitleContainingOrContentContaining(reqDto.getWord(), reqDto.getWord());
        Page<RegionNews> newsList = regionNewsRepository.findByTitleContainingOrContentContaining(reqDto.getWord(), reqDto.getWord(), pageable);

        //new to dto
        RegionNewsResponseDto.newsListWithTotalPage list = RegionNewsResponseDto.newsListWithTotalPage.builder()
                .totalPage(newsList.getTotalPages())
                .build();

        for(RegionNews n : newsList){
            list.getNewsLists().add(RegionNewsResponseDto.toNewsDto(n));
        }

        log.info("[RegionNewsServiceImpl.searchNews] end...");
        return list;
    }


    @Override
    public RegionNewsResponseDto.detail getRegionDetail(RegionNewsRequestDto.regionDetail reqDto) {

        //member찾기
        Member member = memberRepository.findById(reqDto.getMemberId())
                .orElseThrow(()-> new IllegalArgumentException("[NewsServiceImpl.getDetail] 해당 Id와 일치하는 member 이 존재하지 않습니다."));

        //news찾기
        RegionNews regionNews = regionNewsRepository.findById(reqDto.getNewsId())
                .orElseThrow(()-> new IllegalArgumentException("[RegionNewsServiceImpl.getDetail] 해당 Id와 일치하는 regionNews 이 존재하지 않습니다."));

        //있는지 여부 확인
        boolean isRegionLike = regionLikeRepository.findByMemberAndRegionNews(member, regionNews).isPresent();
        boolean isRegionDislike = regionDislikeRepository.findByMemberAndRegionNews(member,regionNews).isPresent();
        boolean isRegionBookmark = regionBookMarkRepository.findByMemberAndRegionNews(member, regionNews).isPresent();

        int regionLikeCount = regionNews.getLikeCount();

        RegionNewsResponseDto.detail regionDetail = RegionNewsResponseDto.detail.builder()
                .like(isRegionLike)
                .dislike(isRegionDislike)
                .bookmark(isRegionBookmark)
                .likeCount(regionLikeCount)
                .build();

        return regionDetail;
    }
}
