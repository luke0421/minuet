package com.ssafy.minuet.news.controller;

import com.ssafy.minuet.news.dto.NewsRequestDto;
import com.ssafy.minuet.news.dto.NewsResponseDto;
import com.ssafy.minuet.news.service.NewsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name="뉴스 API", description = "뉴스 데이터 관련 API입니다")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/news")
@Slf4j
public class NewsController {

    private final NewsService newsService;


    //=====================
    // user Pick
    @Operation(summary = "user Pick 조회 - 아직 구현 x")
    @GetMapping(value = "/pick/{age}/{gender}")
    public ResponseEntity<List<NewsResponseDto.newsList>> listUserPick(@PathVariable @Valid int age, boolean gender){
        log.info("[NewsController.listUserPick] data input age: {}, gender: {}", age, gender);

        NewsRequestDto.userPickNews reqDto = NewsRequestDto.userPickNews.builder()
                .age(age)
                .gender(gender)
                .build();

        try{
            List<NewsResponseDto.newsList> userPickNewsList = newsService.userPickNews(reqDto);
            return new ResponseEntity<>(userPickNewsList, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // ====================
    //category
    @Operation(summary = "category별 조회")
    @GetMapping(value = "/category/{category}/{pageNo}/{memberId}")
    public ResponseEntity<NewsResponseDto.newsListWithTotalPage> categoryNews(@PathVariable @Valid String category, @PathVariable @Valid int pageNo, @PathVariable @Valid long memberId){
        log.info("[NewsController.listUserPick] data input category: {}, pageNo: {}", category, pageNo);

        NewsRequestDto.categoryNews reqDto = NewsRequestDto.categoryNews.builder()
                .category(category)
                .pageNo(pageNo)
                .memberId(memberId)
                .build();

        try{
            NewsResponseDto.newsListWithTotalPage newsListWithTotalPage = newsService.categoryNews(reqDto);
            return new ResponseEntity<>(newsListWithTotalPage, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Operation(summary = "뉴스만 검색")
    @GetMapping(value = "/searchNews/{word}/{pageNo}")
    public ResponseEntity<NewsResponseDto.newsListWithTotalPage> searchOnlyNews(@PathVariable @Valid String word, @PathVariable @Valid int pageNo){
        log.info("[NewsController.searchOnlyNews] data input word: {}", word);

        NewsRequestDto.searchNews reqDto = NewsRequestDto.searchNews.builder()
                                                .word(word)
                                                .pageNo(pageNo)
                                                .build();

        try {
            NewsResponseDto.newsListWithTotalPage searchNewsList = newsService.searchNews(reqDto);
            return new ResponseEntity<>(searchNewsList, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "뉴스+지역뉴스 검색")
    @GetMapping(value = "/search/{word}/{pageNo}/{memberId}")
    public ResponseEntity<NewsResponseDto.searchNewsWithTotalPage> searchNews(@PathVariable @Valid String word, @PathVariable @Valid int pageNo, @PathVariable @Valid Long memberId){
        log.info("[NewsController.searchNews] data input word: {}, pageNo: {}", word, pageNo);

        NewsRequestDto.searchNews reqDto = NewsRequestDto.searchNews.builder()
                                            .word(word)
                                            .pageNo(pageNo)
                                            .memberId(memberId)
                                            .build();
        try{
            NewsResponseDto.searchNewsWithTotalPage searchNewsList = newsService.searchTotalNews(reqDto);
            return new ResponseEntity<>(searchNewsList, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Operation(summary = "해당 뉴스의 좋아요, 싫어요, 북마크 여부")
    @GetMapping(value = "/detail/{memberId}/{newsId}")
    public ResponseEntity<NewsResponseDto.detail> detailNews(@PathVariable @Valid Long memberId, @PathVariable @Valid Long newsId){
        NewsRequestDto.detail reqDto = NewsRequestDto.detail.builder()
                .memberId(memberId)
                .newsId(newsId)
                .build();

        try{
            NewsResponseDto.detail newsDetail = newsService.getDetail(reqDto);
            return new ResponseEntity<>(newsDetail, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "오페라 day이전의 뉴스 읽어주기")
    @GetMapping(value = "/opera/{day}")
    public ResponseEntity<NewsResponseDto.operaList> operaList(@PathVariable @Valid int day){
        NewsRequestDto.operaList reqDto = NewsRequestDto.operaList.builder()
                                            .day(day)
                                            .build();

        try{
            NewsResponseDto.operaList list = newsService.getPeriodList(reqDto);
            return new ResponseEntity<>(list, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "오페라 day이후 word와 관련된 뉴스 읽어주기")
    @GetMapping(value = "/opera/{day}/{word}")
    public ResponseEntity<NewsResponseDto.operaList> operaSearchList(@PathVariable @Valid int day, @PathVariable @Valid String word){
        NewsRequestDto.operaSearchList reqDto = NewsRequestDto.operaSearchList.builder()
                .day(day)
                .word(word)
                .build();

        try{
            NewsResponseDto.operaList list = newsService.getPeriodWordList(reqDto);
            return new ResponseEntity<>(list, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
