package com.kkumdori.shop.banner.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kkumdori.shop.banner.entity.Popup;
import com.kkumdori.shop.banner.repository.PopupRepository;
import com.kkumdori.shop.goods.service.ImageService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class PopupService {
	private final PopupRepository popupRepository;
    private final ImageService imageService;

    @Autowired
    public PopupService(PopupRepository popupRepository, ImageService imageService) {
        this.popupRepository = popupRepository;
        this.imageService = imageService;
    }
	
    public Popup savePopup(Popup popup) {
        return popupRepository.save(popup);
    }

    public List<Popup> getAllPopups() {
        return popupRepository.findAll();
    }

    public Popup updatePopup(Long id, Popup newPopupData, MultipartFile imageFile) throws IOException {
        // 기존 팝업 데이터 조회
        Popup existingPopup = popupRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Popup not found with id: " + id));

        // 기존 데이터와 병합
        if (newPopupData.getLink() != null && !newPopupData.getLink().isEmpty()) {
            existingPopup.setLink(newPopupData.getLink());
        }
        if (newPopupData.getIsActive() != null) {
            existingPopup.setIsActive(newPopupData.getIsActive());
        }

        // 이미지 파일이 있는 경우 새로운 파일로 대체
        if (imageFile != null && !imageFile.isEmpty()) {
            String newImagePath = imageService.saveImage(imageFile); // ImageService 활용
            existingPopup.setImagePath(newImagePath);
        }

        // 병합된 데이터를 저장
        return popupRepository.save(existingPopup);
    }

    public void deletePopup(Long id) {
        popupRepository.deleteById(id);
    }
}
