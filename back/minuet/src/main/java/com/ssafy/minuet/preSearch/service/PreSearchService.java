package com.ssafy.minuet.preSearch.service;


import com.ssafy.minuet.preSearch.dto.PreSearchRequestDto;
import com.ssafy.minuet.preSearch.dto.PreSearchResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

public interface PreSearchService {


    public void addWord(PreSearchRequestDto.add reqDto);

    public PreSearchResponseDto.list wordList(Long memberId);
}
