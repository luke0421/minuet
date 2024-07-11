package com.ssafy.minuet.briefing.controller;

import com.ssafy.minuet.briefing.dto.BriefingRequestDto;
import com.ssafy.minuet.briefing.dto.BriefingResponseDto;
import com.ssafy.minuet.briefing.service.BriefingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name="브리핑 API", description = "브리핑 관련 API입니다")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/briefing")
@Slf4j
public class BriefingController {

    private final BriefingService briefingService;

    @Operation(summary = "브리핑 추가")
    @PostMapping
    public ResponseEntity addBriefing(@RequestBody @Valid BriefingRequestDto.briefingAdd reqDto){
        log.info("[BriefingController.addBriefing] data input memberId: {}", reqDto.getMemberId());

        try{
            briefingService.addBriefing(reqDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "브리핑 수정")
    @PutMapping
    public ResponseEntity updateBriefing(@RequestBody @Valid BriefingRequestDto.briefingUpdate reqDto){
        log.info("[BriefingController.updateBriefing] data input briefingId: {}", reqDto.getBriefingId());

//        //dto
//        BriefingRequestDto.briefingSetting reqDto = BriefingRequestDto.briefingSetting.builder()
//                .id(id)
//                .build();

        try{
            briefingService.updateBriefing(reqDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "브리핑 삭제")
    @DeleteMapping("{briefingId}")
    public ResponseEntity deleteBriefing(@PathVariable @Valid Long briefingId){
        log.info("[BriefingController.deleteBriefing] data input briefingId: {}, memberId: {}", briefingId);

        //dto
        BriefingRequestDto.briefingDelete reqDto = BriefingRequestDto.briefingDelete.builder()
                .briefingId(briefingId)
                .build();

        try{
            briefingService.deleteBriefing(reqDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "브리핑 list 조회")
    @GetMapping("list/{memberId}")
    public ResponseEntity<BriefingResponseDto.list> briefingList(@PathVariable @Valid Long memberId){
        log.info("[NewsLikeController.likeList] data input memberId: {}", memberId);
        try{
            List<BriefingResponseDto.list> list = briefingService.briefingList(memberId);
            return new ResponseEntity(list, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "브리핑 끄기/켜기")
    @PutMapping("onoff")
    public ResponseEntity onBriefing(@RequestBody @Valid BriefingRequestDto.onOff reqDto){

        try{
            BriefingResponseDto.onoff state = briefingService.onOff(reqDto);
            return new ResponseEntity(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}


