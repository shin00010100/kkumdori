package com.kkumdori.shop.order.service;

import org.springframework.stereotype.Service;

import com.kkumdori.shop.goods.entity.Goods;
import com.kkumdori.shop.goods.repository.GoodsRepository; // GoodsRepository import 추가
import com.kkumdori.shop.order.entity.Order;
import com.kkumdori.shop.order.entity.OrderProduct;
import com.kkumdori.shop.order.repository.OrderProductRepository;
import com.kkumdori.shop.order.repository.OrderRepository; // OrderRepository import 추가

@Service
public class OrderProductService {

    private final OrderProductRepository orderProductRepository;
    private final OrderRepository orderRepository;
    private final GoodsRepository goodsRepository;

    public OrderProductService(OrderProductRepository orderProductRepository, OrderRepository orderRepository, GoodsRepository goodsRepository) {
        this.orderProductRepository = orderProductRepository;
        this.orderRepository = orderRepository;
        this.goodsRepository = goodsRepository;
    }

    // 주문 상품 저장
    public void saveOrderProduct(OrderProduct orderProduct) {
        try {
            // 주문과 상품이 유효한지 확인
            if (orderProduct.getOrder() == null || orderProduct.getGoods() == null) {
                throw new IllegalArgumentException("Order or Goods information is missing.");
            }

            // 유효한 주문과 상품을 설정
            Order order = orderRepository.findById(orderProduct.getOrder().getOrderNo())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid order_no"));
            Goods goods = goodsRepository.findById(orderProduct.getGoods().getGoodsNo())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid goods_no"));

            // 유효한 주문과 상품을 설정
            orderProduct.setOrder(order);
            orderProduct.setGoods(goods);

            // 주문 상품 저장
            orderProductRepository.save(orderProduct);

        } catch (Exception e) {
            System.err.println("주문 상품 저장 실패: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
