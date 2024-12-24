import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./NoticeView.css";

function NoticeView() {
    const { postId } = useParams(); // URL 파라미터에서 postId 가져오기
    const [post, setPost] = useState(null); // 단일 게시글 상태
    const navigate = useNavigate();

    // 게시글 상세 정보 가져오기
    const fetchPostDetails = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/notice/noticeview/${postId}/views`);
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
    }, [fetchPostDetails]);

    // 게시판으로 돌아가기
    const goBack = () => {
        navigate("/noticeboard");
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
            <h1>Notice 게시글</h1>
            <div className="post-detail">
                <h2>{post.title}</h2>
                <p className="post-date">작성일: {new Date(post.createdTime).toLocaleString()}</p>
                <p>작성자: {post.author === 1 ? "관리자" : `사용자 ${post.author}`}</p>
                <p>{post.content}</p>
            </div>

            <button onClick={goBack} className="back-button">
                게시판으로 돌아가기
            </button>
        </div>
    );
}

export default NoticeView;
