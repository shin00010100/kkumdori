package com.kkumdori.shop.mypage.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewNo;  // auto_increment

    private String title;
    private String content;
    
    
    
    @Column(nullable = true)
    private String image;  // 이미지 경로 (선택 사항)

    @Column(name = "created_time", nullable = true)
    private LocalDateTime createdTime;  // 리뷰 작성 시간

    @Column(name = "star_rank")
    private BigDecimal starRank;  // 별점

    @Column(name = "author_no")
    private Long authorNo;  // 작성자 번호

    @Column(name = "goods_no", nullable = true)
    private Long goodsNo;  // 상품 번호 (선택 사항)

    public Long getReviewNo() {
        return reviewNo;
    }

    public void setReviewNo(Long reviewNo) {
        this.reviewNo = reviewNo;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public LocalDateTime getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }

    public BigDecimal getStarRank() {
        return starRank;
    }

    public void setStarRank(BigDecimal starRank) {
        this.starRank = starRank;
    }

    public Long getAuthorNo() {
        return authorNo;
    }

    public void setAuthorNo(Long authorNo) {
        this.authorNo = authorNo;
    }

    public Long getGoodsNo() {
        return goodsNo;
    }

    public void setGoodsNo(Long goodsNo) {
        this.goodsNo = goodsNo;
    }
}