package com.ssafy.minuet.festival.controller;

import com.ssafy.minuet.festival.dto.FestivalRequestDto;
import com.ssafy.minuet.festival.dto.FestivalResponseDto;
import com.ssafy.minuet.festival.entity.Festival;
import com.ssafy.minuet.festival.service.FestivalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name="지역축제 API", description = "지역 축제 관련 API입니다")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/festival")
@Slf4j
public class FestivalController {
    private final FestivalService festivalService;

    //축제 정보 불러오기
    @Operation(summary = "축제 정보 불러오기")
    @GetMapping("/{region}")
    public ResponseEntity<FestivalResponseDto.festivalList> festivalList(@PathVariable @Valid String region){
        FestivalRequestDto.festivalList reqDto = FestivalRequestDto.festivalList.builder()
                .region(region)
                .build();

        try{
            FestivalResponseDto.festivalList list = festivalService.getFestival(reqDto);
            return new ResponseEntity<>(list, HttpStatus.OK);
        }
        catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
