package com.ssafy.minuet.preSearch.controller;

import com.ssafy.minuet.preSearch.dto.PreSearchRequestDto;
import com.ssafy.minuet.preSearch.dto.PreSearchResponseDto;
import com.ssafy.minuet.preSearch.entity.PreSearch;
import com.ssafy.minuet.preSearch.service.PreSearchService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name="pre Search word API", description = "pre search word 관련 API입니다")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/search")
@Slf4j
public class PreSearchController {

    private final PreSearchService preSearchService;

    //pre search단어 추가
    @Operation(summary = "검색한 단어 추가")
    @PostMapping
    public ResponseEntity addSearchWord(@RequestBody @Valid PreSearchRequestDto.add reqDto){
        try{
            preSearchService.addWord(reqDto);
            return new ResponseEntity(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "검색한 단어 리스트")
    @GetMapping("/{memberId}")
    public ResponseEntity<PreSearchResponseDto.list> wordList(@PathVariable @Valid Long memberId){
        try{
            PreSearchResponseDto.list list = preSearchService.wordList(memberId);
            return new ResponseEntity<PreSearchResponseDto.list>(list, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
