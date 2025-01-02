package com.kkumdori.shop.mypage.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

<<<<<<< HEAD
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
=======
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
>>>>>>> 890930708a9370a37055c37bd8729e25ee7b4ee6

import com.kkumdori.shop.mypage.dto.MyOrderDto;
import com.kkumdori.shop.mypage.dto.MyOrderProductDto;
import com.kkumdori.shop.mypage.entity.MyOrder;
import com.kkumdori.shop.mypage.entity.MyOrderProduct;
import com.kkumdori.shop.mypage.repository.MyOrderProductRepository;
import com.kkumdori.shop.mypage.repository.MyOrderRepository;

@Service
public class MyOrderService {

    private static final Logger logger = LoggerFactory.getLogger(MyOrderService.class);

    @Autowired
    private MyOrderRepository myOrderRepository;

    @Autowired
    private MyOrderProductRepository myOrderProductRepository;

    // 주문 조회 서비스 메서드
    @Transactional
    public List<MyOrderDto> getMyOrders(Long userNo, String searchQuery, LocalDateTime startDate, LocalDateTime endDate) {
        List<MyOrder> orders;

        // 조건에 맞는 주문을 검색
        if (searchQuery != null && !searchQuery.isEmpty()) {
            orders = myOrderRepository.findMyOrdersByUserNoAndProductName(userNo, searchQuery);
        } else if (startDate != null && endDate != null) {
            orders = myOrderRepository.findMyOrdersByDateRange(startDate, endDate);
        } else {
            orders = myOrderRepository.findMyOrdersByUserNo(userNo);
        }

        // 주문 목록을 DTO로 변환
        return orders.stream()
                .map(order -> {
                    MyOrderDto myOrderDto = new MyOrderDto();
                    myOrderDto.setOrderNo(order.getOrderNo());
                    myOrderDto.setOrderAddress(order.getOrderAddress());

                    // 주문 시간 포맷팅
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                    myOrderDto.setOrderTime(order.getOrderTime().format(formatter));

                    // 주문에 포함된 상품 정보 가져오기
                    List<MyOrderProduct> orderProducts = myOrderProductRepository.findByMyOrderOrderNo(order.getOrderNo());

                    // 상품 정보를 DTO로 변환
                    List<MyOrderProductDto> productDtos = orderProducts.stream()
                            .map(orderProduct -> {
                                MyOrderProductDto productDto = new MyOrderProductDto();
                                productDto.setProductName(orderProduct.getGoods().getGoodsName());
                                productDto.setQuantity(orderProduct.getQuantity());
                                productDto.setPrice(orderProduct.getPrice());

                                // 상품 고유 번호 추가
                                productDto.setGoodsNo(orderProduct.getGoods().getGoodsNo());  // goodsNo 가져오기

                                // 상품 정보 로그 출력
                                if (orderProduct.getGoods() != null) {
                                    logger.info("Goods found: " + orderProduct.getGoods().getGoodsName());
                                    logger.info("Image Path: " + orderProduct.getGoods().getImagePath());
                                    productDto.setImagePath(orderProduct.getGoods().getImagePath());
                                } else {
                                    logger.warn("Goods not found for OrderProduct with ID: " + orderProduct.getOrderProductNo());
                                }

                                return productDto;
                            })
                            .collect(Collectors.toList());

                    // 상품 정보 리스트를 주문 DTO에 추가
                    myOrderDto.setOrderProducts(productDtos);
                    return myOrderDto;
                })
                .collect(Collectors.toList());
    }
}

