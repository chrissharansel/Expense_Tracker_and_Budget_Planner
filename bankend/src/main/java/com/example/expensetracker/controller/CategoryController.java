package com.example.expensetracker.controller;


import com.example.expensetracker.dto.CategoryDTO;
import com.example.expensetracker.entity.Category;
import com.example.expensetracker.entity.User;
import com.example.expensetracker.exception.ResourceNotFoundException;
import com.example.expensetracker.repository.UserRepository;
import com.example.expensetracker.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:3000") 
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserRepository userRepository;

    // ✅ Create category
    @PostMapping("/{userId}")
    public Category createCategory(@PathVariable Long userId, @RequestBody CategoryDTO dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return categoryService.createCategory(user, dto);
    }

    // ✅ Get all categories by user
    @GetMapping("/{userId}")
    public List<Category> getCategories(@PathVariable Long userId) {
        return categoryService.getCategoriesByUserId(userId);
    }
}
