package com.ssafy.minuet.regionLike.service;

import com.ssafy.minuet.regionLike.dto.RegionLikeRequestDto;
import com.ssafy.minuet.regionLike.dto.RegionLikeResponseDto;

import java.util.List;

public interface RegionLikeService {

    public void addRegionLike(RegionLikeRequestDto.reqRegionLikeDto reqDto);

    public void deleteRegionLike(RegionLikeRequestDto.reqRegionLikeDto reqLikeDto);

    public List<RegionLikeResponseDto.list> regionLikeList(Long memberId);
}
