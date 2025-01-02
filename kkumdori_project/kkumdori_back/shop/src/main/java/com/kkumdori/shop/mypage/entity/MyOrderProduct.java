package com.kkumdori.shop.mypage.entity;

import com.kkumdori.shop.goods.entity.Goods;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "order_product")
public class MyOrderProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_product_no")
    private Long orderProductNo;

    @Column(name = "order_product_quantity")
    private Integer quantity;

    @Column(name = "order_price")
    private Integer price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_no", referencedColumnName = "orderNo", foreignKey = @ForeignKey(name = "FK_ORDER_MY_ORDER_ITEM"))
    private MyOrder myOrder;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "goods_no", referencedColumnName = "goods_no", foreignKey = @ForeignKey(name = "FK_GOODS_MY_ORDER_ITEM"))
    private Goods goods;

    // goods_no 필드 추가
    @Column(name = "goods_no", insertable = false, updatable = false)
    private Long goodsNo;

    // Getter 및 Setter
    public Long getOrderProductNo() {
        return orderProductNo;
    }

    public void setOrderProductNo(Long orderProductNo) {
        this.orderProductNo = orderProductNo;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public MyOrder getMyOrder() {
        return myOrder;
    }

    public void setMyOrder(MyOrder myOrder) {
        this.myOrder = myOrder;
    }

    public Goods getGoods() {
        return goods;  // Goods 객체 반환
    }

    public void setGoods(Goods goods) {
<<<<<<< HEAD
        this.goods = goods;  
=======
        this.goods = goods;
        if (goods != null) {
            this.goodsNo = goods.getGoodsNo();  // goods 객체가 설정되면 goodsNo도 설정
        }
>>>>>>> 890930708a9370a37055c37bd8729e25ee7b4ee6
    }

    public Long getGoodsNo() {
        return goodsNo;
    }

    public void setGoodsNo(Long goodsNo) {
        this.goodsNo = goodsNo;
    }

    public String getGoodsImage() {
        if (goods != null) {
            return goods.getImagePath(); // 이미지 경로 반환
        }
        return null; // goods가 없으면 null 반환
    }

}
