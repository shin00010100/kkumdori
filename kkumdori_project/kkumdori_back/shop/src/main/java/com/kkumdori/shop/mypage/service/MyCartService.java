package com.kkumdori.shop.mypage.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kkumdori.shop.goods.repository.GoodsRepository;
import com.kkumdori.shop.mypage.repository.MyCartRepository;
import com.kkumdori.shop.mypage.entity.MyCart;

@Service
public class MyCartService {

    @Autowired
    private MyCartRepository cartRepository;

    @Autowired
    private GoodsRepository goodsRepository;

    // 사용자 번호로 장바구니 조회
    public List<MyCart> getCartByUserNo(Long userNo) {
        return cartRepository.findByUserNo(userNo);
    }

    // 장바구니에 상품 추가
    public MyCart addToCart(Long goodsNo, Long userNo, int quantity) {
        // 상품이 이미 장바구니에 있는지 확인
        MyCart existingCart = cartRepository.findByGoodsNoAndUserNo(goodsNo, userNo);
        if (existingCart != null) {
            existingCart.setQuantity(existingCart.getQuantity() + quantity);  // 수량 증가
            return cartRepository.save(existingCart);
        }

        // 상품 정보를 가져오기
        var goods = goodsRepository.findById(goodsNo).orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다."));

        // 새 장바구니 아이템 생성
        MyCart cart = new MyCart(goodsNo, userNo, quantity);
        return cartRepository.save(cart);
    }

    // 장바구니 아이템 삭제
    public void deleteCartItem(Integer cartNo) {
        cartRepository.deleteById(cartNo);
    }
}
