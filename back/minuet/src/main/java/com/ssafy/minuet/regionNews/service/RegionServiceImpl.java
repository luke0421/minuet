package com.ssafy.minuet.regionNews.service;
import com.ssafy.minuet.news.entity.Category;
import com.ssafy.minuet.regionNews.entity.Region;
import com.ssafy.minuet.regionNews.repository.RegionRepository;
import com.ssafy.minuet.regionNews.service.RegionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class RegionServiceImpl implements RegionService {
    private final RegionRepository regionRepository;

    @Transactional
    @Override
    public void createRegion(String regionName){
        log.info("[RegionServiceImpl.createRegion] start");

        //중복되면 안 생성
        boolean isExists = regionRepository.existsByRegionName(regionName);

        //존재하지 않을 때만 생성
        if(!isExists){
            //카테고리 생성
            Region region = Region.builder()
                    .regionName(regionName)
                    .build();

            //저장
            regionRepository.save(region);
        }

        log.info("[RegionServiceImpl.createRegion] end");
    }
}
