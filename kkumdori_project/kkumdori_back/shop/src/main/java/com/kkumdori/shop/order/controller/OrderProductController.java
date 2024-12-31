package com.kkumdori.shop.order.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kkumdori.shop.goods.entity.Goods;
import com.kkumdori.shop.goods.repository.GoodsRepository;
import com.kkumdori.shop.order.entity.Order;
import com.kkumdori.shop.order.entity.OrderProduct;
import com.kkumdori.shop.order.repository.OrderRepository;
import com.kkumdori.shop.order.service.OrderProductService;

@RestController
@RequestMapping("/api/order_product")
public class OrderProductController {

    private final OrderProductService orderProductService;
    private final OrderRepository orderRepository;  
    private final GoodsRepository goodsRepository;  

    public OrderProductController(OrderProductService orderProductService, 
                                  OrderRepository orderRepository, 
                                  GoodsRepository goodsRepository) {
        this.orderProductService = orderProductService;
        this.orderRepository = orderRepository;
        this.goodsRepository = goodsRepository;
    }

    @PostMapping("/insert")
    public ResponseEntity<String> insertOrderProduct(@RequestBody List<Map<String, Object>> orderProducts) {
        try {
            System.out.println("Received Order Products: " + orderProducts);

            // 주문 상품 리스트 처리
            for (Map<String, Object> orderProductMap : orderProducts) {
                Integer orderProductQuantity = (Integer) orderProductMap.get("order_product_quantity");
                Integer orderPrice = (Integer) orderProductMap.get("order_price");  // Integer로 변경
                Long orderNo = ((Number) orderProductMap.get("order_no")).longValue();
                Long goodsNo = ((Number) orderProductMap.get("goods_no")).longValue();

                // 유효성 검사
                if (orderNo == null || goodsNo == null) {
                    return ResponseEntity.status(400).body("Order or Goods information is missing.");
                }

                // Order와 Goods 엔티티 조회
                Order order = orderRepository.findById(orderNo)
                        .orElseThrow(() -> new IllegalArgumentException("Invalid order_no"));
                Goods goods = goodsRepository.findById(goodsNo)
                        .orElseThrow(() -> new IllegalArgumentException("Invalid goods_no"));

                // OrderProduct 엔티티 생성
                OrderProduct orderProduct = new OrderProduct();
                orderProduct.setOrderProductQuantity(orderProductQuantity);
                orderProduct.setOrderPrice(orderPrice);  // Integer로 처리

                orderProduct.setOrder(order);  // Order 설정
                orderProduct.setGoods(goods);  // Goods 설정

                // 주문 상품 저장
                orderProductService.saveOrderProduct(orderProduct);
            }

            return ResponseEntity.ok("Order products have been successfully saved.");
        } catch (Exception e) {
            System.err.println("Failed to save order products: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to save order products: " + e.getMessage());
        }
    }

}
