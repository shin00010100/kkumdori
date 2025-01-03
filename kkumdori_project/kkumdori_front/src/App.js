import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // React Router 추가
import { AuthProvider } from './utils/AuthContext.js';

import Layout from './components/layout/Layout.js';
import PrivateRoute from './components/privateroute/PrivateRoute.js';

import QnA from './pages/qnaboard/qna/QnA.js';
import QnABoard from './pages/qnaboard/qnaboard/QnABoard.js';
import QnAView from './pages/qnaboard/qnaview/QnAView.js';
import Notice from './pages/notice/notice/Notice.js';
import NoticeBoard from './pages/notice/noticeboard/NoticeBoard.js';
import NoticeView from './pages/notice/noticeview/NoticeView.js';
import OneToOne from './pages/otoboard/onetoone/OneToOne.js';
import OneToOneBoard from './pages/otoboard/onetooneboard/OneToOneBoard.js';
import OneToOneView from './pages/otoboard/onetooneview/OneToOneView.js';
import FAQBoard from './pages/faqboard/FAQBoard.js';
import Pay from './pages/pay/Pay.js';
import Cart from './pages/cart/Cart.js';
import Main from './pages/main/Main.js';

import AdminMain from './pages/admin/adminmain/AdminMain.js';
import NewBoard from './pages/admin/newboard/NewBoard.js';
import EditBoard from './pages/admin/editboard/EditBoard.js';
import EditBanner from './pages/admin/editbanner/EditBanner.js';
import SendMessage from './pages/admin/sendmessage/SendMessage.js';
import RegistGoods from './pages/admin/registgoods/RegistGoods.js';
import EditGoods from './pages/admin/editgoods/EditGoods.js';
import EditCategory from './pages/admin/editcategory/EditCategory.js';

import Login from './pages/logins/login/Login.js';
import IDSearch from './pages/logins/idsearch/IDSearch.js';
import PWSearch from './pages/logins/pwsearch/PWSearch.js';
import Register from './pages/logins/sign/Sign.js';
import RePW from './pages/logins/repw/RePW.js';
import NaverCallback from "./pages/logins/login/NaverCallback";

import MyPage from './pages/mypage/mypagemain/Mypage.js';
import Memberinfo from './pages/mypage/memberinfo/MemberInfoEdit.js';
import RecentProducts from './pages/mypage/recentproducts/recentProducts.js';
import DeliveryAddressManager from './pages/mypage/delivery/Delivery.js';
import Review from './pages/mypage/makereview/MakeStar.js';
import Myreview from './pages/mypage/myreview/Myreview.js';
import Wishlist from './pages/mypage/wishlist/Wishlist.js';
import ReturnExchangePage from './pages/mypage/return/Return.js';

import ProductDetail from './pages/purchase/productdetail/ProductDetail';
import ProductList from "./pages/list/productlist/ProductList";


// import UserRoute from './utils/UserRoute';
// import AdminRoute from './utils/AdminRoute';
// import UniteRoute from './utils/UniteRoute';

const App = () => {
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  // 조회수 업데이트 함수 추가
  const updatePostViews = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, views: post.views + 1 } : post
      )
    );
  };

  // 답변 추가 함수 정의
  const addResponse = (postId, response) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, isAnswered: true, response } : post
      )
    );
  };

  return (
    <AuthProvider>
      <Router> {/* Router로 감싸기 */}
        <Layout>
          <Routes>
            {/* layout */}
            <Route path="/" element={<Main />} /> {/* 기본 경로를 Main.js로 설정 */}
            <Route path="/main" element={<Main />} /> {/* Main.js로 이동 */}
            <Route path="/cart" element={<Cart />} /> {/* Cart.js로 이동 */}
            <Route path="/pay" element={<Pay />} /> {/* Pay.js로 이동 */}
            <Route path="/onetooneboard" element={<OneToOneBoard posts={posts} updatePostViews={updatePostViews} />} /> {/* 1:1 게시판 페이지 */}
            <Route path="/onetoone" element={<OneToOne addPost={addPost} />} /> {/* 1:1 문의 페이지 */}

            {/* admin */}
            {/* <Route path="/admin" element={<AdminMain />} /> */}
            <Route path="/admin" element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminMain />
              </PrivateRoute>
            } />
            <Route path="/editbanner" element={
              <PrivateRoute allowedRoles={['admin']}>
                <EditBanner />
              </PrivateRoute>
            } />
            <Route path="/sendmessage" element={
              <PrivateRoute allowedRoles={['admin']}>
                <SendMessage />
              </PrivateRoute>
            } />
            <Route path="/registgoods" element={
              <PrivateRoute allowedRoles={['admin']}>
                <RegistGoods />
              </PrivateRoute>
            } />
            <Route
              path="/editgoods/:goodsId" // URL에서 goodsId를 동적으로 받음
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <EditGoods />
                </PrivateRoute>
              }
            />
            <Route path="/editcategory" element={
              <PrivateRoute allowedRoles={['admin']}>
                <EditCategory/>
              </PrivateRoute>
            } />
            <Route path='/newboard' element={<NewBoard />} /> {/* 새 게시판 작성 */}
            <Route path='/editboard' element={<EditBoard />} /> {/* 게시판 수정 */}

            {/* logins */}
            <Route path="/login" element={<Login />} /> {/* 로그인 페이지 */}
            <Route path="/sign" element={<Register />} /> {/* 회원가입 페이지 */}
            <Route path="/idsearch" element={<IDSearch />} /> {/* 아이디 찾기 페이지 */}
            <Route path="/pwsearch" element={<PWSearch />} /> {/* 비밀번호 찾기 페이지 */}
            <Route path="/repw" element={<RePW />} /> 
            <Route path="/naver-callback" element={<NaverCallback />} />

            {/* mypage */}
            <Route path="/mypage" element={<MyPage />} />
            {/* <Route path="/mypage" element={
              <PrivateRoute allowedRoles={['user', 'admin']}>
                <MyPage />
              </PrivateRoute>}
               />  */}
              {/* 마이 페이지 */}
            <Route path="/return" element={
              <PrivateRoute allowedRoles={['user', 'admin']}>
                <ReturnExchangePage />
              </PrivateRoute>
            } /> {/* 반품/교환 페이지 */}
            <Route path="/wishlist" element={
              <PrivateRoute allowedRoles={['user', 'admin']}>
                <Wishlist />
              </PrivateRoute>
            } /> {/* 찜 목록 페이지 */}
            <Route path="/myreview" element={
              <PrivateRoute allowedRoles={['user', 'admin']}>
                <Myreview />
              </PrivateRoute>
            } /> {/* 내가 작성한 리뷰 */}
            <Route path="/review" element={
              <PrivateRoute allowedRoles={['user', 'admin']}>
                <Review />
              </PrivateRoute>
            } /> {/* 리뷰 작성 페이지 */}
            <Route path="/delivery" element={
              <PrivateRoute allowedRoles={['user', 'admin']}>
                <DeliveryAddressManager />
              </PrivateRoute>
            } /> {/* 배송 주소 관리 */}
            <Route path="/recentproducts" element={
              <PrivateRoute allowedRoles={['user', 'admin']}>
                <RecentProducts />
              </PrivateRoute>
            } /> {/* 최근 본 상품 페이지 */}
            <Route path="/memberinfoedit" element={
              <PrivateRoute allowedRoles={['user', 'admin']}>
                <Memberinfo />
              </PrivateRoute>
            } /> {/* 회원 정보 수정 페이지 */}

            {/* QnA 페이지 */}
            <Route path="/qna" element={<QnA addPost={addPost} />} />
            <Route path="/qnaboard" element={<QnABoard posts={posts} updatePostViews={updatePostViews} />} />
            <Route path="/qnaview/:postId" element={<QnAView posts={posts} updatePostViews={updatePostViews} setPosts={setPosts} addResponse={addResponse} />} />

            {/* 1:1 페이지 */}
            <Route path="/onetoone" element={<OneToOne addPost={addPost} />} />
            <Route path="/onetooneboard" element={<OneToOneBoard posts={posts} updatePostViews={updatePostViews} />} />
            <Route path="/onetooneview/:postId" element={<OneToOneView posts={posts} updatePostViews={updatePostViews} setPosts={setPosts} addResponse={addResponse} />} />

            {/* 공지사항 페이지 */}
            <Route path="/notice" element={<Notice addPost={addPost} />} />
            <Route path="/noticeboard" element={<NoticeBoard posts={posts} updatePostViews={updatePostViews} />} />
            <Route path="/noticeview/:postId" element={<NoticeView posts={posts} updatePostViews={updatePostViews} setPosts={setPosts} addResponse={addResponse} />} />

            {/* FAQ 페이지 */}
            <Route path="/faqboard" element={<FAQBoard />} />

            {/*purchase*/}
            <Route path="/productDetail/:goods_no" element={<ProductDetail />} /> {/* 상품 상세 페이지 */}
            <Route path="/productlist" element={<ProductList />} /> {/* 상품 리스트 페이지 */}
            <Route path="/productlist/:categoryNo" element={<ProductList />} /> {/* 카테고리별 상품 리스트 */}
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
};

export default App;
