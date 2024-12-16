package com.kkumdori.shop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.kkumdori.shop.security.JwtTokenUtil;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping("/login")
    public JwtResponse login(@RequestBody LoginRequest loginRequest) {
        // 사용자 인증
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        // JWT 생성
        String jwt = jwtTokenUtil.generateToken(authentication);

        // 사용자 정보
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        return new JwtResponse(jwt, userDetails.getUsername(), userDetails.getAuthorities());
    }
}
