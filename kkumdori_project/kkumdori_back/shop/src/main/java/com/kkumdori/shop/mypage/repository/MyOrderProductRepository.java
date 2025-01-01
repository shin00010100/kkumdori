package com.kkumdori.shop.mypage.repository;

import com.kkumdori.shop.mypage.entity.MyOrderProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MyOrderProductRepository extends JpaRepository<MyOrderProduct, Long> {
    List<MyOrderProduct> findByMyOrderOrderNo(Long orderNo);
}
