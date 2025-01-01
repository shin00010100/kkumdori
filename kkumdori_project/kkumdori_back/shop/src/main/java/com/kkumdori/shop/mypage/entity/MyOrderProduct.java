package com.kkumdori.shop.mypage.entity;

import com.kkumdori.shop.goods.entity.Goods;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "order_product")  // 동일한 테이블 사용
public class MyOrderProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_product_no")  // 물리적 컬럼 이름을 명시적으로 지정
    private Long orderProductNo;  // 필드명은 'orderProductNo'로 그대로 사용

    @Column(name = "order_product_quantity")  // 동일한 컬럼명 사용
    private Integer quantity;

    @Column(name = "order_price")  // 동일한 컬럼명 사용
    private Integer price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_no", referencedColumnName = "orderNo", foreignKey = @ForeignKey(name = "FK_ORDER_MY_ORDER_ITEM"))
    private MyOrder myOrder;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "goods_no", referencedColumnName = "goods_no", foreignKey = @ForeignKey(name = "FK_GOODS_MY_ORDER_ITEM"))
    private Goods goods;

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
        return goods;
    }

    public void setGoods(Goods goods) {
        this.goods = goods;
    }
}

