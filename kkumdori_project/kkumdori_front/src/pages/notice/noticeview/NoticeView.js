import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./NoticeView.css";

function NoticeView() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    const fetchPostDetails = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8090/notice/noticeview/${postId}/views`);
            if (response.status === 200) {
                setPost(response.data);
            }
        } catch (error) {
            console.error("Error fetching post details:", error);
            alert("게시글을 불러오는 중 오류가 발생했습니다.");
        }
    }, [postId]);

    useEffect(() => {
        fetchPostDetails();
    }, [fetchPostDetails]);

    const goBack = () => {
        navigate("/noticeboard");
    };

    const deletePost = async () => {
        if (window.confirm("정말로 게시글을 삭제하시겠습니까?")) {
            try {
                 const response = await axios.delete(`http://localhost:8090/notice/noticeview/${postId}/views`);
                alert(response.data); // 삭제 성공 메시지 표시
                navigate("/noticeboard"); // 게시판으로 이동
            } catch (error) {
                console.error("Error deleting post:", error);
                alert("게시글 삭제 중 오류가 발생했습니다.");
            }
        }
    };

    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const isAdmin = currentUser && currentUser.fullname === "관리자나리"; // 관리자 확인

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

            <div className="button-container">
                <button onClick={goBack} className="back-button">
                    게시판으로 돌아가기
                </button>
                {/* 관리자일 때만 삭제 버튼 표시 */}
                {isAdmin && (
                    <button onClick={deletePost} className="delete-button">
                        게시글 삭제
                    </button>
                )}
            </div>
        </div>
    );
}

export default NoticeView;
