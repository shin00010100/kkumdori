package com.kkumdori.shop.reviewlist.service;

import com.kkumdori.shop.reviewlist.entity.ReviewList;
import com.kkumdori.shop.reviewlist.repository.ReviewListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewListService {

    @Autowired
    private ReviewListRepository reviewListRepository;

    // 상품 번호(goodsNo)에 해당하는 리뷰를 조회하는 메서드
    public List<ReviewList> getReviewsByGoodsNo(Long goodsNo) {
        return reviewListRepository.findByGoodsNo(goodsNo);
    }
}
