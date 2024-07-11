package com.ssafy.minuet.briefing.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

public class BriefingRequestDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class briefingAdd {
        @NotNull(message = "[BriefingRequestDto.briefingSetting]category은 Null 일 수 없습니다.")
        private String category;
        @NotNull(message = "[BriefingRequestDto.briefingSetting]time은 Null 일 수 없습니다.")
        private LocalTime time;
        @NotNull(message = "[BriefingRequestDto.briefingSetting]memberId 은 Null 일 수 없습니다.")
        private Long memberId;

        @Builder
        briefingAdd(
                String category,
                LocalTime time,
                Long memberId
        ) {
            this.category = category;
            this.time = time;
            this.memberId = memberId;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class briefingUpdate {
        @NotNull(message = "[BriefingRequestDto.briefingSetting]category은 Null 일 수 없습니다.")
        private String category;
        @NotNull(message = "[BriefingRequestDto.briefingSetting]time은 Null 일 수 없습니다.")
        private LocalTime time;
        @NotNull(message = "[BriefingRequestDto.briefingSetting]briefingId은 Null 일 수 없습니다.")
        private Long briefingId;


        @Builder
        briefingUpdate(
                String category,
                LocalTime time,
                Long briefingId
        ) {
            this.category = category;
            this.time = time;
            this.briefingId=briefingId;
        }

    }


    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class briefingDelete {
        @NotNull(message = "[BriefingRequestDto.briefingSetting]briefingId 은 Null 일 수 없습니다.")
        private Long briefingId;


        @Builder
        briefingDelete(
                Long briefingId
        ) {
            this.briefingId=briefingId;;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class onOff {
        @NotNull(message = "[BriefingRequestDto.onOff]briefingId 은 Null 일 수 없습니다.")
        private Long briefingId;

        @Builder
        onOff(
                Long briefingId
        ){
            this.briefingId = briefingId;
        }
    }
}

