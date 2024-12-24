package com.kkumdori.shop.notice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kkumdori.shop.notice.entity.NoticePost;

public interface NoticePostRepository extends JpaRepository<NoticePost, Integer> {
}
