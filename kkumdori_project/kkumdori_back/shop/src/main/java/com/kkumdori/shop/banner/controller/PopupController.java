package com.kkumdori.shop.banner.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kkumdori.shop.banner.entity.Popup;
import com.kkumdori.shop.banner.service.PopupService;
import com.kkumdori.shop.goods.service.ImageService;

@RestController
@RequestMapping("/api/popups")
public class PopupController {
	private final PopupService popupService;
	private final ImageService imageService;

    @Autowired
    public PopupController(PopupService popupService, ImageService imageService) {
        this.popupService = popupService;
        this.imageService = imageService; // 의존성 주입
    }


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createPopup(
        @RequestPart MultipartFile file,
        @RequestParam String link) {
        try {
            String imagePath = imageService.saveImage(file); // 파일 저장
            Popup popup = new Popup();
            popup.setImagePath(imagePath);
            popup.setLink(link);
            popup.setIsActive(true); // 활성화 설정
            popupService.savePopup(popup);
            return ResponseEntity.ok("Popup created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving popup");
        }
    }

    @GetMapping
    public ResponseEntity<List<Popup>> getAllPopups() {
        List<Popup> popups = popupService.getAllPopups();
        return ResponseEntity.ok(popups);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Popup> updatePopup(
    	    @PathVariable Long id,
    	    @ModelAttribute Popup popup,
    	    @RequestParam(value = "imageFile", required = false) MultipartFile imageFile) throws IOException {
    	    Popup updatedPopup = popupService.updatePopup(id, popup, imageFile);
    	    return ResponseEntity.ok(updatedPopup);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePopup(@PathVariable Long id) {
        popupService.deletePopup(id);
        return ResponseEntity.noContent().build();
    }
}