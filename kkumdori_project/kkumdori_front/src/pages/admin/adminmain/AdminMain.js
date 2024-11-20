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
                <div className="search-box">
                    <input type="text" placeholder="상품 검색" />
                    <Button
                        text={"🔍"}
                        onClick={() => {alert("검색")}}
                    />
                </div>
                <div className="admin-button-group">
                <Button
                        text={"상품 등록"}
                        onClick={() => navigate("/regist")}
                    />
                    <Button
                        text={"상품 관리"}
                        onClick={() => {alert("관리")}}
                    />
                </div>
            </section>
            <HLine />

            <section className="section board-sms-section">
                <div className="sub-section">
                    <h3>게시판</h3>
                    <div className="admin-button-group">
                    <Button
                        text={"게시판 작성"}
                        onClick={() => navigate("/new")}
                    />
                    <Button
                        text={"게시판 관리"}
                        onClick={() => {alert("관리")}}
                    />
                    </div>
                </div>
                <div className="sub-section">
                    <h3>SMS</h3>
                    <Button
                        text={"메시지 발송"}
                        onClick={() => navigate("/send")}
                    />
                </div>
            </section>
            <HLine />

            <section className="section image-section">
                <h3>팝업/배너</h3>
                <Button
                        text={"팝업/배너 관리"}
                        onClick={() => navigate("/banner")}
                    />
            </section>
            <HLine />
        </div>
    )
};

export default AdminMain;