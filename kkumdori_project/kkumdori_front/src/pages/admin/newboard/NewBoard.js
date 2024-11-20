import { useState } from "react";
import "./NewBoard.css";
import InputAuthor from "../../../components/inputauthor/InputAuthor";
import InputTitle from "../../../components/inputtitle/InputTitle";
import BoardCategorySelect from "../../../components/boardcategoryselect/BoardCategorySelect";
import InputContent from "../../../components/inputcontent/InputContent";
import ButtonGroup from "../../../components/buttongroup/ButtonGroup";

const NewBoard = () => {
    const  [role, setRole] = useState("user");

    // test
    const toggleRole = () => {
        setRole((prevRole) => (prevRole === "user" ? "admin" : "user"));
    };
    const [userId] = useState("user123");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = () => {
        const boardData = {
          userId,
          title,
          content,
          category,
        };
    
        // 데이터를 콘솔에 출력
        console.log("전송할 데이터:", boardData);
    
        // 실제 전송 로직 자리.
        alert("등록되었습니다.");
      };

    return(
        <div className="newBoard">
            <h2>게시글 쓰기</h2>
            <InputAuthor role={role} userId={userId} />
            <InputTitle title={title} setTitle={setTitle} />
            <BoardCategorySelect role={role} category={category} setCategory={setCategory} />
            <InputContent content={content} setContent={setContent} />
            <ButtonGroup
                onSubmit={handleSubmit}
                submitText="등록"
            />

            <div style={{ marginBottom: "10px" }}>
                <button onClick={toggleRole}>
                    현재 역할: {role === "admin" ? "관리자" : "일반 사용자"} (변경하기)
                </button>
            </div>
        </div>
    )
};

export default NewBoard;