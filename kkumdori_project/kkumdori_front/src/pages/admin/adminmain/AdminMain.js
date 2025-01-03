import { useNavigate } from 'react-router-dom';
import Button from "../../../components/button/Button";
import HLine from "../../../utils/HLine";
import "./AdminMain.css";

const AdminMain = () => {
    const navigate = useNavigate();
    return(
        <div className="admin">
            <h2>관리자 메인홈</h2>
            <section className="section product-section">
                <h3>상품</h3>
                <div className="admin-button-group">
                <Button
                        text={"상품 등록"}
                        onClick={() => navigate("/registgoods")}
                    />
                    <Button
                        text={"상품 관리"}
                        onClick={() => navigate("/productlist")}
                    />
                </div>
            </section>
            <HLine />

            <section className="section board-sms-section">
                <div className="sub-section">
                    <h3>공지사항</h3>
                    <div className="admin-button-group">
                    <Button
                        text={"공지사항 작성"}
                        onClick={() => navigate("/notice")}
                    />
                    <Button
                        text={"공지사항 관리"}
                        onClick={() => navigate("/noticeboard")}
                    />
                    </div>
                </div>
                <div className="sub-section">
                    <h3>QnA</h3>
                    <div className="admin-button-group">
                    <Button
                        text={"QnA 답변"}
                        onClick={() => navigate("/qnaboard")}
                    />
                    </div>
                </div>
                <div className="sub-section">
                    <h3>이메일</h3>
                    <Button
                        text={"이메일 발송"}
                        onClick={() => navigate("/sendmessage")}
                    />
                </div>
            </section>
            <HLine />

            {/* <section className="section image-section"> */}
            <section className="section board-sms-section">
                <div className="sub-section">
                <h3>팝업/배너</h3>
                <Button
                        text={"팝업/배너 관리"}
                        onClick={() => navigate("/editbanner")}
                    />
                </div>
                <div className="sub-section">
                    <h3>카테고리</h3>
                    <Button
                        text={"카테고리 설정"}
                        onClick={() => navigate("/editcategory")}
                    />
                </div>
            </section>
            <HLine />
        </div>
    )
};

export default AdminMain;