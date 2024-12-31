package com.kkumdori.shop.order.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kkumdori.shop.order.entity.Order;
import com.kkumdori.shop.order.service.OrderService;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        // 주문 생성 후 저장된 Order 객체를 반환
        Order createdOrder = orderService.createOrder(order);
        return ResponseEntity.ok(createdOrder);  // 저장된 Order 객체 반환하여 order_no 포함
    }
}


