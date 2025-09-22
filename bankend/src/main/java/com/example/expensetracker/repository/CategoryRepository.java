package com.example.expensetracker.repository;

import com.example.expensetracker.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findByUser_IdAndTypeIsNotNull(Long userId);

    // Optionally fetch all categories regardless of type
    List<Category> findByUser_Id(Long userId);
}
