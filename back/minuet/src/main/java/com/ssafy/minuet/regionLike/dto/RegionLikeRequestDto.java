package com.ssafy.minuet.regionLike.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class RegionLikeRequestDto {
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class reqRegionLikeDto {
        @NotNull(message = "[RegionLikeRequestDto.addLike]member 은 Null 일 수 없습니다.")
        private Long memberId;

        @NotNull(message = "[RegionLikeRequestDto.addLike]regionNews 은 Null 일 수 없습니다.")
        private Long regionNewsId;

        @Builder
        reqRegionLikeDto(
                Long member,
                Long regionNewsId
        ){
            this.memberId = member;
            this.regionNewsId = regionNewsId;
        }
    }
}
