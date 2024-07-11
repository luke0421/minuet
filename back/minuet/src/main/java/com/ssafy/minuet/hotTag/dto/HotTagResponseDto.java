package com.ssafy.minuet.hotTag.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class HotTagResponseDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class hotTag {
        @NotNull(message = "[HotTagResponseDto.hotTag] word can not null")
        private String word;

        @Builder
        hotTag(
                String word
        ){
            this.word = word;
        }
    }
}
