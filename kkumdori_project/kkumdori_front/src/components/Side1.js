import React from 'react';
import { Link } from 'react-router-dom';
import './Side1.css';

const Side1 = () => (
  <aside className="side1">
    <div className="menu">
      <p><img src="/img/QnA.png" alt="QnA" /></p>
      <Link to="/onetoone">
        <p><img src="/img/service-center.png" alt="고객센터" /></p>
      </Link>
      <p><img src="/img/announcement.png" alt="공지사항" /></p>
      <p><img src="/img/FAQ.png" alt="FAQ" /></p>
    </div>
  </aside>
);

export default Side1;
