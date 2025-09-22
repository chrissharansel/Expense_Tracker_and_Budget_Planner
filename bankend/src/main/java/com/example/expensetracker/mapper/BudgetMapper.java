package com.example.expensetracker.mapper;
import com.example.expensetracker.dto.BudgetDTO;
import com.example.expensetracker.entity.Budget;
public class BudgetMapper {
    public static Budget toEntity(BudgetDTO dto) {
        Budget budget = new Budget();
        budget.setLimitAmount(dto.getLimitAmount());
        budget.setStartDate(dto.getStartDate());
        budget.setEndDate(dto.getEndDate());
        return budget;
    }
}
