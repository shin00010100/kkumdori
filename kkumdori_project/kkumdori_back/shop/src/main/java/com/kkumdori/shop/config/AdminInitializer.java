package com.kkumdori.shop.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.kkumdori.shop.login.entity.User;
import com.kkumdori.shop.login.entity.User.Role;
import com.kkumdori.shop.login.repository.UserRepository;

import jakarta.annotation.PostConstruct;

@Configuration
public class AdminInitializer {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostConstruct
    public void initAdminAccount() {
        String adminUsername = "admin"; 
        String adminPassword = "admin123!";
        String adminEmail = "admin@spam.com";

        // 이미 관리자 계정이 있는지 확인
        if (userRepository.findByUsername(adminUsername).isEmpty()) {
            // 관리자 계정 생성
            User adminUser = new User();
            adminUser.setUsername(adminUsername);
            adminUser.setPassword(passwordEncoder.encode(adminPassword)); // 비밀번호 암호화
            adminUser.setEmail(adminEmail);
            adminUser.setRole(Role.admin); // 명시적으로 'admin' 설정
            adminUser.setFullname("관리자나리");
            adminUser.setTel("01000000000");
            adminUser.setBank("비국민");
            adminUser.setAccount("000-0000-0000");
            adminUser.setZipcode("00000");
            adminUser.setAddress("약속의 땅");

            // DB에 저장
            userRepository.save(adminUser);
            System.out.println("Admin account initialized successfully!");
        } else {
            System.out.println("Admin account already exists.");
        }
    }
}
