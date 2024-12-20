import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./OneToOneBoard.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function OneToOneBoard({ posts = [] , updatePostViews }) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const filtered = posts.filter(post => post.type === "OneToOne");
        setFilteredPosts(filtered);
    }, [posts]);

    const filterPostsByDateRange = () => {
        if (startDate && endDate) {
            const filtered = posts.filter((post) => {
                const postDate = new Date(post.date);
                return postDate >= startDate && postDate <= endDate && post.type === "OneToOne";
            });
            setFilteredPosts(filtered);
        }
    };

    const handlePostClick = (postId) => {
        updatePostViews(postId);
        navigate(`/onetooneview/${postId}`);
    };

    return (
        <div className="board-container">
            <h1>1:1 문의 게시판</h1>
            <div className="buttons">
                <button className="write-button" onClick={() => navigate("/onetoone")}>글쓰기</button>
            </div>
            <div className="date-picker-container">
                <label>시작 날짜:</label>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="시작 날짜 선택"
                />
                <label>끝 날짜:</label>
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
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
                        <p>{post.content}</p>
                        {/* 답변 완료 표시 */}
                        {post.response && (
                            <span className="response-completed">답변 완료</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default OneToOneBoard;
