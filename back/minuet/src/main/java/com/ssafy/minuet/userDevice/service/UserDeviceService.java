package com.ssafy.minuet.userDevice.service;

import com.ssafy.minuet.userDevice.dto.UserDeviceRequestDto;
import com.ssafy.minuet.userDevice.dto.UserDeviceResponseDto;

public interface UserDeviceService {
    public void connect(UserDeviceRequestDto.connect reqDto);

    public UserDeviceResponseDto.device getUuid(UserDeviceRequestDto.getUuidDto reqDto);
}
