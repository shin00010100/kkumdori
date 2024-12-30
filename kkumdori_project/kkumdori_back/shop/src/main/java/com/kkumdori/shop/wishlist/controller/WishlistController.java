package com.kkumdori.shop.wishlist.controller;

import com.kkumdori.shop.wishlist.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;

    @Autowired
    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    // 위시리스트에 상품 추가 API
    @PostMapping("/add")
    public ResponseEntity<String> addToWishlist(
            @RequestParam Long userNo,
            @RequestParam Long goodsNo) {
        
        String result = wishlistService.addToWishlist(userNo, goodsNo);
        return ResponseEntity.ok(result);
    }
}

