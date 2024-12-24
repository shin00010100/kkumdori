package com.kkumdori.shop.goods.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kkumdori.shop.goods.entity.Goods;

public interface GoodsRepository extends JpaRepository<Goods, Long>{

}
