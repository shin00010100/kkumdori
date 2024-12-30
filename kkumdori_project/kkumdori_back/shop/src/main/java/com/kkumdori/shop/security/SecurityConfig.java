package com.kkumdori.shop.security;


import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    
    // 생성자 주입
    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter, JwtTokenUtil jwtTokenUtil) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/api/auth/login",
                    "/api/auth/signup",
                    "/api/auth/check-username",
                    "/api/auth/check-email",
                    "/api/auth/check-tel",
                    "/api/auth/SignEmailVerificationCode",
                    "/api/auth/SignPhoneVerificationCode",
                    "/api/auth/IDsendPhoneVerificationCode",
                    "/api/auth/IDCheckPhoneVerificationCode",
                    "/api/auth/IDsendEmailVerificationCode",
                    "/api/auth/IDcheckEmailVerificationCode",
                    "/api/auth/PWsendPhoneVerificationCode",
                    "/api/auth/PWsendEmailVerificationCode",
                    "/api/auth/resetToken",
                    "/api/auth/login/kakao",
                    "/api/auth/login/naver",
                    "/api/auth/login/google",
                    "/api/auth/getuser",
                    "api/wishlist/**",
                    "/api/images/**", // 이미지 경로 허용 추가,
                    "/qna/**",
                    "/onetoone/**",
                    "/notice/**",
                    "/api/goods/goodslist",
                    "/api/goods/goodsDetail/**",
                    "/api/auth/resetPassword"
                    
                ).permitAll()
                .requestMatchers("/api/goods/{goodsId}" ).authenticated()
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .headers(headers -> headers
                .addHeaderWriter((request, response) -> {
                    response.setHeader("Content-Security-Policy", 
                        "default-src 'self'; " +
                        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://www.gstatic.com https://www.googleapis.com; " +  // Google 스크립트 허용 추가
                        "style-src 'self'; " +
                        "img-src 'self' data:; " +
                        "font-src 'self'; " +
                        "object-src 'none'; " +
                        "frame-ancestors 'self' https://accounts.google.com; " + // Google 로그인 iframe 허용
                        "connect-src 'self' https://accounts.google.com https://www.googleapis.com;" // Google API와의 연결을 허용
                    );
                })
            ); // CSP 설정
        
        return http.build();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}