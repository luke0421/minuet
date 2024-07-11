package com.ssafy.minuet.newsDislike.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class NewsDislikeResponseDto {
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class list {
        @NotNull(message = "[NewsDislikeResponseDto.list]id 은 Null 일 수 없습니다.")
        private Long id;

        @NotNull(message = "[NewsDislikeResponseDto.list]newsId 은 Null 일 수 없습니다.")
        private Long newsId;

        @Builder
        list(
                Long id,
                Long newsId
        ){
            this.id = id;
            this.newsId = newsId;
        }


    }
}
