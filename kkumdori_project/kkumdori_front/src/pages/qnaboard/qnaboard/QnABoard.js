import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./QnABoard.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function QnABoard() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [posts, setPosts] = useState([]); // 전체 게시글 목록
    const [filteredPosts, setFilteredPosts] = useState([]); // 필터링된 게시글 목록
    const navigate = useNavigate();

    // 게시글 데이터 가져오기
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:8080/qna/qnaboard");
                if (response.status === 200) {
                    setPosts(response.data);
                    setFilteredPosts(response.data);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
                setPosts([]);
                setFilteredPosts([]);
            }
        };

        fetchPosts();
    }, []);

    // 날짜 범위로 게시글 필터링
    useEffect(() => {
        if (!startDate && !endDate) {
            setFilteredPosts(posts); // 날짜 선택 해제 시 전체 게시글 표시
            return;
        }
        const filtered = posts.filter((post) => {
            const postDate = new Date(post.createdTime);
            return (!startDate || postDate >= startDate) && (!endDate || postDate <= endDate);
        });
        setFilteredPosts(filtered);
    }, [startDate, endDate, posts]);

    // 게시글 클릭 시 상세보기로 이동
    const handlePostClick = async (postId) => {
        try {
            await axios.get(`http://localhost:8080/qna/qnaview/${postId}/views`);
            navigate(`/qnaview/${postId}`);
        } catch (error) {
            console.error("Error updating post views:", error);
            alert("게시글을 불러오는 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="board-container">
            <h1>QnA 게시판</h1>
            <div className="buttons">
                <button className="write-button" onClick={() => navigate("/qna")}>
                    글쓰기
                </button>
            </div>
            <div className="date-picker-container">
                <label>시작 날짜:</label>
                <DatePicker
                    selected={startDate}
                    onChange={setStartDate}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="시작 날짜 선택"
                />
                <label>끝 날짜:</label>
                <DatePicker
                    selected={endDate}
                    onChange={setEndDate}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="끝 날짜 선택"
                />
            </div>

            {/* 게시글 리스트 */}
            {filteredPosts.length === 0 ? (
                <p>게시글이 없습니다.</p>
            ) : (
                <ul className="post-list">
                    {filteredPosts.map((post) => (
                        <li key={post.qnaNo} className="post-item" onClick={() => handlePostClick(post.qnaNo)}>
                            <h3>{post.title}</h3>
                            <p className="post-date">{new Date(post.createdTime).toLocaleDateString()}</p>
                            <p>작성자 번호: {post.userNo}</p>
                            {post.answer && <span className="response-completed">답변 완료</span>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default QnABoard;
