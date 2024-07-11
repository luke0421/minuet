package com.ssafy.minuet.bookMark.controller;

import com.ssafy.minuet.bookMark.dto.BookMarkRequestDto;
import com.ssafy.minuet.bookMark.dto.BookMarkResponseDto;
import com.ssafy.minuet.bookMark.service.BookMarkService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Tag(name="북마크 API", description = "북마크 관련 API입니다")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/bookmark")
@Slf4j
public class BookMarkController {

    private final BookMarkService bookMarkService;

    @Operation(summary = "bookmark 조회")
    @GetMapping("/list/{memberId}/{pageNo}")
    public ResponseEntity<BookMarkResponseDto.myBookmark> listBookmark(@PathVariable @Valid Long memberId, @PathVariable @Valid int pageNo){
        log.info("[BookMarkController.listBookmark] data input memberId: {}", memberId);

        BookMarkRequestDto.list reqDto = BookMarkRequestDto.list.builder()
                .memberId(memberId)
                .pageNo(pageNo)
                .build();

        try{
            BookMarkResponseDto.myBookmark list = bookMarkService.bookMarkList(reqDto);
            return new ResponseEntity(list, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "bookmark추가")
    @PostMapping
    public ResponseEntity addBookmark(@RequestBody @Valid BookMarkRequestDto.addBookMark reqDto){
        log.info("[BookMarkController.addBookmark] data input memberId: {}, newsId: {}", reqDto.getMemberId(), reqDto.getNewsId());

        try{
            bookMarkService.addBookMark(reqDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "bookmark 삭제")
    @DeleteMapping("/{memberId}/{newsId}")
    public ResponseEntity deleteBookmark(@PathVariable @Valid Long memberId, @PathVariable @Valid Long newsId){
        //log.info("[BookMarkController.deleteBookmark] data input bookmarkId: {}", bookmarkId);

        //dto
        BookMarkRequestDto.addBookMark reqBookmarkDto = BookMarkRequestDto.addBookMark.builder()
                .member(memberId)
                .news(newsId)
                .build();
        try{
            bookMarkService.deleteBookmark(reqBookmarkDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
