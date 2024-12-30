package com.kkumdori.shop.wishlist.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "wishlist")
public class Wishlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wishlist_no")
    private Integer wishlistNo;  

    @Column(name = "goods_no")
    private Long goodsNo;  

    @Column(name = "user_no")
    private Long userNo;  

    @Column(name = "created_time")
    private LocalDateTime createdTime;

    // 기본 생성자
    public Wishlist() {}

    // 생성자
    public Wishlist(Long goodsNo, Long userNo) {
        this.goodsNo = goodsNo;
        this.userNo = userNo;
        this.createdTime = LocalDateTime.now();  // 현재 시간으로 생성 시간 설정
    }

    // Getter & Setter
    public Integer getWishlistNo() {
        return wishlistNo;
    }

    public void setWishlistNo(Integer wishlistNo) {
        this.wishlistNo = wishlistNo;
    }

    public Long getGoodsNo() {
        return goodsNo;
    }

    public void setGoodsNo(Long goodsNo) {
        this.goodsNo = goodsNo;
    }

    public Long getUserNo() {
        return userNo;
    }

    public void setUserNo(Long userNo) {
        this.userNo = userNo;
    }

    public LocalDateTime getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }
}
