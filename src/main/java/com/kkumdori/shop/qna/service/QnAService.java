package com.kkumdori.shop.qna.service;

import com.kkumdori.shop.qna.entity.QnAPost;
import com.kkumdori.shop.qna.repository.QnAPostRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class QnAService {

    @Autowired
    private QnAPostRepository qnaPostRepository;

    // ID로 게시글 조회
    public Optional<QnAPost> getPostById(Integer postId) {
        return qnaPostRepository.findById(postId);
    }

    // 답변 저장
    public void saveAnswer(Integer postId, String answer) {
        qnaPostRepository.findById(postId).ifPresent(post -> {
            post.setAnswer(answer); // `answer` 필드에 답변 저장
            qnaPostRepository.save(post); // 변경 사항 저장
        });
    }
}
