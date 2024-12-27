package com.kkumdori.shop.mypage.repository;

import com.kkumdori.shop.mypage.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    // 기본적인 CRUD 기능은 JpaRepository에서 제공되므로 추가적인 메서드는 필요 없습니다.
}

