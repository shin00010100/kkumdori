package com.kkumdori.shop.mypage.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kkumdori.shop.mypage.dto.MyOrderDto;
import com.kkumdori.shop.mypage.service.MyOrderService;

@RestController
@RequestMapping("/api/myorders")
public class MyOrderController {

    @Autowired
    private MyOrderService myOrderService;

    // 사용자 번호를 기준으로 주문 목록을 반환하는 API
    @GetMapping
    public List<MyOrderDto> getMyOrders(@RequestParam Long userNo,
                                        @RequestParam(required = false) String searchQuery,
                                        @RequestParam(required = false) String startDate,
                                        @RequestParam(required = false) String endDate) {
        
        // 날짜 형식 변환 (yyyy-MM-dd)
        LocalDateTime start = startDate != null ? LocalDateTime.parse(startDate + "T00:00:00") : null;
        LocalDateTime end = endDate != null ? LocalDateTime.parse(endDate + "T23:59:59") : null;
        
        return myOrderService.getMyOrders(userNo, searchQuery, start, end);
    }
    
    
}
