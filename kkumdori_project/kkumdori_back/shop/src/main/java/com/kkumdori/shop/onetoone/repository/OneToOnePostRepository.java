package com.kkumdori.shop.onetoone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kkumdori.shop.onetoone.entity.OneToOnePost;

@Repository
public interface OneToOnePostRepository extends JpaRepository<OneToOnePost, Integer> {
	List<OneToOnePost> findByUserNo(Long userNo);
}
