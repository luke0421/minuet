package com.ssafy.minuet.prefer.service;

import com.ssafy.minuet.prefer.dto.PreferRequestDto;
import com.ssafy.minuet.prefer.dto.PreferResponsDto;

import java.util.List;

public interface PreferCategoryService {
    public List<PreferResponsDto.list> getList(PreferRequestDto.list reqDto);

    public void add(PreferRequestDto.add reqDto);

    public void delete(PreferRequestDto.delete reqDto);
}
