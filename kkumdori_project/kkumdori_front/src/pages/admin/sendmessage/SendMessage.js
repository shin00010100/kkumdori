import React, { useState } from "react";
import "./SendMessage.css";
import ButtonGroup from "../../../components/buttongroup/ButtonGroup";
import SendWho from "../../../components/sendwho/SendWho";
import InputContent from "../../../components/inputcontent/InputContent";
import InputTitle from "../../../components/inputtitle/InputTitle";
import UploadImage from "../../../components/uploadimage/UploadImage";
import axios from "axios"; // Axios 추가

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

  const handleSubmit = async () => {
    const emailData = {
      recipient: recipientInfo.isIndividual ? recipientInfo.email : "모두", // "모두"일 경우 모두에게 전송
      title,
      content,
    };

    // 서버로 이메일 전송 요청 보내기 (첨부파일도 포함)
    const formData = new FormData();
    formData.append("recipient", emailData.recipient);
    formData.append("title", emailData.title);
    formData.append("content", emailData.content);

    if (attachment) {
      formData.append("attachment", attachment); // 첨부파일 추가
    }

    const getToken = () => {
      let token = sessionStorage.getItem("jwt");
      if (!token) {
        token = localStorage.getItem("jwt");
      }
      return token;
    };

    try {
      // Axios로 POST 요청 보내기
      const response = await axios.post("http://localhost:8090/api/auth/sendAdminEmail", formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      console.log("이메일 전송 응답:", response.data);
      alert("이메일이 전송되었습니다.");
    } catch (error) {
      console.error("이메일 전송 오류:", error);
      alert("이메일 전송에 실패했습니다.");
    }
  };

  return (
    <div className="sendMessage">
      <h2>이메일 보내기</h2>
      <SendWho onSelectionChange={handleRecipientSelectionChange} />
      <InputTitle title={title} setTitle={setTitle} />
      <InputContent content={content} setContent={setContent} />
      <UploadImage onImageSelect={handleImageSelect} />
      <ButtonGroup onSubmit={handleSubmit} submitText="전송" />
    </div>
  );
};

export default SendMessage;
