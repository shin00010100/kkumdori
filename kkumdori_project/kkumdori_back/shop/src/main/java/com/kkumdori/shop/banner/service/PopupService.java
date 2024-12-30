package com.kkumdori.shop.banner.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kkumdori.shop.banner.entity.Popup;
import com.kkumdori.shop.banner.repository.PopupRepository;
import com.kkumdori.shop.goods.service.ImageService;

@Service
public class PopupService {
//	@Autowired
//	private PopupRepository popupRepository;
//	
//	@Autowired
//    private ImageService imageService;
//	
//	// 팝업 데이터 가져오기
//    public Popup getPopup() {
//        return popupRepository.findFirstByOrderByPopupIdDesc().orElse(null);
//    }
//    
//    public void saveOrUpdatePopup(Popup popup, MultipartFile image) throws IOException {
//        Popup existingPopup = getPopup();
//
//        // 기존 팝업 이미지 삭제
//        if (existingPopup != null) {
//            imageService.deleteImage(existingPopup.getImagePath());
//            popupRepository.delete(existingPopup); // 기존 팝업 삭제
//        }
//
//        // 새 팝업 저장
//        if (image != null) {
//            String imagePath = imageService.saveImage(image);
//            popup.setImagePath(imagePath);
//        }
//        popupRepository.save(popup);
//    }
}
