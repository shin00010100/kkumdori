package com.kkumdori.shop.login.request;

public class EmailVerificationRequest {

    private String email;
    private String username;  // 사용자 이름 추가
    private String verificationCode;

    // 기본 생성자
    public EmailVerificationRequest() {
    }

    // Getter, Setter
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    // toString 메서드 (디버깅 용)
    @Override
    public String toString() {
        return "EmailVerificationRequest [email=" + email + ", username=" + username + ", verificationCode=" + verificationCode + "]";
    }
}
