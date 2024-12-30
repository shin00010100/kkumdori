package com.kkumdori.shop.goods.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImageService {
	
	private static final org.slf4j.Logger logger = LoggerFactory.getLogger(ImageService.class);

    @Value("${app.upload.dir}")
    private String uploadDir;

    @Value("${app.access.url}")
    private String accessUrl;

    public String saveImage(MultipartFile file) throws IOException {
    	if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("이미지 파일이 없습니다.");
        }

        logger.info("Uploaded file original name: {}", file.getOriginalFilename());
        logger.info("Uploaded file size: {}", file.getSize());

        // 파일 이름 생성
        String originalFilename = file.getOriginalFilename();
        String newFileName = UUID.randomUUID().toString() + "_" + originalFilename;

        // 파일 저장 경로
        File destinationFile = new File(uploadDir, newFileName);
        logger.info("Destination file path: {}", destinationFile.getAbsolutePath());

        destinationFile.getParentFile().mkdirs();

        try (InputStream inputStream = file.getInputStream();
             OutputStream outputStream = new FileOutputStream(destinationFile)) {
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
        }

        logger.info("File saved successfully: {}", destinationFile.getAbsolutePath());
        logger.info("Temp directory: {}", System.getProperty("java.io.tmpdir"));
        logger.info("Multipart location: {}", file.getResource().getDescription());
        logger.info("Access URL: {}", accessUrl);
        logger.info("Generated image URL: {}", accessUrl + newFileName);
        
        if (!accessUrl.endsWith("/")) {
            accessUrl += "/";
        }
        return accessUrl + newFileName;
    }
}