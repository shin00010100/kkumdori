package com.kkumdori.shop.mypage.controller;

import java.io.IOException;
import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kkumdori.shop.mypage.dto.ReviewDto;
import com.kkumdori.shop.mypage.service.ReviewService;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public String submitReview(@RequestParam("title") String title,
                               @RequestParam("content") String content,
                               @RequestParam("starRank") BigDecimal starRank,
                               @RequestParam(value = "file", required = false) MultipartFile file,
                               @RequestParam("authorNo") Long authorNo,
                               @RequestParam(value = "goodsNo", required = false) Long goodsNo) throws IOException {

        ReviewDto reviewRequestDto = new ReviewDto(title, content, starRank, file, authorNo, goodsNo);
        reviewService.submitReview(reviewRequestDto);

        return "리뷰가 등록되었습니다.";
    }
}
