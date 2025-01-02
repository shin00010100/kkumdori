package com.kkumdori.shop.banner.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "banner")
public class Banner {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "banner_id")
    private Long bannerId;

    @Column(name = "image_path", nullable = false)
    private String imagePath;

    @Column(name = "link", nullable = true)
    private String link;

    @Column(name = "display_order", nullable = true)
    private Integer displayOrder;
}