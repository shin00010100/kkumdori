package com.kkumdori.shop.banner.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kkumdori.shop.banner.entity.Banner;

@Repository
public interface BannerRepository extends JpaRepository<Banner, Long>{
	
	List<Banner> findAll(Sort sort);
}
