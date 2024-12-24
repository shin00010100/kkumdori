package com.kkumdori.shop.goods.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.kkumdori.shop.goods.dto.GoodsDTO;
import com.kkumdori.shop.goods.entity.Goods;
import com.kkumdori.shop.goods.service.GoodsService;

@RestController
@RequestMapping("/api/goods")
public class GoodsController {

    @Autowired
    private GoodsService goodsService;

    @PostMapping
    public ResponseEntity<?> addGoods(@ModelAttribute GoodsDTO goodsDTO) {
        try {
            Goods goods = goodsService.addGoods(goodsDTO);
            return ResponseEntity.ok(goods);
        } catch (IllegalArgumentException e) {
        	return ResponseEntity.badRequest().body("입력 데이터가 잘못되었습니다: " + e.getMessage());
        } catch (IOException e) {
        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이미지 저장 중 오류 발생: " + e.getMessage());
        } catch (Exception e) {
        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류 발생: " + e.getMessage());
        }
//        catch (Exception e) {
//            return ResponseEntity.badRequest().body(null);
//        }  
    }
    
    //상품 수정 API
    @PutMapping("/{goodsId}")
    public ResponseEntity<?> updateGoods(
            @PathVariable Long goodsId,
            @ModelAttribute GoodsDTO goodsDTO) {
        try {
            Goods updatedGoods = goodsService.updateGoods(goodsId, goodsDTO);
            return ResponseEntity.ok(updatedGoods);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("상품 수정 중 오류가 발생했습니다.");
        }
    }
    
    // 상품 정보 조회
    @GetMapping("/{goodsId}")
    public ResponseEntity<?> getGoodsById(@PathVariable Long goodsId) {
        try {
            Goods goods = goodsService.getGoodsById(goodsId);
            if (goods == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("상품을 찾을 수 없습니다.");
            }
            GoodsDTO goodsDTO = new GoodsDTO(goods);
            return ResponseEntity.ok(goodsDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("상품 데이터를 불러오는 중 오류가 발생했습니다.");
        }
    }
}