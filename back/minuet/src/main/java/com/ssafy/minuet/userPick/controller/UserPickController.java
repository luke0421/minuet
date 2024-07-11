package com.ssafy.minuet.userPick.controller;


import com.ssafy.minuet.news.dto.NewsResponseDto;
import com.ssafy.minuet.news.entity.News;
import com.ssafy.minuet.userPick.service.UserPickService;
import com.ssafy.minuet.userPick.entity.UserPick;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name="user's Pick API", description = "user's Pick 관련 API입니다")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/userpick")
@Slf4j
public class UserPickController {

    private final UserPickService userPickService;

/*    @Operation(summary = "user Pick 전체 조회 - test용 api입니다 나이 상관없이 모든 값을 조회합니다.")
    @GetMapping("/all")
    public ResponseEntity<List<UserPick>> testUserPick() {

        try {
            return new ResponseEntity<>(userPickService.findAll(), HttpStatus.OK);

        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }*/

    @Operation(summary = "user pick 나이대에 따른 인기있는 뉴스 10개 뉴스 출력")
    @GetMapping("/{memberId}")
    public ResponseEntity<List<NewsResponseDto.newsList>> getUserPick(@PathVariable @Valid Long memberId){
        try{
            return new ResponseEntity<>(userPickService.getUserPick(memberId), HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
