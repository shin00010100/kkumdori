package com.kkumdori.shop.login.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
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
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.kkumdori.shop.login.dto.UserApiResponse;
import com.kkumdori.shop.login.dto.UserDto;
import com.kkumdori.shop.login.dto.UserResponse;
import com.kkumdori.shop.login.entity.User;
import com.kkumdori.shop.login.repository.UserRepository;
import com.kkumdori.shop.login.request.EmailVerificationRequest;
import com.kkumdori.shop.login.request.PasswordResetRequest;
import com.kkumdori.shop.login.request.PhoneVerificationRequest;
import com.kkumdori.shop.login.service.EmailService;
import com.kkumdori.shop.login.service.SmsService;
import com.kkumdori.shop.login.service.UserService;
import com.kkumdori.shop.login.service.VerificationService;
import com.kkumdori.shop.security.JwtTokenUtil;

import jakarta.mail.MessagingException;

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
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        Optional<User> user = userService.findByUsername(username); // 사용자 조회
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            String token = jwtTokenUtil.generateToken(username, user.get().getRole());
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
//            response.put("fullname", user.get().getFullname());
//            response.put("role", user.get().getRole());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
        }
    }
    
    
    // 카카오 로그인
    @PostMapping("/login/kakao")
    public ResponseEntity<Map<String, String>> kakaoLogin(@RequestBody Map<String, String> credentials) {
        String kakaoAccessToken = credentials.get("token");

        // 카카오 사용자 정보 조회
        String kakaoApiUrl = "https://kapi.kakao.com/v2/user/me";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + kakaoAccessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        RestTemplate restTemplate = new RestTemplate();

        try {
            // 카카오 사용자 정보 조회
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                kakaoApiUrl, 
                HttpMethod.GET, 
                entity, 
                new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            Map<String, Object> kakaoUser = response.getBody();

            if (kakaoUser == null) {
                System.out.println("카카오 사용자 정보를 가져올 수 없습니다.");  // 로그 추가
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "카카오 사용자 정보를 가져올 수 없습니다."));
            }

            // 카카오 사용자 ID 추출
            String kakaoUserId = kakaoUser.get("id").toString();  // 카카오 고유 ID
            System.out.println("카카오 사용자 ID: " + kakaoUserId);  // 로그 추가

            // 사용자 이름 추출
            String fullname = "이름 없음";
            if (kakaoUser.get("properties") instanceof Map<?, ?>) {
                Map<?, ?> properties = (Map<?, ?>) kakaoUser.get("properties");
                fullname = (String) properties.get("nickname");
                System.out.println("사용자 이름: " + fullname);  // 로그 추가
            } else {
                System.out.println("properties가 Map 타입이 아닙니다.");  // 로그 추가
            }

            // 사용자 정보 DB에 저장
            Optional<User> user = userService.findByUsername(kakaoUserId);  // 카카오 ID로 사용자 찾기
            if (user.isEmpty()) {
                // 신규 사용자라면 카카오 정보로 회원가입 처리
                System.out.println("신규 사용자, 카카오 정보로 회원가입 처리 중...");  // 로그 추가
                User newUser = new User();
                newUser.setUsername(kakaoUserId);  // 카카오 고유 ID
                newUser.setFullname(fullname);     // 이름
                
                // 임의의 값을 설정
                newUser.setEmail(userService.generateVerificationCode() + "@example.com");   // 임의 이메일
                newUser.setBank("SampleBank");                // 임의 은행명
                newUser.setAccount("0000000000");             // 임의 계좌번호
                newUser.setZipcode("00000");                  // 임의 우편번호
                newUser.setAddress("Sample Address");         // 임의 주소
                newUser.setRole(User.Role.valueOf("user"));   // User.Role로 변경                      // 기본 권한 설정 (사용자 권한)
                newUser.setTel("kakao"+userService.generateVerificationCode());              // 임의 전화번호
                
                // 비밀번호 암호화
                String rawPassword = userService.generateVerificationCode();
                String encodedPassword = passwordEncoder.encode(rawPassword);
                newUser.setPassword(encodedPassword);                     
                
                userService.save(newUser);
                System.out.println("신규 사용자 등록 완료: " + newUser.getUsername());  // 로그 추가
            } else {
                System.out.println("기존 사용자 확인: " + kakaoUserId);  // 로그 추가
            }

            // JWT 토큰 생성
            String token = jwtTokenUtil.generateToken(kakaoUserId, User.Role.valueOf("user"));
            System.out.println("JWT 토큰 생성 완료: " + token);  // 로그 추가

            // 응답 데이터 생성
            Map<String, String> responseMap = new HashMap<>();
            responseMap.put("token", token);
//            responseMap.put("fullname", fullname);
//            responseMap.put("role", "user");

            return ResponseEntity.ok(responseMap);
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            // HTTP 오류가 발생한 경우
            System.out.println("HTTP 오류 발생: " + e.getMessage());  // 로그 추가
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "카카오 로그인 실패: " + e.getMessage()));
        } catch (Exception e) {
            // 기타 예외 처리
            e.printStackTrace();  // 예외 스택 트레이스를 출력하여 문제를 상세히 확인
            System.out.println("서버 오류 발생: " + e.getMessage());  // 로그 추가
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "서버 오류: " + e.getMessage()));
        }
    }  
    
    
    @PostMapping("/login/naver")
    public ResponseEntity<Map<String, String>> naverLogin(@RequestBody Map<String, String> credentials) {
        String naverAccessToken = credentials.get("token");

        // 네이버 사용자 정보 조회
        String naverApiUrl = "https://openapi.naver.com/v1/nid/me";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + naverAccessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        RestTemplate restTemplate = new RestTemplate();

        try {
            // 네이버 사용자 정보 조회
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                naverApiUrl,
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            Map<String, Object> naverUser = response.getBody();

            if (naverUser == null) {
                System.out.println("네이버 사용자 정보를 가져올 수 없습니다.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "네이버 사용자 정보를 가져올 수 없습니다."));
            }

            // 네이버 사용자 ID 추출
            String naverUserId = "";
            if (naverUser.containsKey("response")) {
                Object responseObj = naverUser.get("response");
                if (responseObj instanceof Map) {
                    @SuppressWarnings("unchecked")
                    Map<String, Object> responseMap = (Map<String, Object>) responseObj;
                    if (responseMap != null && responseMap.get("id") != null) {
                        naverUserId = responseMap.get("id").toString();
                        System.out.println("네이버 사용자 ID: " + naverUserId);
                    } else {
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "네이버 사용자 ID가 없습니다."));
                    }
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "응답 데이터 형식이 잘못되었습니다."));
                }
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "응답에서 사용자 정보를 찾을 수 없습니다."));
            }

            // 사용자 이름 추출
            String fullname = "이름 없음";
            if (naverUser.get("response") instanceof Map<?, ?>) {
                Map<?, ?> responseMap = (Map<?, ?>) naverUser.get("response");
                if (responseMap != null && responseMap.get("name") != null) {
                    fullname = (String) responseMap.get("name");
                }
            }

            // 사용자 정보 DB에 저장
            Optional<User> user = userService.findByUsername(naverUserId);
            if (user.isEmpty()) {
                // 신규 사용자라면 네이버 정보로 회원가입 처리
                System.out.println("신규 사용자, 네이버 정보로 회원가입 처리 중...");
                
                // username 중복 방지: 네이버 ID에 랜덤 문자열 추가
                String generatedUsername = naverUserId;

                User newUser = new User();
                newUser.setUsername(generatedUsername);  // 네이버 고유 ID + 랜덤 문자열
                newUser.setFullname(fullname);
                newUser.setEmail(userService.generateVerificationCode() + "@example.com");
                newUser.setBank("SampleBank");
                newUser.setAccount("0000000000");
                newUser.setZipcode("00000");
                newUser.setAddress("Sample Address");
                newUser.setRole(User.Role.valueOf("user"));   // User.Role로 변경
                newUser.setTel("naver" + userService.generateVerificationCode());

                // 비밀번호 암호화
                String rawPassword = userService.generateVerificationCode();
                String encodedPassword = passwordEncoder.encode(rawPassword);
                newUser.setPassword(encodedPassword);

                userService.save(newUser);
                System.out.println("신규 사용자 등록 완료: " + newUser.getUsername());
            } else {
                System.out.println("기존 사용자 확인: " + naverUserId);
            }

            // JWT 토큰 생성
            String token = jwtTokenUtil.generateToken(naverUserId, User.Role.valueOf("user"));
            System.out.println("JWT 토큰 생성 완료: " + token);

            // 응답 데이터 생성
            Map<String, String> responseMap = new HashMap<>();
            responseMap.put("token", token);
//            responseMap.put("fullname", fullname);
//            responseMap.put("role", "user");

            return ResponseEntity.ok(responseMap);
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            // HTTP 오류 발생한 경우
            System.out.println("HTTP 오류 발생: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "네이버 로그인 실패: " + e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("서버 오류 발생: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "서버 오류: " + e.getMessage()));
        }
    }
    
    // 구글 로그인 API 호출 처리
    @PostMapping("/login/google")
    public ResponseEntity<Map<String, String>> googleLogin(@RequestBody Map<String, String> credentials) {
        String googleAccessToken = credentials.get("token");

        // 구글 사용자 정보 조회
        String googleApiUrl = "https://www.googleapis.com/oauth2/v3/userinfo";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + googleAccessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        RestTemplate restTemplate = new RestTemplate();

        try {
            // 구글 사용자 정보 조회
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                googleApiUrl,
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            Map<String, Object> googleUser = response.getBody();

            if (googleUser == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "구글 사용자 정보를 가져올 수 없습니다."));
            }

            // 구글 사용자 ID 및 이름 추출
            String googleUserId = googleUser.get("sub").toString();  // 구글 고유 ID
            String fullname = googleUser.get("name").toString();     // 이름

            // 사용자 정보 DB에 저장
            Optional<User> user = userService.findByUsername(googleUserId);
            if (user.isEmpty()) {
                // 신규 사용자라면 구글 정보로 회원가입 처리
                User newUser = new User();
                newUser.setUsername(googleUserId);  // 구글 고유 ID
                newUser.setFullname(fullname);      // 이름
                newUser.setEmail(userService.generateVerificationCode() + "@example.com");  // 임의 이메일
                newUser.setBank("SampleBank");                // 임의 은행명
                newUser.setAccount("0000000000");             // 임의 계좌번호
                newUser.setZipcode("00000");                  // 임의 우편번호
                newUser.setAddress("Sample Address");         // 임의 주소
                newUser.setRole(User.Role.valueOf("user"));   // User.Role로 변경            // 기본 권한 설정 (사용자 권한)
                newUser.setTel("google" + userService.generateVerificationCode());        // 임의 전화번호

                // 비밀번호 암호화
                String rawPassword = userService.generateVerificationCode();
                String encodedPassword = passwordEncoder.encode(rawPassword);
                newUser.setPassword(encodedPassword);

                userService.save(newUser);
            }

            // JWT 토큰 생성
            String token = jwtTokenUtil.generateToken(googleUserId, User.Role.valueOf("user"));

            // 응답 데이터 생성
            Map<String, String> responseMap = new HashMap<>();
            responseMap.put("token", token);
//            responseMap.put("fullname", fullname);
//            responseMap.put("role", "user");

            return ResponseEntity.ok(responseMap);

        } catch (HttpClientErrorException | HttpServerErrorException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "구글 로그인 실패: " + e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "서버 오류: " + e.getMessage()));
        }
    }

   
    // 로그인 후 사용자 정보 조회
    @GetMapping("/getuser")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String token) {
        // Authorization 헤더에서 "Bearer " 제거한 토큰만 추출
        String jwtToken = token.replace("Bearer ", "");
        System.out.println("Received Token: " + jwtToken); // 서버 로그에 토큰 확인

        // 토큰 검증 및 사용자 정보 조회
        Optional<User> userOptional = jwtTokenUtil.verifyToken(jwtToken, userRepository);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // UserResponse 객체 생성 (role을 String으로 변환)
            UserResponse userResponse = new UserResponse(
                    user.getUserNo(), 
                    user.getFullname(), 
                    user.getRole().toString() // User.Role을 String으로 변환하여 전달
            );
            return ResponseEntity.ok(userResponse); // UserResponse 객체 반환
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않거나 만료된 토큰입니다.");
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
    
    // 회원가입 이메일 인증번호 전송
    @PostMapping("/SignEmailVerificationCode")
    public ResponseEntity<UserApiResponse> sendEmailVerificationCode(@RequestBody EmailVerificationRequest request) {
        String email = request.getEmail();

        // 인증번호 생성
        String verificationCode = userService.generateVerificationCode();
        
        try {
            // 이메일로 인증번호 전송
            emailService.sendVerificationCode(email, verificationCode);

            // 인증번호를 응답에 포함하여 반환
            return ResponseEntity.ok(new UserApiResponse(true, "인증번호가 이메일로 전송되었습니다.", verificationCode));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new UserApiResponse(false, "인증번호 전송에 실패했습니다."));
        }
    }

    // 회원가입 전화번호 인증번호 전송
    @PostMapping("/SignPhoneVerificationCode")
    public ResponseEntity<UserApiResponse> sendPhoneVerificationCode(@RequestBody PhoneVerificationRequest request) {
        String tel = request.getTel();

        // 인증번호 생성
        String verificationCode = userService.generateVerificationCode();
        
        try {
            // 전화번호로 인증번호 전송 (SmsService 활용)
            SmsService smsService = new SmsService();
            smsService.sendSms(tel, verificationCode); // 전화번호와 인증번호 전송
        	
        	// 인증번호 저장
        	verificationService.saveCode(request.getTel(), verificationCode);
        	 // 인증번호 콘솔에 출력
            System.out.println("전송된 인증번호: " + verificationCode);

            // 인증번호를 응답에 포함하여 반환
            return ResponseEntity.ok(new UserApiResponse(true, "인증번호가 전화번호로 전송되었습니다.", verificationCode));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new UserApiResponse(false, "인증번호 전송에 실패했습니다."));
        }
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
            
            // 인증번호 SMS로 발송
            SmsService smsService = new SmsService();
            smsService.sendSms(request.getTel(), verificationCode); // 전화번호와 인증번호 전송
            
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
            
          // 인증번호 SMS로 발송
          SmsService smsService = new SmsService();
          smsService.sendSms(request.getTel(), verificationCode); // 전화번호와 인증번호 전송
            
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
        // Authorization 헤더에서 JWT 토큰을 먼저 확인합니다.
        String jwtToken = token.replace("Bearer ", "");
        
        // JWT 토큰이 없으면 resetToken을 사용
        if (jwtToken.isEmpty()) {
            jwtToken = request.getToken(); // PasswordResetRequest에서 받은 resetToken 사용
        }

        if (jwtToken.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("유효한 토큰이 없습니다.");
        }

        // JWT 토큰을 통해 사용자 검증
        Optional<User> userOptional = jwtTokenUtil.verifyToken(jwtToken, userRepository);
        User user = userOptional.orElseThrow(() -> new UsernameNotFoundException("유효하지 않거나 만료된 토큰입니다."));

        // 새 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(request.getNewPassword());
        user.setPassword(encodedPassword);  // 새 비밀번호 설정

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
    
    // 관리자 이메일 전송 메서드
    @PostMapping("/sendAdminEmail")
    public ResponseEntity<String> sendAdminEmail(
            @RequestParam String recipient,
            @RequestParam String title,
            @RequestParam String content,
            @RequestParam(required = false) MultipartFile attachment) throws MessagingException, IOException {
        
        System.out.println("recipient: " + recipient);
        System.out.println("title: " + title);
        System.out.println("content: " + content);
        
        try {
            emailService.sendEmailWithAttachment(recipient, title, content, attachment);
            return ResponseEntity.ok("이메일이 성공적으로 전송되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("이메일 전송 실패: " + e.getMessage());
        }
    }
    
}
