package com.ssafy.minuet.regionDisLike.entity;

import com.ssafy.minuet.member.entity.Member;
import com.ssafy.minuet.news.entity.News;
import com.ssafy.minuet.regionNews.entity.RegionNews;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RegionDislike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private RegionNews regionNews;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @Builder
    public RegionDislike(
            RegionNews regionNews
    ){
        this.regionNews = regionNews;
    }
}
