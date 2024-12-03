import React from 'react';
import { Link } from 'react-router-dom';
import './Side.css';

const Side1 = () => (
  <aside className="side1">
    <div className="menu">
      <Link to="/qnaboard">
        <p><img src="/img/QnA.png" alt="QnA" /></p>
      </Link>
      <Link to="/onetooneboard">
        <p><img src="/img/service-center.png" alt="고객센터" /></p>
      </Link>
      <Link to="/notice">
        <p><img src="/img/announcement.png" alt="공지사항" /></p>
      </Link>
      <Link to="/faqboard">
      <p><img src="/img/FAQ.png" alt="FAQ" /></p>
      </Link>
    </div>
  </aside>
);

export default Side1;
