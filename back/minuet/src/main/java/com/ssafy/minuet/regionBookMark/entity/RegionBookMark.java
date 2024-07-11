package com.ssafy.minuet.regionBookMark.entity;

import com.ssafy.minuet.bookMark.entity.AllBookMark;
import com.ssafy.minuet.member.entity.Member;
import com.ssafy.minuet.news.entity.News;
import com.ssafy.minuet.regionNews.entity.RegionNews;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@DiscriminatorValue("region")
public class RegionBookMark extends AllBookMark {

    @ManyToOne(cascade =  CascadeType.PERSIST)
    private RegionNews regionNews;

    @Builder
    public RegionBookMark(
            RegionNews regionNews
    ){
        this.regionNews = regionNews;
    }

}
