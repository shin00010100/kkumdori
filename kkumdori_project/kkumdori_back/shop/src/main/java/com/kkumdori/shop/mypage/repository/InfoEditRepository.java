package com.kkumdori.shop.mypage.repository;

import com.kkumdori.shop.login.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import java.util.Optional;

@Repository
public interface InfoEditRepository extends JpaRepository<User, Long> {

    // 사용자 번호로 사용자 정보 조회
    Optional<User> findByUserNo(Long userNo);

    // 이메일로 사용자 정보 조회 (사용자가 이메일로 로그인할 경우)
    Optional<User> findByEmail(String email);

    // 사용자 정보 업데이트 (이메일, 전화번호, 주소 등)
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.email = :email, u.tel = :tel, u.address = :address, u.fullname = :fullname, u.bank = :bank, u.account = :account, u.zipcode = :zipcode WHERE u.userNo = :userNo")
    void updateUserInfo(Long userNo, String email, String tel, String address, String fullname, String bank, String account, String zipcode);
}

