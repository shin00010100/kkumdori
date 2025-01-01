// import React, { useState, useEffect } from 'react';
// import './searchform.css';
// import DatePicker from 'react-datepicker';

// const SearchForm = ({ posts, onFilter }) => {
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedPeriod, setSelectedPeriod] = useState(null);

//   // 날짜 범위 필터링 함수
//   const filterPostsByDateAndSearch = () => {
//     const filtered = posts.filter((post) => {
//       const postDate = new Date(post.date);
//       const isInDateRange =
//         (!startDate || postDate >= startDate) && (!endDate || postDate <= endDate);

//       // 띄어쓰기를 제거하고 소문자로 변환하여 비교
//       const cleanSearchQuery = searchQuery.replace(/\s+/g, '').toLowerCase();
//       const cleanPostTitle = post.title.replace(/\s+/g, '').toLowerCase();

//       // 비교: 검색어와 제목에서 띄어쓰기를 제거하고 소문자 비교
//       const matchesSearchQuery = cleanPostTitle.includes(cleanSearchQuery);

//       return isInDateRange && matchesSearchQuery;
//     });
//     onFilter(filtered); // 부모 컴포넌트에 필터링된 결과를 전달
//   };

//   // 기간 버튼 클릭 시 날짜 설정 함수
//   const setDateRange = (months) => {
//     const currentDate = new Date();
//     const newStartDate = new Date(currentDate);
//     newStartDate.setMonth(currentDate.getMonth() - months);
//     setStartDate(newStartDate);
//     setEndDate(new Date()); // 끝 날짜는 오늘 날짜로 설정
//     setSelectedPeriod(months);  // 선택된 기간을 설정
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault(); // 기본 폼 제출 동작을 막음
//     filterPostsByDateAndSearch(); // 검색 실행
//   };

//   // selectedPeriod가 변경될 때마다 자동으로 필터링 처리
//   useEffect(() => {
//     if (selectedPeriod !== null) {
//       filterPostsByDateAndSearch(); // 기간이 선택되면 자동으로 필터링
//     }
//   }, [selectedPeriod, startDate, endDate, searchQuery]); // 의존성 배열에 상태 추가

//   return (
//     <div className="searchContainer">
//       <form method="get" action="/search" role="search" onSubmit={handleSearchSubmit}>
//         <input
//           className="mypage-searchform"
//           type="search"
//           id="user-search"
//           name="query"
//           placeholder="여기에 검색할 상품을 작성해주세요!"
//           aria-label="사이트 내용을 통해 검색"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)} // 검색어 상태 업데이트
//         />

//         <div className="mypage-date-picker-container">
//           <label>시작 날짜:</label>
//           <DatePicker
//             className='mypage-search-date'
//             selected={startDate}
//             onChange={(date) => setStartDate(date)}
//             selectsStart
//             startDate={startDate}
//             endDate={endDate}
//             dateFormat="yyyy-MM-dd"
//             placeholderText="시작 날짜 선택"
//           />
//           <label>~ 끝 날짜:</label>
//           <DatePicker
//             className='mypage-search-date'
//             selected={endDate}
//             onChange={(date) => setEndDate(date)}
//             selectsEnd
//             startDate={startDate}
//             endDate={endDate}
//             minDate={startDate}
//             dateFormat="yyyy-MM-dd"
//             placeholderText="끝 날짜 선택"
//           />

//           <button className="searchbtn" type="button" onClick={filterPostsByDateAndSearch}>
//             검색
//           </button>
//         </div>

//         <div className="period-buttons">
//           <button
//             type="button"
//             className={selectedPeriod === 1 ? 'active' : ''}
//             onClick={() => setDateRange(1)} // 클릭 시 1개월로 설정
//           >
//             1개월
//           </button>
//           <button
//             type="button"
//             className={selectedPeriod === 2 ? 'active' : ''}
//             onClick={() => setDateRange(2)}
//           >
//             2개월
//           </button>
//           <button
//             type="button"
//             className={selectedPeriod === 3 ? 'active' : ''}
//             onClick={() => setDateRange(3)}
//           >
//             3개월
//           </button>
//           <button
//             type="button"
//             className={selectedPeriod === 4 ? 'active' : ''}
//             onClick={() => setDateRange(4)}
//           >
//             4개월
//           </button>
//           <button
//             type="button"
//             className={selectedPeriod === 5 ? 'active' : ''}
//             onClick={() => setDateRange(5)}
//           >
//             5개월
//           </button>
//           <button
//             type="button"
//             className={selectedPeriod === 6 ? 'active' : ''}
//             onClick={() => setDateRange(6)}
//           >
//             6개월
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SearchForm;
