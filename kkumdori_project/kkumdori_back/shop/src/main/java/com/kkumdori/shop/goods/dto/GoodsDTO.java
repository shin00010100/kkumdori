package com.kkumdori.shop.goods.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import com.kkumdori.shop.goods.entity.Goods;

@Getter
@Setter
public class GoodsDTO {
    private Long goodsNo; // 상품 고유 번호 추가
    private String goodsName; // 상품명
    private Long categoryNo;  // 카테고리 번호
    private double price;     // 가격
    private int stock;        // 재고 수량
    private String description; // 설명
    private double discount; // 할인율
    private double starRank; // 별점
    private MultipartFile image; // 업로드된 이미지 파일
    private String imagePath;    // 기존 이미지 경로 (클라이언트로 반환 시 사용)

    // 기본 생성자
    public GoodsDTO() {}

    // Goods 객체를 매개변수로 받는 생성자
    public GoodsDTO(Goods goods) {
        this.goodsNo = goods.getGoodsNo(); // goodsNo 필드 추가
        this.goodsName = goods.getGoodsName();
        this.categoryNo = goods.getCategory() != null ? goods.getCategory().getCategoryNo() : null;
        this.price = goods.getPrice();
        this.stock = goods.getStock();
        this.description = goods.getDescription();
        this.discount = goods.getDiscount();
        this.starRank = goods.getStarRank();
        this.imagePath = goods.getImagePath();
    }
}
