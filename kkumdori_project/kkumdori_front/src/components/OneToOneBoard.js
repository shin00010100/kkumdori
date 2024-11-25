import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router를 사용하여 페이지 이동
import "./OneToOneBoard.css";

function OneToOneBoard() {
    const [posts, setPosts] = useState([
        { title: "첫 번째 글", date: "2024-11-01", content: "첫 번째 글 내용입니다.", views: 10, author: "홍길동" },
        { title: "두 번째 글", date: "2024-11-02", content: "두 번째 글 내용입니다.", views: 5, author: "김철수" },
        { title: "세 번째 글", date: "2024-11-03", content: "세 번째 글 내용입니다.", views: 8, author: "이영희" },
        { title: "네 번째 글", date: "2024-11-04", content: "네 번째 글 내용입니다.", views: 12, author: "박민수" },
        { title: "다섯 번째 글", date: "2024-11-05", content: "다섯 번째 글 내용입니다.", views: 7, author: "조미진" },
        { title: "여섯 번째 글", date: "2024-11-06", content: "여섯 번째 글 내용입니다.", views: 9, author: "유지훈" },
        { title: "일곱 번째 글", date: "2024-11-07", content: "일곱 번째 글 내용입니다.", views: 15, author: "최지혜" },
        { title: "여덧 번째 글", date: "2024-11-08", content: "여덧 번째 글 내용입니다.", views: 3, author: "김정수" },
        { title: "아홉 번째 글", date: "2024-11-09", content: "아홉 번째 글 내용입니다.", views: 20, author: "박하늘" },
        { title: "열 번째 글", date: "2024-11-10", content: "열 번째 글 내용입니다.", views: 18, author: "윤서준" },
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const postsPerPage = 5;
    const navigate = useNavigate();

    // 날짜 필터링
    const filterPostsByDate = (posts) => {
        if (!startDate && !endDate) return posts;
        return posts.filter((post) => {
            const postDate = new Date(post.date);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;
            return (
                (!start || postDate >= start) && (!end || postDate <= end)
            );
        });
    };

    const filteredPosts = filterPostsByDate(posts);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="board-container">
            {/* 상단 텍스트 버튼 */}
            <div className="nav-buttons">
                <button onClick={() => navigate("/qnaboard")} className="nav-button">Q&A</button>
                <button onClick={() => navigate("/onetooneboard")} className="nav-button">1대1</button>
                <button onClick={() => navigate("/notice")} className="nav-button">공지사항</button>
                <button onClick={() => navigate("/faqboard")} className="nav-button">FAQ</button>
            </div>

            <h1>1:1 문의 게시판</h1>
            <div className="buttons">
                <button className="write-button" onClick={() => navigate("/onetoone")}>
                    글쓰기
                </button>
            </div>
            <div className="date-filter">
                <label>
                    시작 날짜 :
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </label>
                <label>
                    종료 날짜 :
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </label>
            </div>
            <ul className="post-list">
                {currentPosts.map((post, index) => (
                    <li key={index} className="post-item">
                        <h3>{post.title}</h3>
                        <p className="post-date">{post.date}</p>
                        <p>{post.content}</p>
                        <p className="post-views">조회수: {post.views}</p>
                        <p className="post-author">작성자: {post.author}</p>
                    </li>
                ))}
            </ul>
            <div className="pagination">
                <button
                    className="pagination-button"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    이전
                </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
                    <button
                        key={pageNumber}
                        className={`pagination-number ${currentPage === pageNumber ? 'active' : ''}`}
                        onClick={() => paginate(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))}
                <button
                    className="pagination-button"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    다음
                </button>
            </div>
        </div>
    );
}

export default OneToOneBoard;
