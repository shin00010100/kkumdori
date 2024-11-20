import "./InputContent.css";

const InputContent = ({ content, setContent }) => (
    <div className="inputContent">
        <h3>내용</h3>
        <textarea
            name="content"
            rows="10"
            cols="50"
            value={content}
            onChange={(e) => setContent(e.target.value)}
        />
    </div>
);

export default InputContent;
