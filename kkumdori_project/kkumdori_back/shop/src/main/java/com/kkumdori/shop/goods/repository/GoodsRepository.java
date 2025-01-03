package com.kkumdori.shop.goods.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kkumdori.shop.goods.entity.Goods;

@Repository
public interface GoodsRepository extends JpaRepository<Goods, Long>{
	
	// 상품명에 검색어가 포함된 상품 목록을 페이지네이션과 함께 가져오기
    Page<Goods> findByGoodsNameContaining(String query, Pageable pageable);
    
    // 상품 번호로 상품 조회
    Goods findByGoodsNo(Long goodsNo);  // 추가된 부분: goods_no로 조회
    
    // 카테고리에 맞춰 상품리스트 조회
    Page<Goods> findByCategory_CategoryNoAndGoodsNameContaining(Long categoryNo, String goodsName, Pageable pageable);
}
