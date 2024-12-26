package com.kkumdori.shop.notice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kkumdori.shop.notice.entity.NoticePost;

@Repository
public interface NoticePostRepository extends JpaRepository<NoticePost, Integer> {
}
