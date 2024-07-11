package com.ssafy.minuet.newsDislike.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class NewsDislikeRequestDto {
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class reqDislikeDto {
        @NotNull(message = "[NewsDislikeRequestDto.addDislike]member 은 Null 일 수 없습니다.")
        private Long memberId;

        @NotNull(message = "[NewsDislikeRequestDto.addDislike]news 은 Null 일 수 없습니다.")
        private Long newsId;

        @Builder
        reqDislikeDto(
                Long member,
                Long news
        ){
            this.memberId = member;
            this.newsId = news;
        }
    }

}
