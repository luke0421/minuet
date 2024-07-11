package com.ssafy.minuet.devices.service;

import com.ssafy.minuet.devices.dto.DevicesRequestDto;
import com.ssafy.minuet.devices.entity.Devices;
import com.ssafy.minuet.devices.repository.DevicesRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class DevicesServiceImpl implements DevicesService{

    private final DevicesRepository devicesRepository;

    //========기기 추가=========//
    @Override
    @Transactional
    public void addDevice(DevicesRequestDto.add requestDto) {
        log.info("[DevicesServiceImpl.addDevice] start");

        Devices devices = Devices.builder()
                                .uuid(requestDto.getUuid())
                                .build();

        devicesRepository.save(devices);

        log.info("[DevicesServiceImpl.addDevice] end");

    }
}
