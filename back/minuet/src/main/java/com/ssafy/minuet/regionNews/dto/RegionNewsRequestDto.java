package com.ssafy.minuet.regionNews.dto;

import com.ssafy.minuet.regionNews.entity.Region;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class RegionNewsRequestDto {
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class regionNews{
        @NotNull(message = "[RegionNewsResponseDto.regionNews]region 은 Null 일 수 없습니다.")
        private String region;
        @NotNull(message = "[RegionNewsResponseDto.regionNews]pageNo 은 Null 일 수 없습니다.")
        private int pageNo;
        @NotNull(message = "[RegionNewsRequestDto.categoryNews]memberId 은 Null 일 수 없습니다.")
        private Long memberId;

        @Builder
        regionNews(
                String region,
                int pageNo,
                Long memberId
        ){
            this.region=region;
            this.pageNo=pageNo;
            this.memberId = memberId;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class searchRegionNews{
        @NotNull(message = "[RegionNewsRequestDto.searchRegionNews]word 은 Null 일 수 없습니다.")
        private String word;

        @NotNull(message = "[RegionNewsRequestDto.searchRegionNews]pageNo 은 Null 일 수 없습니다.")
        private int pageNo;

        @Builder
        searchRegionNews(
                String word,
                int pageNo
        ){
            this.word = word;
            this.pageNo=pageNo;
        }

    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class regionDetail {
        @NotNull(message = "[RegionNewsRequestDto.detail]memberId 은 Null 일 수 없습니다.")
        private Long memberId;
        @NotNull(message = "[ReigonNewsRequestDto.detail]regionNewsID 은 Null 일 수 없습니다.")
        private Long newsId;


        @Builder
        regionDetail(
                Long memberId,
                Long newsId
        ){
            this.memberId = memberId;
            this.newsId = newsId;
        }


    }
}
