package com.kkumdori.shop.onetoone.controller;

import com.kkumdori.shop.onetoone.entity.OneToOnePost;
import com.kkumdori.shop.onetoone.repository.OneToOnePostRepository;
import com.kkumdori.shop.qna.dto.ResponseRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/onetoone")
public class OneToOneController {

    @Autowired
    private OneToOnePostRepository onetoonePostRepository;

    // 게시글 생성
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/onetoone")
    public ResponseEntity<String> createPost(@RequestBody OneToOnePost post) {
        // 필수 필드 체크
        if (post.getTitle() == null || post.getContent() == null || post.getUserNo() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("필수 필드가 누락되었습니다.");
        }

        // 날짜 및 초기 값 설정
        post.setCreatedTime(LocalDateTime.now()); // 생성 시간 설정
        post.setIsAnswered(false); // 답변 여부 기본값 false
        post.setAnswer(null); // 답변은 기본적으로 null로 설정

        // 데이터 저장
        onetoonePostRepository.save(post);
        return ResponseEntity.status(HttpStatus.CREATED).body("게시글이 성공적으로 저장되었습니다.");
    }

    // 게시글 상세 조회 및 조회수 증가
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/onetooneview/{postId}/views")
    public ResponseEntity<OneToOnePost> updateViews(@PathVariable Integer postId) {
        Optional<OneToOnePost> postOptional = onetoonePostRepository.findById(postId);

        if (postOptional.isPresent()) {
            OneToOnePost post = postOptional.get();
            post.setIsAnswered(post.getAnswer() != null); // 답변 여부 업데이트
            onetoonePostRepository.save(post); // 변경 사항 저장
            return ResponseEntity.ok(post);
        }

        // 게시글이 없는 경우 404 응답
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    // 답변 등록
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/onetooneview/{postId}/response")
    public ResponseEntity<String> addResponse(@PathVariable Integer postId, @RequestBody ResponseRequest responseRequest) {
        Optional<OneToOnePost> postOptional = onetoonePostRepository.findById(postId);

        if (postOptional.isPresent()) {
            OneToOnePost post = postOptional.get();
            post.setAnswer(responseRequest.getResponse()); // 답변 저장
            post.setAnswerTime(LocalDateTime.now()); // 답변 시간 설정
            post.setIsAnswered(true); // 답변 여부 true로 설정
            onetoonePostRepository.save(post); // 변경 사항 저장
            return ResponseEntity.ok("답변이 성공적으로 저장되었습니다.");
        }

        // 게시글이 없는 경우
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 게시글을 찾을 수 없습니다.");
    }

    // 게시글 목록 조회
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/onetooneboard")
    public ResponseEntity<List<OneToOnePost>> getAllPosts(@RequestParam(required = false) Long userNo) {
        List<OneToOnePost> posts;
        if (userNo != null) {
            // 일반 사용자의 경우 자신의 게시글만 조회
            posts = onetoonePostRepository.findByUserNo(userNo);
        } else {
            // 관리자의 경우 모든 게시글 조회
            posts = onetoonePostRepository.findAll();
        }
        return ResponseEntity.ok(posts);
    }
}
