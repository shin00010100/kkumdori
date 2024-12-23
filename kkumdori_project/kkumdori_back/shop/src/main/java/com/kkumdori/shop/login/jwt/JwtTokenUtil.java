package com.kkumdori.shop.login.jwt;

import java.security.Key;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.kkumdori.shop.login.entity.User;
import com.kkumdori.shop.login.repository.UserRepository;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.ExpiredJwtException;

@Component
public class JwtTokenUtil {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long expirationTime; 

    // SecretKey 생성 (HMAC-SHA 알고리즘)
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    // JWT 토큰 생성 (사용자 이름과 역할을 포함)
    public String generateToken(String fullname, String role) {
        String token = Jwts.builder()
                .setSubject(fullname) // 사용자 이름 (subject)
                .claim("role", role) // 사용자 역할 (role)
                .setIssuedAt(new Date()) // 토큰 발행 시간
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime)) // 토큰 만료 시간
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) // 서명 생성
                .compact(); // JWT 토큰 반환
        
        System.out.println("Generated Token: " + token);
        return token;
    }

    // JWT 토큰에서 사용자 이름(Subject) 추출
    public String extractUsername(String token) {
        try {
            String username = Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
            System.out.println("Extracted Username: " + username);
            return username;
        } catch (Exception e) {
            System.err.println("Error extracting username: " + e.getMessage());
            return null;
        }
    }

    // JWT 토큰에서 역할(role) 추출
    public String extractRole(String token) {
        try {
            String role = Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .get("role", String.class);
            System.out.println("Extracted Role: " + role);
            return role;
        } catch (Exception e) {
            System.err.println("Error extracting role: " + e.getMessage());
            return null;
        }
    }

    // JWT 토큰에서 만료 시간 추출
    private Date extractExpiration(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
    }

    // JWT 토큰의 만료 여부를 확인하는 메서드
    public boolean isTokenExpired(String token) {
        try {
            boolean expired = extractExpiration(token).before(new Date());
            System.out.println("Token Expired: " + expired);
            return expired;
        } catch (Exception e) {
            System.err.println("Error checking token expiration: " + e.getMessage());
            return true;
        }
    }

    // JWT 토큰 유효성 검증
    public boolean validateToken(String token, UserDetails userDetails, String requiredRole) {
        final String username = extractUsername(token);
        boolean isValid = username != null && username.equals(userDetails.getUsername()) && !isTokenExpired(token);
        
        // 역할 검증 추가
        if (isValid && requiredRole != null) {
            String tokenRole = extractRole(token);
            isValid = requiredRole.equals(tokenRole);
        }

        System.out.println("Token Valid: " + isValid);
        return isValid;
    }

    // 토큰 검증 및 사용자 정보 조회
    public Optional<User> verifyToken(String token, UserRepository userRepository) {
        try {
            // JWT에서 사용자 이름 추출
            String username = extractUsername(token);
            
            // DB에서 사용자 조회
            Optional<User> userOptional = userRepository.findByUsername(username);
            
            // DB 조회 결과 확인
            if (userOptional.isEmpty()) {
                System.err.println("User not found in DB: " + username);  // 디버깅: DB에서 사용자 못 찾은 경우
            } else {
                System.out.println("User found in DB: " + userOptional.get().getUsername());  // 사용자 찾았을 때 로그
            }
            
            return userOptional;
        } catch (ExpiredJwtException e) {
            System.err.println("Token has expired: " + e.getMessage());
            return Optional.empty();
        } catch (Exception e) {
            System.err.println("Error verifying token: " + e.getMessage());
            return Optional.empty();
        }
    }
}
