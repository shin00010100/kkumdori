package com.kkumdori.shop.order.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.kkumdori.shop.login.entity.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "`order`")
public class Order {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_no", referencedColumnName = "userNo", foreignKey = @ForeignKey(name = "FK_USER_ORDER"))
    private User user;

    @JsonProperty("order_address")
    private String orderAddress;

    @JsonProperty("order_time")
    private LocalDateTime orderTime;

    // OrderProduct 리스트를 JSON 배열로 받을 수 있도록 설정
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "order")
    private List<OrderProduct> orderProducts;

    // 기본 생성자
    public Order() {}

    // @JsonCreator는 제외하고 기본 생성자 사용
    public Order(
        @JsonProperty("user_no") Long userNo,
        @JsonProperty("order_address") String orderAddress,
        @JsonProperty("order_time") LocalDateTime orderTime,
        @JsonProperty("order_products") List<OrderProduct> orderProducts  // JSON 배열 매핑
    ) {
        this.user = User.fromUserNo(userNo);
        this.orderAddress = orderAddress;
        this.orderTime = orderTime;
        this.orderProducts = orderProducts;
    }

    // Getters and Setters
    public Long getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(Long orderNo) {
        this.orderNo = orderNo;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getOrderAddress() {
        return orderAddress;
    }

    public void setOrderAddress(String orderAddress) {
        this.orderAddress = orderAddress;
    }

    public LocalDateTime getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(LocalDateTime orderTime) {
        this.orderTime = orderTime;
    }

    public List<OrderProduct> getOrderProducts() {
        return orderProducts;
    }

    public void setOrderProducts(List<OrderProduct> orderProducts) {
        this.orderProducts = orderProducts;
    }
}
