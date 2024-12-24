package com.kkumdori.shop.login.dto;

public class UserResponse {

    private Long user_no; 
    private String fullname;
    private String role;

    public UserResponse(Long user_no, String fullname, String role) {
        this.user_no = user_no;
        this.fullname = fullname;
        this.role = role;
    }

    public Long getUserno() {
        return user_no;
    }

    public void setUserno(Long user_no) {
        this.user_no = user_no;
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

