package com.kkumdori.shop.login.service;


public class SmsService {

    // Twilio 계정 SID와 인증 토큰을 환경 변수나 설정 파일에서 불러옵니다.

    public SmsService() {
    }

    // 인증번호를 SMS로 발송
    public void sendSms(String toPhoneNumber, String verificationCode) {
        try {

                    
            System.out.println("SMS sent to " + toPhoneNumber);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
