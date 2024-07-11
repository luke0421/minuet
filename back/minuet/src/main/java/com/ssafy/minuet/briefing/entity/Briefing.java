package com.ssafy.minuet.briefing.entity;

import com.ssafy.minuet.member.entity.Member;
import com.ssafy.minuet.news.entity.Category;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class Briefing {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalTime time;

    @ManyToOne(fetch = FetchType.EAGER)
    private Category category;

    @Setter
    @ManyToOne(fetch = FetchType.EAGER)
    private Member member;

    private Boolean isOn = true;

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public void setCategory(Category category){
        this.category=category;
    }

    public void turnOnOff(){
        this.isOn = !this.isOn;
    }

    //=========생성자===========//
    @Builder
    public Briefing(
            LocalTime time,
            Category category
    ){
        this.time=time;
        this.category=category;
    }


}
