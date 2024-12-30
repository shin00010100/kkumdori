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

import com.kkumdori.shop.banner.entity.Banner;
import com.kkumdori.shop.banner.service.BannerService;
import com.kkumdori.shop.goods.service.ImageService;

@RestController
@RequestMapping("/api/banners")
public class BannerController {
//	@Autowired
//    private BannerService bannerService;
//
//    @Autowired
//    private ImageService imageService;
//
//    // 기존 배너 불러오기
//    @GetMapping
//    public ResponseEntity<List<Banner>> getBanners() {
//        return ResponseEntity.ok(bannerService.getAllBanners());
//    }
//    
//    @PostMapping
//    public ResponseEntity<?> saveOrUpdateBanners(
//            @ModelAttribute List<Banner> banners,
//            @RequestParam("bannerFiles") List<MultipartFile> images) {
//        try {
//            bannerService.saveOrUpdateBanners(banners, images);
//            return ResponseEntity.ok("배너가 성공적으로 저장되었습니다.");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("배너 저장 중 오류 발생: " + e.getMessage());
//        }
//    }

//    @PostMapping
//    public ResponseEntity<?> saveBanners(
//        @RequestParam List<MultipartFile> images,
//        @RequestParam List<String> links,
//        @RequestParam List<Integer> orders) throws IOException {
//        
//        if (images.size() != links.size() || images.size() != orders.size()) {
//            return ResponseEntity.badRequest().body("데이터 크기가 일치하지 않습니다.");
//        }
//
//        for (int i = 0; i < images.size(); i++) {
//            MultipartFile image = images.get(i);
//            String link = links.get(i);
//            int order = orders.get(i);
//
//            // 이미지 저장 및 배너 생성 로직
//            String imagePath = imageService.saveImage(image);
//
//            Banner banner = new Banner();
//            banner.setImagePath(imagePath);
//            banner.setLink(link);
//            banner.setDisplayOrder(order);
//
//            bannerService.saveBanner(banner);
//        }
//
//        return ResponseEntity.ok("배너가 저장되었습니다.");
//    }
}