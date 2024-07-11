package com.ssafy.minuet.devices.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class DevicesRequestDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class add {
        @NotNull(message = "[DevicesRequestDtoo.add] uuid can not null")
        private String uuid;

        @Builder
        add(
                String uuid
        ){
            this.uuid = uuid;
        }
    }
}
