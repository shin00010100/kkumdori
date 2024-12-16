package com.kkumdori.shop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.kkumdori.shop.entity.Goods;
import com.kkumdori.shop.service.GoodsService;

@RestController
@RequestMapping("/api/goods")
public class GoodsController {

    @Autowired
    private GoodsService goodsService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')") // 관리자 권한만 허용
    public ResponseEntity<Goods> createGoods(
            @RequestParam("goodsName") String goodsName,
            @RequestParam("categoryNo") Long categoryNo,
            @RequestParam("goodsPrice") Double goodsPrice,
            @RequestParam("goodsStock") Integer goodsStock,
            @RequestParam("goodsDescription") String goodsDescription,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        Goods goods = Goods.builder()
                .goodsName(goodsName)
                .categoryNo(categoryNo)
                .goodsPrice(goodsPrice)
                .goodsStock(goodsStock)
                .goodsDescription(goodsDescription)
                .build();

        // TODO: 이미지 업로드 로직 추가
        if (image != null) {
            goods.setGoodsImage(image.getOriginalFilename()); // 임시로 파일명만 저장
        }

        Goods savedGoods = goodsService.saveGoods(goods);
        return ResponseEntity.ok(savedGoods);
    }

    @GetMapping
    public ResponseEntity<List<Goods>> getAllGoods() {
        List<Goods> goodsList = goodsService.getAllGoods();
        return ResponseEntity.ok(goodsList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Goods> getGoodsById(@PathVariable Long id) {
        Goods goods = goodsService.getGoodsById(id);
        return ResponseEntity.ok(goods);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')") // 관리자 권한만 허용
    public ResponseEntity<Void> deleteGoods(@PathVariable Long id) {
        goodsService.deleteGoods(id);
        return ResponseEntity.noContent().build();
    }
}