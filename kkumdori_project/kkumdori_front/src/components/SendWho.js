import React, { useState } from "react";
import "./SendWho.css";

const SendWho = ({ onSelectionChange }) => {
  const [isIndividualChecked, setIsIndividualChecked] = useState(false);
  const [isSendToAllChecked, setIsSendToAllChecked] = useState(true);
  const [email, setEmail] = useState("");

  const handleIndividualCheckboxChange = () => {
    const newIndividualChecked = !isIndividualChecked;
    setIsIndividualChecked(newIndividualChecked);
    setIsSendToAllChecked(!newIndividualChecked);
    onSelectionChange({ isIndividual: newIndividualChecked, email: newIndividualChecked ? email : "" });
  };

  const handleSendToAllCheckboxChange = () => {
    const newSendToAllChecked = !isSendToAllChecked;
    setIsSendToAllChecked(newSendToAllChecked);
    setIsIndividualChecked(!newSendToAllChecked);
    onSelectionChange({ isIndividual: !newSendToAllChecked, email: "" });
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    onSelectionChange({ isIndividual: isIndividualChecked, email: newEmail });
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={isIndividualChecked}
        onChange={handleIndividualCheckboxChange}
      />
      <label>한 명한테 전송하기</label>
      <input
        type="checkbox"
        checked={isSendToAllChecked}
        onChange={handleSendToAllCheckboxChange}
      />
      <label>모두에게 전송하기</label>
      <input
        type="text"
        placeholder="전송할 대상의 주소 입력..."
        value={email}
        onChange={handleEmailChange}
        disabled={!isIndividualChecked}
        className="email-form-input"
      />
    </div>
  );
};

export default SendWho;