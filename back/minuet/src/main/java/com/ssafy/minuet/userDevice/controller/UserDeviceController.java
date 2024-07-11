package com.ssafy.minuet.userDevice.controller;

import com.ssafy.minuet.userDevice.dto.UserDeviceRequestDto;
import com.ssafy.minuet.userDevice.dto.UserDeviceResponseDto;
import com.ssafy.minuet.userDevice.service.UserDeviceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name="device connect API", description = "iot device 연결 관련 API입니다")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/connection")
@Slf4j
public class UserDeviceController {

    private final UserDeviceService userDeviceService;

    @Operation(summary = "iot 기기 연결하기")
    @PostMapping
    public ResponseEntity connectIot(@RequestBody @Valid UserDeviceRequestDto.connect reqDto){
        log.info("[UserDeviceController.connectIot] memberId: {}, uuid: {}", reqDto.getMemberId(), reqDto.getUuid());

        try{
            userDeviceService.connect(reqDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @Operation(summary = "사용자의 iot기기 조회하기, 연결된 기기가 없을 시 null반환")
    @GetMapping("/{memberId}")
    public ResponseEntity<UserDeviceResponseDto.device> getUuid(@PathVariable @Valid Long memberId){
        log.info("[UserDeviceController.getUuid] memberId: {}", memberId);

        UserDeviceRequestDto.getUuidDto reqDto = UserDeviceRequestDto.getUuidDto.builder()
                .memberId(memberId)
                .build();
        try{
            UserDeviceResponseDto.device device = userDeviceService.getUuid(reqDto);
            return new ResponseEntity<>(device, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
