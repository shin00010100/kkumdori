package com.kkumdori.shop.wishlist.repository;

import com.kkumdori.shop.wishlist.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishlistRepository extends JpaRepository<Wishlist, Integer> {
    boolean existsByUserNoAndGoodsNo(Long userNo, Long goodsNo);
}
