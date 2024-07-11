package com.ssafy.minuet.userDevice.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class UserDeviceRequestDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class connect {
        @NotNull(message = "[UserDeviceRequestDto.connect] memberId can not null")
        private Long memberId;

        @NotNull(message = "[UserDeviceRequestDto.connect] uuid can not null")
        private String uuid;

        @Builder
        connect(
                Long memberId,
                String uuid
        ){
            this.memberId = memberId;
            this.uuid = uuid;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class getUuidDto {
        @NotNull(message = "[UserDeviceRequestDto.uuid] memberId can not null")
        private Long memberId;

        @Builder
        getUuidDto(
                Long memberId
        ){
            this.memberId = memberId;
        }
    }
}
