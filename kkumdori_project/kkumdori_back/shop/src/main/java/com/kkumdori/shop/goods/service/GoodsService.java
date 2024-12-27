package com.kkumdori.shop.goods.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

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
	
	private static final String IMAGE_UPLOAD_DIR = "C:/kkumdori_project/kkumdori_project/kkumdori_back/shop/uploads/images/"; //절대 경로
//	private static final String IMAGE_UPLOAD_DIR = "uploads/images/"; // 상대 경로
	
    @Autowired
    private GoodsRepository goodsRepository;

    @Autowired
    private CategoryRepository categoryRepository;
    
    public Goods addGoods(GoodsDTO goodsDTO) throws IOException {
    	
    	// 카테고리 검증
    	Category category = categoryRepository.findById(goodsDTO.getCategoryNo())
    	        .orElseThrow(() -> new IllegalArgumentException("카테고리 ID가 잘못되었습니다: " + goodsDTO.getCategoryNo()));

        // 이미지 저장
        MultipartFile image = goodsDTO.getImage();
        String imagePath = saveImage(image);

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

        // 카테고리 검증
        Category category = categoryRepository.findById(goodsDTO.getCategoryNo())
                .orElseThrow(() -> new IllegalArgumentException("해당 카테고리가 존재하지 않습니다."));

        // 이미지 교체 로직
        MultipartFile newImage = goodsDTO.getImage();
        if (newImage != null && !newImage.isEmpty()) {
            String newImagePath = saveImage(newImage);
            goods.setImagePath(newImagePath);
        }

        // 필드 업데이트
        goods.setGoodsName(goodsDTO.getGoodsName());
        goods.setCategory(category);
        goods.setPrice(goodsDTO.getPrice());
        goods.setStock(goodsDTO.getStock());
        goods.setDiscount(goodsDTO.getDiscount());
        goods.setDescription(goodsDTO.getDescription());

        return goodsRepository.save(goods);
    }
    
    // 상품 조회 메서드
    public Goods getGoodsById(Long goodsId) {
        return goodsRepository.findById(goodsId)
                .orElseThrow(() -> new IllegalArgumentException("해당 상품이 존재하지 않습니다."));
    }
    
    private String saveImage(MultipartFile image) throws IOException {
        if (image == null || image.isEmpty()) {
            throw new IllegalArgumentException("이미지 파일이 없습니다.");
        }
        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        String absolutePath = IMAGE_UPLOAD_DIR + fileName;
        File file = new File(absolutePath);
        // 디렉토리가 존재하지 않으면 생성
        if (!file.getParentFile().exists()) {
            file.getParentFile().mkdirs();
        }
        image.transferTo(file); // 이미지 저장
        return "uploads/images/" + fileName;
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
    
    // 상품 번호로 상품 조회
    public Goods getGoodsByGoodsNo(Long goods_no) {
        return goodsRepository.findById(goods_no).orElse(null);  // 상품 번호로 조회
    }
    

}
