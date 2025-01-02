package com.kkumdori.shop.mypage.repository;

import com.kkumdori.shop.mypage.entity.MyWishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MyWishlistRepository extends JpaRepository<MyWishlist, Integer> {
    
    List<MyWishlist> findByUserNo(Long userNo);  // 사용자 번호로 MyWishlist 조회
    MyWishlist findByGoodsNoAndUserNo(Long goodsNo, Long userNo);  // 상품과 사용자로 위시리스트 존재 여부 확인
}


