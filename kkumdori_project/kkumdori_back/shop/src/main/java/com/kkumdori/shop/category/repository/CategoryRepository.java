package com.kkumdori.shop.category.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kkumdori.shop.category.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
