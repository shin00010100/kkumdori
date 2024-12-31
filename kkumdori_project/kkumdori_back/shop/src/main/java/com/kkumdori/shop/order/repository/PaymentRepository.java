package com.kkumdori.shop.order.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kkumdori.shop.order.entity.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    // 주문 번호(order_id)로 결제 내역을 조회하는 쿼리 메서드
    List<Payment> findByOrderOrderNo(Long orderNo);

    // 결제 상태(status)로 결제 내역을 조회하는 쿼리 메서드
    List<Payment> findByStatus(String status);
}