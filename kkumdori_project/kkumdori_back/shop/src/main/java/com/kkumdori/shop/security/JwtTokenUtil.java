package com.kkumdori.shop.security;

import io.jsonwebtoken.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenUtil {
	private final String jwtSecret = "yourSecretKey"; // JWT 서명에 사용할 키 (보안을 위해 환경변수로 관리 권장)
    private final long jwtExpirationMs = 86400000; // 1일 (토큰 유효기간)

    // 토큰 생성
    public String generateToken(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return Jwts.builder()
                .setSubject(userDetails.getUsername()) // 사용자 이름 설정
                .setIssuedAt(new Date()) // 생성일
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs)) // 만료일
                .signWith(SignatureAlgorithm.HS512, jwtSecret) // 서명
                .compact();
    }

    // 토큰에서 사용자 이름 추출
    public String getUsernameFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // 토큰 유효성 확인
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    // 토큰 만료 확인
    private boolean isTokenExpired(String token) {
        Date expiration = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expiration.before(new Date());
    }
}