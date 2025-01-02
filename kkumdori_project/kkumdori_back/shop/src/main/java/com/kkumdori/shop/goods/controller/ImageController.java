package com.kkumdori.shop.goods.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.kkumdori.shop.goods.service.ImageService;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/images")
public class ImageController {

	@Value("${app.upload.dir}")
    private String uploadDir;
	
	@Autowired
    private ImageService imageService;

	
	private static final Logger logger = LoggerFactory.getLogger(ImageController.class);
    @GetMapping("/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
        	// 파일 경로 생성
            File file = new File(uploadDir, filename);

            // 파일이 존재하지 않을 경우 404 반환
            if (!file.exists()) {
                return ResponseEntity.notFound().build();
            }

            // 파일을 Resource로 변환
            Resource resource = new UrlResource(file.toURI());

            // Content-Type 설정
            String contentType = Files.probeContentType(file.toPath());
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            // 응답 반환
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(resource);
        } catch (IOException e) {
            // 에러 발생 시 500 반환
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }
    
    @PostMapping
    public ResponseEntity<String> uploadImage(@RequestPart("file") MultipartFile file) throws IOException {
        // 이미지 파일 저장
        String imageUrl = imageService.saveImage(file);
        return ResponseEntity.ok(imageUrl); // 이미지 URL 반환
    }
}