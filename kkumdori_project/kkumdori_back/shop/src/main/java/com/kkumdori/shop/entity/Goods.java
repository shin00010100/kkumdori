package com.kkumdori.shop.entity;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "goods")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Goods {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long goodsNo;

    @Column(nullable = false, length = 255)
    private String goodsName;

    @Column(nullable = false)
    private Double goodsPrice;

    @Column(length = 255)
    private String goodsImage;

    @Column(columnDefinition = "TEXT")
    private String goodsDescription;

    @Column(nullable = false)
    private Integer goodsStock;

    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal goodsDiscount;

    @Column(name = "category_no")
    private Long categoryNo;
}
