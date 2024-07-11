package com.ssafy.minuet.festival.service;

import com.ssafy.minuet.festival.dto.FestivalRequestDto;
import com.ssafy.minuet.festival.dto.FestivalResponseDto;

public interface FestivalService {
    public FestivalResponseDto.festivalList getFestival(FestivalRequestDto.festivalList reqDto);
}
