package com.kkumdori.shop.mypage.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kkumdori.shop.mypage.entity.MyCart;

public interface MyCartRepository extends JpaRepository<MyCart, Integer> {
    // 사용자 번호로 장바구니 조회
    List<MyCart> findByUserNo(Long userNo);

    // 상품 번호로 장바구니 조회
    MyCart findByGoodsNoAndUserNo(Long goodsNo, Long userNo);
}
