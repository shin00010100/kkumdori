package com.kkumdori.shop.goods.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.kkumdori.shop.category.entity.Category;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Goods {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "goods_no", columnDefinition = "BIGINT")
    private Long goodsNo;

    @Column(name = "goods_name", columnDefinition = "VARCHAR(255)")
    private String goodsName;

    @Column(name = "goods_price", columnDefinition = "DOUBLE")
    private double price;

    @Column(name = "goods_description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "goods_image", columnDefinition = "VARCHAR(255)")
    private String imagePath;

    @Column(name = "goods_discount", columnDefinition = "DECIMAL(5,2)", nullable = true)
    private Double discount;

    @Column(name = "star_rank", columnDefinition = "DECIMAL(3,2)", nullable = true)
    private Double starRank;

    @Column(name = "goods_stock", columnDefinition = "INT")
    private int stock;

    @ManyToOne
    @JoinColumn(name = "category_no", columnDefinition = "BIGINT")
    private Category category;
}