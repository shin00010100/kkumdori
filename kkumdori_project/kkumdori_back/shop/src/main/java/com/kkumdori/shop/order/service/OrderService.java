package com.kkumdori.shop.order.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kkumdori.shop.order.entity.Order;
import com.kkumdori.shop.order.repository.OrderRepository;

@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;

    public Order createOrder(Order order) {
    	 // 주문 주소 출력
        System.out.println("Order Address: " + order.getOrderAddress());
        Order savedOrder = orderRepository.save(order); // 여기서 order_no가 자동 생성됩니다.
        return savedOrder;
    }
}