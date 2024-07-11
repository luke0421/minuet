package com.ssafy.minuet.regionBookMark.service;

import com.ssafy.minuet.regionBookMark.dto.RegionBookMarkRequestDto;
import com.ssafy.minuet.regionBookMark.dto.RegionBookMarkResponseDto;
import com.ssafy.minuet.regionBookMark.entity.RegionBookMark;
import com.ssafy.minuet.regionBookMark.repository.RegionBookMarkRepository;
import com.ssafy.minuet.member.entity.Member;
import com.ssafy.minuet.member.repository.MemberRepository;
import com.ssafy.minuet.regionNews.entity.RegionNews;
import com.ssafy.minuet.regionNews.repository.RegionNewsRepository;
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
public class RegionBookMarkServiceImpl implements RegionBookMarkService {
    private final RegionBookMarkRepository regionBookMarkRepository;
    private final MemberRepository memberRepository;
    private final RegionNewsRepository regionNewsRepository;

    //===========bookmark추가==========//
    @Transactional
    @Override
    public void addRegionBookMark(RegionBookMarkRequestDto.addRegionBookMark reqDto) {
        log.info("[RegionBookMarkServiceImpl.addRegionBookMark] start...");

        //해당 member와 news entity 찾기
        Member member = memberRepository.findById(reqDto.getMemberId())
                .orElseThrow(()-> new IllegalArgumentException("[RegionBookMarkServiceImpl.addRegionBookMark] 해당 Id와 일치하는 member가 존재하지 않습니다."));

        RegionNews regionNews = regionNewsRepository.findById(reqDto.getNewsId())
                .orElseThrow(()-> new IllegalArgumentException("[RegionBookMarkServiceImpl.addRegionBookMark] 해당 Id와 일치하는 regionNews가 존재하지 않습니다."));

        //이미 존재하는 북마크이면 추가x
        if(regionBookMarkRepository.findByMemberAndRegionNews(member, regionNews).isPresent())
            throw new IllegalArgumentException("이미 존재하는 북마크입니다.");
        //bookmark 생성
        RegionBookMark regionBookMark = RegionBookMark.builder()
                .regionNews(regionNews)
                .build();

        //member의 bookmarkList 에 bookmark 추가
        //member.addRegionBookMarkList(regionBookMark);
        member.addBookMarkList(regionBookMark);

        //bookmark저장
        regionBookMarkRepository.save(regionBookMark);

        //news가 bookmark된 횟수 증가시키기
        regionNews.regionPlusBookMark();

        log.info("[RegionBookMarkServiceImpl.addRegionBookMark] end...");
    }

    //==========bookmark 삭제==========//
    @Transactional
    @Override
    public void deleteRegionBookMark(RegionBookMarkRequestDto.addRegionBookMark reqDto) {
        log.info("[RegionBookMarkServiceImpl.deleteRegionBookmark] start...");

        //해당 regionNews찾기
        RegionNews regionNewsList = regionNewsRepository.findById(reqDto.getNewsId())
                .orElseThrow(()-> new IllegalArgumentException("[RegionBookMarkServiceImpl.deleteBookmark] 해당 Id와 일치하는 news 이 존재하지 않습니다."));

        //member의 list에서 삭제하기 위해 member탐색
        Member member = memberRepository.findById(reqDto.getMemberId())
                .orElseThrow(()-> new IllegalArgumentException("[RegionBookMarkServiceImpl.deleteBookmark] 해당 Id와 일치하는 member 이 존재하지 않습니다."));


        //regionNews가 bookmark된 횟수 감소시키기 위해 regionNews찾기
        RegionBookMark regionBookMark = regionBookMarkRepository.findByMemberAndRegionNews(member,regionNewsList)
                .orElseThrow(()-> new IllegalArgumentException("[RegionBookMarkServiceImpl.deleteBookmark] 해당 Id와 일치하는 bookmark 이 존재하지 않습니다."));


        //member의 list에서 bookmark 삭제
        //member.deleteRegionBookMarkList(regionBookMark);
        member.deleteBookMarkList(regionBookMark);
        //bookmark삭제
        regionBookMarkRepository.delete(regionBookMark);

        //regionNews가 bookmark된 횟수 감소시키기
        regionNewsList.regionMinusBookMark();

        log.info("[RegionBookMarkServiceImpl.deleteRegionBookmark] end...");
    }

    //===========북마크 조회==========//
    @Override
    public RegionBookMarkResponseDto.myBookmark bookMarkList(RegionBookMarkRequestDto.list reqDto) {
        log.info("[RegionBookMarkServiceImpl.regionBookMarkList] start...");

        //해당 member찾기
        Member member = memberRepository.findById(reqDto.getMemberId())
                .orElseThrow(()-> new IllegalArgumentException("[RegionBookMarkServiceImpl.regionBookMarkList] 해당 Id와 일치하는 member 이 존재하지 않습니다."));

        Pageable pageable = PageRequest.of(reqDto.getPageNo(), 15, Sort.by(Sort.Direction.DESC, "id"));

        Page<RegionBookMark> bookMarkList = regionBookMarkRepository.findByMember(member,pageable);



        //to dto
        RegionBookMarkResponseDto.myBookmark list = RegionBookMarkResponseDto.myBookmark.builder()
                .totalPage(bookMarkList.getTotalPages())
                .build();

        for(RegionBookMark regionBookMark : bookMarkList){
            RegionNews regionNews = regionBookMark.getRegionNews();

            list.getBookmarks().add(RegionBookMarkResponseDto.list.builder()
                    .id(regionBookMark.getId())
                    .regionNewsId(regionNews.getId())
                    .title(regionNews.getTitle())
                    .content(regionNews.getContent())
                    .publishDate(regionNews.getPublishDate())
                    .region(regionNews.getRegion())
                    .imgURL(regionNews.getImgURL())
                    .newsURL(regionNews.getNewsURL())
                    .build());
        }

        //log.info("[RegionBookMarkServiceImpl.regionBookMarkList] end...");
        return list;
    }


}

