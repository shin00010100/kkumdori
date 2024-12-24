package com.kkumdori.shop.security;

import java.security.Key;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.kkumdori.shop.login.entity.User;
import com.kkumdori.shop.login.entity.User.Role;
import com.kkumdori.shop.login.repository.UserRepository;

import io.jsonwebtoken.*;

import io.jsonwebtoken.security.Keys;

@Component
public class JwtTokenUtil {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long expirationTime;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    // **1. 토큰 생성** - 사용자 이름과 역할 포함
    public String generateToken(String username, Role role) {
        return Jwts.builder()
                .setSubject(username) // 사용자 이름
                .claim("role", role) // 사용자 역할
                .setIssuedAt(new Date()) // 토큰 발행 시간
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime)) // 토큰 만료 시간
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) // 서명
                .compact();
    }

    // **2. 토큰에서 사용자 이름 추출**
    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // **3. 토큰에서 역할(Role) 추출**
    public String extractRole(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("role", String.class);
    }

    // **4. 토큰 만료 시간 확인**
    public boolean isTokenExpired(String token) {
        Date expiration = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expiration.before(new Date());
    }

    // **5. 토큰 유효성 검증**
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    // **6. 토큰 검증 및 사용자 조회**
    public Optional<User> verifyToken(String token, UserRepository userRepository) {
        try {
            String username = extractUsername(token);
            return userRepository.findByUsername(username);
        } catch (Exception e) {
            System.err.println("Token verification failed: " + e.getMessage());
            return Optional.empty();
        }
    }
}