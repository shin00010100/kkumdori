package com.kkumdori.shop.banner.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kkumdori.shop.banner.entity.Banner;
import com.kkumdori.shop.banner.repository.BannerRepository;
import com.kkumdori.shop.goods.service.ImageService;

@Service
public class BannerService {
//	@Autowired
//	private BannerRepository bannerRepository;
//	
//	@Autowired
//    private ImageService imageService;
//	
//	public List<Banner> getAllBanners() {
//        return bannerRepository.findAll(Sort.by("displayOrder"));
//    }
//	
//	public void saveOrUpdateBanners(List<Banner> banners, List<MultipartFile> images) throws IOException {
//        List<Banner> existingBanners = bannerRepository.findAll(Sort.by("displayOrder"));
//
//        // 기존 배너 이미지 삭제
//        for (Banner banner : existingBanners) {
//            imageService.deleteImage(banner.getImagePath());
//        }
//        bannerRepository.deleteAll(); // 기존 데이터 삭제
//
//        // 새 배너 저장
//        for (int i = 0; i < banners.size(); i++) {
//            Banner banner = banners.get(i);
//            MultipartFile image = images.size() > i ? images.get(i) : null;
//
//            if (image != null) {
//                String imagePath = imageService.saveImage(image);
//                banner.setImagePath(imagePath);
//            }
//            banner.setDisplayOrder(i + 1); // 배너 순서 설정
//            bannerRepository.save(banner);
//        }
//    }
}
