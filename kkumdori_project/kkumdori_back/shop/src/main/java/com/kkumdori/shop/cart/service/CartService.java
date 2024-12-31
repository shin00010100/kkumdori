package com.kkumdori.shop.cart.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kkumdori.shop.cart.entity.Cart;
import com.kkumdori.shop.cart.repository.CartRepository;
import com.kkumdori.shop.goods.entity.Goods;
import com.kkumdori.shop.goods.repository.GoodsRepository;
import com.kkumdori.shop.login.entity.User;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private GoodsRepository goodsRepository;

    // 장바구니에 상품 추가
    public void addToCart(User user, Long goodsId, int quantity) {
        // 상품 정보 조회
        Goods goods = goodsRepository.findById(goodsId)
                .orElseThrow(() -> new IllegalArgumentException("상품을 찾을 수 없습니다."));

        // 사용자의 장바구니에 이미 해당 상품이 있는지 확인
        Cart existingCart = cartRepository.findByUserAndGoods(user, goods)
                .orElse(null);

        if (existingCart != null) {
            // 이미 장바구니에 해당 상품이 있다면 수량만 업데이트
            existingCart.setQuantity(existingCart.getQuantity() + quantity);
            cartRepository.save(existingCart);
        } else {
            // 장바구니에 상품이 없다면 새로 추가
            Cart cart = new Cart(user, goods, quantity);
            cartRepository.save(cart);
        }
    }

    // 장바구니에서 특정 상품 삭제
    public void removeFromCart(User user, Long goodsId) {
        Goods goods = goodsRepository.findById(goodsId)
                .orElseThrow(() -> new IllegalArgumentException("상품을 찾을 수 없습니다."));

        // 장바구니에서 해당 상품 찾기
        Cart cart = cartRepository.findByUserAndGoods(user, goods)
                .orElseThrow(() -> new IllegalArgumentException("해당 상품은 장바구니에 존재하지 않습니다."));

        // 장바구니에서 삭제
        cartRepository.delete(cart);
    }

    // 사용자의 장바구니 목록 조회 (상품 정보 포함)
    public List<Cart> getCartItemsWithGoods(User user) {
        // 사용자의 장바구니 목록 조회
        List<Cart> cartItems = cartRepository.findByUser(user);

        // 장바구니 아이템에 상품 정보 추가
        for (Cart cart : cartItems) {
            Goods goods = cart.getGoods();
            cart.setGoods(goods); // 이미 존재하는 상품 정보를 사용
        }
        return cartItems;
    }
}
