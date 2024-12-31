package com.kkumdori.shop.mypage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kkumdori.shop.mypage.service.MyCartService;
import com.kkumdori.shop.mypage.entity.MyCart;

@RestController
@RequestMapping("/api/mycart")
public class MyCartController {

    @Autowired
    private MyCartService cartService;

    // 사용자 번호로 장바구니 조회
    @GetMapping
    public List<MyCart> getCart(@RequestParam Long userNo) {
        return cartService.getCartByUserNo(userNo);
    }

    // 장바구니에 상품 추가
    @PostMapping
    public MyCart addToCart(@RequestBody CartRequest cartRequest) {
        return cartService.addToCart(cartRequest.getGoodsNo(), cartRequest.getUserNo(), cartRequest.getQuantity());
    }

    // 장바구니 아이템 삭제
    @DeleteMapping("/{cartNo}")
    public void deleteCartItem(@PathVariable Integer cartNo) {
        cartService.deleteCartItem(cartNo);
    }

    // CartRequest DTO (Request Body용)
    public static class CartRequest {
        private Long goodsNo;
        private Long userNo;
        private int quantity;

        // Getters and Setters
        public Long getGoodsNo() {
            return goodsNo;
        }

        public void setGoodsNo(Long goodsNo) {
            this.goodsNo = goodsNo;
        }

        public Long getUserNo() {
            return userNo;
        }

        public void setUserNo(Long userNo) {
            this.userNo = userNo;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }
    }
}
