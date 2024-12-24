package com.kkumdori.shop.notice.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notice") // 테이블 이름 매핑
public class NoticePost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notice_no") // 테이블의 notice_no와 매핑
    private Integer noticeNo;

    @Column(nullable = false, length = 255) // 제목의 길이를 255로 변경
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(name = "created_time")
    private LocalDateTime createdTime; // 생성 시간

    @Column(name = "author", nullable = false) // author는 사용자 번호 (FK)
    private Long author; // 사용자 번호를 Long 타입으로 처리

    // Getters and Setters
    public Integer getNoticeNo() {
        return noticeNo;
    }

    public void setNoticeNo(Integer noticeNo) {
        this.noticeNo = noticeNo;
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

    public LocalDateTime getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }

    public Long getAuthor() {
        return author;
    }

    public void setAuthor(Long author) {
        this.author = author;
    }
}
