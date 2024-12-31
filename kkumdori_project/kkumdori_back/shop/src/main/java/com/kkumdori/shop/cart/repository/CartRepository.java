package com.kkumdori.shop.cart.repository;

import com.kkumdori.shop.cart.entity.Cart;
import com.kkumdori.shop.login.entity.User;
import com.kkumdori.shop.goods.entity.Goods;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {

    // 사용자의 장바구니에 담긴 특정 상품 조회
    Optional<Cart> findByUserAndGoods(User user, Goods goods);

    // 사용자의 장바구니 목록 조회
    List<Cart> findByUser(User user);  // 사용자가 담은 모든 상품을 조회
}
