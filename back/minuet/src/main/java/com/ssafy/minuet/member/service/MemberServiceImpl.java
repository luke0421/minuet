package com.ssafy.minuet.member.service;

import com.ssafy.minuet.member.dto.MemberRequestDto;
import com.ssafy.minuet.member.dto.MemberResponseDto;
import com.ssafy.minuet.member.entity.Member;
import com.ssafy.minuet.member.repository.MemberRepository;
import com.ssafy.minuet.news.entity.Category;
import com.ssafy.minuet.news.reposiroty.CategoryRepository;
import com.ssafy.minuet.prefer.entity.PreferCategory;
import com.ssafy.minuet.prefer.repository.PreferCategoryRepository;
import com.ssafy.minuet.security.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;

    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    private final PreferCategoryRepository preferCategoryRepository;
    private final CategoryRepository categoryRepository;

    //회원가입
    @Override
    @Transactional
    public void register(MemberRequestDto.sign memberDto) {
        log.info("register start...");

        // 가입되어 있으면 예외처리(나중에 예외 변경해줄 것)
        if(memberRepository.findByEmail(memberDto.getMemberEmail()).isPresent())
            throw new IllegalArgumentException("이미 가입된 계정입니다.");

        Member member = Member.builder()
                .email(memberDto.getMemberEmail())
                .password(passwordEncoder.encode(memberDto.getMemberPassword()))
                .name(memberDto.getMemberName())
                .birth(memberDto.getMemberBirth())
                .gender(memberDto.isMemberGender())
                .build();

        memberRepository.save(member);

        //선호카테고리 추가
        if(memberDto.getCategoryList() != null) {
            for (String categoryName : memberDto.getCategoryList()) {
                Category category = categoryRepository.findByCategoryName(categoryName)
                        .orElseThrow(() -> new IllegalArgumentException("[MemberServiceImpl.register]해당 category없음"));

                PreferCategory preferCategory = PreferCategory.builder()
                        .category(category)
                        .build();

                member.addPreferCategory(preferCategory);

                preferCategoryRepository.save(preferCategory);
            }
        }

        log.info("register success return: memeberId:{} memberName:{}"+member.getId()+member.getName());
    }

    //로그인
    public ResponseEntity<?> login(MemberRequestDto.login loginReqDto){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginReqDto.getMemberEmail(),
                        loginReqDto.getMemberPassword()
                )
        );

        var member = memberRepository.findByEmail(loginReqDto.getMemberEmail())
                .orElseThrow(() -> new IllegalArgumentException("[MemberServiceImpl.login] 존재하지 않는 멤버 Email입니다."));
        String jwtToken = jwtService.generateToken(member);

        //categoryList주기
        List<PreferCategory> categoryList = member.getPreferCategories();

        MemberResponseDto.loginResDto memberResDto = MemberResponseDto.loginResDto.builder()
                .memberId(member.getId())
                .email(member.getEmail())
                .password(member.getPassword())
                .name(member.getName())
                .birth(member.getBirth())
                .gender(member.getGender())
                .token(jwtToken)
                .categoryList(categoryList)
                .build();

        return new ResponseEntity<>(memberResDto, HttpStatus.OK);
    }

    @Override
    @Transactional
    public void modify(MemberRequestDto.modify reqDto) {
        Member member = memberRepository.findById(reqDto.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("해당 member가 없습니다. "));

        //카테고리를 제외한 정보 변경
        member.modify(reqDto);

        //=====카테고리 변경

        //모두 삭제
        List<PreferCategory> origin = preferCategoryRepository.findByMember(member);

        for(PreferCategory pre : origin){
            preferCategoryRepository.delete(pre);
            pre.setMember(null);
        }
        member.getPreferCategories().clear();

        //넣기
        for(String categoryName : reqDto.getCategoryNames()){
            Category category = categoryRepository.findByCategoryName(categoryName)
                    .orElseThrow(() -> new IllegalArgumentException("해당 category없음"));

            PreferCategory preferCategory = PreferCategory.builder()
                    .category(category)
                    .build();

            member.addPreferCategory(preferCategory);

            preferCategoryRepository.save(preferCategory);
        }

    }
}
