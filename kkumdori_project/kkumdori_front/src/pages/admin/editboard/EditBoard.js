import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EditBoard.css";
import InputAuthor from "../../../components/inputauthor/InputAuthor";
import InputTitle from "../../../components/inputtitle/InputTitle";
import BoardCategorySelect from "../../../components/boardcategoryselect/BoardCategorySelect";
import InputContent from "../../../components/inputcontent/InputContent";
import ButtonGroup from "../../../components/buttongroup/ButtonGroup";
import { useAuth } from "../../../utils/AuthContext";

const EditBoard = () => {
    const { isAuth, userRole, user } = useAuth();
    const navigate = useNavigate();

    // 기존 게시글 데이터 예시 (실제 데이터는 백엔드에서 불러올 예정)
    const [post, setPost] = useState({
        title: "기존 제목 예시",
        content: "기존 글 내용 예시입니다.",
        category: "QnA",
    });

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");

    // 로그인 상태 확인
    useEffect(() => {
        if (!isAuth) {
            alert("로그인 후 이용할 수 있습니다.");
            navigate("/login"); // 로그인 페이지로 리다이렉트
        }
    }, [isAuth, navigate]);

    // 기존 게시글 데이터를 상태에 설정
    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setContent(post.content);
            setCategory(post.category);
        }
    }, [post]);

    const handleSubmit = () => {
        // 필드 유효성 검사
        if (!user?.username) {
            alert("작성자를 확인할 수 없습니다. 다시 로그인해주세요.");
            return;
        }
        if (!title.trim()) {
            alert("제목을 입력해주세요.");
            return;
        }
        if (!content.trim()) {
            alert("내용을 입력해주세요.");
            return;
        }
        if (!category) {
            alert("분류를 선택해주세요.");
            return;
        }

        const boardData = {
            userId: user.username,
            title,
            content,
            category,
        };

        // 데이터를 콘솔에 출력 (추후 서버로 전송)
        console.log("수정된 데이터:", boardData);

        alert("수정되었습니다.");
    };

    return (
        <div className="editBoard">
            <h2>게시글 수정</h2>
            <InputAuthor role={userRole} userId={user?.username} />
            <InputTitle title={title} setTitle={setTitle} />
            <BoardCategorySelect role={userRole} category={category} setCategory={setCategory} />
            <InputContent content={content} setContent={setContent} />
            <ButtonGroup
                onSubmit={handleSubmit}
                submitText="수정"
            />
        </div>
    );
};

export default EditBoard;