package com.ssafy.minuet.hotTag.service;

import com.ssafy.minuet.hotTag.dto.HotTagResponseDto;
import com.ssafy.minuet.hotTag.entity.HotTag;
import com.ssafy.minuet.hotTag.repository.HotTagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HotTagService {

    private final HotTagRepository hotTagRepository;

    //hot tag조회
    public List<HotTagResponseDto.hotTag> getHotTag() {
        List<HotTag> hotTags = hotTagRepository.findAll();

        List<HotTagResponseDto.hotTag> list = new ArrayList<>();
        for(HotTag hotTag : hotTags){
            list.add(HotTagResponseDto.hotTag.builder()
                    .word(hotTag.getWord())
                    .build());
        }

        return list;
    }

    public void addWord(String word) {
        HotTag hotTag = HotTag.builder()
                .word(word)
                .build();

        hotTagRepository.save(hotTag);

    }
}
