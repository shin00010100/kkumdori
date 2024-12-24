package com.kkumdori.shop.onetoone.service;

import com.kkumdori.shop.onetoone.entity.OneToOnePost;
import com.kkumdori.shop.onetoone.repository.OneToOnePostRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OneToOneService {

    @Autowired
    private OneToOnePostRepository onetoonePostRepository;

    // ID로 게시글 조회
    public Optional<OneToOnePost> getPostById(Integer postId) {
        return onetoonePostRepository.findById(postId);
    }

    // 답변 저장
    public void saveAnswer(Integer postId, String answer) {
        onetoonePostRepository.findById(postId).ifPresent(post -> {
            post.setAnswer(answer); // `answer` 필드에 답변 저장
            onetoonePostRepository.save(post); // 변경 사항 저장
        });
    }
}
