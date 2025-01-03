package com.kkumdori.shop.reviewlist.repository;

import com.kkumdori.shop.reviewlist.entity.ReviewList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewListRepository extends JpaRepository<ReviewList, Long> {

    // 상품 번호(goodsNo)에 해당하는 리뷰 데이터를 가져오는 메서드
    List<ReviewList> findByGoodsNo(Long goodsNo);
}
