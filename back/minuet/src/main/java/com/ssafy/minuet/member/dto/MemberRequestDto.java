package com.ssafy.minuet.member.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

public class MemberRequestDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class sign {
        @NotNull(message = "[MemberRequestDto.sign] memberId 는 null 이 될 수 없습니다.")
        private String memberEmail;
        @NotNull(message = "[MemberRequestDto.sign] memberPassword 는 null 이 될 수 없습니다.")
        private String memberPassword;
        @NotNull(message = "[MemberRequestDto.sign] memberType 는 null 이 될 수 없습니다.")
        private String memberName;
        @NotNull(message = "[MemberRequestDto.sign] memberbirth 는 null 이 될 수 없습니다.")
        private LocalDate memberBirth;
        @NotNull(message = "[MemberRequestDto.sign] memberGender 는 null 이 될 수 없습니다.")
        private boolean memberGender;

        //없으면 null
        private List<String> categoryList;

        @Builder
        sign(
                String memberEmail,
                String memberPassword,
                String memberName,
                LocalDate memberBirth,
                boolean memberGender,
                List<String> categoryList
        ){
            this.memberEmail = memberEmail;
            this.memberPassword = memberPassword;
            this.memberName = memberName;
            this.memberBirth = memberBirth;
            this.memberGender = memberGender;
            this.categoryList = categoryList;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class login {
        @NotNull(message = "[MemberRequestDto.login] memberId 는 null 이 될 수 없습니다.")
        private String memberEmail;
        @NotNull(message = "[MemberRequestDto.login] memberPassword 는 null 이 될 수 없습니다.")
        private String memberPassword;

        @Builder
        login(
                String memberEmail,
                String memberPassword

        ){
            this.memberEmail = memberEmail;
            this.memberPassword = memberPassword;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class modify {
        @NotNull(message = "[MemberRequestDto.modify] memberId 는 null 이 될 수 없습니다.")
        private Long memberId;
        @NotNull(message = "[MemberRequestDto.modify] name 는 null 이 될 수 없습니다.")
        private String name;
        @NotNull(message = "[MemberRequestDto.modify] birthday 는 null 이 될 수 없습니다.")
        private LocalDate birth;
        @NotNull(message = "[MemberRequestDto.modify] memberId 는 null 이 될 수 없습니다.")
        private Boolean gender;
        @NotNull(message = "[MemberRequestDto.modify] memberId 는 null 이 될 수 없습니다.")
        private List<String> categoryNames;

        @Builder
        modify(
                Long memberId,
                String name,
                LocalDate birth,
                Boolean gender,
                List<String> categoryNames
        ){
            this.memberId = memberId;
            this.name = name;
            this.birth = birth;
            this.gender = gender;
            this.categoryNames = categoryNames;
        }

    }
}
