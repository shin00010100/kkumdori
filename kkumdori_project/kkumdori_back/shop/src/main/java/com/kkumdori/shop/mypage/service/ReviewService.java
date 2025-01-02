package com.kkumdori.shop.mypage.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kkumdori.shop.mypage.dto.ReviewDto;
import com.kkumdori.shop.mypage.entity.Review;
import com.kkumdori.shop.mypage.repository.ReviewRepository;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

 // 파일 저장 경로 수정
    private final String uploadDir = "C:/uploads/images/";  // 실제 서버에서 접근할 수 있는 로컬 경로

    public void submitReview(ReviewDto reviewRequestDto) throws IOException {
        // 파일 처리
        String imagePath = null;
        MultipartFile file = reviewRequestDto.getFile();
        if (file != null && !file.isEmpty()) {
            // 파일 저장 로직 (서버의 uploads/images 폴더에 저장)
            String uniqueFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();  // 고유한 파일 이름 생성
            Path path = Paths.get(uploadDir + uniqueFileName);
            
            // 경로가 없다면 생성
            Files.createDirectories(path.getParent());  
            
            // 파일을 서버에 저장
            file.transferTo(path.toFile());  
            
            // URL 경로로 설정 (클라이언트에서 접근할 수 있도록)
            imagePath = "http://localhost:8090/uploads/images/" + uniqueFileName;  // 파일을 불러올 URL 경로 설정
        }

        // Review 객체 생성 및 데이터 매핑
        Review review = new Review();
        review.setTitle(reviewRequestDto.getTitle());
        review.setContent(reviewRequestDto.getContent());
        review.setStarRank(reviewRequestDto.getStarRank());
        review.setAuthorNo(reviewRequestDto.getAuthorNo());
        review.setGoodsNo(reviewRequestDto.getGoodsNo());
        review.setCreatedTime(LocalDateTime.now());
        review.setImage(imagePath);  // 이미지 URL 경로 저장

        reviewRepository.save(review);  // DB에 리뷰 저장
    }
}