package com.example.expensetracker.service;

import com.example.expensetracker.dto.CategoryDTO;
import com.example.expensetracker.entity.Category;
import com.example.expensetracker.entity.User;
import com.example.expensetracker.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Category createCategory(User user, CategoryDTO dto) {
        Category category = new Category();
        category.setName(dto.getName());
        category.setType(dto.getType());
        category.setUser(user);
        return categoryRepository.save(category);
    }

    public List<Category> getCategoriesByUserId(Long userId) {
        // Fetch only categories with non-null type to avoid empty ones
        return categoryRepository.findByUser_IdAndTypeIsNotNull(userId);
    }
}
