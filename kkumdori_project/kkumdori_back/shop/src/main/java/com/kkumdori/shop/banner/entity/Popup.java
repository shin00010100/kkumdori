package com.kkumdori.shop.banner.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Popup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long popupId;

    @Column(nullable = false)
    private String imagePath;

    private String link;

    @Column(nullable = false)
    private boolean isActive;
}