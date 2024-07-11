package com.ssafy.minuet.newsDislike.entity;

import com.ssafy.minuet.member.entity.Member;
import com.ssafy.minuet.news.entity.News;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NewsDislike {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private News news;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @Builder
    public NewsDislike(
            News news
    ){
        this.news = news;
    }
}
