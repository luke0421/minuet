package com.ssafy.minuet.member.controller;

import com.ssafy.minuet.member.dto.MemberRequestDto;
import com.ssafy.minuet.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name="멤버 API", description = "멤버 관련 API입니다.")
@Slf4j
@RestController
@RequestMapping(value = "/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    //회원가입
    @Operation
    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid MemberRequestDto.sign memberDto){
        log.info("[MemberController.register] data input from FRONT email:{} name:{} password:{}", memberDto.getMemberEmail(),memberDto.getMemberName(),memberDto.getMemberPassword());

        try {
            memberService.register(memberDto);

            log.info("[MemberController.register] finish register member");
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //로그인
    @Operation(summary = "로그인")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid MemberRequestDto.login memberDto){
        try{
            return memberService.login(memberDto);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "회원정보 수정")
    @PutMapping("/modify")
    public ResponseEntity<?> modify(@RequestBody @Valid MemberRequestDto.modify reqDto){
        try{
            memberService.modify(reqDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
