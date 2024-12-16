package com.kkumdori.shop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kkumdori.shop.entity.Goods;
import com.kkumdori.shop.repository.GoodsRepository;

@Service
public class GoodsService {

    @Autowired
    private GoodsRepository goodsRepository;

    public Goods saveGoods(Goods goods) {
        return goodsRepository.save(goods);
    }

    public List<Goods> getAllGoods() {
        return goodsRepository.findAll();
    }

    public Goods getGoodsById(Long id) {
        return goodsRepository.findById(id).orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다."));
    }

    public void deleteGoods(Long id) {
        goodsRepository.deleteById(id);
    }
}
