package com.ssafy.minuet.bookMark.dto;

import com.ssafy.minuet.bookMark.entity.BookMark;
import com.ssafy.minuet.news.entity.Category;
import com.ssafy.minuet.news.entity.News;
import com.ssafy.minuet.regionBookMark.entity.RegionBookMark;
import com.ssafy.minuet.regionNews.entity.Region;
import com.ssafy.minuet.regionNews.entity.RegionNews;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class BookMarkResponseDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class list{
        @NotNull(message = "[BookMarkResponseDto.list]id 은 Null 일 수 없습니다.")
        private Long id;

        @NotNull(message = "[BookMarkResponseDto.list]newsId 은 Null 일 수 없습니다.")
        private Long newsId;

        @NotNull(message = "[BookMarkResponseDto.list]title 은 Null 일 수 없습니다.")
        private String title;

        @NotNull(message = "[BookMarkResponseDto.list]content 은 Null 일 수 없습니다.")
        private String content;

        @NotNull(message = "[BookMarkResponseDto.list]publishDate 은 Null 일 수 없습니다.")
        private LocalDate publishDate;

        @NotNull(message = "[BookMarkResponseDto.list]category 은 Null 일 수 없습니다.")
        private Category category;

        @NotNull(message = "[BookMarkResponseDto.list]imgURL 은 Null 일 수 없습니다.")
        private String imgURL;

        @NotNull(message = "[BookMarkResponseDto.list]newsURL 은 Null 일 수 없습니다.")
        private String newsURL;

        @NotNull(message = "[BookMarkResponseDto.list]region 은 Null 일 수 없습니다.")
        private Region region;

        @NotNull(message = "[BookMarkResponseDto.list]isRegion 은 Null 일 수 없습니다.")
        private Boolean isRegion;


        @Builder
        list(
                Long id,
                Long newsId,
                String title,
                String content,
                LocalDate publishDate,
                Category category,
                String imgURL,
                String newsURL,
                Region region,
                Boolean isRegion
        ){
            this.id = id;
            this.newsId = newsId;
            this.title = title;
            this.content = content;
            this.publishDate = publishDate;
            this.category = category;
            this.imgURL = imgURL;
            this.newsURL = newsURL;
            this.region = region;
            this.isRegion = isRegion;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class myBookmark{
        @NotNull(message = "[BookMarkResponseDto.list]bookmarks 은 Null 일 수 없습니다.")
        private List<list> bookmarks = new ArrayList<>();

        @NotNull(message = "[BookMarkResponseDto.list]totalPage 은 Null 일 수 없습니다.")
        private int totalPage;

        @NotNull(message = "[BookMarkResponseDto.list]totalLength 은 Null 일 수 없습니다.")
        private int totalLength;

        @Builder
        myBookmark(
                int totalPage,
                int totalLength
        ){
            this.totalPage = totalPage;
            this.totalLength = totalLength;
        }
    }

    public static BookMarkResponseDto.list toListDto(BookMark bookmark){
        News news = bookmark.getNews();

        return BookMarkResponseDto.list.builder()
                .id(bookmark.getId())
                .newsId(news.getId())
                .title(news.getTitle())
                .content(news.getContent())
                .publishDate(news.getPublishDate())
                .category(news.getCategory())
                .imgURL(news.getImgURL())
                .newsURL(news.getNewsURL())
                .isRegion(false)
                .build();
    }

    public static BookMarkResponseDto.list toListDto(RegionBookMark bookmark){
        RegionNews news = bookmark.getRegionNews();

        return BookMarkResponseDto.list.builder()
                .id(bookmark.getId())
                .newsId(news.getId())
                .title(news.getTitle())
                .content(news.getContent())
                .publishDate(news.getPublishDate())
                .region(news.getRegion())
                .imgURL(news.getImgURL())
                .newsURL(news.getNewsURL())
                .isRegion(true)
                .build();
    }

}
