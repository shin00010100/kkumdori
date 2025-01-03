package com.kkumdori.shop.goods.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kkumdori.shop.category.entity.Category;
import com.kkumdori.shop.category.repository.CategoryRepository;
import com.kkumdori.shop.goods.dto.GoodsDTO;
import com.kkumdori.shop.goods.dto.ProductListResponse;
import com.kkumdori.shop.goods.entity.Goods;
import com.kkumdori.shop.goods.repository.GoodsRepository;

@Service
public class GoodsService {
	private final ImageService imageService;
    private final GoodsRepository goodsRepository;
    private final CategoryRepository categoryRepository;
    
    @Autowired
    public GoodsService(ImageService imageService, GoodsRepository goodsRepository, CategoryRepository categoryRepository) {
        this.imageService = imageService;
        this.goodsRepository = goodsRepository;
        this.categoryRepository = categoryRepository;
    }
    
    public Goods addGoods(GoodsDTO goodsDTO) throws IOException {
    	// DTO에서 필수 필드 검증 (생략 가능)
        if (goodsDTO.getGoodsName() == null || goodsDTO.getGoodsName().isEmpty()) {
            throw new IllegalArgumentException("상품명은 필수 항목입니다.");
        }
        if (goodsDTO.getCategoryNo() == null) {
            throw new IllegalArgumentException("카테고리를 선택해야 합니다.");
        }
    	
        // 이미지 저장 처리
        String imagePath = null;
        if (goodsDTO.getImage() != null && !goodsDTO.getImage().isEmpty()) {
            imagePath = imageService.saveImage(goodsDTO.getImage());
        }
        
    	// 카테고리 검증
    	Category category = categoryRepository.findById(goodsDTO.getCategoryNo())
                .orElseThrow(() -> new IllegalArgumentException("카테고리 ID가 잘못되었습니다: " + goodsDTO.getCategoryNo()));
    	
        // Goods 생성
        Goods goods = new Goods();
        goods.setGoodsName(goodsDTO.getGoodsName());
        goods.setCategory(category);
        goods.setPrice(goodsDTO.getPrice());
        goods.setStock(goodsDTO.getStock());
        goods.setDiscount(goodsDTO.getDiscount());
        goods.setStarRank(goodsDTO.getStarRank());
        goods.setDescription(goodsDTO.getDescription());
        goods.setImagePath(imagePath);

        return goodsRepository.save(goods);
    }
    
    public Goods updateGoods(Long goodsId, GoodsDTO goodsDTO) throws IOException{
    	// 기존 상품 조회
        Goods goods = goodsRepository.findById(goodsId)
                .orElseThrow(() -> new IllegalArgumentException("해당 상품이 존재하지 않습니다."));
        
        // 이미지 경로가 존재할 경우만 업데이트
        if (goodsDTO.getImagePath() != null) {
            goods.setImagePath(goodsDTO.getImagePath());
        }

        // 업데이트 데이터 매핑
        goods.setGoodsName(goodsDTO.getGoodsName());
        goods.setPrice(goodsDTO.getPrice());
        goods.setStock(goodsDTO.getStock());
        goods.setDiscount(goodsDTO.getDiscount());
        goods.setDescription(goodsDTO.getDescription());

        // 카테고리 변경 처리
        if (goodsDTO.getCategoryNo() != null) {
            Category category = categoryRepository.findById(goodsDTO.getCategoryNo())
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 카테고리입니다."));
            goods.setCategory(category);
        }

        
//        // 카테고리 검증
//        Category category = categoryRepository.findById(goodsDTO.getCategoryNo())
//                .orElseThrow(() -> new IllegalArgumentException("해당 카테고리가 존재하지 않습니다."));
//
//        // 이미지 교체 로직
//        MultipartFile newImage = goodsDTO.getImage();
//        if (newImage != null && !newImage.isEmpty()) {
//            String newImagePath = saveImage(newImage);
//            goods.setImagePath(newImagePath);
//        }
//
//        // 필드 업데이트
//        goods.setGoodsName(goodsDTO.getGoodsName());
//        goods.setCategory(category);
//        goods.setPrice(goodsDTO.getPrice());
//        goods.setStock(goodsDTO.getStock());
//        goods.setDiscount(goodsDTO.getDiscount());
//        goods.setDescription(goodsDTO.getDescription());

        return goodsRepository.save(goods);
    }
    
    // 상품 조회 메서드
    public Goods getGoodsById(Long goodsId) {
        return goodsRepository.findById(goodsId)
                .orElseThrow(() -> new IllegalArgumentException("해당 상품이 존재하지 않습니다."));
    }
    
    // 상품 삭제 메서드
    public void deleteGoods(Long goodsId) {
        Goods goods = goodsRepository.findById(goodsId)
                .orElseThrow(() -> new IllegalArgumentException("해당 상품이 존재하지 않습니다."));
        goodsRepository.delete(goods); // 데이터 삭제
    }
    // 상품 리스트 조회
    public ProductListResponse getProducts(String query, int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size); // 페이지는 0부터 시작
        Page<Goods> goodsPage = goodsRepository.findByGoodsNameContaining(query, pageable);

        List<GoodsDTO> products = goodsPage.getContent().stream()
                .map(GoodsDTO::new) // Goods 객체를 GoodsDTO로 변환
                .collect(Collectors.toList());

        long totalItems = goodsPage.getTotalElements(); // 총 데이터 개수
        int totalPages = goodsPage.getTotalPages(); // 총 페이지 수

        return new ProductListResponse(totalItems, totalPages, products);
    }
    
    // 상품 리스트 카테고리별로 띄우기
    public ProductListResponse getProductsByCategory(Long categoryNo, String query, int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size); // 페이지는 0부터 시작
        Page<Goods> goodsPage = goodsRepository.findByCategory_CategoryNoAndGoodsNameContaining(categoryNo, query, pageable);

        List<GoodsDTO> products = goodsPage.getContent().stream()
                .map(GoodsDTO::new) // Goods 객체를 GoodsDTO로 변환
                .collect(Collectors.toList());

        long totalItems = goodsPage.getTotalElements(); // 총 데이터 개수
        int totalPages = goodsPage.getTotalPages(); // 총 페이지 수

        return new ProductListResponse(totalItems, totalPages, products);
    }
    
    // 상품 번호로 상품 조회
    public Goods getGoodsByGoodsNo(Long goods_no) {
        return goodsRepository.findById(goods_no).orElse(null);  // 상품 번호로 조회
    }
    
}
