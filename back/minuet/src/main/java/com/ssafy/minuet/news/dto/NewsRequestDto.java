package com.ssafy.minuet.news.dto;

import com.ssafy.minuet.news.entity.Category;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class NewsRequestDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class userPickNews {
        @NotNull(message = "[NewsRequestDto.userPickNews]age 은 Null 일 수 없습니다.")
        private int age;

        @NotNull(message = "[NewsRequestDto.userPickNews]gender 은 Null 일 수 없습니다.")
        private boolean gender;

        @Builder
        userPickNews(
                int age,
                boolean gender
        ){
            this.age = age;
            this.gender = gender;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class categoryNews {
        @NotNull(message = "[NewsRequestDto.categoryNews]category 은 Null 일 수 없습니다.")
        private String category;
        @NotNull(message = "[NewsRequestDto.categoryNews]pageNo 은 Null 일 수 없습니다.")
        private int pageNo;
        @NotNull(message = "[NewsRequestDto.categoryNews]memberId 은 Null 일 수 없습니다.")
        private Long memberId;


        @Builder
        categoryNews(
                String category,
                int pageNo,
                Long memberId
        ){
            this.category = category;
            this.pageNo = pageNo;
            this.memberId = memberId;
        }


    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class searchNews{
        @NotNull(message = "[NewsRequestDto.searchNews]word 은 Null 일 수 없습니다.")
        private String word;

        @NotNull(message = "[NewsRequestDto.searchNews]pageNo 은 Null 일 수 없습니다.")
        private int pageNo;

        @NotNull(message = "[NewsRequestDto.searchNews]memberId 은 Null 일 수 없습니다.")
        private Long memberId;

        @Builder
        searchNews(
                String word,
                int pageNo,
                Long memberId
        ){
            this.word = word;
            this.pageNo = pageNo;
            this.memberId = memberId;
        }

    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detail {
        @NotNull(message = "[NewsRequestDto.detail]memberId 은 Null 일 수 없습니다.")
        private Long memberId;
        @NotNull(message = "[NewsRequestDto.detail]newsID 은 Null 일 수 없습니다.")
        private Long newsId;


        @Builder
        detail(
                Long memberId,
                Long newsId
        ){
            this.memberId = memberId;
            this.newsId = newsId;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class operaList {
        @NotNull(message = "[NewsRequestDto.operaList]day 은 Null 일 수 없습니다.")
        private int day;

        @Builder
        operaList(
                int day
        ){
            this.day = day;
        }
    }


    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class operaSearchList {
        @NotNull(message = "[NewsRequestDto.operaSearchList]day 은 Null 일 수 없습니다.")
        private int day;
        @NotNull(message = "[NewsRequestDto.operaSearchList]word 은 Null 일 수 없습니다.")
        private String word;

        @Builder
        operaSearchList(
                int day,
                String word
        ){
            this.day = day;
            this.word = word;
        }


    }
}
