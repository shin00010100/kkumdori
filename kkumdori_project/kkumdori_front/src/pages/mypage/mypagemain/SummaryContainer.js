import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import './mypage.css';
import './searchform.css';

const SummaryContainer = () => {
  const [posts, setPosts] = useState([]); // 주문 데이터를 저장할 상태
  const [filteredPosts, setFilteredPosts] = useState([]); // 필터링된 주문 데이터 상태
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태
  const [startDate, setStartDate] = useState(null); // 시작 날짜 상태
  const [endDate, setEndDate] = useState(null); // 끝 날짜 상태
  const [userNo, setUserNo] = useState(null); // 사용자 번호 상태
  const [selectedPeriod, setSelectedPeriod] = useState(null); // 기간 상태

  // JWT 토큰을 통해 사용자 정보 가져오는 함수
  useEffect(() => {
    const fetchUserData = async () => {
      let token = sessionStorage.getItem('jwt') || localStorage.getItem('jwt');
      if (token) {
        try {
          // 사용자 정보 가져오기 (userNo 포함)
          const response = await axios.get('http://localhost:8090/api/auth/getuser', {
            headers: { 'Authorization': `Bearer ${token}` },
          });

          const userNo = response.data.userNo;
          setUserNo(userNo);  // 사용자 번호 설정

          // 그 후, 해당 사용자 번호로 주문 내역과 상품 정보를 가져옵니다.
          const orderResponse = await axios.get('http://localhost:8090/api/myorders', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              userNo: userNo,
              searchQuery: searchQuery,
              startDate: startDate ? startDate.toISOString().split('T')[0] : null,
              endDate: endDate ? endDate.toISOString().split('T')[0] : null,
            },
          });

          console.log(orderResponse.data); // API 응답 구조 확인
          setPosts(orderResponse.data);
          setFilteredPosts(orderResponse.data); // 필터링된 데이터 초기화


          // 각 주문의 상품 정보 콘솔에 출력
          orderResponse.data.forEach(post => {
            if (post.orderProducts && post.orderProducts.length > 0) {
              post.orderProducts.forEach(product => {
                console.log('상품 정보:', product); // 각 상품 정보를 콘솔에 출력
              });
            }
          });
          
        } catch (error) {
          console.error('사용자 정보를 가져오는 데 실패했습니다.', error);
        }
      } else {
        console.log("JWT 토큰이 없습니다.");
      }
    };

    fetchUserData(); // 사용자 데이터와 관련된 API 호출
  }, [searchQuery, startDate, endDate]); // 필터링 조건이 변경될 때마다 API 호출

  // 날짜 포맷 함수 (시간도 고려)
  const formatDate = (dateString) => {
    const date = new Date(dateString.replace(' ', 'T')); // 공백을 T로 변환하여 ISO 형식으로
    if (isNaN(date)) {
      return '유효하지 않은 날짜';
    }
    return date.toLocaleDateString(); // 'yyyy-MM-dd' 형식으로 출력
  };

  // 날짜 범위 및 상품명 필터링 함수
  const filterPostsByDateAndSearch = () => {
    const filtered = posts.filter((post) => {
      // 날짜 필터링
      const postDate = new Date(post.date); // post.date가 실제로 올바른 날짜 형식인지 확인
      const isInDateRange =
        (!startDate || postDate >= startDate) && (!endDate || postDate <= endDate);
  
      // 검색어가 비어있지 않은 경우에만 필터링을 진행
      const cleanSearchQuery = searchQuery.trim().replace(/\s+/g, '').toLowerCase();
      if (cleanSearchQuery === '') return isInDateRange; // 검색어가 없으면 날짜 범위만으로 필터링
  
      // 상품명 필터링 부분: orderProducts 배열 내의 productName을 확인
      const matchesSearchQuery = post.orderProducts && post.orderProducts.some(product => {
        if (product.productName) { // productName을 기준으로 비교
          return product.productName.toLowerCase().includes(cleanSearchQuery); // 상품명 기준으로 비교
        }
        return false; // productName이 없으면 제외
      });
  
      return isInDateRange && matchesSearchQuery; // 날짜와 상품명이 모두 일치하는 경우만 포함
    });
  
    setFilteredPosts(filtered); // 필터링된 데이터 상태 업데이트
  };
  
  // 기간 버튼 클릭 시 날짜 설정 함수
  const setDateRange = (months) => {
    const currentDate = new Date();
    const newStartDate = new Date(currentDate);
    newStartDate.setMonth(currentDate.getMonth() - months);
    setStartDate(newStartDate);
    setEndDate(new Date()); // 끝 날짜는 오늘 날짜로 설정
    setSelectedPeriod(months);  // 선택된 기간을 설정
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 동작을 막음
    filterPostsByDateAndSearch(); // 검색 실행
  };

  // selectedPeriod가 변경될 때마다 자동으로 필터링 처리
  useEffect(() => {
    if (selectedPeriod !== null) {
      filterPostsByDateAndSearch(); // 기간이 선택되면 자동으로 필터링
    }
  }, [selectedPeriod, startDate, endDate, searchQuery]); // 의존성 배열에 상태 추가

  return (
    <div>
      <div className="searchContainer">
        <form onSubmit={handleSearchSubmit} role="search">
          <input
            className="mypage-searchform"
            type="search"
            id="user-search"
            name="query"
            placeholder="여기에 검색할 상품을 작성해주세요!"
            aria-label="사이트 내용을 통해 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // 검색어 상태 업데이트
          />

          <div className="mypage-date-picker-container">
            <label>시작 날짜:</label>
            <DatePicker
              className='mypage-search-date'
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="yyyy-MM-dd"
              placeholderText="시작 날짜 선택"
            />
            <label>~ 끝 날짜:</label>
            <DatePicker
              className='mypage-search-date'
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="yyyy-MM-dd"
              placeholderText="끝 날짜 선택"
            />

            <button className="searchbtn" type="submit">
              검색
            </button>
          </div>

          <div className="period-buttons">
            <button type="button" className={selectedPeriod === 1 ? 'active' : ''} onClick={() => setDateRange(1)}>1개월</button>
            <button type="button" className={selectedPeriod === 2 ? 'active' : ''} onClick={() => setDateRange(2)}>2개월</button>
            <button type="button" className={selectedPeriod === 3 ? 'active' : ''} onClick={() => setDateRange(3)}>3개월</button>
            <button type="button" className={selectedPeriod === 4 ? 'active' : ''} onClick={() => setDateRange(4)}>4개월</button>
            <button type="button" className={selectedPeriod === 5 ? 'active' : ''} onClick={() => setDateRange(5)}>5개월</button>
            <button type="button" className={selectedPeriod === 6 ? 'active' : ''} onClick={() => setDateRange(6)}>6개월</button>
          </div>
        </form>
      </div>

      <div className="summaryContainer">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => {
            console.log(post); // 주문 데이터 확인
            return (
              <div key={post.orderNo} className="item">
                <div className="productImage">
                  {/* 상품 이미지 확인 및 대체 이미지 처리 */}
                  {post.orderProducts && post.orderProducts.length > 0 && (
                    <img
                      src={post.orderProducts[0].imagePath ? `http://localhost:8090/api/images/${post.orderProducts[0].imagePath.split('uploads/images/')[1]}` : "path/to/default/image.png"}
                      alt="상품 이미지"
                      className="product-image"
                    />
                  )}
                </div>

                <div className="productDetails">
                  <div className="productName">
                    {post.orderProducts && post.orderProducts.length > 0 ? (
                      post.orderProducts[0].productName // 첫 번째 상품명 표시
                    ) : (
                      <span>상품명 없음</span>
                    )}
                  </div>
                  <div className="productDate">
                    {formatDate(post.orderTime)} {/* 주문 날짜 포맷 적용 */}
                  </div>

                  {/* 주문에 포함된 상품들 */}
                  {post.orderProducts && post.orderProducts.length > 0 ? (
                    <div className="productList">
                      {post.orderProducts.map((product, index) => {
                        return (
                          <div key={index} className="productInfo">
                            <div>상품명: {product.productName}</div>
                            <div>상품 가격: {product.price}원</div>
                            <div>수량: {product.quantity}</div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p>상품 정보가 없습니다.</p>
                  )}

                  <div className="productActions">
                    <button className="actionBtn">
                      <a
                        href="https://www.cjlogistics.com/ko/tool/parcel/tracking"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        배송조회
                      </a>
                    </button>
                    <Link to="/Returnpage">
                      <button className="actionBtn">교환/반품</button>
                    </Link>
                    <Link to="/Review" state={{ product: post.orderProducts[0] }}>
                      <button className="actionBtn">리뷰작성</button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>해당 조건에 맞는 주문이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default SummaryContainer;
