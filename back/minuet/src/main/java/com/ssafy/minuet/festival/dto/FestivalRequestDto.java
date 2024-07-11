package com.ssafy.minuet.festival.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class FestivalRequestDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class festivalList{
        @NotNull(message = "[FestivalRequestDto.festivalList] region은 null안 됨")
        private String region;

        @Builder
        festivalList(
                String region
        ){
            this.region = region;
        }
    }
}
