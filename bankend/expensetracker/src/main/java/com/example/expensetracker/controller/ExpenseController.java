package com.example.expensetracker.controller;

import com.example.expensetracker.dto.ExpenseDTO;
import com.example.expensetracker.entity.Expense;
import com.example.expensetracker.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @PostMapping("/{userId}")
    public Expense addExpense(@PathVariable Long userId, @RequestBody ExpenseDTO dto) {
        return expenseService.addExpense(userId, dto);
    }

    @GetMapping("/{userId}")
    public List<Expense> getAll(@PathVariable Long userId) {
        return expenseService.getAllExpenses(userId);
    }

    @DeleteMapping("/{id}")
    public String deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return "Expense deleted successfully";
    }
}
