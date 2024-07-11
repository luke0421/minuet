package com.ssafy.minuet.regionNews.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Setter

public class RegionNews {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String content;

    private LocalDate publishDate;

    @ManyToOne(fetch = FetchType.EAGER)
    private Region region;

    private String imgURL;

    private String newsURL;

    private int likeCount;

    private int dislikeCount;

    private int bookmarkCount;

    private String keyword;

    //=========메소드===========//
    //like
    public void plusRegionLikeCount(){
        this.likeCount++;
    }

    public void minusRegionLikeCount(){
        this.likeCount--;
    }

    //dislike
    public void plusRegionDislikeCount(){
        this.dislikeCount++;
    }

    public void minusRegionDislikeCount(){
        this.dislikeCount--;
    }

    //bookmark
    public void regionPlusBookMark(){
        this.bookmarkCount++;
    }

    public void regionMinusBookMark(){
        this.bookmarkCount--;
    }




    //=========생성자===========//
    @Builder
    public RegionNews(
            String title,
            String content,
            LocalDate publishDate,
            Region region,
            String imgURL,
            String newsURL
    ){
        this.title = title;
        this.content = content;
        this.publishDate = publishDate;
        this.region = region;
        this.imgURL = imgURL;
        this.newsURL = newsURL;
    }
}
