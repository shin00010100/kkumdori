package com.kkumdori.shop.login.request;

public class PhoneVerificationRequest {
    private String username;  // 사용자 아이디
    private String fullname;  // 사용자 이름
    private String tel;       // 사용자 전화번호
    private String code;      // 인증번호 (추후 검증용)

    // Getter와 Setter
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
