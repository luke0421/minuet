package com.ssafy.minuet.bookMark.entity;

import com.ssafy.minuet.member.entity.Member;
import com.ssafy.minuet.news.entity.News;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@DiscriminatorValue("regular")
public class BookMark extends AllBookMark{

    @ManyToOne(cascade =  CascadeType.PERSIST)
    private News news;

    @Builder
    public BookMark(
            News news
    ){
        this.news = news;
    }

}
