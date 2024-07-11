package com.ssafy.minuet.regionNews.dto;

import com.ssafy.minuet.regionNews.entity.RegionNews;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class RegionNewsResponseDto {
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class newsList{
        @NotNull(message = "[regionNewsResponseDto.regionNews]newsId 은 Null 일 수 없습니다.")
        private Long newsId;

        @NotNull(message = "[regionNewsResponseDto.regionNews]title 은 Null 일 수 없습니다.")
        private String title;

        @NotNull(message = "[regionNewsResponseDto.regionNews]content 은 Null 일 수 없습니다.")
        private String content;

        @NotNull(message = "[regionNewsResponseDto.regionNews]publishDate 은 Null 일 수 없습니다.")
        private LocalDate publishDate;


        @NotNull(message = "[regionNewsResponseDto.regionNews]imgURL 은 Null 일 수 없습니다.")
        private String imgURL;

        @NotNull(message = "[regionNewsResponseDto.regionNews]newsURL 은 Null 일 수 없습니다.")
        private String newsURL;

        @NotNull(message = "[regionNewsResponseDto.regionNews]keywordList 은 Null 일 수 없습니다.")
        private String[] keywordList;

        @Builder
        newsList(
                Long newsId,
                String title,
                String content,
                LocalDate publishDate,
                String imgURL,
                String newsURL,
                String[] keywordList
        ){
            this.newsId = newsId;
            this.title = title;
            this.content = content;
            this.publishDate = publishDate;
            this.imgURL = imgURL;
            this.newsURL = newsURL;
            this.keywordList = keywordList;

        }

    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detail{
        @NotNull(message = "[RegionNewsResponseDto.regionDetail]regionLike 은 Null 일 수 없습니다.")
        private boolean like;

        @NotNull(message = "[RegionNewsResponseDto.regionDetail]regionDislike 은 Null 일 수 없습니다.")
        private boolean dislike;

        @NotNull(message = "[RegionNewsResponseDto.regionDetail]regionBookmark 은 Null 일 수 없습니다.")
        private boolean bookmark;

        @NotNull(message = "[RegionNewsResponseDto.regionDetail]regionLikeCount 은 Null 일 수 없습니다.")
        private int likeCount;

        @Builder
        detail(
                boolean like,
                boolean dislike,
                boolean bookmark,
                int likeCount
        ){
            this.like=like;
            this.dislike=dislike;
            this.bookmark=bookmark;
            this.likeCount=likeCount;
        }

    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class newsListWithTotalPage {
        @NotNull(message = "[RegionNewsResponseDto.regionNewsList]list 은 Null 일 수 없습니다.")
        private List<newsList> newsLists = new ArrayList<>();

        @NotNull(message = "[RegionNewsResponseDto.regionNewsList]total page 은 Null 일 수 없습니다.")
        private int totalPage;

        @Builder
        newsListWithTotalPage(
                int totalPage
        ) {
            this.totalPage = totalPage;
        }
    }


    public static RegionNewsResponseDto.newsList toNewsDto(RegionNews news){
        String keywords = news.getKeyword();

        String[] keywordList = null;
        if(keywords != null){
            keywordList = keywords.split(" ");
        }


        return RegionNewsResponseDto.newsList.builder()
                .newsId(news.getId())
                .title(news.getTitle())
                .content(news.getContent())
                .publishDate(news.getPublishDate())
                .imgURL(news.getImgURL())
                .newsURL(news.getNewsURL())
                .keywordList(keywordList)
                .build();
    }
}
