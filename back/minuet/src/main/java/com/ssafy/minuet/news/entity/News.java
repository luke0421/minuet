package com.ssafy.minuet.news.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class News {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String content;

    private LocalDate publishDate;

    private int readCount;

    @ManyToOne(fetch = FetchType.EAGER)
    private Category category;

    private String imgURL;

    private String newsURL;

    private int likeCount;

    private int dislikeCount;

    private int bookmarkCount;

    private String keyword;

    //=========메소드===========//
    //like
    public void plusLikeCount(){
        this.likeCount++;
    }

    public void minusLikeCount(){
        if(this.likeCount > 0) this.likeCount--;
    }

    //dislike
    public void plusDislikeCount(){
        this.dislikeCount++;
    }

    public void minusDislikeCount(){

        if(this.dislikeCount > 0) this.dislikeCount--;
    }

    //bookmark
    public void plusBookMark(){
        this.bookmarkCount++;
    }

    public void minusBookMark(){
        if(this.bookmarkCount > 0) this.bookmarkCount--;
    }




    //=========생성자===========//
    @Builder
    public News(
            String title,
            String content,
            LocalDate publishDate,
            int readCount,
            Category category,
            String imgURL,
            String newsURL
    ){
        this.title = title;
        this.content = content;
        this.publishDate = publishDate;
        this.readCount = readCount;
        this.category = category;
        this.imgURL = imgURL;
        this.newsURL = newsURL;
    }
}
