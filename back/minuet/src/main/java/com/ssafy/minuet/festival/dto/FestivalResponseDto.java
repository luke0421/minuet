package com.ssafy.minuet.festival.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

public class FestivalResponseDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class festival{
        @NotNull(message = "[FestivalResponseDto.festival] title은 null안 됨")
        private String title;

        @NotNull(message = "[FestivalResponseDto.festival] poster은 null안 됨")
        private String poster;

        @NotNull(message = "[FestivalResponseDto.festival] periode은 null안 됨")
        private String periode;

        @NotNull(message = "[FestivalResponseDto.festival] url은 null안 됨")
        private String url;

        @Builder
        festival(
                String title,
                String poster,
                String periode,
                String url
        ){
            this.title = title;
            this.poster = poster;
            this.periode = periode;
            this.url = url;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PUBLIC)
    public static class festivalList{
        @NotNull(message = "[FestivalResponseDto.festivalList] list는 null안 됨")
        List<festival> festivals = new ArrayList<>();
    }
}
