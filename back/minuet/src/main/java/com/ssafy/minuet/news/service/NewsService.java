package com.ssafy.minuet.news.service;

import com.ssafy.minuet.news.dto.NewsRequestDto;
import com.ssafy.minuet.news.dto.NewsResponseDto;

import java.util.List;

public interface NewsService {
    public List<NewsResponseDto.newsList> userPickNews(NewsRequestDto.userPickNews reqDto);

    public NewsResponseDto.newsListWithTotalPage categoryNews(NewsRequestDto.categoryNews reqDto);

    public NewsResponseDto.newsListWithTotalPage searchNews(NewsRequestDto.searchNews reqDto);

    public NewsResponseDto.detail getDetail(NewsRequestDto.detail reqDto);

    public NewsResponseDto.searchNewsWithTotalPage searchTotalNews(NewsRequestDto.searchNews reqDto);

    public NewsResponseDto.operaList getPeriodList(NewsRequestDto.operaList reqDto);

    public NewsResponseDto.operaList getPeriodWordList(NewsRequestDto.operaSearchList reqDto);
}
