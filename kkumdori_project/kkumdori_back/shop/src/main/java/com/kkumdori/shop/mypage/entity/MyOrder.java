package com.kkumdori.shop.mypage.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.kkumdori.shop.login.entity.User;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "`order`")  // SQL 예약어를 피하기 위해 백틱 사용
public class MyOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderNo;

    private String orderAddress;
    private LocalDateTime orderTime;

    @ManyToOne(fetch = FetchType.LAZY)  // User와의 관계 추가
    @JoinColumn(name = "user_no", referencedColumnName = "userNo")
    private User user;

    @OneToMany(mappedBy = "myOrder", fetch = FetchType.LAZY)
    private List<MyOrderProduct> orderProducts;

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

    public LocalDateTime getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(LocalDateTime orderTime) {
        this.orderTime = orderTime;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<MyOrderProduct> getOrderProducts() {
        return orderProducts;
    }

    public void setOrderProducts(List<MyOrderProduct> orderProducts) {
        this.orderProducts = orderProducts;
    }
}
