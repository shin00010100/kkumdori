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
    private String imagePath;  // 상품 이미지 경로 (변경된 변수명)

    // 생성자
    public ReviewDto(String title, String content, BigDecimal starRank, MultipartFile file, Long authorNo, Long goodsNo, String imagePath) {
        this.title = title;
        this.content = content;
        this.starRank = starRank;
        this.file = file;
        this.authorNo = authorNo;
        this.goodsNo = goodsNo;
        this.imagePath = imagePath;
    }

    // Getter, Setter
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

    public BigDecimal getStarRank() {
        return starRank;
    }

    public void setStarRank(BigDecimal starRank) {
        this.starRank = starRank;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
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

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    @Override
    public String toString() {
        return "ReviewDto{" +
                "title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", starRank=" + starRank +
                ", file=" + file +
                ", authorNo=" + authorNo +
                ", goodsNo=" + goodsNo +
                ", imagePath='" + imagePath + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ReviewDto reviewDto = (ReviewDto) o;

        if (!title.equals(reviewDto.title)) return false;
        if (!content.equals(reviewDto.content)) return false;
        if (!starRank.equals(reviewDto.starRank)) return false;
        if (!authorNo.equals(reviewDto.authorNo)) return false;
        return goodsNo.equals(reviewDto.goodsNo);
    }

    @Override
    public int hashCode() {
        int result = title.hashCode();
        result = 31 * result + content.hashCode();
        result = 31 * result + starRank.hashCode();
        result = 31 * result + authorNo.hashCode();
        result = 31 * result + goodsNo.hashCode();
        return result;
    }
}