package com.ssafy.minuet.prefer.entity;

import com.ssafy.minuet.member.entity.Member;
import com.ssafy.minuet.news.entity.Category;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PreferCategory {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    private Category category;

    @Builder
    public PreferCategory(
            Category category
    ){
        this.category = category;
    }
}
