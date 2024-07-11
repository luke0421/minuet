package com.ssafy.minuet.regionDisLike.controller;

import com.ssafy.minuet.newsDislike.dto.NewsDislikeRequestDto;
import com.ssafy.minuet.newsDislike.dto.NewsDislikeResponseDto;
import com.ssafy.minuet.newsDislike.service.NewsDislikeService;
import com.ssafy.minuet.regionDisLike.dto.RegionDislikeRequestDto;
import com.ssafy.minuet.regionDisLike.dto.RegionDislikeResponseDto;
import com.ssafy.minuet.regionDisLike.service.RegionDislikeService;
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
@RequestMapping(value = "/region/dislike")
@Slf4j
public class RegionDislikeController {
    private final RegionDislikeService regionDislikeService;

    @Operation(summary = "dislike 추가")
    @PostMapping
    public ResponseEntity addRegionDislike(@RequestBody @Valid RegionDislikeRequestDto.reqRegionDislikeDto reqDto){
        log.info("[NewsDislikeController.addDislike] data input memberId: {}, newsId: {}", reqDto.getMemberId(), reqDto.getRegionNewsId());

        try{
            regionDislikeService.addRegionDislike(reqDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "dislike 삭제")
    @DeleteMapping("/{regionNewsId}/{memberId}")
    public ResponseEntity deleteRegionDislike(@PathVariable @Valid Long regionNewsId, @PathVariable @Valid Long memberId){
        log.info("[NewsDislikeController.deleteDislike] data input newsId: {}, memberId: {}", regionNewsId, memberId);

        //dto
        RegionDislikeRequestDto.reqRegionDislikeDto reqRegionDislikeDto = RegionDislikeRequestDto.reqRegionDislikeDto.builder()
                .regionNewsId(regionNewsId)
                .member(memberId)
                .build();

        try{
            regionDislikeService.deleteRegionDislike(reqRegionDislikeDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "member의 모든 dislike list 조회")
    @GetMapping("list/{memberId}")
    public ResponseEntity<RegionDislikeResponseDto.list> regionDislikeList(@PathVariable @Valid Long memberId){
        log.info("[RegionDislikeController.dislikeList] data input memberId: {}", memberId);
        try{
            List<RegionDislikeResponseDto.list> list = regionDislikeService.regionDislikeList(memberId);
            return new ResponseEntity(list, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
