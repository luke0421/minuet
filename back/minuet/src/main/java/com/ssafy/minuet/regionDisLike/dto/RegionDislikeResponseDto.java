package com.ssafy.minuet.regionDisLike.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class RegionDislikeResponseDto {
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class list {
        @NotNull(message = "[RegionDislikeResponseDto.list]id 은 Null 일 수 없습니다.")
        private Long id;

        @NotNull(message = "[RegionDislikeResponseDto.list]regionNewsId 은 Null 일 수 없습니다.")
        private Long regionNewsId;

        @Builder
        list(
                Long id,
                Long regionNewsId
        ){
            this.id = id;
            this.regionNewsId = regionNewsId;
        }


    }
}
