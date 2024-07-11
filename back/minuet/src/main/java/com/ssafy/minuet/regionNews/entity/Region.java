package com.ssafy.minuet.regionNews.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class Region {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String regionName;

    @Builder
    public Region(
            String regionName
    ){
        this.regionName=regionName;
    }
}