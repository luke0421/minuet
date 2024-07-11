package com.ssafy.minuet.userDevice.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class UserDeviceResponseDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class device {
        @NotNull(message = "[UserDeviceRequestDto.device] uuid can not null")
        private String uuid;

        @Builder
        device(
                String uuid
        ){
            this.uuid = uuid;
        }
    }
}
