package com.ssafy.minuet.newsLike.service;

import com.ssafy.minuet.newsLike.dto.NewsLikeReponseDto;
import com.ssafy.minuet.newsLike.dto.NewsLikeRequestDto;

import java.util.List;

public interface NewsLikeService {

    public void addLike(NewsLikeRequestDto.reqLikeDto reqDto);

    public void deleteLike(NewsLikeRequestDto.reqLikeDto reqLikeDto);

    public List<NewsLikeReponseDto.list> likeList(Long memberId);
}
