package com.kkumdori.shop.mypage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kkumdori.shop.login.entity.User;
import com.kkumdori.shop.mypage.service.InfoEditService;

@RestController
@RequestMapping("/api/user/")
@CrossOrigin(origins = "http://localhost:3000")
public class InfoEditController {

    private final InfoEditService infoEditService;

    @Autowired
    public InfoEditController(InfoEditService infoEditService) {
        this.infoEditService = infoEditService;
    }

    // 사용자 정보 조회
    @GetMapping("/{userNo}")
    public ResponseEntity<User> getUserInfo(@PathVariable Long userNo) {
        return infoEditService.getUserInfo(userNo)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 사용자 정보 수정
    @PutMapping("/{userNo}")
    public ResponseEntity<User> updateUserInfo(
            @PathVariable Long userNo,
            @RequestBody User user) {
        try {
            // 전화번호(tel)도 받아서 서비스로 전달
            User updatedUser = infoEditService.updateUserInfo(
                    userNo, 
                    user.getFullname(), 
                    user.getEmail(), 
                    user.getBank(), 
                    user.getAccount(), 
                    user.getZipcode(), 
                    user.getAddress(),
                    user.getTel());  // 전화번호를 추가로 전달
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
