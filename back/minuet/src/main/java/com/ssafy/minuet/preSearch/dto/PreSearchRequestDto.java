package com.ssafy.minuet.preSearch.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class PreSearchRequestDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class add {
        @NotNull(message = "[PreSearchRequestDto.add] memberId 은 null안됨")
        private Long memberId;

        @NotNull(message = "[PreSearchRequestDto.add] word는 null안 됨")
        private String word;

        @Builder
        add(
                Long memberId,
                String word
        ){
            this.memberId = memberId;
            this.word = word;
        }

    }
}
