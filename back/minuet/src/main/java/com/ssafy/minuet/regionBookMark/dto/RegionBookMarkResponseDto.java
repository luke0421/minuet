package com.ssafy.minuet.regionBookMark.dto;

import com.ssafy.minuet.bookMark.dto.BookMarkResponseDto;
import com.ssafy.minuet.regionNews.entity.Region;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class RegionBookMarkResponseDto {
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class list{
        @NotNull(message = "[RegionBookMarkResponseDto.list]id 은 Null 일 수 없습니다.")
        private Long id;

        @NotNull(message = "[RegionBookMarkResponseDto.list]newsId 은 Null 일 수 없습니다.")
        private Long regionNewsId;

        @NotNull(message = "[RegionBookMarkResponseDto.list]title 은 Null 일 수 없습니다.")
        private String title;

        @NotNull(message = "[RegionBookMarkResponseDto.list]content 은 Null 일 수 없습니다.")
        private String content;

        @NotNull(message = "[RegionBookMarkResponseDto.list]publishDate 은 Null 일 수 없습니다.")
        private LocalDate publishDate;

        private Region region;

        @NotNull(message = "[RegionBookMarkResponseDto.list]imgURL 은 Null 일 수 없습니다.")
        private String imgURL;

        @NotNull(message = "[RegionBookMarkResponseDto.list]regionNewsURL 은 Null 일 수 없습니다.")
        private String newsURL;

        @Builder
        list(
                Long id,
                Long regionNewsId,
                String title,
                String content,
                LocalDate publishDate,
                Region region,
                String imgURL,
                String newsURL
        ){
            this.id = id;
            this.regionNewsId = regionNewsId;
            this.title = title;
            this.content = content;
            this.publishDate = publishDate;
            this.region = region;
            this.imgURL = imgURL;
            this.newsURL = newsURL;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class myBookmark{
        @NotNull(message = "[BookMarkResponseDto.list]bookmarks 은 Null 일 수 없습니다.")
        private List<RegionBookMarkResponseDto.list> bookmarks = new ArrayList<>();

        @NotNull(message = "[BookMarkResponseDto.list]totalPage 은 Null 일 수 없습니다.")
        private int totalPage;

        @Builder
        myBookmark(
                int totalPage
        ){
            this.totalPage = totalPage;
        }
    }
}
