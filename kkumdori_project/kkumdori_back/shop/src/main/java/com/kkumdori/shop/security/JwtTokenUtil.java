package com.kkumdori.shop.security;

import java.security.Key;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kkumdori.shop.login.entity.User;
import com.kkumdori.shop.login.entity.User.Role;
import com.kkumdori.shop.login.repository.UserRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
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
    
    
 // **7. 최근 본 상품 목록 가져오기**
    public List<String> extractRecentlyViewed(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        ObjectMapper objectMapper = new ObjectMapper();

        // "recently_viewed" 클레임을 안전하게 List<String>으로 변환
        List<String> recentlyViewed = objectMapper.convertValue(claims.get("recently_viewed"), new TypeReference<List<String>>() {});
        if (recentlyViewed == null) {
            recentlyViewed = new ArrayList<>();
        }

        return recentlyViewed;
    }

    // **8. 최근 본 상품 추가하기**
    public String addRecentlyViewedProductToToken(String token, String productId) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        ObjectMapper objectMapper = new ObjectMapper();

        // "recently_viewed" 클레임을 안전하게 List<String>으로 변환
        List<String> recentlyViewed = objectMapper.convertValue(claims.get("recently_viewed"), new TypeReference<List<String>>() {});
        if (recentlyViewed == null) {
            recentlyViewed = new ArrayList<>();
        }

        // 상품 ID 추가 (최대 5개로 제한)
        recentlyViewed.add(productId);
        if (recentlyViewed.size() > 5) {
            recentlyViewed.remove(0); // 5개 초과시 가장 오래된 상품 제거
        }

        // 클레임에 최근 본 상품 목록 저장
        claims.put("recently_viewed", recentlyViewed);

        // 갱신된 토큰 생성
        return Jwts.builder()
                .setClaims(claims)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
}

