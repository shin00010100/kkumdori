package com.kkumdori.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kkumdori.shop.entity.Goods;

public interface GoodsRepository extends JpaRepository<Goods, Long>{

}
