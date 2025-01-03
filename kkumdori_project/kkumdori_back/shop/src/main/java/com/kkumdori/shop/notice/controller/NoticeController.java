package com.kkumdori.shop.notice.controller;

import com.kkumdori.shop.notice.entity.NoticePost;
import com.kkumdori.shop.notice.repository.NoticePostRepository;
import com.kkumdori.shop.notice.service.NoticeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/notice")
public class NoticeController {

    @Autowired
    private NoticePostRepository noticePostRepository;

    @Autowired
    private NoticeService noticeService;

    // 게시글 생성
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/notice")
    public ResponseEntity<String> createPost(@RequestBody NoticePost post) {
        if (post.getTitle() == null || post.getContent() == null || post.getAuthor() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("필수 필드가 누락되었습니다.");
        }

        post.setCreatedTime(LocalDateTime.now());
        noticePostRepository.save(post);
        return ResponseEntity.status(HttpStatus.CREATED).body("게시글이 성공적으로 저장되었습니다.");
    }

    // 게시글 상세 조회
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/noticeview/{postId}/views")
    public ResponseEntity<NoticePost> getPostById(@PathVariable Integer postId) {
        Optional<NoticePost> postOptional = noticePostRepository.findById(postId);
        if (postOptional.isPresent()) {
            return ResponseEntity.ok(postOptional.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    // 게시글 목록 조회
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/noticeboard")
    public ResponseEntity<List<NoticePost>> getAllPosts() {
        List<NoticePost> posts = noticePostRepository.findAll();
        return ResponseEntity.ok(posts);
    }

    // 게시글 삭제
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/noticeview/{postId}/views")
    public ResponseEntity<String> deletePost(@PathVariable Integer postId) {
        try {
            noticeService.deletePost(postId);
            return ResponseEntity.ok("게시글이 성공적으로 삭제되었습니다.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
