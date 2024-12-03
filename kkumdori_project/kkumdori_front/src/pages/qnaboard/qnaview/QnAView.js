import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./QnAView.css";

function QnAView({ posts, addResponse }) {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [response, setResponse] = useState("");
    const [existingResponse, setExistingResponse] = useState(null); // 단일 답변 상태
    const navigate = useNavigate();

    useEffect(() => {
        const foundPost = posts.find((post) => post.id === parseInt(postId));
        setPost(foundPost);
        if (foundPost && foundPost.response) {
            setExistingResponse(foundPost.response);
        }
    }, [postId, posts]);

    const goBack = () => {
        navigate("/qnaboard");
    };

    const handleResponseChange = (e) => {
        setResponse(e.target.value);
    };

    const handleAddResponse = () => {
        if (response.trim() !== "") {
            addResponse(post.id, response);
            setExistingResponse(response); // 답변 등록 후 상태 업데이트
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
            <h1>QnA 게시글</h1>
            <div className="post-detail">
                <h2>{post.title}</h2>
                <p className="post-date">{post.date}</p>
                <p>작성자: {post.author}</p>
                <p>조회수: {post.views}</p>
                <p>{post.content}</p>
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
            {!existingResponse && (
                <div className="response-section">
                    <h3>답변 작성</h3>
                    <textarea
                        value={response}
                        onChange={handleResponseChange}
                        placeholder="답변 내용을 입력하세요."
                        rows="3"
                    />
                    <button onClick={handleAddResponse} className="submit-response-button">
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

export default QnAView;
