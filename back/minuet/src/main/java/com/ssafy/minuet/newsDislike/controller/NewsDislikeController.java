package com.ssafy.minuet.newsDislike.controller;


import com.ssafy.minuet.newsDislike.dto.NewsDislikeRequestDto;
import com.ssafy.minuet.newsDislike.dto.NewsDislikeResponseDto;
import com.ssafy.minuet.newsDislike.service.NewsDislikeService;
import com.ssafy.minuet.newsLike.dto.NewsLikeReponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name="싫어요 API", description = "싫어요 관련 API입니다")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/dislike")
@Slf4j
public class NewsDislikeController {

    private final NewsDislikeService newsDislikeService;

    @Operation(summary = "dislike 추가")
    @PostMapping
    public ResponseEntity addDislike(@RequestBody @Valid NewsDislikeRequestDto.reqDislikeDto reqDto){
        log.info("[NewsDislikeController.addDislike] data input memberId: {}, newsId: {}", reqDto.getMemberId(), reqDto.getNewsId());

        try{
            newsDislikeService.addDislike(reqDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "dislike 삭제")
    @DeleteMapping("/{newsId}/{memberId}")
    public ResponseEntity deleteDislike(@PathVariable @Valid Long newsId, @PathVariable @Valid Long memberId){
        log.info("[NewsDislikeController.deleteDislike] data input newsId: {}, memberId: {}", newsId, memberId);

        //dto
        NewsDislikeRequestDto.reqDislikeDto reqDislikeDto = NewsDislikeRequestDto.reqDislikeDto.builder()
                .news(newsId)
                .member(memberId)
                .build();

        try{
            newsDislikeService.deleteDislike(reqDislikeDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "member의 모든 dislike list 조회")
    @GetMapping("list/{memberId}")
    public ResponseEntity<NewsDislikeResponseDto.list> dislikeList(@PathVariable @Valid Long memberId){
        log.info("[NewsDislikeController.dislikeList] data input memberId: {}", memberId);
        try{
            List<NewsDislikeResponseDto.list> list = newsDislikeService.dislikeList(memberId);
            return new ResponseEntity(list, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
