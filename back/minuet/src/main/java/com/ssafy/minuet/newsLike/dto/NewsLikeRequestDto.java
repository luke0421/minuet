package com.ssafy.minuet.newsLike.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class NewsLikeRequestDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class reqLikeDto {
        @NotNull(message = "[NewsLikeRequestDto.addLike]member 은 Null 일 수 없습니다.")
        private Long memberId;

        @NotNull(message = "[NewsLikeRequestDto.addLike]news 은 Null 일 수 없습니다.")
        private Long newsId;

        @Builder
        reqLikeDto(
                Long member,
                Long news
        ){
            this.memberId = member;
            this.newsId = news;
        }
    }
}
