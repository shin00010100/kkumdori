package com.kkumdori.shop.banner.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "popup")
public class Popup {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "popup_id")
    private Long popupId;

    @Column(name = "image_path", nullable = false)
    private String imagePath;

    @Column(name = "link", nullable = true)
    private String link;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;
}