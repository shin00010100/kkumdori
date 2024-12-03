import React, { useState } from "react";
import "./FAQBoard.css"; // 새로운 스타일 파일 추가

function FAQBoard() {
    const [posts] = useState([
        { title: "배달 언제오나요?", date: "2024-11-01", content: "방금 출발했습니다~", views: 10, author: "홍길동" },
        { title: "두 번째 FAQ", date: "2024-11-02", content: "두 번째 FAQ 내용입니다.", views: 5, author: "김철수" },
        { title: "세 번째 FAQ", date: "2024-11-03", content: "세 번째 FAQ 내용입니다.", views: 8, author: "이영희" },
        { title: "네 번째 FAQ", date: "2024-11-04", content: "네 번째 FAQ 내용입니다.", views: 12, author: "박민수" },
        { title: "다섯 번째 FAQ", date: "2024-11-05", content: "다섯 번째 FAQ 내용입니다.", views: 7, author: "조미진" },
        { title: "여섯 번째 FAQ", date: "2024-11-06", content: "여섯 번째 FAQ 내용입니다.", views: 9, author: "유지훈" },
        { title: "일곱 번째 FAQ", date: "2024-11-07", content: "일곱 번째 FAQ 내용입니다.", views: 15, author: "최지혜" },
        { title: "여덟 번째 FAQ", date: "2024-11-08", content: "여덟 번째 FAQ 내용입니다.", views: 3, author: "김정수" },
        { title: "아홉 번째 FAQ", date: "2024-11-09", content: "아홉 번째 FAQ 내용입니다.", views: 20, author: "박하늘" },
        { title: "열 번째 FAQ", date: "2024-11-10", content: "열 번째 FAQ 내용입니다.", views: 18, author: "윤서준" },
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 추가
    const postsPerPage = 5;

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

    // 검색 필터링
    const filterPostsBySearch = (posts) => {
        if (!searchQuery) return posts;
        return posts.filter((post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const filteredPosts = filterPostsBySearch(filterPostsByDate(posts));
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="faq-board-container">
            <h1>자주 묻는 질문</h1>

            <div className="faq-date-filter">
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
            <div className="faq-search">
                <input
                    type="text"
                    placeholder="제목 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="faq-search-input"
                />
            </div>
            <ul className="faq-post-list">
                {currentPosts.map((post, index) => (
                    <li key={index} className="faq-post-item">
                        <h3>{post.title}</h3>
                        <p className="faq-post-date">{post.date}</p>
                        <p>{post.content}</p>
                        <p className="faq-post-views">조회수: {post.views}</p>
                    </li>
                ))}
            </ul>
            <div className="faq-pagination">
                <button
                    className="faq-pagination-button"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    이전
                </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
                    <button
                        key={pageNumber}
                        className={`faq-pagination-number ${currentPage === pageNumber ? 'active' : ''}`}
                        onClick={() => paginate(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))}
                <button
                    className="faq-pagination-button"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    다음
                </button>
            </div>
        </div>
    );
}

export default FAQBoard;