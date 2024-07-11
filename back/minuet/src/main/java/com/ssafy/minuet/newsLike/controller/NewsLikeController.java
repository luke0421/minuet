package com.ssafy.minuet.newsLike.controller;

import com.ssafy.minuet.newsLike.dto.NewsLikeReponseDto;
import com.ssafy.minuet.newsLike.dto.NewsLikeRequestDto;
import com.ssafy.minuet.newsLike.service.NewsLikeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Tag(name="좋아요 API", description = "좋아요 관련 API입니다")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/like")
@Slf4j
public class NewsLikeController {

    private final NewsLikeService newsLikeService;

    @Operation(summary = "like 추가")
    @PostMapping
    public ResponseEntity addLike(@RequestBody @Valid NewsLikeRequestDto.reqLikeDto reqDto){
        log.info("[NewsDislikeController.addDislike] data input memberId: {}, newsId: {}", reqDto.getMemberId(), reqDto.getNewsId());

        try{
            newsLikeService.addLike(reqDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "like 삭제")
    @DeleteMapping("{newsId}/{memberId}")
    public ResponseEntity deleteDislike(@PathVariable @Valid Long newsId, @PathVariable @Valid Long memberId){
        log.info("[NewsDislikeController.deleteDislike] data input newsId: {}, memberId: {}", newsId, memberId);

        //dto
        NewsLikeRequestDto.reqLikeDto reqLikeDto = NewsLikeRequestDto.reqLikeDto.builder()
                .news(newsId)
                .member(memberId)
                .build();

        try{
            newsLikeService.deleteLike(reqLikeDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "member의 모든 like list 조회")
    @GetMapping("list/{memberId}")
    public ResponseEntity<NewsLikeReponseDto.list> likeList(@PathVariable @Valid Long memberId){
        log.info("[NewsLikeController.likeList] data input memberId: {}", memberId);
        try{
            List<NewsLikeReponseDto.list> list = newsLikeService.likeList(memberId);
            return new ResponseEntity(list, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
