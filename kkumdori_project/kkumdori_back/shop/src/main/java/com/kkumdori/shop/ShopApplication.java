package com.kkumdori.shop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = {
    "com.kkumdori.shop.category.repository", 
    "com.kkumdori.shop.login.repository",
    "com.kkumdori.shop.goods.repository",
    "com.kkumdori.shop.notice.repository",
    "com.kkumdori.shop.onetoone.repository",
    "com.kkumdori.shop.qna.repository"
})
@EntityScan(basePackages = {
    "com.kkumdori.shop.category.entity", 
    "com.kkumdori.shop.login.entity", 
    "com.kkumdori.shop.goods.entity",
    "com.kkumdori.shop.notice.entity",
    "com.kkumdori.shop.onetoone.entity",
    "com.kkumdori.shop.qna.entity" 
})
@SpringBootApplication
public class ShopApplication {

    public static void main(String[] args) {
        SpringApplication.run(ShopApplication.class, args);
    }
}
