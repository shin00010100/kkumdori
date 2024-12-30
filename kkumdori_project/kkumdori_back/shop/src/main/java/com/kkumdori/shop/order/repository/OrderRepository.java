package com.kkumdori.shop.order.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kkumdori.shop.order.entity.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // 사용자 번호(userNo)로 주문 내역을 조회하는 쿼리 메서드
	List<Order> findByUser_UserNo(Long userNo);

    // 주문 번호(orderNo)로 주문 내역을 조회하는 쿼리 메서드
    Order findByOrderNo(Long orderNo);
}
