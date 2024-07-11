package com.ssafy.minuet.festival.entity;

import com.fasterxml.jackson.databind.annotation.EnumNaming;
import com.ssafy.minuet.regionNews.entity.Region;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Festival {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String poster;

    private String period;

    private String url;

    @ManyToOne(cascade = CascadeType.PERSIST)
    private Region region;

    @Builder
    Festival(
            String title,
            String poster,
            String period,
            String url,
            Region region
    ){
        this.title = title;
        this.poster = poster;
        this.period = period;
        this.url = url;
        this.region = region;
    }
}
