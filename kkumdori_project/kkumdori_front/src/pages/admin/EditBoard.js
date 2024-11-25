import { useState, useEffect } from "react";
import "./EditBoard.css";
import InputAuthor from "../../components/InputAuthor";
import InputTitle from "../../components/InputTitle";
import BoardCategorySelect from "../../components/BoardCategorySelect";
import InputContent from "../../components/InputContent";
import ButtonGroup from "../../components/ButtonGroup";

const EditBoard = () => {
    // 유저의 역할과 ID 설정
    const [role] = useState("user");
    const [userId] = useState("user123");

    // 기존 게시글 데이터 예시
    const [post, setPost] = useState({
        title: "기존 제목 예시",
        content: "기존 글 내용 예시입니다.",
        category: "QnA"
    });

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        setTitle(post.title);
        setContent(post.content);
        setCategory(post.category);
    }, [post]);

    const handleSubmit = () => {
        const boardData = {
          userId,
          title,
          content,
          category,
        };
    
        // 데이터를 콘솔에 출력
        console.log("전송할 데이터:", boardData);
    
        // 전송 로직 자리
        alert("수정되었습니다.");
      };

    return (
        <div className="editBoard">
            <h2>게시글 수정</h2>
            <InputAuthor role={role} userId={userId} />
            <InputTitle title={title} setTitle={setTitle} />
            <BoardCategorySelect role={role} category={category} setCategory={setCategory} />
            <InputContent content={content} setContent={setContent} />
            <ButtonGroup
                onSubmit={handleSubmit}
                submitText="수정"
            />
        </div>
    );
};

export default EditBoard;