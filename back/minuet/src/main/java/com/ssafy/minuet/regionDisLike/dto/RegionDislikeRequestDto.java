package com.ssafy.minuet.regionDisLike.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class RegionDislikeRequestDto {
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class reqRegionDislikeDto {
        @NotNull(message = "[RegionDislikeRequestDto.addRegionDislike]member 은 Null 일 수 없습니다.")
        private Long memberId;

        @NotNull(message = "[RegionDislikeRequestDto.addRegionDislike]regionNews 은 Null 일 수 없습니다.")
        private Long regionNewsId;

        @Builder
        reqRegionDislikeDto(
                Long member,
                Long regionNewsId
        ){
            this.memberId = member;
            this.regionNewsId = regionNewsId;
        }
    }

}
