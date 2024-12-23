package com.kkumdori.shop.login.request;

public class PasswordResetRequest {
    private String token; // 비밀번호 재설정 토큰
    private String newPassword; // 새 비밀번호

    // 기본 생성자
    public PasswordResetRequest() {}

    // getter 및 setter
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
