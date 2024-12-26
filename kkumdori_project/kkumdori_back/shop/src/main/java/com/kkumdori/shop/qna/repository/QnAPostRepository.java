package com.kkumdori.shop.qna.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kkumdori.shop.qna.entity.QnAPost;

@Repository
public interface QnAPostRepository extends JpaRepository<QnAPost, Integer> {
}
