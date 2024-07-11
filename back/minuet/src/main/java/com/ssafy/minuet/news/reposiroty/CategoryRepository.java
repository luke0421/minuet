package com.ssafy.minuet.news.reposiroty;

import com.ssafy.minuet.news.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    public Optional<Category> findByCategoryName(String categoryName);

    public boolean existsByCategoryName(String categoryName);
}
