package com.kkumdori.shop.mypage.service;

import com.kkumdori.shop.mypage.dto.MyOrderDto;
import com.kkumdori.shop.mypage.dto.MyOrderProductDto;
import com.kkumdori.shop.mypage.entity.MyOrder;
import com.kkumdori.shop.mypage.entity.MyOrderProduct;
import com.kkumdori.shop.mypage.repository.MyOrderRepository;
import com.kkumdori.shop.mypage.repository.MyOrderProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MyOrderService {

    @Autowired
    private MyOrderRepository myOrderRepository;

    @Autowired
    private MyOrderProductRepository myOrderProductRepository;

    public List<MyOrderDto> getMyOrders(Long userNo, String searchQuery, LocalDateTime startDate, LocalDateTime endDate) {
        // 사용자 번호로 주문 정보 가져오기 (필터링 조건을 고려하여)
        List<MyOrder> orders;

        // 검색어가 있을 경우, 검색 조건에 맞는 주문 목록을 가져옴
        if (searchQuery != null && !searchQuery.isEmpty()) {
            orders = myOrderRepository.findMyOrdersByUserNoAndSearchQuery(userNo, searchQuery);
        } 
        // 날짜 범위가 주어졌을 경우, 해당 범위에 맞는 주문 목록을 가져옴
        else if (startDate != null && endDate != null) {
            orders = myOrderRepository.findMyOrdersByDateRange(startDate, endDate);
        } 
        // 기본적으로 사용자 번호로만 조회
        else {
            orders = myOrderRepository.findMyOrdersByUserNo(userNo);
        }

        // 주문 데이터를 MyOrderDto로 변환
        return orders.stream()
                .map(order -> {
                    MyOrderDto myOrderDto = new MyOrderDto();
                    myOrderDto.setOrderNo(order.getOrderNo());
                    myOrderDto.setOrderAddress(order.getOrderAddress());

                    // 주문 시간 (LocalDateTime -> String으로 변환)
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                    myOrderDto.setOrderTime(order.getOrderTime().format(formatter));

                    // 해당 주문에 포함된 상품 정보 가져오기
                    List<MyOrderProduct> orderProducts = myOrderProductRepository.findByMyOrderOrderNo(order.getOrderNo());

                    // 상품 정보를 MyOrderProductDto로 변환
                    List<MyOrderProductDto> productDtos = orderProducts.stream()
                            .map(orderProduct -> {
                                MyOrderProductDto productDto = new MyOrderProductDto();
                                productDto.setProductName(orderProduct.getGoods().getGoodsName());
                                productDto.setQuantity(orderProduct.getQuantity());  // getQuantity() 사용
                                productDto.setPrice(orderProduct.getPrice());        // getPrice() 사용
                                return productDto;
                            })
                            .collect(Collectors.toList());

                    myOrderDto.setOrderProducts(productDtos);

                    return myOrderDto;
                })
                .collect(Collectors.toList());
    }
}
