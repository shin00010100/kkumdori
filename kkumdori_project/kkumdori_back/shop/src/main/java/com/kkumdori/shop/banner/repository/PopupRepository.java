package com.kkumdori.shop.banner.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kkumdori.shop.banner.entity.Popup;

@Repository
public interface PopupRepository extends JpaRepository<Popup, Long> {
	Optional<Popup> findFirstByOrderByPopupIdDesc();
}
