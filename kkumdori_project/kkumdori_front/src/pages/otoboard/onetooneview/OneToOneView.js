import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./OneToOneView.css";

function OneToOneView() {
    const { postId } = useParams(); // URL 파라미터에서 postId 가져오기
    const [post, setPost] = useState(null); // 단일 게시글 상태
    const [response, setResponse] = useState(""); // 답변 상태
    const navigate = useNavigate();
    
    // sessionStorage에서 로그인한 사용자 정보 가져오기
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser")); 
    console.log("Current User:", currentUser); // 사용자 정보 확인

    // 게시글 상세 정보 가져오기
    const fetchPostDetails = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8090/onetoone/onetooneview/${postId}/views`);
            if (response.status === 200) {
                setPost(response.data); // 게시글 데이터 설정
            }
        } catch (error) {
            console.error("Error fetching post details:", error);
            alert("게시글을 불러오는 중 오류가 발생했습니다.");
        }
    }, [postId]);

    useEffect(() => {
        fetchPostDetails(); // 페이지 로드 시 게시글 데이터 가져오기
    }, [fetchPostDetails]); // postId 변경 시마다 fetchPostDetails 호출

    const handleResponseChange = (e) => {
        setResponse(e.target.value); // 답변 입력값 업데이트
    };

    // 답변 등록
    const handleAddResponse = async () => {
        if (response.trim() === "") {
            alert("답변 내용을 입력하세요.");
            return;
        }

        try {
            const res = await axios.post(`http://localhost:8090/onetoone/onetooneview/${postId}/response`, {
                response, // 입력된 답변 데이터 전송
            });
            if (res.status === 200) {
                alert("답변이 등록되었습니다!");
                fetchPostDetails(); // 답변 등록 후 게시글 데이터 다시 가져오기
                setResponse(""); // 답변 입력창 비우기
            }
        } catch (error) {
            console.error("Error adding response:", error);
            alert("답변 등록 중 오류가 발생했습니다.");
        }
    };

    // 게시판으로 돌아가기
    const goBack = () => {
        navigate("/onetooneboard");
    };

    // 게시글이 로드되지 않은 경우 에러 메시지
    if (!post) {
        return (
            <div className="Error">
                게시글을 찾을 수 없습니다.<br /><br />
                <button onClick={goBack} className="back-button">
                    게시판으로 돌아가기
                </button>
            </div>
        );
    }

    return (
        <div className="view-container">
            <h1>1대1 문의 게시글</h1>
            <div className="post-detail">
                <h2>{post.title}</h2>
                <p className="post-date">작성일: {new Date(post.createdTime).toLocaleString()}</p>
                <p>작성자: {post.userFullName ? post.userFullName : '알 수 없음'}</p>
                <p>{post.content}</p>
            </div>

            {/* 답변 작성 및 기존 답변 표시 */}
            {post.isAnswered === true ? (  // 답변 여부에 따라 표시 다르게
                <div className="responses-section">
                    <h3>등록된 답변</h3>
                    <p>{post.answer}</p> {/* 등록된 답변 표시 */}
                </div>
            ) : (
                currentUser?.fullname === "관리자나리" && ( // localStorage에서 사용자 이름 확인
                    <div className="response-section">
                        <h3>답변 작성</h3>
                        <textarea
                            value={response}
                            onChange={handleResponseChange}
                            placeholder="답변 내용을 입력하세요."
                            rows="3"
                        />
                        <button onClick={handleAddResponse} className="submit-response-button">
                            답변 등록
                        </button>
                    </div>
                )
            )}

            <button onClick={goBack} className="back-button">
                게시판으로 돌아가기
            </button>
        </div>
    );
}

export default OneToOneView;
