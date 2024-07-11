package com.ssafy.minuet.hotTag.repository;

import com.ssafy.minuet.hotTag.entity.HotTag;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface HotTagRepository extends MongoRepository<HotTag, String> {

    List<HotTag> findAll();

}
