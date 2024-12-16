package com.kkumdori.shop.dto;

import java.util.Collection;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class JwtResponseDto {
	private String token;
    private String username;
    private Collection<?> roles;
}
