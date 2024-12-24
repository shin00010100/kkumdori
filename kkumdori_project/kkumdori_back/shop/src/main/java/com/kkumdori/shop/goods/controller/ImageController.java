package com.kkumdori.shop.goods.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/images")
public class ImageController {

//    private static final String IMAGE_UPLOAD_DIR = "C:/kkumdori_project/kkumdori_back/shop/uploads/images/";
    private static final String IMAGE_UPLOAD_DIR = "uploads/images/"; // 상대 경로
    
    @GetMapping("/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            Path imagePath = Paths.get(IMAGE_UPLOAD_DIR).resolve(filename).normalize();
            System.out.println("Attempting to access image at: " + imagePath); // 디버깅 로그
            Resource resource = new UrlResource(imagePath.toUri());

            if (!resource.exists() || !resource.isReadable()) {
            	System.out.println("Image not found or unreadable: " + imagePath); // 디버깅 로그
                return ResponseEntity.notFound().build();
            }

            String contentType = Files.probeContentType(imagePath);
            if (contentType == null) {
                contentType = "application/octet-stream"; // 기본값
            }

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, contentType)
                    .body(resource);

        } catch (Exception e) {
        	e.printStackTrace(); // 디버깅용 로그
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}