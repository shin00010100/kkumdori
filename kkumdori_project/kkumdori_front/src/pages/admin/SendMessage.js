import React, { useState } from "react";
import "./SendMessage.css";
import ButtonGroup from "../../components/ButtonGroup";
import SendWho from "../../components/SendWho";
import InputContent from "../../components/InputContent";
import InputTitle from "../../components/InputTitle";
import UploadImage from "../../components/UploadImage";

const SendMessage = () => {
  const [recipientInfo, setRecipientInfo] = useState({ isIndividual: false, email: "" });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [attachment, setAttachment] = useState(null);

  const handleRecipientSelectionChange = (selection) => {
    setRecipientInfo(selection);
  };

  const handleImageSelect = (file) => {
    setAttachment(file); // 이미지 파일을 상태에 저장
  };

  const handleSubmit = () => {
    // 전송할 데이터를 준비
    const emailData = {
      recipient: recipientInfo.isIndividual ? recipientInfo.email : "모두",
      title,
      content,
      attachment,
    };

    // 이메일 데이터를 콘솔에 출력
    console.log("전송할 데이터:", emailData);

    // 실제 이메일 전송 로직 자리.
    alert("이메일이 전송되었습니다.");
  };

  return (
    <div className="sendMessage">
      <h2>이메일 보내기</h2>
      <SendWho onSelectionChange={handleRecipientSelectionChange} />
      <InputTitle title={title} setTitle={setTitle}/>
      <InputContent content={content} setContent={setContent} />
      <UploadImage onImageSelect={handleImageSelect} />
      <ButtonGroup
                onSubmit={handleSubmit}
                submitText="전송"
            />
    </div>
  );
};

export default SendMessage;