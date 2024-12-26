package com.kkumdori.shop.login.dto;

public class UserResponse {

    private Long userNo;  // 변수 이름도 카멜 케이싱으로 변경
    private String fullname;
    private String role;

    // 생성자
    public UserResponse(Long userNo, String fullname, String role) {
        this.userNo = userNo;
        this.fullname = fullname;
        this.role = role;
    }

    // Getter 및 Setter methods
    public Long getUserNo() {  // 카멜 케이싱 스타일로 수정
        return userNo;
    }

    public void setUserNo(Long userNo) {  // 카멜 케이싱 스타일로 수정
        this.userNo = userNo;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
