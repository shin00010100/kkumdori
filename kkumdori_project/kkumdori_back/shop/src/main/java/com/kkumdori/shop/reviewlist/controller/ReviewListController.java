package com.kkumdori.shop.reviewlist.controller;

import com.kkumdori.shop.reviewlist.service.ReviewListService;
import com.kkumdori.shop.reviewlist.entity.ReviewList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class ReviewListController {
    @Autowired
    private ReviewListService reviewListService;

    @GetMapping("/api/reviewlists")
    public List<ReviewList> getReviewsByGoodsNo(@RequestParam(required = false) Long goodsNo) {
        if (goodsNo == null) {
            throw new IllegalArgumentException("상품 번호는 필수입니다.");
        }
        return reviewListService.getReviewsByGoodsNo(goodsNo);
    }
}
