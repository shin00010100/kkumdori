import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // React Router 추가
import Layout from './components/Layout.js';
import OneToOne from './components/OneToOne.js';
import Pay from './components/Pay.js';
import Cart from './components/Cart.js';
import Main from './components/Main.js';
import MyPage from './components/Mypage.js';
import Login from './components/Login.js';
import IDSearch from './components/IDSearch.js';
import PWSearch from './components/PWSearch.js';
import Register from './components/Sign.js';
import RePW from './components/RePW.js';
import Memberinfo from './pages/memberinfo/MemberInfoEdit.js';
import RecentProducts from './pages/recentproducts/recentProducts.js';
import DeliveryAddressManager from './pages/delivery/Delivery.js';
import Myreview from './pages/myreview/Myreview.js';
import Wishlist from './pages/wishlist/Wishlist.js';
import ReturnExchangePage from './pages/return/Return.js';
import AdminMain from './pages/admin/AdminMain.js';
import NewBoard from './pages/admin/NewBoard.js';
import EditBoard from './pages/admin/EditBoard.js';
import EditBanner from './pages/admin/EditBanner.js';
import SendMessage from './pages/admin/SendMessage.js';
import RegistGoods from './pages/admin/RegistGoods.js';

const App = () => (
  <Router> {/* Router로 감싸기 */}
    <Layout>
      <Routes>
        {/* 테스트 */}
      <Route path='/admin' element={<AdminMain/>}/>
        <Route path='/new' element={<NewBoard/>}/>
        <Route path='/edit' element={<EditBoard/>}/>
        <Route path='/banner' element={<EditBanner/>}/>
        <Route path='/send' element={<SendMessage/>}/>
        <Route path='/regist' element={<RegistGoods/>}/>

      <Route path="/return" element={<ReturnExchangePage />} /> {/* MemberInfoEdit.js로 이동 */}
        <Route path="/wishlist" element={<Wishlist />} /> {/* MemberInfoEdit.js로 이동 */}
        <Route path="/myreview" element={<Myreview />} /> {/* MemberInfoEdit.js로 이동 */}
        <Route path="/delivery" element={<DeliveryAddressManager />} /> {/* MemberInfoEdit.js로 이동 */}
        <Route path="/recentproducts" element={<RecentProducts />} /> {/* MemberInfoEdit.js로 이동 */}
        <Route path="/memberinfoedit" element={<Memberinfo />} /> {/* MemberInfoEdit.js로 이동 */}
        <Route path="/repw" element={<RePW />} /> {/* RePW.js로 이동 */}
        <Route path="/sign" element={<Register />} /> {/* Sign.js로 이동 */}
        <Route path="/pwsearch" element={<PWSearch />} /> {/* PWSearch.js로 이동 */}
        <Route path="/idsearch" element={<IDSearch />} /> {/* IDSearch.js로 이동 */}
        <Route path="/login" element={<Login />} /> {/* Login.js로 이동 */}
        <Route path="/mypage" element={<MyPage />} /> {/* MyPage.js로 이동 */}
        <Route path="/main" element={<Main />} /> {/* Main.js로 이동 */}
        <Route path="/cart" element={<Cart />} /> {/* Cart.js로 이동 */}
        <Route path="/pay" element={<Pay />} /> {/* Pay.js로 이동 */}
        <Route path="/onetoone" element={<OneToOne />} /> {/* OneToOne.js로 이동 */}
        <Route path="/" element={<Main />} /> {/* 기본 경로를 Main.js로 설정 */}
      </Routes>
    </Layout>
  </Router>
);

export default App;
