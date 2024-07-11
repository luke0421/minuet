package com.ssafy.minuet.preSearch.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

public class PreSearchResponseDto {

    @Getter
    public static class list {
        @NotNull(message = "[PreSearchResponseDto.list] list")
        private List<String> words = new ArrayList<>();

        @Builder
        list(){}
    }
}
