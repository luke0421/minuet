package com.ssafy.minuet.bookMark.entity;

import com.ssafy.minuet.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@DiscriminatorColumn(name = "bookmark_type", discriminatorType = DiscriminatorType.STRING)
public abstract class AllBookMark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @ManyToOne(cascade = CascadeType.PERSIST)
    private Member member;

}


