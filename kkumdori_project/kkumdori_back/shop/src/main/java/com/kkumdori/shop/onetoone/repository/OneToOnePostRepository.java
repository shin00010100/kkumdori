package com.kkumdori.shop.onetoone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kkumdori.shop.onetoone.entity.OneToOnePost;

@Repository
public interface OneToOnePostRepository extends JpaRepository<OneToOnePost, Integer> {
}
