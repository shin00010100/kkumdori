package com.kkumdori.shop.login.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.kkumdori.shop.login.repository.UserRepository;

@Service
public class EmailService {
	
	@Autowired
    private UserRepository userRepository;

    @Value("${spring.mail.username}")
    private String fromEmail;

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }
    
    // 이메일 존재 여부 체크
    public boolean isEmailRegistered(String email) {
        // 이메일로 사용자 검색 후 존재 여부 확인
        return userRepository.findByEmail(email).isPresent();
    }
    
 // 인증번호 전송 메서드
    public void sendVerificationCode(String toEmail, String code) throws Exception {
        try {
            // 이메일 전송 객체 설정
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);  // 발신자 이메일
            message.setTo(toEmail);      // 수신자 이메일
            message.setSubject("[꿈돌이 쇼핑몰] 인증번호");  // 이메일 제목
            message.setText("[꿈돌이 쇼핑몰] 인증번호: " + code);  // 이메일 내용

            // 이메일 전송
            mailSender.send(message);
            System.out.println("이메일 인증번호 전송 완료: " + toEmail);  // 이메일 전송 후 로그 추가
        } catch (Exception e) {
            // 예외 발생 시 로깅 후 예외 던지기
            System.err.println("이메일 전송 실패: " + e.getMessage());
            e.printStackTrace();
            throw new Exception("메일 전송에 실패했습니다. 오류: " + e.getMessage(), e);  // 상세 오류 메시지 던지기
        } 
    }
}
