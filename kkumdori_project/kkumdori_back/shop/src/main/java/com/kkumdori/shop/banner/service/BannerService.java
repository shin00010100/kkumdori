package com.kkumdori.shop.banner.service;

import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kkumdori.shop.banner.dto.BannerDto;
import com.kkumdori.shop.banner.entity.Banner;
import com.kkumdori.shop.banner.repository.BannerRepository;
import com.kkumdori.shop.goods.service.ImageService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class BannerService {
	private final Logger log = LoggerFactory.getLogger(getClass());
	private final BannerRepository bannerRepository;
	private final ImageService imageService;

	@Autowired
	public BannerService(BannerRepository bannerRepository, ImageService imageService) {
	    this.bannerRepository = bannerRepository;
	    this.imageService = imageService;
	}
	
	public Banner saveBanner(Banner banner) throws IOException {
        return bannerRepository.save(banner);
    }

    public List<Banner> getAllBanners() {
        return bannerRepository.findAll();
    }

    public Banner updateBanner(Long id, BannerDto bannerDto) throws IOException {
        // 기존 배너 조회
    	Banner existingBanner = bannerRepository.findById(id)
    	        .orElseThrow(() -> new RuntimeException("Banner not found with id: " + id));

    	log.debug("Existing Banner: {}", existingBanner);

        // 데이터 병합: link
        if (bannerDto.getLinks() != null && !bannerDto.getLinks().isEmpty()) {
            existingBanner.setLink(bannerDto.getLinks());
        } else {
            log.debug("Link not updated. Using existing value: {}", existingBanner.getLink());
        }

        // 데이터 병합: order
        if (bannerDto.getOrders() > 0) {
            existingBanner.setDisplayOrder(bannerDto.getOrders());
        } else {
            log.debug("Order not updated. Using existing value: {}", existingBanner.getDisplayOrder());
        }

        // 이미지 파일 처리
        if (bannerDto.getFiles() != null && !bannerDto.getFiles().isEmpty()) {
            String newImagePath = imageService.saveImage(bannerDto.getFiles());
            existingBanner.setImagePath(newImagePath);
        } else {
            log.debug("Image path not updated. Using existing value: {}", existingBanner.getImagePath());
        }
        
        // 병합된 데이터 저장
        return bannerRepository.save(existingBanner);
    }

    public void deleteBanner(Long id) {
        bannerRepository.deleteById(id);
    }
}
