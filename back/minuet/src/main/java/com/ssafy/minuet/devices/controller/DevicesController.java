package com.ssafy.minuet.devices.controller;

import com.ssafy.minuet.devices.dto.DevicesRequestDto;
import com.ssafy.minuet.devices.service.DevicesService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name="iot device API", description = "iot device 관련 API입니다")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/device")
@Slf4j
public class DevicesController {

    private final DevicesService devicesService;
    @Operation(summary = "iot 기기 추가")
    @PostMapping
    public ResponseEntity addDevice(@RequestBody @Valid DevicesRequestDto.add requestDto){
        log.info("[DevicesController.addDevice] uuid: {}", requestDto.getUuid());
        try{
            devicesService.addDevice(requestDto);
            return new ResponseEntity(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
