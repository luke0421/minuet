package com.ssafy.minuet.prefer.controller;

import com.ssafy.minuet.prefer.dto.PreferRequestDto;
import com.ssafy.minuet.prefer.dto.PreferResponsDto;
import com.ssafy.minuet.prefer.service.PreferCategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name="선호 카테고리 API", description = "선호 카테고리 관련 API입니다")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/prefer")
@Slf4j
public class PreferCategoryController {

    private final PreferCategoryService preferCategoryService;

    @Operation(summary = "선호 카테고리 조회")
    @GetMapping("{memberId}")
    public ResponseEntity<List<PreferResponsDto.list>> preferList(@PathVariable @Valid Long memberId){
        log.info("[PreferCategoryController.preferList] data input memberId: {}", memberId);

        PreferRequestDto.list reqDto = PreferRequestDto.list.builder()
                .memberId(memberId)
                .build();

        try{
            List<PreferResponsDto.list> list = preferCategoryService.getList(reqDto);
            return new ResponseEntity<>(list, HttpStatus.OK);
        }
        catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "선호 카테고리 추가")
    @PostMapping
    public ResponseEntity addPrefer(@RequestBody @Valid PreferRequestDto.add reqDto){
        try {
            preferCategoryService.add(reqDto);
            return new ResponseEntity(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "선호 카테고리 삭제")
    @DeleteMapping("/{memberId}/{categoryName}")
    public ResponseEntity deletePrefer(@PathVariable @Valid Long memberId, @PathVariable @Valid String categoryName){
        PreferRequestDto.delete reqDto = PreferRequestDto.delete.builder()
                .memberId(memberId)
                .categoryName(categoryName)
                .build();

        try{
            preferCategoryService.delete(reqDto);
            return new ResponseEntity(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
