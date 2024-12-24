package com.kkumdori.shop.qna.controller;

import com.kkumdori.shop.qna.dto.ResponseRequest;
import com.kkumdori.shop.qna.entity.QnAPost;
import com.kkumdori.shop.qna.repository.QnAPostRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/qna")
public class QnAController {

    @Autowired
    private QnAPostRepository qnaPostRepository;

    // 게시글 생성
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/qna")
    public ResponseEntity<String> createPost(@RequestBody QnAPost post) {
        // 필수 필드 체크
        if (post.getTitle() == null || post.getContent() == null || post.getUserNo() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("필수 필드가 누락되었습니다.");
        }

        // 날짜 및 초기 값 설정
        post.setCreatedTime(LocalDateTime.now()); // 생성 시간 설정
        post.setIsAnswered(false); // 답변 여부 기본값 false
        post.setAnswer(null); // 답변은 기본적으로 null로 설정

        // 데이터 저장
        qnaPostRepository.save(post);
        return ResponseEntity.status(HttpStatus.CREATED).body("게시글이 성공적으로 저장되었습니다.");
    }

    // 게시글 상세 조회 및 조회수 증가
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/qnaview/{postId}/views")
    public ResponseEntity<QnAPost> updateViews(@PathVariable Integer postId) {
        Optional<QnAPost> postOptional = qnaPostRepository.findById(postId);

        if (postOptional.isPresent()) {
            QnAPost post = postOptional.get();
            post.setIsAnswered(post.getAnswer() != null); // 답변 여부 업데이트
            qnaPostRepository.save(post); // 변경 사항 저장
            return ResponseEntity.ok(post);
        }

        // 게시글이 없는 경우 404 응답
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }


    // 답변 등록
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/qnaview/{postId}/response")
    public ResponseEntity<String> addResponse(@PathVariable Integer postId, @RequestBody ResponseRequest responseRequest) {
        Optional<QnAPost> postOptional = qnaPostRepository.findById(postId);

        if (postOptional.isPresent()) {
            QnAPost post = postOptional.get();
            post.setAnswer(responseRequest.getResponse()); // 답변 저장
            post.setAnswerTime(LocalDateTime.now()); // 답변 시간 설정
            post.setIsAnswered(true); // 답변 여부 true로 설정
            qnaPostRepository.save(post); // 변경 사항 저장
            return ResponseEntity.ok("답변이 성공적으로 저장되었습니다.");
        }

        // 게시글이 없는 경우
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 게시글을 찾을 수 없습니다.");
    }

    // 게시글 목록 조회
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/qnaboard")
    public ResponseEntity<List<QnAPost>> getAllPosts() {
        List<QnAPost> posts = qnaPostRepository.findAll();
        return ResponseEntity.ok(posts);
    }
}
