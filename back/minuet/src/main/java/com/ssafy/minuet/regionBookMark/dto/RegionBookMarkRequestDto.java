package com.ssafy.minuet.regionBookMark.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class RegionBookMarkRequestDto {
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class addRegionBookMark{
        @NotNull(message = "[RegionBookMarkRequestDto.addBookMark]member 은 Null 일 수 없습니다.")
        private Long memberId;

        @NotNull(message = "[RegionBookMarkRequestDto.addBookMark]regionNews 은 Null 일 수 없습니다.")
        private Long newsId;

        @Builder
        addRegionBookMark(
                Long member,
                Long news
        ){
            this.memberId = member;
            this.newsId = news;
        }
    }
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class list {
        @NotNull(message = "[BookMarkRequestDto.list] memberId는 null일 수 없습니다. ")
        private Long memberId;

        @NotNull(message = "[BookMarkRequestDto.list] pageNo는 null일 수 없습니다. ")
        private int pageNo;

        @Builder
        list(
                Long memberId,
                int pageNo
        ){
            this.memberId = memberId;
            this.pageNo = pageNo;
        }
    }
}
