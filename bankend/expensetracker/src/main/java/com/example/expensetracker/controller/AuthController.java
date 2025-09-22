package com.example.expensetracker.controller;

import com.example.expensetracker.dto.UserDTO;
import com.example.expensetracker.entity.User;
import com.example.expensetracker.service.UserService;
import com.example.expensetracker.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO userDTO) {
        User user = userService.register(userDTO);
        String token = jwtUtil.generateToken(user.getEmail());
        return ResponseEntity.ok().body("Token: " + token);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO userDTO) {
        User user = userService.getUserByEmail(userDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email"));

        if (!new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder()
                .matches(userDTO.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return ResponseEntity.ok().body("Token: " + token);
    }
}
