import React from 'react';
import './mypage.css';

const InfoContainer = () => {
  return (
    <div className="infoContainer">
      <a href="#" className="item">
        <div>icon</div>
        <div>공지사항</div>
      </a>
      <a href="#" className="item">
        <div>icos</div>
        <div>이용안내</div>
      </a>
      <a href="#" className="item">
        <div>icon</div>
        <div>고객센터</div>
      </a>
    </div>
  );
}

export default InfoContainer;
