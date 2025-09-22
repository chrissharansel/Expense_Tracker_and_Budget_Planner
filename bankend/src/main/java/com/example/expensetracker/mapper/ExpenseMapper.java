package com.example.expensetracker.mapper;
import com.example.expensetracker.dto.ExpenseDTO;
import com.example.expensetracker.entity.Expense;
public class ExpenseMapper {
    public static Expense toEntity(ExpenseDTO dto) {
        Expense expense = new Expense();
        expense.setAmount(dto.getAmount());
        expense.setDescription(dto.getDescription());
        expense.setDate(dto.getDate());
        return expense;
    }
}
