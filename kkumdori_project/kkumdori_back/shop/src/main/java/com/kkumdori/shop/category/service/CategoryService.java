package com.kkumdori.shop.category.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kkumdori.shop.category.entity.Category;
import com.kkumdori.shop.category.repository.CategoryRepository;

@Service
public class CategoryService {
	 @Autowired
	    private CategoryRepository categoryRepository;

	    // 모든 카테고리 조회
	    public List<Category> getAllCategories() {
	        return categoryRepository.findAll();
	    }

	    // 카테고리 추가
	    public Category addCategory(Category category) {
	        return categoryRepository.save(category);
	    }

	    // 카테고리 수정
	    public Category updateCategory(Long id, Category updatedCategory) {
	        Category existingCategory = categoryRepository.findById(id)
	                .orElseThrow(() -> new RuntimeException("카테고리를 찾을 수 없습니다."));
	        existingCategory.setCategoryName(updatedCategory.getCategoryName());
	        return categoryRepository.save(existingCategory);
	    }

	    // 카테고리 삭제
	    public void deleteCategory(Long id) {
	        if (!categoryRepository.existsById(id)) {
	            throw new RuntimeException("카테고리를 찾을 수 없습니다.");
	        }
	        categoryRepository.deleteById(id);
	    }
}
