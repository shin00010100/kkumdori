package com.kkumdori.shop.cart.entity;

import jakarta.persistence.*;
import com.kkumdori.shop.login.entity.User;
import com.kkumdori.shop.goods.entity.Goods;

@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_no")  // DB의 'cart_no' 컬럼과 매핑
    private Integer cartNo;  // 장바구니 ID (cart_no), 이제 Integer 타입

    @Column(nullable = false)
    private int quantity;  // 상품 수량 (quantity)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "goods_no")
    private Goods goods;  // 장바구니에 담긴 상품 (goods_no)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_no", nullable = false)
    private User user;  // 장바구니 소유자 (user_no)

    // 기본 생성자
    public Cart() {
    }

    // 생성자 (사용자, 상품, 수량을 입력받는 생성자)
    public Cart(User user, Goods goods, int quantity) {
        this.user = user;
        this.goods = goods;
        this.quantity = quantity;
    }

    // Getter and Setter 메서드
    public Integer getCartNo() {  // 반환 타입을 Integer로 변경
        return cartNo;
    }

    public void setCartNo(Integer cartNo) {  // 매개변수 타입을 Integer로 변경
        this.cartNo = cartNo;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Goods getGoods() {
        return goods;
    }

    public void setGoods(Goods goods) {
        this.goods = goods;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Cart{" +
                "cartNo=" + cartNo +
                ", quantity=" + quantity +
                ", goods=" + goods +
                ", user=" + user +
                '}';
    }
}
