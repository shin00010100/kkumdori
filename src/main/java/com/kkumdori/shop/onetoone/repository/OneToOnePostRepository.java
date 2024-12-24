package com.kkumdori.shop.onetoone.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kkumdori.shop.onetoone.entity.OneToOnePost;

public interface OneToOnePostRepository extends JpaRepository<OneToOnePost, Integer> {
}
