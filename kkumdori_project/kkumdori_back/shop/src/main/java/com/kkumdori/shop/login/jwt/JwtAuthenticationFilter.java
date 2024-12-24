package com.kkumdori.shop.login.jwt;

import java.io.IOException;
import java.util.Optional;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.kkumdori.shop.login.entity.User;
import com.kkumdori.shop.login.repository.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenUtil jwtTokenUtil;
    private final UserRepository userRepository;

    public JwtAuthenticationFilter(JwtTokenUtil jwtTokenUtil, UserRepository userRepository) {
        this.jwtTokenUtil = jwtTokenUtil;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        
        // Authorization 헤더에서 "Bearer " 부분만 추출
        String token = request.getHeader("Authorization");
        
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);  // "Bearer " 부분 제거
            
            // JWT 토큰 검증 및 사용자 정보 조회
            Optional<User> userOptional = jwtTokenUtil.verifyToken(token, userRepository);
            
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                
                // 인증 토큰 생성 후 SecurityContext에 저장
                // 권한이 포함된 인증 객체 생성 (getAuthorities()는 UserDetails에 포함되어야 함)
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        user.getUsername(), null, user.getAuthorities());  // getAuthorities() 필요
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        
        // 필터 체인 계속 진행
        chain.doFilter(request, response);
    }
}