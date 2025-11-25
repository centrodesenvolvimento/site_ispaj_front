import Header from '../components/header';
import Services from '../components/services';
import Principles from '../components/principles';
import Reviews from '../components/reviews';
import News from '../components/news';
import Footer from '../components/footer';
import Globe from '../components/globe';
// import Swiper from '../components/swiper';
import Events from '../components/events';
// import Director from '../components/director';
import Swiper1 from '../components/swiper1';
import Polos from '../components/polos';
const Home = ({departments}) => {
    return (
        <div className="App" style={{display: 'flex', flexDirection: 'column'}}>
            <Header />
            {/* <Swiper /> */}
            <Swiper1 />
            {/* <Director /> */}
            <Polos departments={departments}/>
            {/* #F3F3F3 */}
            <div style={{ marginBottom: -10}}>
            {/* <Principles departments={departments}/> */}
            </div>
            <div>
              <News />
            </div>
            <Reviews />
            <Events />
            {/* <Services departments={departments}/> */}

            {/* <Globe /> */}
      
            <Footer />
          </div>
    )
}
export default Home