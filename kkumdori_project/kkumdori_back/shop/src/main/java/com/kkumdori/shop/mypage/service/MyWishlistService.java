package com.kkumdori.shop.mypage.service;

import com.kkumdori.shop.mypage.entity.MyWishlist;
import com.kkumdori.shop.mypage.repository.MyWishlistRepository;
import com.kkumdori.shop.goods.repository.GoodsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MyWishlistService {

    @Autowired
    private MyWishlistRepository myWishlistRepository;

    @Autowired
    private GoodsRepository goodsRepository;

    // 사용자 번호로 MyWishlist 조회
    public List<MyWishlist> getMyWishlist(Long userNo) {
        return myWishlistRepository.findByUserNo(userNo);
    }

    // 위시리스트에 상품 추가
    public MyWishlist addToMyWishlist(Long goodsNo, Long userNo) {
        // 상품이 이미 위시리스트에 있는지 확인
        MyWishlist existingWishlist = myWishlistRepository.findByGoodsNoAndUserNo(goodsNo, userNo);
        if (existingWishlist != null) {
            throw new RuntimeException("이 상품은 이미 위시리스트에 있습니다.");
        }

        // 상품 정보를 가져오기
        var goods = goodsRepository.findById(goodsNo).orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다."));

        // MyWishlist에 추가
        MyWishlist myWishlist = new MyWishlist(goodsNo, userNo, goods);
        return myWishlistRepository.save(myWishlist);
    }

    // 위시리스트 아이템 삭제
    public void deleteMyWishlistItem(Integer wishlistNo) {
        myWishlistRepository.deleteById(wishlistNo);
    }
}

