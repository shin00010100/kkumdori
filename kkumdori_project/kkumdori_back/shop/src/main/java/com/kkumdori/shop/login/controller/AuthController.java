package com.kkumdori.shop.login.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kkumdori.shop.login.dto.UserApiResponse;
import com.kkumdori.shop.login.dto.UserDto;
import com.kkumdori.shop.login.entity.User;
import com.kkumdori.shop.login.jwt.JwtTokenUtil;
import com.kkumdori.shop.login.repository.UserRepository;
import com.kkumdori.shop.login.request.EmailVerificationRequest;
import com.kkumdori.shop.login.request.PasswordResetRequest;
import com.kkumdori.shop.login.request.PhoneVerificationRequest;
import com.kkumdori.shop.login.service.EmailService;
import com.kkumdori.shop.login.service.UserService;
import com.kkumdori.shop.login.service.VerificationService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private EmailService emailService;
    
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private VerificationService verificationService;

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        Optional<User> user = userService.findByUsername(username); // 사용자 조회
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            // JWT 토큰에 role 추가
            String token = jwtTokenUtil.generateToken(username, user.get().getRole());
            return ResponseEntity.ok("{\"token\":\"" + token + "\", \"role\":\"" + user.get().getRole() + "\", \"fullname\":\"" + user.get().getFullname() + "\"}");
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    
 // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<UserApiResponse> registerUser(@RequestBody UserDto userDto) {
        try {
            userService.registerUser(userDto);
            UserApiResponse response = new UserApiResponse(true, "회원가입이 완료되었습니다.");
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            // 아이디나 이메일이 중복된 경우
            UserApiResponse response = new UserApiResponse(false, e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } catch (Exception e) {
            // 다른 예외 처리
            UserApiResponse response = new UserApiResponse(false, "회원가입에 실패했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    
    // 아이디 중복
    @GetMapping("/check-username")
    public ResponseEntity<?> checkUsername(@RequestParam String username) {
        if (userService.isUsernameTaken(username)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("아이디가 이미 사용 중입니다.");
        }
        return ResponseEntity.ok().body("아이디가 사용 가능합니다.");
    }
    
    // 이메일 중복 체크
    @GetMapping("/check-email")
    public ResponseEntity<?> checkEmail(@RequestParam String email) {
        if (userService.isEmailTaken(email)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("이메일이 이미 사용 중입니다.");
        }
        return ResponseEntity.ok().body("이메일이 사용 가능합니다.");
    }

    // 전화번호 중복 체크
    @GetMapping("/check-tel")
    public ResponseEntity<?> checkTel(@RequestParam String tel) {
        if (userService.isTelTaken(tel)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("전화번호가 이미 사용 중입니다.");
        }
        return ResponseEntity.ok().body("전화번호가 사용 가능합니다.");
    }
    
    // 아이디 찾기(전화번호)
    @PostMapping("/IDsendPhoneVerificationCode")
    public UserApiResponse sendIdPhoneVerificationCode(@RequestBody PhoneVerificationRequest request) {
        // 이름과 전화번호로 사용자 찾기
        Optional<User> user = userService.findUserByFullnameAndTel(request.getFullname(), request.getTel());
        
        if (user.isPresent()) {
            // 인증번호 생성
            String verificationCode = userService.generateVerificationCode();
            
            // 인증번호 저장
            verificationService.saveCode(request.getTel(), verificationCode); 
            
            // 인증번호 콘솔에 출력
            System.out.println("전송된 인증번호: " + verificationCode);

            // 인증번호 전송 성공 응답
            return new UserApiResponse(true, "인증번호가 생성되었습니다.", verificationCode);
        } else {
            // 일치하는 사용자 없으면 오류 응답
            return new UserApiResponse(false, "이름과 전화번호가 일치하는 사용자가 없습니다.");
        }
    }
    
    // 비밀번호 찾기(전화번호)
    @PostMapping("/PWsendPhoneVerificationCode")
    public UserApiResponse sendPwPhoneVerificationCode(@RequestBody PhoneVerificationRequest request) {
        // 이름, 아이디, 전화번호로 사용자 찾기
        Optional<User> user = userService.findUserByUsernameAndFullnameAndTel(
            request.getUsername(), request.getFullname(), request.getTel()
        );
        
        if (user.isPresent()) {
            // 인증번호 생성
            String verificationCode = userService.generateVerificationCode();
            
            // 인증번호 저장
            verificationService.saveCode(request.getTel(), verificationCode);
            
            // 인증번호 콘솔 출력 (SMS 전송 대신)
            System.out.println("전송된 인증번호: " + verificationCode);

            // 인증번호 전송 성공 응답
            return new UserApiResponse(true, "인증번호가 생성되었습니다.", verificationCode);
        } else {
            // 사용자 정보가 일치하지 않을 경우 오류 응답
            return new UserApiResponse(false, "아이디, 이름, 전화번호가 일치하는 사용자가 없습니다.");
        }
    }
    
    // 아이디 찾기 이메일 전송(이메일)
    @PostMapping("/IDsendEmailVerificationCode")
    public ResponseEntity<UserApiResponse> sendVerificationCode(@RequestBody EmailVerificationRequest request) {
        String email = request.getEmail();

        // 이메일 유효성 검사 (등록된 이메일인지 확인)
        if (email == null || !email.matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new UserApiResponse(false, "유효하지 않은 이메일 주소입니다."));
        }

        // 이메일이 등록되어 있는지 확인
        Optional<User> user = userService.findUserByEmail(email);
        if (!user.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new UserApiResponse(false, "이메일 주소가 등록되지 않았습니다."));
        }

        try {
            // 인증번호 생성 및 전송
            String verificationCode = userService.generateVerificationCode();
            emailService.sendVerificationCode(email, verificationCode);

            // 인증번호를 응답에 포함하여 반환
            return ResponseEntity.ok(new UserApiResponse(true, "인증번호가 전송되었습니다.", verificationCode));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new UserApiResponse(false, "인증번호 전송에 실패했습니다."));
        }
    }
    
    // 아이디 찾기 아이디 조회(전화번호)
    @PostMapping("/IDCheckPhoneVerificationCode")
    public ResponseEntity<UserApiResponse> checkPhoneVerificationCode(@RequestBody PhoneVerificationRequest request) {
        String fullname = request.getFullname();
        String tel = request.getTel();
        String code = request.getCode();

        // 인증번호 확인
        boolean isCodeValid = verificationService.verifyCode(tel, code);
        if (isCodeValid) {
            // 이름과 전화번호로 사용자 검색
            Optional<User> user = userService.findUserByFullnameAndTel(fullname, tel);
            if (user.isPresent()) {
                return ResponseEntity.ok(new UserApiResponse(true, user.get().getUsername()));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new UserApiResponse(false, "사용자 정보를 찾을 수 없습니다."));
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new UserApiResponse(false, "인증번호가 일치하지 않습니다."));
        }
    }
    
    // 아이디 찾기 아이디 조회(이메일)
    @PostMapping("/IDcheckEmailVerificationCode")
    public ResponseEntity<UserApiResponse> checkEmailVerificationCode(@RequestBody EmailVerificationRequest request) {
        String email = request.getEmail();

        // 인증번호가 일치하면 사용자 아이디 조회
        Optional<User> user = userService.findUserByEmail(email);
        if (user.isPresent()) {
            return ResponseEntity.ok(new UserApiResponse(true, user.get().getUsername()));
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new UserApiResponse(false, "사용자 정보를 찾을 수 없습니다."));
    }
    
    // 비밀번호 찾기 이메일 전송 
    @PostMapping("/PWsendEmailVerificationCode")
    public ResponseEntity<UserApiResponse> sendVerificationCodeByEmailAndUsername(@RequestBody EmailVerificationRequest request) {
        String email = request.getEmail();
        String username = request.getUsername();

        // 입력값 공백 제거
        email = email.trim();
        username = username.trim();

        // 입력값 확인 (디버깅용)
        System.out.println("입력된 이메일: " + email);
        System.out.println("입력된 아이디: " + username);

        // 이메일 유효성 검사
        if (email == null || !email.matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new UserApiResponse(false, "유효하지 않은 이메일 주소입니다."));
        }

        // 이메일과 사용자 이름을 동시에 확인
        Optional<User> user = userService.findUserByEmailAndUsername(email, username);

        // 디버깅: user가 무엇인지 출력
        System.out.println("조회된 사용자: " + (user.isPresent() ? user.get().toString() : "없음"));

        if (user.isPresent()) {
            // 인증번호 생성
            String verificationCode = userService.generateVerificationCode();

            // 예외를 처리하기 위해 try-catch 사용
            try {
                // 이메일로 인증번호 전송
                emailService.sendVerificationCode(email, verificationCode);

                // 인증번호를 응답에 포함
                return ResponseEntity.ok(new UserApiResponse(true, "인증번호가 이메일로 전송되었습니다.", verificationCode));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new UserApiResponse(false, "인증번호 전송에 실패했습니다."));
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new UserApiResponse(false, "아이디 또는 이메일이 일치하지 않습니다."));
        }
    }
    
    // 비밀번호 재설정
    @PostMapping("/resetPassword")
    public ResponseEntity<?> resetPassword(@RequestBody PasswordResetRequest request, @RequestHeader("Authorization") String token) {
        // 토큰을 통해 사용자 정보 확인 (JwtTokenUtil 사용)
        String jwtToken = token.replace("Bearer ", "");
        if (jwtToken.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("유효한 토큰이 없습니다.");
        }

        // JwtTokenUtil을 통해 토큰 검증 및 사용자 조회
        Optional<User> userOptional = jwtTokenUtil.verifyToken(jwtToken, userRepository);
        User user = userOptional.orElseThrow(() -> new UsernameNotFoundException("유효하지 않거나 만료된 토큰입니다."));

        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(request.getNewPassword());
        user.setPassword(encodedPassword); // 새 비밀번호 설정

        // 비밀번호 업데이트
        userRepository.save(user);

        return ResponseEntity.ok("비밀번호가 성공적으로 재설정되었습니다.");
    }
    
    // 이메일 또는 전화번호 인증 후 토큰 발급
    @PostMapping("/resetToken")
    public ResponseEntity<String> issueToken(@RequestBody Map<String, String> requestData) {
        String username = requestData.get("username");
        String email = requestData.get("email");
        String phone = requestData.get("phone");

        // 이메일 또는 전화번호로 사용자 확인
        Optional<User> user;
        if (email != null && !email.isEmpty()) {
            user = userService.findUserByEmail(email);
        } else if (phone != null && !phone.isEmpty()) {
            user = userService.findUserByTel(phone);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이메일 또는 전화번호가 필요합니다.");
        }

        if (!user.isPresent() || !user.get().getUsername().equals(username)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자 정보가 일치하지 않습니다.");
        }

        // JWT 토큰 생성
        String token = jwtTokenUtil.generateToken(username, user.get().getRole());

        // 토큰 반환
        return ResponseEntity.ok("{\"token\":\"" + token + "\"}");
    }
    
}
