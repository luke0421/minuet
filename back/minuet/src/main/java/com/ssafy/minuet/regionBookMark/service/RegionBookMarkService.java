package com.ssafy.minuet.regionBookMark.service;

import com.ssafy.minuet.bookMark.dto.BookMarkRequestDto;
import com.ssafy.minuet.bookMark.dto.BookMarkResponseDto;
import com.ssafy.minuet.regionBookMark.dto.RegionBookMarkRequestDto;
import com.ssafy.minuet.regionBookMark.dto.RegionBookMarkResponseDto;

import java.util.List;

public interface RegionBookMarkService {

    public void addRegionBookMark(RegionBookMarkRequestDto.addRegionBookMark reqDto);

    public void deleteRegionBookMark(RegionBookMarkRequestDto.addRegionBookMark reqDto);


    public RegionBookMarkResponseDto.myBookmark bookMarkList(RegionBookMarkRequestDto.list reqDto);
}
