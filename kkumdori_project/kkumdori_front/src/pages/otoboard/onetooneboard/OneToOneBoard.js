import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./OneToOneBoard.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function OneToOneBoard() {
    const [userNo, setUserNo] = useState(null); // 로그인한 사용자 번호 상태 추가
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [posts, setPosts] = useState([]); // 전체 게시글 목록
    const [filteredPosts, setFilteredPosts] = useState([]); // 필터링된 게시글 목록
    const navigate = useNavigate();

    // 사용자 정보 가져오기
    const fetchUserData = async () => {
        let token = sessionStorage.getItem("jwt");
        if (!token) {
            token = localStorage.getItem("jwt");
        }

        if (!token) {
            alert("로그인이 필요합니다.");
            navigate("/login"); // 로그인 페이지로 리디렉션
            return;
        }

        try {
            const response = await axios.get("http://localhost:8090/api/auth/getuser", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserNo(response.data.userNo); // 사용자 번호 설정
        } catch (error) {
            console.error("사용자 정보를 가져오는 데 실패했습니다:", error);
            alert("사용자 정보를 가져오는 데 실패했습니다.");
        }
    };

    // 게시글 데이터 가져오기
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:8090/onetoone/onetooneboard");
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

        fetchUserData(); // 사용자 정보 가져오기 호출
        fetchPosts(); // 게시글 데이터 가져오기
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

    // 자신이 작성한 글만 필터링 또는 관리자인 경우 모든 글 표시
    useEffect(() => {
        const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        if (currentUser && currentUser.fullname === "관리자나리") {
            setFilteredPosts(posts); // 관리자의 경우 모든 게시글 표시
        } else if (userNo !== null) {
            const userPosts = posts.filter(post => post.userNo === userNo);
            setFilteredPosts(userPosts); // 일반 사용자의 경우 자신의 게시글만 표시
        }
    }, [userNo, posts]);

    // 게시글 클릭 시 상세보기로 이동
    const handlePostClick = async (postId) => {
        try {
            await axios.get(`http://localhost:8090/onetoone/onetooneview/${postId}/views`);
            navigate(`/onetooneview/${postId}`);
        } catch (error) {
            console.error("Error updating post views:", error);
            alert("게시글을 불러오는 중 오류가 발생했습니다.");
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
                        <li key={post.onetooneNo} className="post-item" onClick={() => handlePostClick(post.onetooneNo)}>
                            <h3>{post.title}</h3>
                            <p className="post-date">{new Date(post.createdTime).toLocaleDateString()}</p>
                            <p>작성자 번호: {post.userNo}</p> {/* 작성자 번호 표시 */}
                            {post.answer && <span className="response-completed">답변 완료</span>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default OneToOneBoard;
