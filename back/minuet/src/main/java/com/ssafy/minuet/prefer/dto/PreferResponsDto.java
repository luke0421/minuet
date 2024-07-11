package com.ssafy.minuet.prefer.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class PreferResponsDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class list {
        @NotNull(message = "[PreferResponsDto.list]category는 Null 일 수 없습니다.")
        private String category;

        @Builder
        list(
                String category
        ){
            this.category = category;
        }



    }
}
