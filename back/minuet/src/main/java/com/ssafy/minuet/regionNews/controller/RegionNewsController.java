package com.ssafy.minuet.regionNews.controller;

import com.ssafy.minuet.news.dto.NewsRequestDto;
import com.ssafy.minuet.news.dto.NewsResponseDto;
import com.ssafy.minuet.regionNews.dto.RegionNewsRequestDto;
import com.ssafy.minuet.regionNews.dto.RegionNewsResponseDto;
import com.ssafy.minuet.regionNews.service.RegionNewsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name="지역 뉴스 API", description="지역 뉴스 데이터 관련 API입니다")
@RestController
@RequiredArgsConstructor
@RequestMapping(value="/region")
@Slf4j
public class RegionNewsController {

    private final RegionNewsService regionNewsService;

    @Operation(summary="지역별 조회")
    @GetMapping(value="/news/{region}/{pageNo}/{memberId}")
    public ResponseEntity<RegionNewsResponseDto.newsListWithTotalPage> regionNews(@PathVariable @Valid String region,@PathVariable @Valid int pageNo, @PathVariable @Valid long memberId){
        log.info("[RegionNewsController.regionNews] data input region: {}, pageNo: {}", region, pageNo);
        RegionNewsRequestDto.regionNews reqDto = RegionNewsRequestDto.regionNews.builder()
                .region(region)
                .pageNo(pageNo)
                .memberId(memberId)
                .build();

        try{
            RegionNewsResponseDto.newsListWithTotalPage regionNewsLists = regionNewsService.news(reqDto);
            return new ResponseEntity<>(regionNewsLists, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Operation(summary = "뉴스 검색")
    @GetMapping(value = "/search/{word}")
    public ResponseEntity<RegionNewsResponseDto.newsListWithTotalPage> searchRegionNews(@PathVariable @Valid String word){
        log.info("[RegionNewsController.listUserPick] data input word: {}", word);

        RegionNewsRequestDto.searchRegionNews reqDto = RegionNewsRequestDto.searchRegionNews.builder()
                .word(word)
                .build();

        try {
            RegionNewsResponseDto.newsListWithTotalPage searchRegionNewsList = regionNewsService.searchRegionNews(reqDto);
            return new ResponseEntity<>(searchRegionNewsList, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Operation(summary = "해당 뉴스의 좋아요, 싫어요, 북마크 여부")
    @GetMapping(value = "/detail/{memberId}/{regionNewsId}")
    public ResponseEntity<RegionNewsResponseDto.detail> detailRegionNews(@PathVariable @Valid Long memberId, @PathVariable @Valid Long regionNewsId){
        RegionNewsRequestDto.regionDetail reqDto = RegionNewsRequestDto.regionDetail.builder()
                .memberId(memberId)
                .newsId(regionNewsId)
                .build();

        try{
            RegionNewsResponseDto.detail regionNewsDetail = regionNewsService.getRegionDetail(reqDto);
            return new ResponseEntity<>(regionNewsDetail, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
