package com.example.expensetracker.controller;
import com.example.expensetracker.dto.BudgetDTO;
import com.example.expensetracker.entity.Budget;
import com.example.expensetracker.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/budgets")
@CrossOrigin(origins = "http://localhost:3000") 
public class BudgetController {
    @Autowired
    private BudgetService budgetService;
    @PostMapping("/{userId}")
    public Budget addBudget(@PathVariable Long userId, @RequestBody BudgetDTO dto) {
        return budgetService.addBudget(userId, dto);
    }
    @GetMapping("/{userId}")
    public List<Budget> getBudgets(@PathVariable Long userId) {
        return budgetService.getBudgets(userId);
    }
    @DeleteMapping("/{id}")
    public String deleteBudget(@PathVariable Long id) {
        budgetService.deleteBudget(id);
        return "Budget deleted successfully";
    }
}
