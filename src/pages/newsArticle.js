import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Header from '../components/header'
import '../css/newsArticle.css'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { baseURL } from '../api/api'
import { format } from 'date-fns'
import Skeleton from 'react-loading-skeleton'
import Footer from '../components/footer'
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import "yet-another-react-lightbox/plugins/counter.css"
import Counter from "yet-another-react-lightbox/plugins/counter"
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen"
import "yet-another-react-lightbox/styles.css"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"
import "yet-another-react-lightbox/plugins/thumbnails.css"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";




const NewsArticle = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [article, setArticle] = useState(null)
    
    const fetchArticle = () => {
      window.scrollTo(0, 0)

        axios.get(`${baseURL}/api/news/${id}`)
        .then(res => {

            
            setArticle({
              ...res.data,
              imagens: [...res.data.imagens].map((item) => `${baseURL}/storage/images/${item}`)
            })
            const viewedArticles = JSON.parse(sessionStorage.getItem('viewedArticles')) || [];
            if (![...viewedArticles]?.includes(id)){
              axios.post(`${baseURL}/api/editNews/any/${id}`, {
                titulo: res.data.info.titulo,
                descricao: res.data.info.descricao,
                data: res.data.info.data,
                views: res.data.info.views + 1
                })
                .then(response => {
                  viewedArticles.push(id)
                  sessionStorage.setItem('viewedArticles', JSON.stringify(viewedArticles));
                })
                .catch(err => {
                })
            }
          })
        axios.get(`${baseURL}/api/news`)
        .then(res => {
          setLatest([...res.data].filter((item) => {
            if (item.info?.show == undefined){
                return item
            }else if (item.info?.show == true){
                return item
            }
        }))
        })
    }
    useEffect(() => {
      fetchArticle()

        
    }, [])
    const [selIndex, setSelIndex] = useState(0)
    const [latest, setLatest] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [photoIndex, setPhotoIndex] = useState(0)
    const [activeIndex, setActiveIndex] = useState({new: 0, old: 1})

    const openLightbox = (index) => {
      setPhotoIndex(index);
      setIsOpen(true);
    };
    useEffect(() => {
      let count = 0;
      const directions = {
          prev: 0,
          next: 1
      };

      const prevButton = document.querySelector(".slidernavigation button:first-child");
      const nextButton = document.querySelector(".slidernavigation button:last-child");
      
      const sliders = document.querySelectorAll(".slidercontent figure");
      function getElementIndex(direction) {
          const sliders = document.querySelectorAll(".slidercontent figure");
          const max =  sliders.length;
          console.log('max1', max)
          let oldCount = count;
          if (direction === directions.next) {
              count = count === max - 1 ? 0 : (count + 1);
          } else if (direction === directions.prev) {
              count = count === 0 ? (max - 1) : (count - 1);
          }
          setActiveIndex({ new: count, old: oldCount })
          console.log('{ new: count, old: oldCount }', { new: count, old: oldCount })
          return { new: count, old: oldCount };
      }

      const onNextClick = (e) => {
        if (true){onNavigationClick(e, directions.next)}
      };

      const onPrevClick = (e) => {
        if (true){onNavigationClick(e, directions.prev)}
      };

      function onNavigationClick(e, direction) {
         if (true){
          console.log('lengthhhh', article?.imagens && [...article?.imagens].length)
          const { new: newIndex, old: oldIndex } = getElementIndex(direction);
          console.log('new Index', activeIndex, newIndex)
          const sliders = document.querySelectorAll(".slidercontent figure");
          const oldSlideItem = sliders[oldIndex];
          const newSlideItem = sliders[newIndex];

          oldSlideItem?.classList.replace('show', 'disabled')

          newSlideItem?.classList.replace('disabled', 'show')
          
          console.log('new', newIndex, 'old', oldIndex)}

      }

      prevButton?.addEventListener("click", onPrevClick);
      nextButton?.addEventListener("click", onNextClick);

      // Cleanup event listeners on component unmount
      return () => {
          prevButton?.removeEventListener("click", onPrevClick);
          nextButton?.removeEventListener("click", onNextClick);
      };
  }, []);
    // useEffect(() => {
        
    //     var count = 0;
    //     var directions = {
    //     prev: 0,
    //     next: 1
    //     }
    //     var prevButton = document.querySelector(".slidernavigation button:first-child");
    //     var nextButton = document.querySelector(".slidernavigation button:last-child");
    //     var sliders = document.querySelectorAll(".slidercontent figure");
    //     function initListeners() {
    //         nextButton?.addEventListener("click", onNavigationClick);
    //         prevButton?.addEventListener("click", onNavigationClick);
    //     }
    //     function getElementIndex(element) {
    //         return Array.from(element.parentElement.children).indexOf(element);
    //     }
    //     function countController(directionIndex) {
    //         var result = { new: 0, old: count };
    //         var max = sliders.length
            
    //         if(directionIndex === directions.next) {
    //           count = count === max - 1 ? 0 : (count + 1);
    //         }
            
    //         if(directionIndex === directions.prev) {
    //           count = count === 0 ? (max - 1) : (count - 1);
    //         }
            
    //         result.new = count;
            
    //         return result;
    //       }
    //     function onNavigationClick(e) {
    //         var currentButton = e.target;
            
    //         var index = getElementIndex(e.target);
    //         var controlledCount = countController(index);

    //         var oldSlideItem = sliders[controlledCount.old];

    //         var newSlideItem = sliders[controlledCount.new];


    //         oldSlideItem?.classList.remove("show");
    //         currentButton?.classList.add("disabled");

    //         var showNextSliderItemInterval = setInterval(function() {
    //         newSlideItem?.classList.add("show");
    //         currentButton.classList.remove("disabled");
    //         clearInterval(showNextSliderItemInterval);
    //         }, 150);
    //     }

    //     console.log('hello')
    //     initListeners();
    //     return () => {
    //         nextButton?.removeEventListener("click", (e) => onNavigationClick(e, directions.next));
    //         prevButton?.removeEventListener("click", (e) => onNavigationClick(e, directions.prev));
    //     };


    // })
    const location = useLocation()
    const prevLocationRef = useRef(location);
    useEffect(() => {
      if (prevLocationRef.current.pathname !== location.pathname) {
        window.location.reload();
        window.scrollTo(0, 0)

        
    }
    prevLocationRef.current = location;

  }, [location])
  const secondContainerRef = useRef(null)
    useEffect(() => {
      const adjustMargin = () => {
        if (secondContainerRef.current) {
            const outerContainerHeight = document.querySelector('.outerContainer')?.clientHeight + 25 || 0;
            secondContainerRef.current.style.marginTop = `${outerContainerHeight}px`;
        }
    };

    const intervalId = setInterval(() => {
        adjustMargin(); // Call the function to adjust margin at regular intervals
    }, 1); // Adjust the interval time as needed

    // Cleanup the interval on component unmount
    return () => {
        clearInterval(intervalId);
    };
    })
    useEffect(() => {
      window.scrollTo(0, 0)

    }, [])
    return (
        <div className="abtCont">
            <Header />
            <div className='newsArticleContainer' ref={secondContainerRef} style={{marginTop: document.querySelector('.outerContainer')?.clientHeight + 25}}>
                <div className='firstCont'>
              <div className="navigation" style={{margin: 0}}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-map-fill" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.598-.49L10.5.99 5.598.01a.5.5 0 0 0-.196 0l-5 1A.5.5 0 0 0 0 1.5v14a.5.5 0 0 0 .598.49l4.902-.98 4.902.98a.5.5 0 0 0 .196 0l5-1A.5.5 0 0 0 16 14.5zM5 14.09V1.11l.5-.1.5.1v12.98l-.402-.08a.5.5 0 0 0-.196 0zm5 .8V1.91l.402.08a.5.5 0 0 0 .196 0L11 1.91v12.98l-.5.1z"/>
                  </svg>
                  <span onClick={() => {
                              navigate('/')
                          }}>Home</span> <span>{'>'}</span><span>Notícia</span>
            </div>
            {article ? <div className='title'>{article?.info?.titulo}</div> : <div className='title'><Skeleton height={19} count={2}/></div>}            
            {article ? <div className='date'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
</svg>      
            <span>Publicado em {format(new Date(article?.info?.data ? article?.info?.data : new Date()), 'dd/MM/yyyy')}</span>

            
            </div> : <Skeleton className='date'/>}
            <div className='socials'>
                <div className='social' onClick={() => {
                            window.open('https://www.instagram.com/ispaj_ao/')
                        }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
</svg> Instagram
                </div>
                <div className='social' onClick={() => {
                            window.open('https://www.facebook.com/ispaj')
                        }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
</svg> Facebook
                </div>
            </div>
            
<div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: 10,}}>
  {article ? <div onClick={() => {
      openLightbox(0)
  
  }} className='date1'>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-fullscreen" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707m0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707m-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707"/>
  </svg>Tela Cheia</div> : <Skeleton className='date1'/>}
  {article ? <div className='date' style={{marginBottom: 5}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-image" viewBox="0 0 16 16">
  <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
  <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z"/>
</svg>{[...article?.imagens].length} image{[...article?.imagens].length > 1 ? 'ns': 'm'}</div> : <Skeleton className='date'/>}
</div>



            <div className="carouselContainer1">
  <div className="slider">
    <div className="slidercontent">
      {
        article?.imagens && [...article?.imagens].length > 0 && [...article?.imagens].map((item, index) => {
                if (index == 0){
                  return (
                    <figure className='show' onClick={()=> {
                      openLightbox(index)
                    }}>
                        <img src={item} alt="Imagem"/>
                    </figure>
                )
                }else {
                  return (
                    <figure className='disabled' onClick={()=> {
                      openLightbox(index)
                    }}>
                        <img src={item} alt="Imagem"/>
                    </figure>
                )
                }
            
        })
      }
    </div>
    <div class="slidernavigation">
      <button style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
</svg>
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <button style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
</svg>
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  </div>
</div>
{isOpen && (
        // <Lightbox
        
        //   mainSrc={[...article.imagens][photoIndex]}
        //   nextSrc={[...article.imagens][(photoIndex + 1) % [...article.imagens].length]}
        //   prevSrc={[...article.imagens][(photoIndex + [...article.imagens].length - 1) % [...article.imagens].length]}
        //   onCloseRequest={() => setIsOpen(false)}
        //   onMovePrevRequest={() =>
        //     setPhotoIndex((photoIndex + [...article.imagens].length - 1) % [...article.imagens].length)
        //   }
        //   onMoveNextRequest={() =>
        //     setPhotoIndex((photoIndex + 1) % [...article.imagens].length)
        //   }
        // />
        <Lightbox
        
        styles={{
          slide: {
          },
          container: {
            background: '#000000ea'
          },
          
        }}
        plugins={[Counter, Fullscreen, Thumbnails, Zoom, Slideshow]}
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={[...article.imagens].map((item)=> {
          return {src: item}
        })}
      />
      )}
<div className='dots' style={{display: 'none'}}>
    {article?.imagens && [...article?.imagens].length > 0 && [...article?.imagens].map((item, index) => {
        console.log(selIndex)
        return (
            <div className={selIndex == index ? 'sel1': 'sel'}></div>
        )
    })}
</div>
{article ? <div className='content' dangerouslySetInnerHTML={{__html: article?.info?.descricao}}>
    
</div> : <Skeleton className='content' count={20}/>}
                </div>
                <div className='secondCont'>
                  <div className='title2'>Últimas Notícias</div>
                    <div className='sidePosts'>
                      {latest && latest.length > 3 ?
                      latest.filter((item) => item.id != article?.id).slice(0, 6).map((item, index) => {
                        return (
                          <div className='post' key={index}>
                      <div className='imgContainer' style={{overflow: 'hidden'}}>
                        <img src={`${baseURL}/storage/images/${[...item.imagens][0]}`}/>
                      </div>
                      <div className='info' style={{}}>
                        <div className='postTitle'>{item.info.titulo}</div>
                        <div className='date'>{format(new Date(item.info.data), 'dd/MM/yyy')}</div>
                        <div className='seeMore' style={{width: 80, fontSize: 12, fontWeight: '500', margin: 0, justifySelf: 'flex-end', marginTop: 'auto', borderRadius: 3, padding: '2px 5px'}} onClick={() => {
                          navigate(`/noticias/${item.id}`)
                          window.location.reload()


                        }}>Ler Mais</div>
                      </div>
                    </div>
                        )
                      })
                                        :
                                        ['.', '.', '.', '.', '.', '.'].map((item, index) => {
                      return (
                        <div className='post' key={index}>
                          <div className='imgContainer'>
                          </div>
                          <div className='info' style={{}}>
                            <div className='postTitle'>
                              <Skeleton count={2}/>
                            </div>
                            <Skeleton className='date' width={70}/>
                            <Skeleton width={80} height={28} style={{margin: 0, marginTop: 'auto'}}/>
                            {/* <div className='seeMore' style={{width: 80, fontSize: 12, fontWeight: '500', margin: 0, justifySelf: 'flex-end', marginTop: 'auto', borderRadius: 3, padding: '2px 5px'}}>Ler Mais</div> */}
                          </div>
                        </div>
                      )
                                        })}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default NewsArticle