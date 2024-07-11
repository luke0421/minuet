package com.ssafy.minuet.hotTopic.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

public class HotTopicResponseDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class hotTopicList {
        @NotNull(message = "[HotTopicResponseDto.hotTopic]newsId 는 Null 일 수 없습니다.")
        private Long newsId;

        @NotNull(message = "[HotTopicResponseDto.hotTopic]title 은 Null 일 수 없습니다.")
        private String title;

        @NotNull(message = "[HotTopicResponseDto.hotTopic]content 은 Null 일 수 없습니다.")
        private String content;

        @NotNull(message = "[HotTopicResponseDto.hotTopic]publishDate 은 Null 일 수 없습니다.")
        private LocalDate publishDate;

        @Builder
        hotTopicList(
                        Long newsId,
                        String title,
                        String content,
                        LocalDate publishDate
                ) {
            this.newsId = newsId;
            this.title = title;
            this.content = content;
            this.publishDate = publishDate;
        }


    }
}