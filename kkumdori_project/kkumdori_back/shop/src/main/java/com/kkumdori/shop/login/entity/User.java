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
<<<<<<< HEAD
	
	private static final long serialVersionUID = 1L;
=======
   
   private static final long serialVersionUID = 1L;
>>>>>>> b35fd52fcbbe863ef586de712053dbcc57237e12

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_no;

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

<<<<<<< HEAD
    @Column(length = 5) // CHAR(5)
=======
    @Column(name = "zipcode", columnDefinition = "CHAR(10)")
>>>>>>> b35fd52fcbbe863ef586de712053dbcc57237e12
    private String zipcode;

    @Column(length = 255) // VARCHAR(255)
    private String address;

<<<<<<< HEAD
    @Column(nullable = false, columnDefinition = "ENUM('user', 'admin') DEFAULT 'user'") // ENUM('user', 'admin') with default 'user'
    private String role;  // 권한

    @Column(nullable = false, unique = true, length = 15) // VARCHAR(15)
    private String tel;

    @Column(nullable = false, length = 64) // VARCHAR(64)
=======
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
>>>>>>> b35fd52fcbbe863ef586de712053dbcc57237e12
    private String fullname;

    // 기본 생성자
    public User() {
    }

    // Getter와 Setter
    public Long getUserno() {
        return user_no;
    }

    public void setUserno(Long user_no) {
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

<<<<<<< HEAD
    public String getRole() {
        return role;
    }

    public void setRole(String role) {
=======
    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
>>>>>>> b35fd52fcbbe863ef586de712053dbcc57237e12
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
        return user_no.equals(user.user_no);
    }

    @Override
    public int hashCode() {
        return user_no.hashCode();
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
<<<<<<< HEAD
=======
    
>>>>>>> b35fd52fcbbe863ef586de712053dbcc57237e12
}

