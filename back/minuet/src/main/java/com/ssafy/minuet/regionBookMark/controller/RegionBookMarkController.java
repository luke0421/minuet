package com.ssafy.minuet.regionBookMark.controller;

import com.ssafy.minuet.bookMark.dto.BookMarkRequestDto;
import com.ssafy.minuet.bookMark.dto.BookMarkResponseDto;
import com.ssafy.minuet.bookMark.service.BookMarkService;
import com.ssafy.minuet.regionBookMark.dto.RegionBookMarkRequestDto;
import com.ssafy.minuet.regionBookMark.dto.RegionBookMarkResponseDto;
import com.ssafy.minuet.regionBookMark.service.RegionBookMarkService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name="북마크 API", description = "북마크 관련 API입니다")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/region/bookmark")
@Slf4j
public class RegionBookMarkController {
    private final RegionBookMarkService regionBookMarkService;

    @Operation(summary = "bookmark 조회")
    @GetMapping("/list/{memberId}/{pageNo}")
    public ResponseEntity<RegionBookMarkResponseDto.myBookmark> listBookmark(@PathVariable @Valid Long memberId, @PathVariable @Valid int pageNo){
        log.info("[RegionBookMarkController.listBookmark] data input memberId: {}", memberId);

        RegionBookMarkRequestDto.list reqDto = RegionBookMarkRequestDto.list.builder()
                .memberId(memberId)
                .pageNo(pageNo)
                .build();
        try{
            RegionBookMarkResponseDto.myBookmark list = regionBookMarkService.bookMarkList(reqDto);
            return new ResponseEntity(list, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "bookmark추가")
    @PostMapping
    public ResponseEntity addRegionBookMark(@RequestBody @Valid RegionBookMarkRequestDto.addRegionBookMark reqDto){
        //log.info("[RegionBookMarkController.addRegionBookmark] data input memberId: {}, newsId: {}", reqDto.getMemberId(), reqDto.getRegionNewsId());

        try{
            regionBookMarkService.addRegionBookMark(reqDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "bookmark 삭제")//수정
    @DeleteMapping("/{memberId}/{regionNewsId}")
    public ResponseEntity deleteRegionBookMark(@PathVariable @Valid Long memberId, @PathVariable @Valid Long regionNewsId){
        log.info("[RegionBookMarkController.deleteRegionBookmark] data input memberId, regionNewsId: {},{}",memberId, regionNewsId);

        RegionBookMarkRequestDto.addRegionBookMark reqRegionBookMarkDto = RegionBookMarkRequestDto.addRegionBookMark.builder()
                .member(memberId)
                .news(regionNewsId)
                .build();

        try{
            regionBookMarkService.deleteRegionBookMark(reqRegionBookMarkDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

