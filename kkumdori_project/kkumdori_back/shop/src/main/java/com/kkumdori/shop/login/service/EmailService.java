package com.kkumdori.shop.login.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kkumdori.shop.login.repository.UserRepository;

import jakarta.activation.DataSource;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.util.ByteArrayDataSource;

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
    
    // 파일 첨부 이메일 전송 메서드
    public void sendEmailWithAttachment(String toEmail, String subject, String content, MultipartFile attachment) throws MessagingException, IOException {
        // 유저가 '모두'를 선택했을 경우, 모든 유저의 이메일을 가져옴
        if ("모두".equals(toEmail)) {
            List<String> allUserEmails = userRepository.findAllEmails(); // 모든 이메일 리스트를 가져옴

            for (String email : allUserEmails) {
                sendEmailToUser(email, subject, content, attachment);
            }
        } else {
            // 특정 이메일로 전송
            sendEmailToUser(toEmail, subject, content, attachment);
        }
    }

    private void sendEmailToUser(String toEmail, String subject, String content, MultipartFile attachment) throws MessagingException, IOException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);  // true for multipart (첨부파일 포함)

        helper.setFrom(fromEmail);
        helper.setTo(toEmail);
        helper.setSubject("[꿈돌이 쇼핑몰] "+subject);
        helper.setText(content, true); // HTML 형식으로 본문 처리

        // 첨부파일 추가
        if (attachment != null && !attachment.isEmpty()) {
            DataSource dataSource = new ByteArrayDataSource(attachment.getBytes(), attachment.getContentType());
            helper.addAttachment(attachment.getOriginalFilename(), dataSource);
        }

        mailSender.send(message);
        System.out.println("이메일 전송 완료: " + toEmail);
    }
}
