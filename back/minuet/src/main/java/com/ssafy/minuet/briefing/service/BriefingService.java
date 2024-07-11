package com.ssafy.minuet.briefing.service;

import com.ssafy.minuet.briefing.dto.BriefingRequestDto;
import com.ssafy.minuet.briefing.dto.BriefingResponseDto;

import java.util.List;

public interface BriefingService {
    public void addBriefing(BriefingRequestDto.briefingAdd reqDto);

    public void deleteBriefing(BriefingRequestDto.briefingDelete reqDto);

    public void updateBriefing(BriefingRequestDto.briefingUpdate reqDto);
    public List<BriefingResponseDto.list> briefingList(Long memberId);

    public BriefingResponseDto.onoff onOff(BriefingRequestDto.onOff reqDto);
}
