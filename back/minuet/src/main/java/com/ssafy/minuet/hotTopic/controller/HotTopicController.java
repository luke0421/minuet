package com.ssafy.minuet.hotTopic.controller;

import com.ssafy.minuet.hotTopic.dto.HotTopicRequestDto;
import com.ssafy.minuet.hotTopic.dto.HotTopicResponseDto;
import com.ssafy.minuet.hotTopic.service.HotTopicService;
import com.ssafy.minuet.news.dto.NewsRequestDto;
import com.ssafy.minuet.news.dto.NewsResponseDto;
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

import java.util.List;

@Tag(name="핫토픽 API", description="핫토픽 데이터 API입니다")
@RestController
@RequiredArgsConstructor
@RequestMapping(value="/opera")
@Slf4j
public class HotTopicController {

    private final HotTopicService hotTopicService;

    @Operation(summary = "hot Topic, user's pick으로 대체")
    @GetMapping(value = "/reading/{memberId}")
    public ResponseEntity<List<HotTopicResponseDto.hotTopicList>> listHotTopic(@PathVariable @Valid Long memberId) {
        log.info("[HotTopicController.listHotTopic] data input memberId: {}", memberId);
        HotTopicRequestDto.hotTopic reqDto = HotTopicRequestDto.hotTopic.builder()
                .memberId(memberId)
                .build();

        try {
            List<HotTopicResponseDto.hotTopicList> hotTopicLists = hotTopicService.hotTopic(reqDto);
            return new ResponseEntity<>(hotTopicLists, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}