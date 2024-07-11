package com.ssafy.minuet.news.service;

import com.ssafy.minuet.news.entity.Category;
import com.ssafy.minuet.news.reposiroty.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class CategoryServiceImpl implements CategoryService{

    private final CategoryRepository categoryRepository;


    @Transactional
    @Override
    public void createCategory(String categoryName) {
        log.info("[CategoryServiceImpl.createCategory] start");

        //중복되면 안 생성
        boolean isExists = categoryRepository.existsByCategoryName(categoryName);
        
        //존재하지 않을 때만 생성
        if(!isExists){
            //카테고리 생성
            Category category = Category.builder()
                    .categoryName(categoryName)
                    .build();
            
            //저장
            categoryRepository.save(category);
        }

        log.info("[CategoryServiceImpl.createCategory] end");
    }
}
