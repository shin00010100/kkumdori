package com.kkumdori.shop.login.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.kkumdori.shop.login.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // 사용자명을 통해 유저를 찾는 메소드
    Optional<User> findByUsername(String username);
    
    // 이메일을 통해 유저를 찾는 메소드
    Optional<User> findByEmail(String email);
    
    // 전화번호를 통해 유저를 찾는 메소드
    Optional<User> findByTel(String tel);
    
    // 사용자명이 존재하는지 확인하는 메소드
    boolean existsByUsername(String username);
    
    // 전화번호와 사용자명을 통해 유저를 찾는 메소드
    Optional<User> findByTelAndUsername(String tel, String username);
    
    // 이메일과 사용자명을 통해 유저를 찾는 메소드
    Optional<User> findByEmailAndUsername(String email, String username);
    
    // 추가: 사용자 역할을 통해 유저를 찾는 메소드 (필요한 경우)
    Optional<User> findByRole(String role);
    
    // 사용자명과 전화번호로 유저 찾기
    Optional<User> findByFullnameAndTel(String fullname, String tel);
    
    // 사용자명, 이름, 전화번호로 유저 찾기
    Optional<User> findByUsernameAndFullnameAndTel(String username, String fullname, String tel);
    
    // 사용자 번호로 유저 찾기
    Optional<User> findByUserNo(Long userNo);
    
    @Query("SELECT u.email FROM User u")
    List<String> findAllEmails();
}
