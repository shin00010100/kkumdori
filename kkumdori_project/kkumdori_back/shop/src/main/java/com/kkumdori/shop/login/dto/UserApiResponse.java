package com.kkumdori.shop.login.dto;

public class UserApiResponse {
    private boolean success;
    private String message;
    private String verificationCode; // 인증번호 필드 추가

    // 생성자 및 getter, setter
    public UserApiResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public UserApiResponse(boolean success, String message, String verificationCode) {
        this.success = success;
        this.message = message;
        this.verificationCode = verificationCode;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }
}