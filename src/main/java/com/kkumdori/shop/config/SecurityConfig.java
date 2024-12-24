package com.kkumdori.shop.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // 허용할 출처를 환경에 맞게 설정
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // 허용할 출처
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // 허용할 HTTP 메서드
        configuration.setAllowCredentials(true); // 쿠키 전달을 허용할 경우
        configuration.setAllowedHeaders(Arrays.asList("*")); // 모든 헤더 허용

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // 모든 경로에 대해 CORS 설정 적용
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors() // CORS 설정 활성화
            .and()
            .csrf(csrf -> csrf.disable()) // CSRF 보호 비활성화
            .authorizeRequests(authorizeRequests -> 
                authorizeRequests
            		.requestMatchers("/notice/**").permitAll()
                	.requestMatchers("/onetoone/**").permitAll()
                    .requestMatchers("/qna/**").permitAll() // /qna/** 경로에 대해 모든 요청을 허용
                    .anyRequest().authenticated() // 그 외의 요청은 인증 필요
            )
            .formLogin().disable() // 폼 로그인 비활성화
            .httpBasic().disable() // HTTP Basic 인증 비활성화
            .exceptionHandling()
                .accessDeniedPage("/403"); // 403 에러 발생 시 처리

        return http.build();
    }
}
