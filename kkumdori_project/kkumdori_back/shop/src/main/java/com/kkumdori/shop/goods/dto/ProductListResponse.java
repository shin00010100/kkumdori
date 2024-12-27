package com.kkumdori.shop.goods.dto;

import java.util.List;

public class ProductListResponse {
    private long totalItems; // 총 데이터 개수
    private int totalPages;  // 총 페이지 수
    private List<GoodsDTO> products; // 상품 리스트

    // 생성자
    public ProductListResponse(long totalItems, int totalPages, List<GoodsDTO> products) {
        this.totalItems = totalItems;
        this.totalPages = totalPages;
        this.products = products;
    }

    // Getter/Setter
    public long getTotalItems() {
        return totalItems;
    }

    public void setTotalItems(long totalItems) {
        this.totalItems = totalItems;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public List<GoodsDTO> getProducts() {
        return products;
    }

    public void setProducts(List<GoodsDTO> products) {
        this.products = products;
    }
}
