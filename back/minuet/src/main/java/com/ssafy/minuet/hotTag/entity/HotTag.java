package com.ssafy.minuet.hotTag.entity;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Document(collection = "hottag")
public class HotTag {
    @Id
    private String id;

    private String word;

    @Builder
    HotTag(
            String word
    ){
        this.word = word;
    }
}
