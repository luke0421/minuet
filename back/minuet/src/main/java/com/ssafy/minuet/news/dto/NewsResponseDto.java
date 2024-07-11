package com.ssafy.minuet.news.dto;

import com.ssafy.minuet.news.entity.News;
import com.ssafy.minuet.regionNews.entity.RegionNews;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class NewsResponseDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class newsList{
        @NotNull(message = "[NewsResponseDto.userPickNews]newsId 은 Null 일 수 없습니다.")
        private Long newsId;

        @NotNull(message = "[NewsResponseDto.userPickNews]title 은 Null 일 수 없습니다.")
        private String title;

        @NotNull(message = "[NewsResponseDto.userPickNews]content 은 Null 일 수 없습니다.")
        private String content;

        @NotNull(message = "[NewsResponseDto.userPickNews]publishDate 은 Null 일 수 없습니다.")
        private LocalDate publishDate;

        @NotNull(message = "[NewsResponseDto.userPickNews]readCount 은 Null 일 수 없습니다.")
        private int readCount;

        @NotNull(message = "[NewsResponseDto.userPickNews]imgURL 은 Null 일 수 없습니다.")
        private String imgURL;

        @NotNull(message = "[NewsResponseDto.userPickNews]newsURL 은 Null 일 수 없습니다.")
        private String newsURL;

        @NotNull(message = "[NewsResponseDto.userPickNews]keyword 은 Null 일 수 없습니다.")
        private String[] keywordList;

        @Builder
        newsList(
                Long newsId,
                String title,
                String content,
                LocalDate publishDate,
                int readCount,
                String imgURL,
                String newsURL,
                String[] keywordList
        ) {
            this.newsId = newsId;
            this.title = title;
            this.content = content;
            this.publishDate = publishDate;
            this.readCount = readCount;
            this.imgURL = imgURL;
            this.newsURL = newsURL;
            this.keywordList = keywordList;
        }

    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detail{
        @NotNull(message = "[NewsResponseDto.detail]like 은 Null 일 수 없습니다.")
        private boolean like;

        @NotNull(message = "[NewsResponseDto.detail]dislike 은 Null 일 수 없습니다.")
        private boolean dislike;

        @NotNull(message = "[NewsResponseDto.detail]bookmark 은 Null 일 수 없습니다.")
        private boolean bookmark;

        @NotNull(message = "[NewsResponseDto.detail]likeCount 은 Null 일 수 없습니다.")
        private int newsLikeCount;

        @Builder
        detail(
                boolean like,
                boolean dislike,
                boolean bookmark,
                int newsLikeCount
        ) {
            this.like = like;
            this.dislike = dislike;
            this.bookmark = bookmark;
            this.newsLikeCount = newsLikeCount;

        }

    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class newsListWithTotalPage {
        @NotNull(message = "[NewsResponseDto.categoryNewsList]list 은 Null 일 수 없습니다.")
        private List<newsList> newsLists = new ArrayList<>();

        @NotNull(message = "[NewsResponseDto.categoryNewsList]total page 은 Null 일 수 없습니다.")
        private int totalPage;

        @Builder
        newsListWithTotalPage(
                int totalPage
        ) {
            this.totalPage = totalPage;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class searchNewsWithTotalPage {
        @NotNull(message = "[NewsResponseDto.searchNewsWithTotalPage]list 은 Null 일 수 없습니다.")
        private List<searchList> newsLists = new ArrayList<>();

        @NotNull(message = "[NewsResponseDto.searchNewsWithTotalPage]total page 은 Null 일 수 없습니다.")
        private int totalPage;

        @Builder
        searchNewsWithTotalPage(
                int totalPage
        ) {
            this.totalPage = totalPage;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class searchList{
        @NotNull(message = "[NewsResponseDto.searchList]newsId 은 Null 일 수 없습니다.")
        private Long newsId;

        @NotNull(message = "[NewsResponseDto.searchList]title 은 Null 일 수 없습니다.")
        private String title;

        @NotNull(message = "[NewsResponseDto.searchList]content 은 Null 일 수 없습니다.")
        private String content;

        @NotNull(message = "[NewsResponseDto.searchList]publishDate 은 Null 일 수 없습니다.")
        private LocalDate publishDate;

        @NotNull(message = "[NewsResponseDto.searchList]readCount 은 Null 일 수 없습니다.")
        private int readCount;

        @NotNull(message = "[NewsResponseDto.searchList]imgURL 은 Null 일 수 없습니다.")
        private String imgURL;

        @NotNull(message = "[NewsResponseDto.searchList]newsURL 은 Null 일 수 없습니다.")
        private String newsURL;

        @NotNull(message = "[NewsResponseDto.searchList]newsURL 은 Null 일 수 없습니다.")
        private boolean isRegion;

        @NotNull(message = "[NewsResponseDto.searchList]keywordList 은 Null 일 수 없습니다.")
        private String[] keywordList;




        @Builder
        searchList(
                Long newsId,
                String title,
                String content,
                LocalDate publishDate,
                int readCount,
                String imgURL,
                String newsURL,
                boolean isRegion,
                String[] keywordList
        ) {
            this.newsId = newsId;
            this.title = title;
            this.content = content;
            this.publishDate = publishDate;
            this.readCount = readCount;
            this.imgURL = imgURL;
            this.newsURL = newsURL;
            this.isRegion = isRegion;
            this.keywordList = keywordList;

        }

    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class operaNews{
        @NotNull(message = "[NewsResponseDto.operaNews]title 은 Null 일 수 없습니다.")
        private String title;

        @NotNull(message = "[NewsResponseDto.operaNews]content 은 Null 일 수 없습니다.")
        private String content;

        @Builder
        operaNews(
                String title,
                String content
        ){
            this.title = title;
            this.content = content;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PUBLIC)
    public static class operaList {
        @NotNull(message = "[NewsResponseDto.operaList]title 은 Null 일 수 없습니다.")
        public List<operaNews> list = new ArrayList<>();

    }



    public static NewsResponseDto.newsList toNewsDto(News news){
        String keywords = news.getKeyword();


        String[] keywordList = null;
        if(keywords != null){
            keywordList = keywords.split(" ");
        }

        return NewsResponseDto.newsList.builder()
                .newsId(news.getId())
                .title(news.getTitle())
                .content(news.getContent())
                .publishDate(news.getPublishDate())
                .readCount(news.getReadCount())
                .imgURL(news.getImgURL())
                .newsURL(news.getNewsURL())
                .keywordList(keywordList)
                .build();
    }

    public static NewsResponseDto.newsList toNewsDto(RegionNews regionNews){
        return NewsResponseDto.newsList.builder()
                .newsId(regionNews.getId())
                .title(regionNews.getTitle())
                .content(regionNews.getContent())
                .publishDate(regionNews.getPublishDate())
                .imgURL(regionNews.getImgURL())
                .newsURL(regionNews.getNewsURL())
                .build();
    }

    public static NewsResponseDto.searchList toSearchNewsDto(News news){
        String keywords = news.getKeyword();

        String[] keywordList = null;
        if(keywords != null){
            keywordList = keywords.split(" ");
        }
        return searchList.builder()
                .newsId(news.getId())
                .title(news.getTitle())
                .content(news.getContent())
                .publishDate(news.getPublishDate())
                .readCount(news.getReadCount())
                .imgURL(news.getImgURL())
                .newsURL(news.getNewsURL())
                .isRegion(false)
                .keywordList(keywordList)
                .build();
    }

    public static NewsResponseDto.searchList toSearchNewsDto(RegionNews regionNews){
        return searchList.builder()
                .newsId(regionNews.getId())
                .title(regionNews.getTitle())
                .content(regionNews.getContent())
                .publishDate(regionNews.getPublishDate())
                .imgURL(regionNews.getImgURL())
                .newsURL(regionNews.getNewsURL())
                .isRegion(true)
                .build();
    }

}
