package com.ssafy.minuet;

import com.ssafy.minuet.news.entity.Category;
import com.ssafy.minuet.news.service.CategoryService;
import com.ssafy.minuet.regionNews.service.RegionService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class InitialDataLoader implements CommandLineRunner {

    private final CategoryService categoryService;
    private final RegionService regionService;

    public InitialDataLoader(CategoryService categoryService, RegionService regionService){
        this.categoryService = categoryService;
        this.regionService=regionService;
    }

    @Override
    public void run(String... args) throws Exception {
        loadInitialData();
    }

    private void loadInitialData(){

        categoryService.createCategory("ECONOMIC");
        categoryService.createCategory("SOCIAL");
        categoryService.createCategory("LIFE");
        categoryService.createCategory("WORLD");
        categoryService.createCategory("SCIENCE");

        regionService.createRegion("BUSAN");
        regionService.createRegion("ULSAN");
        regionService.createRegion("GANGWON");
        regionService.createRegion("GYEONGNAM");
        regionService.createRegion("INCHEON");


    }
}
