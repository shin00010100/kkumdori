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

    // 검색어로 주문 내역 조회 (예시로 주소에 대한 검색)
    @Query("SELECT m FROM MyOrder m WHERE m.user.userNo = :userNo AND m.orderAddress LIKE %:searchQuery%")
    List<MyOrder> findMyOrdersByUserNoAndSearchQuery(Long userNo, String searchQuery);
}
