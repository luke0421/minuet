package com.ssafy.minuet.briefing.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

public class BriefingResponseDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)

    public static class list{
        @NotNull(message = "[BriefingResponseDto.list]id 은 Null 일 수 없습니다.")
        private Long id;

        @NotNull(message="[BriefingResponseDto.briefingSetting]category은 Null 일 수 없습니다.")
        private String category;

        @NotNull(message = "[BriefingResponseDto.list]time 은 Null 일 수 없습니다.")
        private LocalTime time;

        @NotNull(message = "[BriefingResponseDto.list]memberId 은 Null 일 수 없습니다.")
        private Long memberId;

        @NotNull(message = "[BriefingResponseDto.list]memberId 은 Null 일 수 없습니다.")
        private Boolean state;

        @Builder
        list(
                Long id,
                String category,
                LocalTime time,
                Long memberId,
                Boolean state
        ){
            this.id = id;
            this.category=category;
            this.time=time;
            this.memberId=memberId;
            this.state = state;
        }
    }

    @Builder
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class onoff {
        @NotNull(message = "[BriefingResponseDto.onoff]id 은 Null 일 수 없습니다.")
        private boolean state;

        @Builder
        onoff(
                boolean state
        ){
            this.state = state;
        }
    }
}
