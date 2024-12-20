package com.kkumdori.shop.login.service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

@Service
public class VerificationService {

    private Map<String, String> verificationCodes = new ConcurrentHashMap<>();

    public void saveCode(String tel, String code) {
    	System.out.println("전화번호: " + tel + ", 인증번호: " + code); // 로그 추가
        verificationCodes.put(tel, code);
        System.out.println("저장된 인증번호 맵 상태: " + verificationCodes); // 맵 상태 출력
    }

    public boolean verifyCode(String tel, String code) {
        String storedCode = verificationCodes.get(tel); // 전화번호에 해당하는 인증번호를 가져옵니다.
        System.out.println("저장된 인증번호: " + storedCode + ", 입력된 인증번호: " + code); // 로그 추가
        
        // 저장된 인증번호와 입력된 인증번호가 일치하는지 확인
        return storedCode != null && storedCode.equals(code);
    }

}