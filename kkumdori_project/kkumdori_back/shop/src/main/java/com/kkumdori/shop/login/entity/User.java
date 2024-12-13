package com.kkumdori.shop.login.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_no;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String bank;

    @Column(nullable = false)
    private String account;

    @Column(nullable = false)
    private String zipcode;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String role;  

    @Column(nullable = false, unique = true)
    private String tel;  

    @Column(nullable = false)
    private String fullname;  

    // 기본 생성자
    public User() {
    }

    // Getter와 Setter
    public Long getId() {
        return user_no;
    }

    public void setId(Long user_no) {
        this.user_no = user_no;
    }

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

    public String getRole() {
        return role;  
    }

    public void setRole(String role) {
        this.role = role;  
    }

    public String getTel() {
        return tel; 
    }

    public void setTel(String tel) {
        this.tel = tel; 
    }

    public String getFullname() {
        return fullname; 
    }

    public void setFullname(String fullname) {
        this.fullname = fullname; 
    }

    @Override
    public String toString() {
        return "User{" +
                "user_no=" + user_no +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", bank='" + bank + '\'' +
                ", account='" + account + '\'' +
                ", zipcode='" + zipcode + '\'' +
                ", address='" + address + '\'' +
                ", role='" + role + '\'' +  // 
                ", tel='" + tel + '\'' +  
                ", fullname='" + fullname + '\'' +  
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return user_no.equals(user.user_no);
    }

    @Override
    public int hashCode() {
        return user_no.hashCode();
    }
}
