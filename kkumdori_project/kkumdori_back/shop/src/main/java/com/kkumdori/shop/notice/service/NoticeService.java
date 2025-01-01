package com.kkumdori.shop.notice.service;

import com.kkumdori.shop.notice.entity.NoticePost;
import com.kkumdori.shop.notice.repository.NoticePostRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NoticeService {

    @Autowired
    private NoticePostRepository noticePostRepository;

    // ID로 게시글 조회
    public Optional<NoticePost> getPostById(Integer postId) {
        return noticePostRepository.findById(postId);
    }

    // 게시글 삭제
    public void deletePost(Integer postId) {
        if (!noticePostRepository.existsById(postId)) {
            throw new RuntimeException("게시글을 찾을 수 없습니다.");
        }
        noticePostRepository.deleteById(postId);
    }
}
