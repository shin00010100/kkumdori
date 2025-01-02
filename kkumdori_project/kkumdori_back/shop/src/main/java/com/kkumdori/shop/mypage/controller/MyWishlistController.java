package com.kkumdori.shop.mypage.controller;

import com.kkumdori.shop.mypage.entity.MyWishlist;
import com.kkumdori.shop.mypage.service.MyWishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mywishlist")
public class MyWishlistController {

    @Autowired
    private MyWishlistService myWishlistService;

    // 사용자 번호로 위시리스트와 상품 정보 가져오기
    @GetMapping
    public List<MyWishlist> getMyWishlist(@RequestParam Long userNo) {
        return myWishlistService.getMyWishlist(userNo);
    }

    // 위시리스트에 상품 추가
    @PostMapping
    public MyWishlist addToMyWishlist(@RequestParam Long goodsNo, @RequestParam Long userNo) {
        return myWishlistService.addToMyWishlist(goodsNo, userNo);
    }

    // 위시리스트 아이템 삭제
    @DeleteMapping("/{wishlistNo}")
    public void deleteMyWishlistItem(@PathVariable Integer wishlistNo) {
        myWishlistService.deleteMyWishlistItem(wishlistNo);
    }
}

