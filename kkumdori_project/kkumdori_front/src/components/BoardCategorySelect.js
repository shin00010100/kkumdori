import "./BoardCategorySelect.css";

const BoardCategorySelect = ({ role, category, setCategory }) => {
    const userCategories = ["1:1상담", "QnA"];
    const adminCategories = ["공지사항", "FAQ", "1:1답변", "QnA답변"];
    const categories = role === "admin" ? adminCategories : userCategories;

    return (
        <div>
            <h3 className="boardCategorySelect">분류</h3>
            <select
                name="boardCategory"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                {categories.map((boardCategory) => (
                    <option key={boardCategory} value={boardCategory}>
                        {boardCategory}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default BoardCategorySelect;
