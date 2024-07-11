package com.ssafy.minuet.preSearch.entity;

import com.ssafy.minuet.member.entity.Member;
import com.ssafy.minuet.preSearch.controller.PreSearchController;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Entity
@NoArgsConstructor
@Getter
public class PreSearch {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String word;

    @Setter
    @ManyToOne(cascade = CascadeType.PERSIST)
    private Member member;

    @Builder
    PreSearch(
            String word
    ){
        this.word = word;
    }
}
