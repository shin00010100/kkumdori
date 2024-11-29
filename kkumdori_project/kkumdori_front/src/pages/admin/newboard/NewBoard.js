import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewBoard.css";
import InputAuthor from "../../../components/inputauthor/InputAuthor";
import InputTitle from "../../../components/inputtitle/InputTitle";
import BoardCategorySelect from "../../../components/boardcategoryselect/BoardCategorySelect";
import InputContent from "../../../components/inputcontent/InputContent";
import ButtonGroup from "../../../components/buttongroup/ButtonGroup";
import { useAuth } from "../../../utils/AuthContext";

const NewBoard = () => {

    const { isAuth ,userRole, user } = useAuth(); // AuthContext에서 역할과 사용자 정보 가져오기
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        if (!isAuth) {
            alert("로그인 후 이용할 수 있습니다.");
            navigate("/login"); // 로그인 페이지로 리다이렉트
        }
    }, [isAuth, navigate]);

    const handleSubmit = () => {
        // 필드 유효성 검사
        // if (!user?.username) {
        //     alert("작성자를 확인할 수 없습니다. 다시 로그인해주세요.");
        //     return;
        // }
        if (!title.trim()) {
            alert("제목을 입력해주세요.");
            return;
        }
        if (!content.trim()) {
            alert("내용을 입력해주세요.");
            return;
        }
        const boardData = {
          userId: user?.username,
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
            <InputAuthor role={userRole} userId={user?.username} />
            <InputTitle title={title} setTitle={setTitle} />
            <BoardCategorySelect role={userRole} category={category} setCategory={setCategory} />
            <InputContent content={content} setContent={setContent} />
            <ButtonGroup
                onSubmit={handleSubmit}
                submitText="등록"
            />
        </div>
    )
};

export default NewBoard;