package com.kkumdori.shop.mypage.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;

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

    private final String uploadDir = "src/main/resources/uploads/";  // 이미지 파일 저장 경로

    public void submitReview(ReviewDto reviewRequestDto) throws IOException {
        // 파일 처리
        String imagePath = null;
        MultipartFile file = reviewRequestDto.getFile();
        if (file != null && !file.isEmpty()) {
            // 파일 저장 로직 (로컬 디스크에 저장하는 예시)
            Path path = Paths.get(uploadDir + file.getOriginalFilename());
            Files.createDirectories(path.getParent());  // 경로가 없다면 생성
            file.transferTo(path.toFile());
            imagePath = path.toString();  // 이미지 경로
        }

        // Review 객체 생성 및 데이터 매핑
        Review review = new Review();
        review.setTitle(reviewRequestDto.getTitle());
        review.setContent(reviewRequestDto.getContent());
        review.setStarRank(reviewRequestDto.getStarRank());
        review.setAuthorNo(reviewRequestDto.getAuthorNo());
        review.setGoodsNo(reviewRequestDto.getGoodsNo());
        review.setCreatedTime(LocalDateTime.now());
        review.setImage(imagePath);  // 이미지 경로 저장

        reviewRepository.save(review);  // DB에 리뷰 저장
    }
}
