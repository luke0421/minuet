package com.ssafy.minuet.prefer.service;

import com.ssafy.minuet.member.entity.Member;
import com.ssafy.minuet.member.repository.MemberRepository;
import com.ssafy.minuet.news.entity.Category;
import com.ssafy.minuet.news.reposiroty.CategoryRepository;
import com.ssafy.minuet.prefer.dto.PreferRequestDto;
import com.ssafy.minuet.prefer.dto.PreferResponsDto;
import com.ssafy.minuet.prefer.entity.PreferCategory;
import com.ssafy.minuet.prefer.repository.PreferCategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class PreferCategoryServiceImpl implements PreferCategoryService{

    private final PreferCategoryRepository preferCategoryRepository;
    private final MemberRepository memberRepository;
    private final CategoryRepository categoryRepository;

    //회원의 preferCategory조회
    @Override
    public List<PreferResponsDto.list> getList(PreferRequestDto.list reqDto) {
        //member찾기
        Member member = memberRepository.findById(reqDto.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("[PreferResponsDto.getList]해당 member가 없습니다. "));

        //member와 연관된 prefercategory찾기
        List<PreferCategory> preferCategoryList = preferCategoryRepository.findByMember(member);

        //to Dto
        List<PreferResponsDto.list> list = new ArrayList<>();

        for(PreferCategory p : preferCategoryList){
            list.add(PreferResponsDto.list.builder()
                    .category(p.getCategory().getCategoryName())
                    .build());

        }
        return list;
    }

    //선호 카테고리 추가
    @Transactional
    @Override
    public void add(PreferRequestDto.add reqDto) {
        //member찾기
        Member member = memberRepository.findById(reqDto.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("[PreferRequestDto.add] 해당 member가 없습니다. "));

        //catgory찾기
        Category category = categoryRepository.findByCategoryName(reqDto.getCategoryName())
                .orElseThrow(() -> new IllegalArgumentException("[PreferRequestDto.add] 해당 이름의 category는 없습니다. "));

        //없을 때만 추가
        if(!preferCategoryRepository.findByMemberAndCategory(member, category).isPresent()){
            //연결한 후 저장
            PreferCategory preferCategory = PreferCategory.builder()
                    .category(category)
                    .build();

            member.addPreferCategory(preferCategory);

            preferCategoryRepository.save(preferCategory);
        }


    }

    @Override
    @Transactional
    public void delete(PreferRequestDto.delete reqDto) {
        //member찾기
        Member member = memberRepository.findById(reqDto.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("[PreferRequestDto.delete] 해당 member가 없습니다. "));

        //category 찾기
        Category category = categoryRepository.findByCategoryName(reqDto.getCategoryName())
                .orElseThrow(() -> new IllegalArgumentException("[PreferRequestDto.delete] 해당 category가 없습니다. "));

        //prefer찾기
        PreferCategory preferCategory = preferCategoryRepository.findByMemberAndCategory(member, category)
                .orElseThrow(() -> new IllegalArgumentException("[PreferRequestDto.delete] 해당 prefer category가 없습니다. "));

        //삭제
        member.deletePreferCategory(preferCategory);

        preferCategoryRepository.delete(preferCategory);

    }
}
