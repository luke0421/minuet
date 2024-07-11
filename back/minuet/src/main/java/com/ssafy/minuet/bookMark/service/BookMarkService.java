package com.ssafy.minuet.bookMark.service;

import com.ssafy.minuet.bookMark.dto.BookMarkRequestDto;
import com.ssafy.minuet.bookMark.dto.BookMarkResponseDto;

import java.util.List;

public interface BookMarkService {

    public void addBookMark(BookMarkRequestDto.addBookMark reqDto);

    public void deleteBookmark(BookMarkRequestDto.addBookMark reqDto);

    public BookMarkResponseDto.myBookmark bookMarkList(BookMarkRequestDto.list reqDto);
}
