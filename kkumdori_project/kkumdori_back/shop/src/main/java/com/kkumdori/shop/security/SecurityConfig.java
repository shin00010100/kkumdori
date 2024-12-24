package com.kkumdori.shop.security;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

//import com.kkumdori.shop.security.JwtAuthenticationFilter;
//import com.kkumdori.shop.security.JwtTokenUtil;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

	 private final JwtAuthenticationFilter jwtAuthenticationFilter;
	    
	    // 생성자 주입
	    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter, JwtTokenUtil jwtTokenUtil) {
	        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
	    }

    // 비밀번호 암호화 설정
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // CORS 설정
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

    // JWT 필터 추가
//    @Bean
//    public JwtAuthenticationFilter jwtAuthenticationFilter() {
//        return new JwtAuthenticationFilter(jwtTokenUtil);
//    }

    // HTTP 보안 설정
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // CSRF 비활성화
            .cors(cors -> cors.configurationSource(corsConfigurationSource())) // CORS 설정
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/api/auth/login", 
                    "/api/auth/signup", 
                    "/api/auth/check-username", 
                    "/api/auth/check-email",
                    "/api/auth/check-tel",
                    "/api/auth/IDsendPhoneVerificationCode", 
                    "/api/auth/IDCheckPhoneVerificationCode", 
                    "/api/auth/IDsendEmailVerificationCode",
                    "/api/auth/IDcheckEmailVerificationCode", 
                    "/api/auth/PWsendPhoneVerificationCode", 
                    "/api/auth/PWsendEmailVerificationCode",
                    "/api/auth/resetPassword", 
                    "/api/auth/resetToken",
                    "/api/images/**" // 이미지 경로 허용 추가
                ).permitAll() // 로그인, 회원가입, 비밀번호 재설정은 모두 허용
                .requestMatchers("/api/goods/{goodsId}").authenticated()
                .anyRequest().authenticated() // 나머지 요청은 인증 필요
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class) // 필터 등록
            .cors(cors -> cors.configurationSource(corsConfigurationSource()));

        return http.build();
    }

    // AuthenticationManager 설정
    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}