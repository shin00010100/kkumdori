import "./InputAuthor.css"
const InputAuthor = ({ role, userId }) => (
    <div className="inputAuthor">
        <h3>작성자</h3>
        <input
            type="text"
            value={role === "admin" ? "관리자" : userId}
            readOnly
        />
    </div>
);

export default InputAuthor;