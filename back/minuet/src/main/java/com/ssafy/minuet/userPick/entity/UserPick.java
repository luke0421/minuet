package com.ssafy.minuet.userPick.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Document(collection = "likelist")
public class UserPick {

    @Id
    private String id;

    private Long newsId;

    private Age age;

    private int count;

    @Builder
    UserPick(
            Long newsId,
            Age age,
            int count
    ){
        this.newsId = newsId;
        this.age = age;
        this.count = count;

    }

    //=======메소드======//
    public void plusCount(){
        count++;
    }

    public void minusCount(){
        count--;
    }
}
