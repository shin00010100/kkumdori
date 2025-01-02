package com.kkumdori.shop.mypage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.kkumdori.shop.mypage.entity.MyOrderProduct;

import java.util.List;

@Repository
public interface MyOrderProductRepository extends JpaRepository<MyOrderProduct, Long> {

    @Query("SELECT op FROM MyOrderProduct op JOIN FETCH op.goods WHERE op.myOrder.orderNo = :orderNo")
    List<MyOrderProduct> findByMyOrderOrderNo(Long orderNo);
}
