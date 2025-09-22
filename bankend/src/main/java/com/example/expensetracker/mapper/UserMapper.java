package com.example.expensetracker.mapper;
import com.example.expensetracker.dto.UserDTO;
import com.example.expensetracker.entity.User;
public class UserMapper {
    public static User toEntity(UserDTO dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        return user;
    }
}
