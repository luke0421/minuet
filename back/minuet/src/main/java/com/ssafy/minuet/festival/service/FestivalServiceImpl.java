package com.ssafy.minuet.festival.service;


import com.ssafy.minuet.festival.dto.FestivalRequestDto;
import com.ssafy.minuet.festival.dto.FestivalResponseDto;
import com.ssafy.minuet.festival.entity.Festival;
import com.ssafy.minuet.festival.repository.FestivalRepository;
import com.ssafy.minuet.regionNews.entity.Region;
import com.ssafy.minuet.regionNews.repository.RegionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class FestivalServiceImpl implements FestivalService{

    private final FestivalRepository festivalRepository;
    private final RegionRepository regionRepository;

    @Override
    public FestivalResponseDto.festivalList getFestival(FestivalRequestDto.festivalList reqDto) {

        //지역 찾기
        Region region = regionRepository.findByRegionName(reqDto.getRegion())
                .orElseThrow(() -> new IllegalArgumentException());

        //해당 지역의 축제 찾기
        List<Festival> festivalList = festivalRepository.findByRegion(region);

        FestivalResponseDto.festivalList list = new FestivalResponseDto.festivalList();

        for(Festival festival : festivalList){
            list.getFestivals().add(FestivalResponseDto.festival.builder()
                    .title(festival.getTitle())
                    .poster(festival.getPoster())
                    .periode(festival.getPeriod())
                    .url(festival.getUrl())
                    .build());
        }

        return list;
    }
}
