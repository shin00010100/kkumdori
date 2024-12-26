package com.kkumdori.shop.onetoone.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "onetoone") // 테이블 이름 매핑
public class OneToOnePost {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "onetoone_no")
    private Long onetooneNo;

    @Column(nullable = false, length = 45) // VARCHAR(45)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(columnDefinition = "TEXT")
    private String answer; // 답변 (NULL 가능)

    @Column(name = "created_time")
    private LocalDateTime createdTime; // 생성 시간

    @Column(name = "answer_time")
    private LocalDateTime answerTime; // 답변 시간 (NULL 가능)

    @Column(name = "is_answered", nullable = false)
    private Boolean isAnswered = false; // 기본값 false

    @Column(name = "user_no", nullable = false)
    private Long userNo; // 사용자 번호 (FK)

    @Column(name = "admin_no")
    private Long adminNo; // 관리자 번호 (FK, NULL 가능)

    // Getters and Setters
    public Long getOnetooneNo() {
        return onetooneNo;
    }

    public void setOnetooneNo(Long onetooneNo) {
        this.onetooneNo = onetooneNo;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public LocalDateTime getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }

    public LocalDateTime getAnswerTime() {
        return answerTime;
    }

    public void setAnswerTime(LocalDateTime answerTime) {
        this.answerTime = answerTime;
    }

    public Boolean getIsAnswered() {
        return isAnswered;
    }

    public void setIsAnswered(Boolean isAnswered) {
        this.isAnswered = isAnswered;
    }

    public Long getUserNo() {
        return userNo;
    }

    public void setUserNo(Long userNo) {
        this.userNo = userNo;
    }

    public Long getAdminNo() {
        return adminNo;
    }

    public void setAdminNo(Long adminNo) {
        this.adminNo = adminNo;
    }
}
