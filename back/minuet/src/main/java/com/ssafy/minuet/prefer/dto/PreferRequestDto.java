package com.ssafy.minuet.prefer.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class PreferRequestDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class list {
        @NotNull(message = "[PreferRequestDto.list]memberID 은 Null 일 수 없습니다.")
        private Long memberId;

        @Builder
        list(
                Long memberId
        ){
            this.memberId = memberId;
        }

    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class add {
        @NotNull(message = "[PreferRequestDto.add]memberID 은 Null 일 수 없습니다.")
        private Long memberId;

        @NotNull(message = "[PreferRequestDto.add]category 은 Null 일 수 없습니다.")
        private String categoryName;

        @Builder
        add(
                Long memberId,
                String categoryName
        ){
            this.memberId = memberId;
            this.categoryName = categoryName;
        }

    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class delete {
        @NotNull(message = "[PreferRequestDto.add]memberID 은 Null 일 수 없습니다.")
        private Long memberId;

        @NotNull(message = "[PreferRequestDto.add]category 은 Null 일 수 없습니다.")
        private String categoryName;

        @Builder
        delete(
                Long memberId,
                String categoryName
        ){
            this.memberId = memberId;
            this.categoryName = categoryName;
        }

    }
}
