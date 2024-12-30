package com.kkumdori.shop.order.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kkumdori.shop.order.entity.Payment;
import com.kkumdori.shop.order.repository.PaymentRepository;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public Payment createPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public void processPayment(Payment payment) {
        // 실제 결제 처리 로직 (카드 결제, 꿈돌이 머니, 카카오페이 등)
        // 외부 결제 API 연동 필요
    }
}
