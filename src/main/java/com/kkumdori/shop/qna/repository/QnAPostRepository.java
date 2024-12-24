package com.kkumdori.shop.qna.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kkumdori.shop.qna.entity.QnAPost;

public interface QnAPostRepository extends JpaRepository<QnAPost, Integer> {
}
