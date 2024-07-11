package com.ssafy.minuet.member.dto;

import com.ssafy.minuet.news.entity.Category;
import com.ssafy.minuet.prefer.entity.PreferCategory;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class MemberResponseDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class loginResDto{
        @NotNull(message = "[MemberResponseDto.loginResDto] memberId 는 null 이 될 수 없습니다.")
        private Long memberId;
        @NotNull(message = "[MemberResponseDto.loginResDto] email 는 null 이 될 수 없습니다.")
        private String email;
        @NotNull(message = "[MemberResponseDto.loginResDto] password 는 null 이 될 수 없습니다.")
        private String password;
        @NotNull(message = "[MemberResponseDto.loginResDto] name 는 null 이 될 수 없습니다.")
        private String name;
        @NotNull(message = "[MemberResponseDto.loginResDto] birth 는 null 이 될 수 없습니다.")
        private LocalDate birth;
        @NotNull(message = "[MemberResponseDto.loginResDto] gender 는 null 이 될 수 없습니다.")
        private boolean gender;
        @NotNull(message = "[MemberResponseDto.loginResDto] token 는 null 이 될 수 없습니다.")
        private String token;
        @NotNull(message = "[MemberResponseDto.loginResDto] token 는 null 이 될 수 없습니다.")
        private String profileImgPath;
        @NotNull(message = "[MemberResponseDto.loginResDto] categoryList 는 null 이 될 수 없습니다.")
        private List<String> categoryList = new ArrayList<>();
        
        @Builder
        loginResDto(
            Long memberId,
            String email,
            String password,
            String name,
            LocalDate birth,
            boolean gender,
            String token,
            String profileImgPath,
            List<PreferCategory> categoryList
        ){
            this.memberId = memberId;
            this.email = email;
            this.password = password;
            this.name = name;
            this.birth = birth;
            this.gender = gender;
            this.token = token;
            this.profileImgPath = profileImgPath;

            for(PreferCategory category : categoryList){
                this.categoryList.add(category.getCategory().getCategoryName());
            }
        }

    }
}
