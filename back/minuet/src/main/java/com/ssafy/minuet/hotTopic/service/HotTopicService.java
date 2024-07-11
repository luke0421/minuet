package com.ssafy.minuet.hotTopic.service;

import com.ssafy.minuet.hotTopic.dto.HotTopicRequestDto;
import com.ssafy.minuet.hotTopic.dto.HotTopicResponseDto;

import java.util.List;

public interface HotTopicService {
    public List<HotTopicResponseDto.hotTopicList> hotTopic(HotTopicRequestDto.hotTopic reqDto);
}
