import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "./ButtonGroup.css";

const ButtonGroup = ({ onSubmit, submitText }) => {
    const navigate = useNavigate();

    return (
        <div className="button-group">
            <Button
                text="취소"
                type="negative"
                onClick={() => navigate(-1)}
            />
            <Button
                text={submitText}
                onClick={onSubmit}
            />
        </div>
    );
};

export default ButtonGroup;