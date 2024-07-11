package com.ssafy.minuet.hotTopic.entity;

import com.ssafy.minuet.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HotTopic {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String content;

    private LocalDate publishDate;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @Builder
    public HotTopic(
            String title,
            String content,
            LocalDate publishDate,
            Member member
    ){
        this.title = title;
        this.content = content;
        this.publishDate = publishDate;
        this.member = member;
    }




}
