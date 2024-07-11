package com.ssafy.minuet.regionDisLike.service;

import com.ssafy.minuet.newsDislike.dto.NewsDislikeRequestDto;
import com.ssafy.minuet.newsDislike.dto.NewsDislikeResponseDto;
import com.ssafy.minuet.regionDisLike.dto.RegionDislikeRequestDto;
import com.ssafy.minuet.regionDisLike.dto.RegionDislikeResponseDto;

import java.util.List;

public interface RegionDislikeService {

    public void addRegionDislike(RegionDislikeRequestDto.reqRegionDislikeDto reqDto);

    public void deleteRegionDislike(RegionDislikeRequestDto.reqRegionDislikeDto reqDislikeDto);

    public List<RegionDislikeResponseDto.list> regionDislikeList(Long memberId);
}
