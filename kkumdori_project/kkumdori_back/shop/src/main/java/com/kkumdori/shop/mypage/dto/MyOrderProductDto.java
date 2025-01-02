package com.kkumdori.shop.mypage.dto;

public class MyOrderProductDto {
    private String productName;
    private Integer quantity;
    private Integer price;
    private String imagePath;
    private Long goodsNo;  // 상품 고유 번호를 Long으로 변경

    // Getters and Setters
    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
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

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public Long getGoodsNo() {
        return goodsNo;  // 상품 고유 번호를 가져오는 메소드
    }

    public void setGoodsNo(Long goodsNo) {  // Long 타입으로 수정
        this.goodsNo = goodsNo;  // 상품 고유 번호를 설정하는 메소드
    }
}

