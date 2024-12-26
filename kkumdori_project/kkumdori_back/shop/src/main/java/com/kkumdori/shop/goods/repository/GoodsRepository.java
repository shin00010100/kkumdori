package com.kkumdori.shop.goods.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kkumdori.shop.goods.entity.Goods;

@Repository
public interface GoodsRepository extends JpaRepository<Goods, Long>{

}
