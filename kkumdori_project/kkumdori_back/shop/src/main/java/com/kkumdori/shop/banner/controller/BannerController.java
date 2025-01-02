package com.kkumdori.shop.banner.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

import com.kkumdori.shop.banner.dto.BannerDto;
import com.kkumdori.shop.banner.entity.Banner;
import com.kkumdori.shop.banner.service.BannerService;
import com.kkumdori.shop.goods.service.ImageService;

@RestController
@RequestMapping("/api/banners")
public class BannerController {
	private final Logger log = LoggerFactory.getLogger(getClass());
	
	private final BannerService bannerService;
	private final ImageService imageService;

    @Autowired
    public BannerController(BannerService bannerService, ImageService imageService) {
        this.bannerService = bannerService;
        this.imageService = imageService; // 의존성 주입
    }
    
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createBanners(
    	@RequestPart("files") List<MultipartFile> files,
        @RequestParam("links") List<String> links,
        @RequestParam("orders") List<Integer> orders) {
        try {
            for (int i = 0; i < files.size(); i++) {
                String imagePath = imageService.saveImage(files.get(i));
                Banner banner = new Banner();
                banner.setImagePath(imagePath);
                banner.setLink(links.get(i));
                banner.setDisplayOrder(orders.get(i));
                bannerService.saveBanner(banner);
            }
            return ResponseEntity.ok("Banners created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving banners");
        }
    }


    @GetMapping
    public ResponseEntity<List<Banner>> getAllBanners() {
        List<Banner> banners = bannerService.getAllBanners();
        return ResponseEntity.ok(banners);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Banner> updateBanner(
    		@PathVariable Long id,
    	    @ModelAttribute BannerDto bannerDto) throws IOException {

    	log.debug("Received BannerDto: {}", bannerDto);
    	Banner updatedBanner = bannerService.updateBanner(id, bannerDto);
    	return ResponseEntity.ok(updatedBanner);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBanner(@PathVariable Long id) {
        bannerService.deleteBanner(id);
        return ResponseEntity.noContent().build();
    }
}