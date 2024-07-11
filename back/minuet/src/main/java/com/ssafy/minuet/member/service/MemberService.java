package com.ssafy.minuet.member.service;

import com.ssafy.minuet.member.dto.MemberRequestDto;
import org.springframework.http.ResponseEntity;

public interface MemberService {
    public void register(MemberRequestDto.sign memberDto);

    public ResponseEntity<?> login(MemberRequestDto.login loginReqDto);

    public void modify(MemberRequestDto.modify reqDto);
}
