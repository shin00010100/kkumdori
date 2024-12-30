package com.kkumdori.shop.wishlist.service;

import com.kkumdori.shop.wishlist.entity.Wishlist;
import com.kkumdori.shop.wishlist.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;

    @Autowired
    public WishlistService(WishlistRepository wishlistRepository) {
        this.wishlistRepository = wishlistRepository;
    }

    // 위시리스트에 상품을 추가
    public String addToWishlist(Long userNo, Long goodsNo) {
        // 이미 위시리스트에 있는지 체크
        if (wishlistRepository.existsByUserNoAndGoodsNo(userNo, goodsNo)) {
            return "이미 위시리스트에 존재하는 상품입니다.";
        }

        // 위시리스트에 추가
        Wishlist wishlist = new Wishlist(goodsNo, userNo);
        wishlistRepository.save(wishlist);
        return "위시리스트에 추가되었습니다.";
    }
}

