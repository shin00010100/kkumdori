package com.kkumdori.shop.order.entity;

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

@Entity
public class OrderProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_product_no")  // 물리적 컬럼 이름을 명시적으로 지정
    private Long orderProductNo;

    @Column(name = "order_product_quantity")
    private Integer orderProductQuantity;

    @Column(name = "order_price")
    private Integer orderPrice;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "order_no", referencedColumnName = "orderNo", foreignKey = @ForeignKey(name = "FK_ORDER_ORDER_ITEM"))
    private Order order;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "goods_no", referencedColumnName = "goods_no", foreignKey = @ForeignKey(name = "FK_GOODS_ORDER_ITEM"))
    private Goods goods;

    // Getters and Setters
    public Long getOrderProductNo() {
        return orderProductNo;
    }

    public void setOrderProductNo(Long orderProductNo) {
        this.orderProductNo = orderProductNo;
    }

    public Integer getOrderProductQuantity() {
        return orderProductQuantity;
    }

    public void setOrderProductQuantity(Integer orderProductQuantity) {
        this.orderProductQuantity = orderProductQuantity;
    }

    public Integer getOrderPrice() {
        return orderPrice;
    }

    public void setOrderPrice(Integer orderPrice) {
        this.orderPrice = orderPrice;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Goods getGoods() {
        return goods;
    }

    public void setGoods(Goods goods) {
        this.goods = goods;
    }

    @Override
    public String toString() {
        return "OrderProduct{" +
                "orderProductNo=" + orderProductNo +
                ", orderProductQuantity=" + orderProductQuantity +
                ", orderPrice=" + orderPrice +
                ", order=" + (order != null ? order.getOrderNo() : "null") +
                ", goods=" + (goods != null ? goods.getGoodsNo() : "null") +
                '}';
    }
}

