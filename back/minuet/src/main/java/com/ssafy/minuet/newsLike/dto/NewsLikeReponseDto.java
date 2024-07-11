package com.ssafy.minuet.newsLike.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class NewsLikeReponseDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class list {
        @NotNull(message = "[NewsLikeReponseDto.list]id 은 Null 일 수 없습니다.")
        private Long id;

        @NotNull(message = "[NewsLikeReponseDto.list]newsId 은 Null 일 수 없습니다.")
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
