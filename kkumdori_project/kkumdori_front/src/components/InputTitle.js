import "./InputTitle.css";
const InputTitle = ({ title, setTitle }) => (
    <div className="inputTitle">
        <h3>제목</h3>
        <input
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
    </div>
);

export default InputTitle;