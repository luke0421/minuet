package com.ssafy.minuet.regionLike.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class RegionLikeResponseDto {
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class list {
        @NotNull(message = "[RegionLikeReponseDto.list]id 은 Null 일 수 없습니다.")
        private Long id;

        @NotNull(message = "[RegionLikeReponseDto.list]regionNewsId 은 Null 일 수 없습니다.")
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
