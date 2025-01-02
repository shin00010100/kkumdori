package com.kkumdori.shop.mypage.dto;

import java.util.List;

public class MyOrderDto {
    private Long orderNo;
    private String orderAddress;
    private String orderTime;
    private List<MyOrderProductDto> orderProducts;

    // Getters and Setters
    public Long getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(Long orderNo) {
        this.orderNo = orderNo;
    }

    public String getOrderAddress() {
        return orderAddress;
    }

    public void setOrderAddress(String orderAddress) {
        this.orderAddress = orderAddress;
    }

    public String getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(String orderTime) {
        this.orderTime = orderTime;
    }

    public List<MyOrderProductDto> getOrderProducts() {
        return orderProducts;
    }

    public void setOrderProducts(List<MyOrderProductDto> orderProducts) {
        this.orderProducts = orderProducts;
    }
}