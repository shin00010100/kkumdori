package com.kkumdori.shop.mypage.repository;

import com.kkumdori.shop.mypage.entity.MyOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface MyOrderRepository extends JpaRepository<MyOrder, Long> {

    // 사용자 번호로 주문 내역 조회
    @Query("SELECT m FROM MyOrder m WHERE m.user.userNo = :userNo")
    List<MyOrder> findMyOrdersByUserNo(Long userNo);

    // 날짜 범위로 주문 내역 조회
    @Query("SELECT m FROM MyOrder m WHERE m.orderTime BETWEEN :startDate AND :endDate")
    List<MyOrder> findMyOrdersByDateRange(LocalDateTime startDate, LocalDateTime endDate);

    // 상품명으로 주문 내역 조회
    @Query("SELECT m FROM MyOrder m JOIN m.orderProducts p JOIN p.goods g WHERE m.user.userNo = :userNo AND g.goodsName LIKE %:searchQuery%")
    List<MyOrder> findMyOrdersByUserNoAndProductName(Long userNo, String searchQuery);
}
