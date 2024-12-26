package com.kkumdori.shop.login.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@Entity
public class User implements UserDetails {
   
   private static final long serialVersionUID = 1L;


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userNo;

    @Column(nullable = false, unique = true, length = 64) // VARCHAR(64)
    private String username;

    @Column(nullable = false, length = 64) // VARCHAR(64)
    private String password;

    @Column(nullable = false, unique = true, length = 100) // VARCHAR(100)
    private String email;

    @Column(length = 32) // VARCHAR(32)
    private String bank;

    @Column(length = 20) // VARCHAR(20)
    private String account;


    @Column(name = "zipcode", columnDefinition = "CHAR(10)")
    private String zipcode;

    @Column(length = 255) // VARCHAR(255)
    private String address;


    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role; // Role은 Enum 타입
    
    public enum Role {
        admin,
        user
    }
    
    @Column(nullable = false, unique = true)
    private String tel;

    @Column(nullable = false)
    private String fullname;

    // 기본 생성자
    public User() {
    }

    // Getter와 Setter
    public Long getUserNo() {
        return userNo;
    }

    public void setUserno(Long userNo) {
        this.userNo = userNo;
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


    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
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
                "user_no=" + userNo +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", bank='" + bank + '\'' +
                ", account='" + account + '\'' +
                ", zipcode='" + zipcode + '\'' +
                ", address='" + address + '\'' +
                ", role='" + role + '\'' +
                ", tel='" + tel + '\'' +
                ", fullname='" + fullname + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return userNo.equals(user.userNo);
    }

    @Override
    public int hashCode() {
        return userNo.hashCode();
    }

    // UserDetails 메서드들

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // "ROLE_" 접두어를 붙여서 권한을 설정합니다.
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + this.role));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;  // 계정 만료 여부
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;  // 계정 잠금 여부
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;  // 자격 증명 만료 여부
    }

    @Override
    public boolean isEnabled() {
        return true;  // 계정 활성화 여부
    }

}

