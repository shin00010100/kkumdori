import SearchForm from './SearchForm';
import SummaryContainer from './SummaryContainer';
import ShippingStatusContainer from './ShippingStatusContainer';
import ListContainer from './ListContainer';
import InfoContainer from './InfoContainer';
import './mypage.css';

const MyPage = () => {
  return (
    <div className="mypage">
      
        <main className="mypage-content">
          <SearchForm />
          <SummaryContainer />
          <ShippingStatusContainer />
          <ListContainer />
          <InfoContainer />
        </main>
      </div>


    
  );
}

export default MyPage;
