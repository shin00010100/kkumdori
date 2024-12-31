package com.kkumdori.shop.login.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kkumdori.shop.login.dto.UserApiResponse;
import com.kkumdori.shop.login.dto.UserDto;
import com.kkumdori.shop.login.entity.User;
import com.kkumdori.shop.login.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
 // 사용자 번호로 사용자 이름 가져오기
 	public String getFullNameByUserNo(Long userNo) {
 		Optional<User> userOptional = userRepository.findById(userNo);
 		return userOptional.map(User::getFullname).orElse(null); // 사용자 이름 반환 또는 null
 	}
    
    // 사용자 저장 메소드
    public User save(User user) {
        return userRepository.save(user);  // 사용자 정보를 데이터베이스에 저장
    }
    
    // 인증번호 저장용 맵
    private Map<String, String> verificationCodes = new HashMap<>(); // 인증 코드 저장

    // 사용자 이름이 이미 존재하는지 확인
    public boolean isUsernameTaken(String username) {
        return userRepository.findByUsername(username).isPresent();
    }
    
    // 이메일 중복 체크
    public boolean isEmailTaken(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    // 전화번호 중복 체크
    public boolean isTelTaken(String tel) {
        return userRepository.findByTel(tel).isPresent();
    }
    
    // 이메일과 사용자명으로 사용자 찾기
    public Optional<User> findUserByEmailAndUsername(String email, String username) {
        return userRepository.findByEmailAndUsername(email, username);
    }
    
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    
    // 사용자명과 전화번호로 사용자 찾기
    public Optional<User> findUserByFullnameAndTel(String fullname, String tel) {
        return userRepository.findByFullnameAndTel(fullname, tel);
    }
    
    // 전화번호로 사용자 조회
    public Optional<User> findUserByTel(String tel) {
        return userRepository.findByTel(tel);
    }
    
    // 사용자 아이디, 이름, 전화번호로 사용자 찾기
    public Optional<User> findUserByUsernameAndFullnameAndTel(String username, String fullname, String tel) {
        return userRepository.findByUsernameAndFullnameAndTel(username, fullname, tel);
    }
    
    // 회원가입
    @Transactional
    public User registerUser(UserDto userDto) {
        try {
        	// 아이디 중복 검사
            if (isUsernameTaken(userDto.getUsername())) {
                throw new IllegalArgumentException("아이디가 이미 존재합니다.");
            }

            // 이메일 중복 검사
            if (isEmailTaken(userDto.getEmail())) {
                throw new IllegalArgumentException("이메일이 이미 존재합니다.");
            }

            // 전화번호 중복 검사
            if (isTelTaken(userDto.getTel())) {
                throw new IllegalArgumentException("전화번호가 이미 존재합니다.");
            }

            // 새로운 사용자 객체 생성
            User user = new User();
            user.setUsername(userDto.getUsername());

            // 비밀번호 해시화 후 저장
            String hashedPassword = passwordEncoder.encode(userDto.getPassword());
            user.setPassword(hashedPassword);

            user.setEmail(userDto.getEmail());
            user.setBank(userDto.getBank() != null && !userDto.getBank().equals("은행 선택") ? userDto.getBank() : null);
            user.setAccount(userDto.getAccount() != null && !userDto.getAccount().isEmpty() ? userDto.getAccount() : null);
            user.setZipcode(userDto.getZipcode());
            user.setAddress(userDto.getAddress());
            user.setTel(userDto.getTel());
            user.setFullname(userDto.getFullname());
            
            user.setRole(User.Role.user);

            // 사용자 저장 후 반환
            return userRepository.save(user);
        } catch (Exception e) {
            // 예외 메시지 및 스택 트레이스 로깅
            System.err.println("회원가입 오류: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    // 로그인 검증 (비밀번호 확인)
    public boolean validateUser(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            return passwordEncoder.matches(password, user.get().getPassword());
        }
        return false;
    }

    // 이메일로 사용자 아이디 찾기
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // 이메일로 인증번호 전송
    public void sendVerificationCode(String email, String code) {
        verificationCodes.put(email, code);
        // 실제 이메일 전송 로직 추가 (메일 전송 기능 구현)
    }

    // 이메일 인증번호 검증
    public UserApiResponse validateEmailVerificationCode(String email, String code) {
        // 이메일 인증번호 확인
        if (verificationCodes.containsKey(email) && verificationCodes.get(email).equals(code)) {
            // 인증번호가 맞으면 이메일로 등록된 사용자 아이디 반환
            Optional<User> user = userRepository.findByEmail(email);
            if (user.isPresent()) {
                return new UserApiResponse(true, user.get().getUsername()); // 사용자 아이디 반환
            } else {
                return new UserApiResponse(false, "사용자를 찾을 수 없습니다.");
            }
        } else {
            return new UserApiResponse(false, "인증번호가 일치하지 않습니다.");
        }
    }

 // 인증번호 전송 로직
    public UserApiResponse sendVerificationCodeByEmailAndUsername(String email, String username) {
        Optional<User> user = userRepository.findByEmailAndUsername(email, username);  // 이메일과 사용자명을 동시에 검색
        
        if (user.isPresent()) {
            // 인증번호 생성 및 저장
            String verificationCode = generateVerificationCode(); 
            verificationCodes.put(email, verificationCode);
            sendVerificationCode(email, verificationCode); // 이메일로 인증번호 전송
            return new UserApiResponse(true, "인증번호가 이메일로 전송되었습니다.");
        } else {
            return new UserApiResponse(false, "아이디 또는 이메일이 일치하지 않습니다.");
        }
    }

    // 인증번호 생성 메서드
    public String generateVerificationCode() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // 사용할 문자 집합
        StringBuilder code = new StringBuilder();
        Random random = new Random();

        // 8자리 인증번호 생성
        for (int i = 0; i < 8; i++) {
            int index = random.nextInt(characters.length()); // 랜덤 인덱스 생성
            code.append(characters.charAt(index)); // 문자 추가
        }

        return code.toString();
    }
}
