import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // React Router 추가

import Layout from './components/layout/Layout.js';

import OneToOne from './pages/otoboard/onetoone/OneToOne.js';
import OneToOneBoard from './pages/otoboard/onetooneboard/OneToOneBoard.js';
import Pay from './pages/pay/Pay.js';
import Cart from './pages/cart/Cart.js';
import Main from './pages/main/Main.js';

import AdminMain from './pages/admin/adminmain/AdminMain.js';
import NewBoard from './pages/admin/newboard/NewBoard.js';
import EditBoard from './pages/admin/editboard/EditBoard.js';
import EditBanner from './pages/admin/editbanner/EditBanner.js';
import SendMessage from './pages/admin/sendmessage/SendMessage.js';
import RegistGoods from './pages/admin/registgoods/RegistGoods.js';

import Login from './pages/logins/login/Login.js';
import IDSearch from './pages/logins/idsearch/IDSearch.js';
import PWSearch from './pages/logins/pwsearch/PWSearch.js';
import Register from './pages/logins/sign/Sign.js';
import RePW from './pages/logins/repw/RePW.js';

import MyPage from './pages/mypage/mypagemain/Mypage.js';
import Memberinfo from './pages/mypage/memberinfo/MemberInfoEdit.js';
import RecentProducts from './pages/mypage/recentproducts/recentProducts.js';
import DeliveryAddressManager from './pages/mypage/delivery/Delivery.js';
import Review from './pages/mypage/makereview/MakeStar.js';
import Myreview from './pages/mypage/myreview/Myreview.js';
import Wishlist from './pages/mypage/wishlist/Wishlist.js';
import ReturnExchangePage from './pages/mypage/return/Return.js';

const App = () => (
  <Router> {/* Router로 감싸기 */}
    <Layout>
      <Routes>
        {/* layout */}
        <Route path="/" element={<Main />} /> {/* 기본 경로를 Main.js로 설정 */}
        <Route path="/main" element={<Main />} /> {/* Main.js로 이동 */}
        <Route path="/cart" element={<Cart />} /> {/* Cart.js로 이동 */}
        <Route path="/pay" element={<Pay />} /> {/* Pay.js로 이동 */}
        <Route path="/onetooneboard" element={<OneToOneBoard />} /> {/* 1:1 게시판 페이지 */}
        <Route path="/onetoone" element={<OneToOne />} /> {/* 1:1 문의 페이지 */}
        
        {/* admin */}
        <Route path='/admin' element={<AdminMain />} /> {/* 관리자 대시보드 */}
        <Route path='/new' element={<NewBoard />} /> {/* 새 게시판 작성 */}
        <Route path='/edit' element={<EditBoard />} /> {/* 게시판 수정 */}
        <Route path='/banner' element={<EditBanner />} /> {/* 배너 수정 */}
        <Route path='/send' element={<SendMessage />} /> {/* 메시지 전송 */}
        <Route path='/regist' element={<RegistGoods />} /> {/* 상품 등록 */}
        
        {/* logins */}
        <Route path="/login" element={<Login />} /> {/* 로그인 페이지 */}
        <Route path="/sign" element={<Register />} /> {/* 회원가입 페이지 */}
        <Route path="/idsearch" element={<IDSearch />} /> {/* 아이디 찾기 페이지 */}
        <Route path="/pwsearch" element={<PWSearch />} /> {/* 비밀번호 찾기 페이지 */}
        <Route path="/repw" element={<RePW />} /> {/* 비밀번호 재설정 페이지 */}
        
        {/* mypage */}
        <Route path="/mypage" element={<MyPage />} /> {/* 마이 페이지 */}
        <Route path="/return" element={<ReturnExchangePage />} /> {/* 반품/교환 페이지 */}
        <Route path="/wishlist" element={<Wishlist />} /> {/* 찜 목록 페이지 */}
        <Route path="/myreview" element={<Myreview />} /> {/* 내가 작성한 리뷰 */}
        <Route path="/review" element={<Review />} /> {/* 리뷰 작성 페이지 */}
        <Route path="/delivery" element={<DeliveryAddressManager />} /> {/* 배송 주소 관리 */}
        <Route path="/recentproducts" element={<RecentProducts />} /> {/* 최근 본 상품 페이지 */}
        <Route path="/memberinfoedit" element={<Memberinfo />} /> {/* 회원 정보 수정 페이지 */}
      </Routes>
    </Layout>
  </Router>
);

export default App;
