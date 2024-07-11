package com.ssafy.minuet.userPick.repository;

import com.ssafy.minuet.news.entity.News;
import com.ssafy.minuet.userPick.entity.Age;
import com.ssafy.minuet.userPick.entity.UserPick;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserPickRepository extends MongoRepository<UserPick, String> {
    List<UserPick> findAll();

    Optional<UserPick> findByAgeAndNewsId(Age age, Long newsId);

    Page<UserPick> findALLByAge(Age age, Pageable pageable);
}
