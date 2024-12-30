package com.kkumdori.shop;

import java.io.File;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import jakarta.annotation.PostConstruct;

@EnableJpaRepositories(basePackages = {
    "com.kkumdori.shop.category.repository", 
    "com.kkumdori.shop.login.repository",
    "com.kkumdori.shop.goods.repository",
    "com.kkumdori.shop.notice.repository",
    "com.kkumdori.shop.onetoone.repository",
    "com.kkumdori.shop.qna.repository",
    "com.kkumdori.shop.wishlist.repository",
    "com.kkumdori.shop.mypage.repository",
    "com.kkumdori.shop.banner.repository"
})
@EntityScan(basePackages = {
    "com.kkumdori.shop.category.entity", 
    "com.kkumdori.shop.login.entity", 
    "com.kkumdori.shop.goods.entity",
    "com.kkumdori.shop.notice.entity",
    "com.kkumdori.shop.onetoone.entity",
    "com.kkumdori.shop.qna.entity",
    "com.kkumdori.shop.wishlist.entity",
    "com.kkumdori.shop.mypage.entity",
    "com.kkumdori.shop.banner.entity"
})
@SpringBootApplication
public class ShopApplication {
	
	@Value("${spring.servlet.multipart.location}")
	private String uploadDirPath;
	
    public static void main(String[] args) {
        SpringApplication.run(ShopApplication.class, args);
    }
    
    @PostConstruct
    public void initDirectories() {
        File uploadDir = new File(uploadDirPath);
        if (!uploadDir.exists()) {
            if (uploadDir.mkdirs()) {
                System.out.println("Directory created: " + uploadDir.getAbsolutePath());
            } else {
                System.err.println("Failed to create directory: " + uploadDir.getAbsolutePath());
            }
        }
    }
}
