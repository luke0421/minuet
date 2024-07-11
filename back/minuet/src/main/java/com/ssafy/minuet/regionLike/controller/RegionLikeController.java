package com.ssafy.minuet.regionLike.controller;

import com.ssafy.minuet.newsLike.dto.NewsLikeReponseDto;
import com.ssafy.minuet.newsLike.dto.NewsLikeRequestDto;
import com.ssafy.minuet.newsLike.service.NewsLikeService;
import com.ssafy.minuet.regionLike.dto.RegionLikeRequestDto;
import com.ssafy.minuet.regionLike.dto.RegionLikeResponseDto;
import com.ssafy.minuet.regionLike.service.RegionLikeService;
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
@RequestMapping(value = "/region/like")
@Slf4j
public class RegionLikeController {
    private final RegionLikeService regionLikeService;

    @Operation(summary = "like 추가")
    @PostMapping
    public ResponseEntity addRegionLike(@RequestBody @Valid RegionLikeRequestDto.reqRegionLikeDto reqDto){
        log.info("[NewsDislikeController.addDislike] data input memberId: {}, newsId: {}", reqDto.getMemberId(), reqDto.getRegionNewsId());

        try{
            regionLikeService.addRegionLike(reqDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "like 삭제")
    @DeleteMapping("{regionNewsId}/{memberId}")
    public ResponseEntity deleteRegionDislike(@PathVariable @Valid Long regionNewsId, @PathVariable @Valid Long memberId){
        log.info("[NewsDislikeController.deleteDislike] data input newsId: {}, memberId: {}", regionNewsId, memberId);

        //dto
        RegionLikeRequestDto.reqRegionLikeDto reqLikeDto = RegionLikeRequestDto.reqRegionLikeDto.builder()
                .regionNewsId(regionNewsId)
                .member(memberId)
                .build();

        try{
            regionLikeService.deleteRegionLike(reqLikeDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "member의 모든 like list 조회")
    @GetMapping("list/{memberId}")
    public ResponseEntity<RegionLikeResponseDto.list> regionLikeList(@PathVariable @Valid Long memberId){
        log.info("[NewsLikeController.likeList] data input memberId: {}", memberId);
        try{
            List<RegionLikeResponseDto.list> list = regionLikeService.regionLikeList(memberId);
            return new ResponseEntity(list, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
