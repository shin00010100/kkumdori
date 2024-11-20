import React, { useState } from "react";
import "./OneToOneBoard.css";
import { useNavigate } from "react-router-dom"; // React Router를 사용하여 페이지 이동
import DatePicker from "react-datepicker"; // 날짜 선택 컴포넌트
import "react-datepicker/dist/react-datepicker.css"; // 스타일 임포트
import { addDays } from "date-fns"; // 날짜 계산을 위한 유틸리티

function OneToOneBoard() {
    const [posts, setPosts] = useState([
        { title: "첫 번째 글", date: "2024-11-18", content: "이것은 첫 번째 게시글입니다." },
        { title: "두 번째 글", date: "2024-11-17", content: "이것은 두 번째 게시글입니다." },
        { title: "세 번째 글", date: "2024-11-16", content: "이것은 세 번째 게시글입니다." },
        { title: "네 번째 글", date: "2024-11-15", content: "이것은 네 번째 게시글입니다." },
        { title: "다섯 번째 글", date: "2024-11-14", content: "이것은 다섯 번째 게시글입니다." },
        { title: "여섯 번째 글", date: "2024-11-13", content: "이것은 여섯 번째 게시글입니다." }
    ]); // 게시글 목록 (예시 데이터)

    const [startDate, setStartDate] = useState(null); // 시작 날짜
    const [endDate, setEndDate] = useState(null); // 종료 날짜
    const [filteredPosts, setFilteredPosts] = useState(posts); // 필터된 게시글 목록

    const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수

    // 날짜 범위 필터링
    const filterPostsByDateRange = () => {
        if (startDate && endDate) {
            const filtered = posts.filter((post) => {
                const postDate = new Date(post.date);
                return postDate >= startDate && postDate <= endDate;
            });
            setFilteredPosts(filtered); // 필터된 게시글 목록 업데이트
        }
    };

    return (
        <div className="board-container">
            <h1>1:1 문의 게시판</h1>
            <div className="buttons">
                <button className="write-button" onClick={() => navigate("/onetoone")}>
                    글쓰기
                </button>
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
                <button className="filter-button" onClick={filterPostsByDateRange}>
                    날짜 범위로 필터
                </button>
            </div>
            <ul className="post-list">
                {filteredPosts.map((post, index) => (
                    <li key={index} className="post-item">
                        <h3>{post.title}</h3>
                        <p className="post-date">{post.date}</p>
                        <p>{post.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default OneToOneBoard;
