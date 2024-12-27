package com.kkumdori.shop.mypage.dto;

import java.math.BigDecimal;

import org.springframework.web.multipart.MultipartFile;

public class ReviewDto {

    private String title;
    private String content;
    private BigDecimal starRank;
    private MultipartFile file;  // 파일 (이미지)
    private Long authorNo;
    private Long goodsNo;

    // 생성자
    public ReviewDto(String title, String content, BigDecimal starRank, MultipartFile file, Long authorNo, Long goodsNo) {
        this.title = title;
        this.content = content;
        this.starRank = starRank;
        this.file = file;
        this.authorNo = authorNo;
        this.goodsNo = goodsNo;
    }

    // Getter, Setter
    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public BigDecimal getStarRank() {
        return starRank;
    }

    public MultipartFile getFile() {
        return file;
    }

    public Long getAuthorNo() {
        return authorNo;
    }

    public Long getGoodsNo() {
        return goodsNo;
    }
}

