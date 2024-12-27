package com.kkumdori.shop.mypage.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kkumdori.shop.login.entity.User;
import com.kkumdori.shop.mypage.repository.InfoEditRepository;

@Service
public class InfoEditService {

    private final InfoEditRepository infoEditRepository;

    @Autowired
    public InfoEditService(InfoEditRepository infoEditRepository) {
        this.infoEditRepository = infoEditRepository;
    }

    // 사용자 정보 조회
    public Optional<User> getUserInfo(Long userNo) {
        return infoEditRepository.findByUserNo(userNo);
    }

    // 사용자 정보 업데이트 (각각의 필드를 개별적으로 업데이트)
    public User updateUserInfo(Long userNo, String fullname, String email, String bank, String account, String zipcode, String address, String tel) {
        Optional<User> optionalUser = infoEditRepository.findByUserNo(userNo);
        
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            // 각 필드를 업데이트
            if (fullname != null) {
                user.setFullname(fullname);
            }
            if (email != null) {
                user.setEmail(email);
            }
            if (bank != null) {
                user.setBank(bank);
            }
            if (account != null) {
                user.setAccount(account);
            }
            if (zipcode != null) {
                user.setZipcode(zipcode);
            }
            if (address != null) {
                user.setAddress(address);
            }
            if (tel != null) {
                user.setTel(tel);  // 전화번호 수정 추가
            }

            // 업데이트된 사용자 정보를 저장하고 반환
            return infoEditRepository.save(user);
        } else {
            // 사용자 정보가 없는 경우 예외 처리
            throw new RuntimeException("User not found with userNo: " + userNo);
        }
    }
}
