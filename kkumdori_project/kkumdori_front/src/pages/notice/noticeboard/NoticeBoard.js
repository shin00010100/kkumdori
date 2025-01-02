import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./NoticeBoard.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function NoticeBoard() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const navigate = useNavigate();

    // 사용자 정보 확인
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const isAdmin = currentUser && currentUser.fullname === "관리자나리";

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:8090/notice/noticeboard");
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

    useEffect(() => {
        if (!startDate && !endDate) {
            setFilteredPosts(posts);
            return;
        }
        const filtered = posts.filter((post) => {
            const postDate = new Date(post.createdTime);
            return (!startDate || postDate >= startDate) && (!endDate || postDate <= endDate);
        });
        setFilteredPosts(filtered);
    }, [startDate, endDate, posts]);

    const handlePostClick = async (postId) => {
        try {
            await axios.get(`http://localhost:8090/notice/noticeview/${postId}/views`);
            navigate(`/noticeview/${postId}`);
        } catch (error) {
            console.error("Error updating post views:", error);
            alert("게시글을 불러오는 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="board-container">
            <h1>공지사항 게시판</h1>
            <div className="buttons">
                {/* 관리자일 때만 공지사항 작성 버튼 표시 */}
                {isAdmin && (
                    <button 
                        className="write-button" 
                        onClick={() => navigate("/notice")}
                    >
                        공지사항 작성
                    </button>
                )}
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

            {filteredPosts.length === 0 ? (
                <p>공지사항이 없습니다.</p>
            ) : (
                <ul className="post-list">
                    {filteredPosts.map((post) => (
                        <li key={post.noticeNo} className="post-item" onClick={() => handlePostClick(post.noticeNo)}>
                            <h3>{post.title}</h3>
                            <p className="post-date">{new Date(post.createdTime).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default NoticeBoard;
