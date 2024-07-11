package com.ssafy.minuet.hotTopic.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class HotTopicRequestDto {
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class hotTopic{
        @NotNull(message="[HotTopicRequestDto.hotTopic]member 는 Null 일 수 없습니다.")
        private Long memberId;

        @Builder
        hotTopic(
                Long memberId
        ){
            this.memberId=memberId;
        }
    }
}
