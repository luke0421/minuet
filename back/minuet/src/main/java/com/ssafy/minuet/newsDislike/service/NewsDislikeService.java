package com.ssafy.minuet.newsDislike.service;

import com.ssafy.minuet.newsDislike.dto.NewsDislikeRequestDto;
import com.ssafy.minuet.newsDislike.dto.NewsDislikeResponseDto;
import com.ssafy.minuet.newsLike.dto.NewsLikeReponseDto;

import java.util.List;

public interface NewsDislikeService {

    public void addDislike(NewsDislikeRequestDto.reqDislikeDto reqDto);

    public void deleteDislike(NewsDislikeRequestDto.reqDislikeDto reqDislikeDto);

    public List<NewsDislikeResponseDto.list> dislikeList(Long memberId);
}
