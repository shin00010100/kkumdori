package com.kkumdori.shop.mypage.entity;

import com.kkumdori.shop.goods.entity.Goods;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "cart")
public class MyCart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_no")
    private Integer cartNo;  // 장바구니 번호 (PK)

    @ManyToOne
    @JoinColumn(name = "goods_no", referencedColumnName = "goods_no", insertable = false, updatable = false)
    private Goods goods;  // 상품 정보

    @Column(name = "goods_no")
    private Long goodsNo;  // 상품 번호

    @Column(name = "user_no")
    private Long userNo;  // 사용자 번호

    @Column(name = "quantity")
    private int quantity;  // 상품 수량

    // 기본 생성자
    public MyCart() {}

    // 생성자
    public MyCart(Long goodsNo, Long userNo, int quantity) {
        this.goodsNo = goodsNo;
        this.userNo = userNo;
        this.quantity = quantity;
    }

    // Getter & Setter
    public Integer getCartNo() {
        return cartNo;
    }

    public void setCartNo(Integer cartNo) {
        this.cartNo = cartNo;
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

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
