package com.kkumdori.shop.banner.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class BannerDto {
	private MultipartFile files;
	private String links;
	private int orders;
}
