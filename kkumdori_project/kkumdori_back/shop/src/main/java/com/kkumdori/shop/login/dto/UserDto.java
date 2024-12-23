package com.kkumdori.shop.login.dto;

public class UserDto {

    private String username;
    private String password;
    private String email;  
    private String bank;
    private String account;
    private String zipcode;
    private String address;
    private String tel;         
    private String fullname;   

    // Getter와 Setter
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getBank() {
        return bank;
    }

    public void setBank(String bank) {
        this.bank = bank;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTel() {
        return tel;  // 전화번호 필드의 getter
    }

    public void setTel(String tel) {
        this.tel = tel;  // 전화번호 필드의 setter
    }

    public String getFullname() {
        return fullname;  // 이름 필드의 getter
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;  // 이름 필드의 setter
    }

    @Override
    public String toString() {
        return "UserDto{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", bank='" + bank + '\'' +
                ", account='" + account + '\'' +
                ", zipcode='" + zipcode + '\'' +
                ", address='" + address + '\'' +
                ", tel='" + tel + '\'' +  // 전화번호 필드 추가
                ", fullname='" + fullname + '\'' +  // 이름 필드 추가
                '}';
    }
}
