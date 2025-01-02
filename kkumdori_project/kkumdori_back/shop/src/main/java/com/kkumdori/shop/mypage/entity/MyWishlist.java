package com.kkumdori.shop.mypage.entity;

import com.kkumdori.shop.goods.entity.Goods;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "wishlist")  
public class MyWishlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wishlist_no")
    private Integer wishlistNo;  // Wishlist 테이블의 PK

    @ManyToOne
    @JoinColumn(name = "goods_no", referencedColumnName = "goods_no", insertable = false, updatable = false)
    private Goods goods;  // Goods 엔티티와 연결

    @Column(name = "goods_no")
    private Long goodsNo;  // Wishlist 테이블의 goods_no

    @Column(name = "user_no")
    private Long userNo;  // Wishlist 테이블의 user_no

    @Column(name = "created_time")
    private LocalDateTime createdTime;

    // 기본 생성자
    public MyWishlist() {}

    // 생성자
    public MyWishlist(Long goodsNo, Long userNo, Goods goods) {
        this.goodsNo = goodsNo;
        this.userNo = userNo;
        this.goods = goods;
        this.createdTime = LocalDateTime.now();  // 현재 시간으로 생성 시간 설정
    }

    // Getter & Setter
    public Integer getWishlistNo() {
        return wishlistNo;
    }

    public void setWishlistNo(Integer wishlistNo) {
        this.wishlistNo = wishlistNo;
    }

    public Goods getGoods() {
        return goods;
    }

    public void setGoods(Goods goods) {
        this.goods = goods;
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

