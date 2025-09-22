package com.example.expensetracker.controller;

import com.example.expensetracker.entity.Expense;
import com.example.expensetracker.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:3000") 
public class ReportController {

    @Autowired
    private ExpenseService expenseService;

    @GetMapping("/expenses/{userId}")
    public List<Expense> getExpenseReport(@PathVariable Long userId) {
        return expenseService.getAllExpenses(userId);
    }
}
