import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./OneToOneView.css";

function OneToOneView({ posts, addResponse }) {
    const { postId } = useParams();
    const post = posts.find((post) => post.id === parseInt(postId));
    const [response, setResponse] = useState("");
    const [existingResponse, setExistingResponse] = useState(null); // 단일 답변 상태
    const navigate = useNavigate();

    useEffect(() => {
        const storedResponse = localStorage.getItem(`response-${postId}`);
        if (storedResponse) {
            setExistingResponse(storedResponse);
        }
    }, [postId]);

    const goBack = () => {
        navigate("/onetooneboard");
    };

    const handleResponseChange = (e) => {
        setResponse(e.target.value);
    };

    const handleAddResponse = () => {
        if (existingResponse) {
            alert("이미 답변이 등록되어 있습니다.");
            return;
        }

        if (response.trim() !== "") {
            // 부모 컴포넌트의 함수를 호출하여 답변을 추가하고 로컬 상태 업데이트
            addResponse(post.id, response);
            setExistingResponse(response); // 답변 등록 후 상태 업데이트
            localStorage.setItem(`response-${post.id}`, response); // 로컬 스토리지에 저장
            setResponse(""); // 입력 필드 초기화
            alert("답변이 등록되었습니다!");
        } else {
            alert("답변 내용을 입력하세요.");
        }
    };

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
            <h1>1:1 문의 게시글</h1>
            <div className="post-detail">
                <h2>{post.title}</h2>
                <p className="post-date">{post.date}</p>
                <p>작성자: {post.author}</p>
                <p>문의 내용: {post.content}</p>
                {post.fileUrl && (
                    <div className="post-file">
                        <h3>첨부파일:</h3>
                        <img
                            src={post.fileUrl}
                            alt="첨부된 파일"
                            className="attached-image"
                        />
                    </div>
                )}
            </div>
            {/* 답변 작성 섹션 */}
            {!existingResponse && (
                <div className="response-section">
                    <h3>답변 작성</h3>
                    <textarea
                        value={response}
                        onChange={handleResponseChange}
                        placeholder="답변 내용을 입력하세요."
                        rows="3"
                    />
                    <button
                        onClick={handleAddResponse}
                        className="submit-response-button"
                    >
                        답변 등록
                    </button>
                </div>
            )}
            {existingResponse && (
                <div className="responses-section">
                    <h3>등록된 답변</h3>
                    <p>{existingResponse}</p>
                </div>
            )}
            <button onClick={goBack} className="back-button">
                게시판으로 돌아가기
            </button>
        </div>
    );
}

export default OneToOneView;
