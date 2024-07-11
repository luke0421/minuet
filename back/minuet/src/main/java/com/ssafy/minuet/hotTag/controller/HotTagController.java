package com.ssafy.minuet.hotTag.controller;

import com.ssafy.minuet.hotTag.dto.HotTagResponseDto;
import com.ssafy.minuet.hotTag.service.HotTagService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name="hotTag API", description = "hotTag 관련 API입니다")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/hottag")
@Slf4j
public class HotTagController {

    private final HotTagService hotTagService;
    @Operation(summary = "hot Tag 조회")
    @GetMapping
    public ResponseEntity<List<HotTagResponseDto.hotTag>> getHotTag(){
        try{
            List<HotTagResponseDto.hotTag> hotTags = hotTagService.getHotTag();
            return new ResponseEntity<>(hotTags, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "hot Tag 입력, test api입니다")
    @GetMapping("/{word}")
    public ResponseEntity addWord(@PathVariable @Valid String word){
        try{
            hotTagService.addWord(word);
            return new ResponseEntity(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
