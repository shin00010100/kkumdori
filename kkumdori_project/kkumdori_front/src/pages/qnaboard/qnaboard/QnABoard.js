import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./QnABoard.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function QnABoard({ posts, updatePostViews }) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setFilteredPosts(posts.filter(post => post.type === "QnA"));
    }, [posts]);

    const filterPostsByDateRange = () => {
        if (startDate && endDate) {
            const filtered = posts.filter((post) => {
                const postDate = new Date(post.date);
                return postDate >= startDate && postDate <= endDate && post.type === "QnA";
            });
            setFilteredPosts(filtered);
        }
    };

    const handlePostClick = (postId) => {
        updatePostViews(postId);
        navigate(`/qnaview/${postId}`);
    };

    return (
        <div className="board-container">
            <h1>QnA 게시판</h1>
            <div className="buttons">
                <button className="write-button" onClick={() => navigate("/qna")}>글쓰기</button>
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
                <button className="filter-button" onClick={filterPostsByDateRange}>날짜 범위로 필터</button>
            </div>
            <ul className="post-list">
                {filteredPosts.map((post) => (
                    <li key={post.id} className="post-item" onClick={() => handlePostClick(post.id)}>
                        <h3>{post.title}</h3>
                        <p className="post-date">{post.date}</p>
                        <p>작성자: {post.author}</p>
                        <p>조회수: {post.views}</p>
                        <p>{post.content}</p>
                        {post.response && <span className="response-completed">답변 완료</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default QnABoard;
