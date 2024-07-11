package com.ssafy.minuet.regionNews.service;
import com.ssafy.minuet.news.dto.NewsRequestDto;
import com.ssafy.minuet.news.dto.NewsResponseDto;
import com.ssafy.minuet.regionNews.dto.RegionNewsRequestDto;
import com.ssafy.minuet.regionNews.dto.RegionNewsResponseDto;

import java.util.List;

public interface RegionNewsService {
    public RegionNewsResponseDto.newsListWithTotalPage news(RegionNewsRequestDto.regionNews reqDto);
    public RegionNewsResponseDto.newsListWithTotalPage searchRegionNews(RegionNewsRequestDto.searchRegionNews reqDto);

    public RegionNewsResponseDto.detail getRegionDetail(RegionNewsRequestDto.regionDetail reqDto);
}
