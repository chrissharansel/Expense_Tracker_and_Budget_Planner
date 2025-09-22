package com.example.expensetracker.dto;

import java.time.LocalDate;

public class BudgetDTO {
    public Double getLimitAmount() {
		return limitAmount;
	}
	public void setLimitAmount(Double limitAmount) {
		this.limitAmount = limitAmount;
	}
	public LocalDate getStartDate() {
		return startDate;
	}
	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}
	public LocalDate getEndDate() {
		return endDate;
	}
	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}
	public Long getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}
	private Double limitAmount;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long categoryId;

    // Getters & Setters
}
