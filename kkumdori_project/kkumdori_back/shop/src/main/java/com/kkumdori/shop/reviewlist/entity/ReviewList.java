package com.kkumdori.shop.reviewlist.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "review")
public class ReviewList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewNo;  // 리뷰 번호

    @Column(nullable = false)
    private String title;  // 리뷰 제목

    @Column(nullable = false)
    private String content;  // 리뷰 내용

    private String image;  // 리뷰 이미지

    @Column(name = "star_rank", nullable = false)
    private Double starRank;  // 별점 (1~5)

    @Column(name = "author_no", nullable = false)
    private Long authorNo;  // 작성자 번호

    @Column(name = "goods_no", nullable = false)
    private Long goodsNo;  // 상품 번호

    // Getter and Setter methods

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

    public Double getStarRank() {
        return starRank;
    }

    public void setStarRank(Double starRank) {
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

    @Override
    public String toString() {
        return "ReviewList{" +
                "reviewNo=" + reviewNo +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", image='" + image + '\'' +
                ", starRank=" + starRank +
                ", authorNo=" + authorNo +
                ", goodsNo=" + goodsNo +
                '}';
    }
}
