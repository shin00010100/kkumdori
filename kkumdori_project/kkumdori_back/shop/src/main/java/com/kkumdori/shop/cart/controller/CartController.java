package com.kkumdori.shop.cart.controller;

import com.kkumdori.shop.cart.entity.Cart;
import com.kkumdori.shop.cart.service.CartService;
import com.kkumdori.shop.login.entity.User;
import com.kkumdori.shop.login.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserRepository userRepository;

    // 장바구니에 상품 추가
    @PostMapping("/add")
    public String addToCart(@RequestParam("username") String username,
                            @RequestParam("goodsId") Long goodsId,
                            @RequestParam("quantity") int quantity) {
        // 사용자 조회
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        
        // 장바구니에 상품 추가
        cartService.addToCart(user, goodsId, quantity);
        
        return "상품이 장바구니에 추가되었습니다.";
    }

    // 장바구니 목록 조회
    @GetMapping("/items")
    public List<Cart> getCartItems(@RequestParam("userNo") Long userNo) {
        // 사용자 조회
        User user = userRepository.findByUserNo(userNo)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        
        // 사용자의 장바구니 목록과 상품 정보 조회
        return cartService.getCartItemsWithGoods(user);
    }

    // 장바구니에서 상품 삭제
    @DeleteMapping("/remove")
    public String removeFromCart(@RequestParam("userNo") Long userNo,
                                 @RequestParam("goodsId") Long goodsId) {
        // 사용자 조회
        User user = userRepository.findByUserNo(userNo)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        
        // 장바구니에서 상품 삭제
        cartService.removeFromCart(user, goodsId);
        
        return "상품이 장바구니에서 삭제되었습니다.";
    }
}
