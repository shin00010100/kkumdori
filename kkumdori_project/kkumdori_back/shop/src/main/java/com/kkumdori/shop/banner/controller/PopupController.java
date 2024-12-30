package com.kkumdori.shop.banner.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kkumdori.shop.banner.entity.Popup;
import com.kkumdori.shop.banner.service.PopupService;
import com.kkumdori.shop.goods.service.ImageService;

@RestController
@RequestMapping("/api/popups")
public class PopupController {
//    @Autowired
//    private PopupService popupService;
//    
//    @Autowired
//    private ImageService imageService;
//    
//    // 기존 팝업 불러오기
//    @GetMapping
//    public ResponseEntity<?> getPopup() {
//        Popup popup = popupService.getPopup();
//        if (popup == null) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("팝업 데이터가 없습니다.");
//        }
//        return ResponseEntity.ok(popup);
//    }
//    
//    @PostMapping
//    public ResponseEntity<?> saveOrUpdatePopup(
//            @ModelAttribute Popup popup,
//            @RequestParam("popupFile") MultipartFile image) {
//        try {
//            popupService.saveOrUpdatePopup(popup, image);
//            return ResponseEntity.ok("팝업이 성공적으로 저장되었습니다.");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("팝업 저장 중 오류 발생: " + e.getMessage());
//        }
//    }

//    @PostMapping
//    public ResponseEntity<?> savePopup(@ModelAttribute Popup popup, @RequestParam MultipartFile image) {
//        try {
//            String imagePath = imageService.saveImage(image); // ImageService 사용
//            popup.setImagePath(imagePath);
//            return ResponseEntity.ok(popupService.savePopup(popup));
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.badRequest().body("잘못된 요청: " + e.getMessage());
//        } catch (IOException e) {
//            return ResponseEntity.status(500).body("이미지 저장 실패: " + e.getMessage());
//        }
//    }
}