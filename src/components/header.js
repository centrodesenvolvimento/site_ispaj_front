import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useRef, useState } from 'react'
import '../css/header.css' 
import { useEffect } from 'react'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Shimmer } from 'react-shimmer'
import { useLocation, useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetHeader, SheetOverlay, SheetTitle, SheetTrigger } from '../@/components/ui/sheet'
import axios from 'axios'
import { baseURL } from '../api/api'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogOverlay, AlertDialogTitle } from '../@/components/ui/alert-dialog'
import { Overlay } from '@radix-ui/react-alert-dialog'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogTitle } from '../@/components/ui/dialog'
import { Close } from '@radix-ui/react-dialog'
import { Carousel } from 'react-responsive-carousel'
const containerVariants = {
    close: {
        width: '0px',
        transition: {
            type: 'spring',
            damping: 15,
            duratino: 0.5
        }
    },
    open: {
        width: '16rem',
        transition: {
            type: 'spring',
            damping: 15, 
            duration: 0.5
        }
    },
    
}

const RightChevron = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
</svg>
    )
}
const LeftChevron = () => {
    return (
        <svg style={{cursor: 'pointer'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
</svg>
    )
}
const Header = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const sideMenuRef = useRef(null)
    const [selected, setSelected] = useState(0)
    const [selectedSide, setSelectedSide] = useState(0)
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0)
    const [avisos, setAvisos] = useState([])
    const onAutoplayTimeLeft = (s, time, progress) => {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
    
    const icon = useRef(null)
    const [open, setOpen] = useState(false)
    const containerControls = useAnimationControls()
    useEffect(() => {
        if (open) {
            containerControls.start('open')
        }else {
            containerControls.start('close')
        }
    }, [open])
    const menu = useRef(null)
    const swiperRef = useRef(null)
    const handlePrev = () => {
        if (swiperRef.current) swiperRef.current.slidePrev()
    }
    const handleNext = () => {
        if (swiperRef.current) swiperRef.current.slideNext()
    }
    useEffect(() => {
        const interval = setInterval(() => {
            console.log('index', activeIndex)
            if (activeIndex == 2){
                setActiveIndex(0)
            }else {
                setActiveIndex(activeIndex + 1)
            }

        }, 6000);

        return () => clearInterval(interval);
  
    }, [activeIndex])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (sideMenuRef.current && !sideMenuRef.current.contains(e.target)&& !icon.current.contains(e.target)){
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])
    const [departments, setDepartments] = useState([])
  useEffect(() => {
      axios.get(`${baseURL}/api/departamentos`)
      .then(res => {
          console.log('departamentos', res.data)
          setDepartments([...res.data])
      })
  }, [])
  const preHeaderRef = useRef(null)
  const preHeaderRef1 = useRef(null)
  useEffect(() => {
    let lastScrollTop = 0;
    const delta = 15;

    window.addEventListener("scroll", function() {
        let st = window.pageYOffset || document.documentElement.scrollTop;

        if (Math.abs(lastScrollTop - st) <= delta) {
            return;
        }

        if (preHeaderRef.current && preHeaderRef1.current){
            if (st > lastScrollTop && lastScrollTop > 0) {
                preHeaderRef1.current.style.marginTop = "-55px";
                // preHeaderRef.current.style.marginTop = "0";
            } else if (st <= 80){
                // upscroll code
                // preHeaderRef.current.style.marginTop = "55px"
                preHeaderRef1.current.style.marginTop = "0px";
                ;
            }
        }

        lastScrollTop = st;
    });
  }, [])
  const [alerta, setAlerta] = useState(true)

  useEffect(() => {
    console.log('inside avisos useeffect')
    axios.get(`${baseURL}/api/avisos`)
    .then(res => {
      console.log('avisosssssssssssssssssssssssssssssssss', res.data)
      setAvisos([...res.data].filter((item) => {
        if (item?.info?.show == undefined){
            return item
        }else if (item?.info?.show == true){
            return item
        }
    }))
    setDialogOpen1(true)
    
    })
    .catch(err => {
      console.log('avisos error', err.response.data.message)
    })
  }, [])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogOpen1, setDialogOpen1] = useState(false)
//   useEffect(() => {
        
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
//         var max = avisos.length
        
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


// })
useEffect(() => {
    
    
}, [])

      return (
        <div style={{margin: 0, padding: 0}}>
            {avisos.length > 0 && !(sessionStorage.getItem('viewedAlert')) && <Dialog onOpenChange={() => {
                sessionStorage.setItem('viewedAlert', true)
            }} defaultOpen={true} >
                <DialogClose style={{display: 'none'}} onClick={() => {
                    console.log('carlosss')
                }}/>
                
            
                                {/* <AlertDialogTrigger style={{width: '100%'}}>
                                    
                                <div className='actionButton'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
                                                </div>
                                </AlertDialogTrigger> */}
                                <DialogOverlay style={{zIndex: 1000}} onClick={() => {
                                  setDialogOpen1(false)
                                }}/>
                                <DialogContent style={{flexDirection: 'column', display: 'flex', zIndex: 1001, maxWidth: 700, overflow: 'hidden', margin: 'auto'}}>
                                    <span>
                                        <DialogTitle style={{textAlign: 'center', alignSelf: 'center'}}>
                                            Aviso
                                        </DialogTitle>
                                        <DialogDescription style={{textAlign: 'center', alignSelf: 'center'}}>
                                            
                                        </DialogDescription>
                                        
                                        <Carousel autoPlay infiniteLoop
                                        renderArrowPrev={(onClickHandler, hasPrev, label) =>
                                            hasPrev && (
                                              <div
                                                className="alertButtonPrev"
                                                onClick={onClickHandler}
                                                title={label}
                                                style={{left: 15 }}
                                              >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
</svg>
                                              </div>
                                            )
                                          }
                                          renderArrowNext={(onClickHandler, hasNext, label) =>
                                            hasNext && (
                                              <div
                                                className="alertButtonNext"
                                                onClick={onClickHandler}
                                                title={label}
                                                style={{right: 15 }}
                                              >
                                                
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                                              </div>
                                            )
                                          }
                                    
                                        swipeable={true}
                                        thumbWidth={60}
                                        showIndicators={false}
                                        
                                        >
                                            {
                                    avisos.concat(avisos).length > 0 && avisos.map((item, index) => {
                                        return (
                                            
                                                    <div style={{position: 'relative'}} className='alertAviso'>
                                                        <div className='alertContainer'>
                                                        
                                                          <img className='alertImage' src={`${baseURL}/storage/images/${item?.info?.image}`}/>
                                                        
                                                        
                                                        </div>
                                                        <div className='alertInfo'>
                                                            <div className='profile'>
                                                                <div className='profilepic'>
                                                                    <img src={process.env.PUBLIC_URL + '/images/logo.png'}/>
                                                                </div>
                                                                <div className='profileTitle'>instituto superior politécnico alvorecer da juventude</div>
                                                            </div>
                                                            <div className='caption'>{item?.info?.title}</div>
                                                        </div>
                                                        
                                                    </div>
                                                
                        
                                        )
                                    })
                                }
                                        </Carousel>
                            {/* <div className="slider">
                                <div className="slidercontent">
                                {
                                    avisos.length > 0 && avisos.map((item, index) => {
                                        if (index == 0){
                                            return (
                                                <figure className='show'>
                                              <img src={`${baseURL}/storage/images/${item?.info?.image}`}/>
                                            
                                                </figure>
                                            )
                                        }
                                        return (
                                            <figure>
                                                
                                              <img src={`${baseURL}/storage/images/${item?.info?.image}`}/>
                                            
                                            </figure>
                                            
                                        )
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
                            </div> */}
                                            
                                    </span>
                                    
                                    
                                </DialogContent>
                            </Dialog> }
            <div className='outerContainer'>
                <div className='preHeader' ref={preHeaderRef1}>
                    <section className='socials'>
                    <svg onClick={() => {
                            window.open('https://www.facebook.com/ispaj')
                        }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
</svg> 
<svg onClick={() => {
    window.open('https://www.instagram.com/ispaj_ao/')
                        }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
</svg>
<svg onClick={() => {
                            window.open('https://x.com/ispaj_ao')
                        }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
</svg>
                        </section>
                    <div className='params'>
                    <section className='param'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                    </svg>
                            <div className='info'>
                                <div className='paramTitle'>Contacto</div>
                                <div className='description'>934550014/934551800</div>
                            </div>
                        </section>
                    <section className='param'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-paper" viewBox="0 0 16 16">
                    <path d="M4 0a2 2 0 0 0-2 2v1.133l-.941.502A2 2 0 0 0 0 5.4V14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5.4a2 2 0 0 0-1.059-1.765L14 3.133V2a2 2 0 0 0-2-2zm10 4.267.47.25A1 1 0 0 1 15 5.4v.817l-1 .6zm-1 3.15-3.75 2.25L8 8.917l-1.25.75L3 7.417V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1zm-11-.6-1-.6V5.4a1 1 0 0 1 .53-.882L2 4.267zm13 .566v5.734l-4.778-2.867zm-.035 6.88A1 1 0 0 1 14 15H2a1 1 0 0 1-.965-.738L8 10.083zM1 13.116V7.383l4.778 2.867L1 13.117Z"/>
                    </svg>
                            <div className='info'>
                                <div className='paramTitle'>Email</div>
                                <div className='description'>geral@ispaj.net</div>
                            </div>
                        </section>
                    <section className='param' style={{cursor: 'pointer'}} onClick={() => {
                                window.open('https://maps.app.goo.gl/nUDyQHvXJAktK6YD9')
                            }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin-map" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8z"/>
                            <path fill-rule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"/>
                            </svg>
                            <div className='info'>
                                <div className='paramTitle'>Localização</div>
                                <div className='description'>Urbanização Nova Vida, rua 45</div>
                            </div>
                        </section>
                        
                    </div>
                </div>
                <div className='container' ref={preHeaderRef}>
                
                    <img onClick={() => location.pathname != '/' && navigate('/')} alt='logo' className='logo' src={process.env.PUBLIC_URL + '/images/logotrans.png'}/>
                    <div className='logoTextCont'>
                        <div onClick={() => location.pathname != '/' && navigate('/')} className='logoText'>instituto superior politécnico alvorecer da juventude</div>
                    </div>
                    <div className='menuItems'>
                            <div  onMouseLeave={() => setSelected(0)}  onMouseOver={() => setSelected(1)} id='tab1' className={location.pathname === '/sobre' ? 'menuItem1' : 'menuItem'}><span>Sobre</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                </svg> <AnimatePresence>
                    {
                        selected == 1 && <Content dir={'l'} selected={selected} setSelected={setSelected}/>
                    }
                </AnimatePresence></div>
                            <div onMouseLeave={() => setSelected(0)} onMouseOver={() => setSelected(2)} onClick={() => console.log('ad;lkfj ad;lkj f')} id='tab2' className={location.pathname.includes('/cursos') ? 'menuItem1' : 'menuItem'}><span>Ensino</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                </svg> <AnimatePresence>
                    {
                        selected == 2 && <Content dir={'l'} selected={selected} departments={departments} setSelected={setSelected}/>
                    }
                </AnimatePresence></div>
                            <div onMouseLeave={() => setSelected(0)}  onMouseOver={() => setSelected(3)} id='tab3' onClick={() => console.log('ad;lkfj ad;lkj f')} className={location.pathname.includes('admissoes') ? 'menuItem1' : 'menuItem'}><span>Admissões</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                </svg> <AnimatePresence>
                    {
                        selected == 3 && <Content dir={'l'} selected={selected} setSelected={setSelected}/>
                    }
                </AnimatePresence></div>
                <div onMouseLeave={() => setSelected(0)}  onMouseOver={() => setSelected(4)} id='tab3' onClick={() => console.log('ad;lkfj ad;lkj f')} className={location.pathname.includes('colaboradores') ? 'menuItem1' : 'menuItem'}><span>Colaboradores</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                </svg> <AnimatePresence>
                    {
                        selected == 4 && <Content dir={'l'} selected={selected} setSelected={setSelected}/>
                    }
                </AnimatePresence></div>
                            <div onClick={() => {
                                navigate('/noticias')
                            }} className={location.pathname.includes('/noticias') ? 'menuItem1' : 'menuItem'}><span>Notícias</span></div>
                
                
                        </div>
                        <div className='headerEnd' >
                            <div className='contfact' style={{opacity: 0}}>
                                Inscrição Online
                            </div>
                        </div>
                        <Sheet open={open} style={{zIndex: 111000100101}}>
                            <SheetTrigger onClick={()=> {
                                setSelectedSide(0)
                                setOpen(true)
                            }}>
                                <div ref={icon} onClick={() => {
                                    // setOpen(!open)
                                     }} className={open ? 'bi-listCont1' : 'bi-listCont'}>
                                {!open ?    <svg ref={icon}  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                                    </svg>
                                    :
                                    <svg ref={icon} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                                </svg>}
                                </div>
                            </SheetTrigger>
                            <SheetOverlay></SheetOverlay>
                            <SheetContent style={{zIndex: 2010129391831298, padding: 0, paddingTop: 25, overflow: 'hidden'}}>
                                <SheetHeader>
                                    <SheetTitle></SheetTitle>
                                </SheetHeader>
                                <motion.div ref={sideMenuRef}
                className='sideMenu flex flex-col z-10 gap-5 h-full '>
                    <div className='flex flex-col w-full justify-between place-items-center'>
                    <div className='sideHeader' style={{}}>
                            {<motion.img initial={{
                                opacity: 0,
                                y: 0,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: 0
                            }}
                            transition={{
                                duration: 0.5,
                                ease: 'easeInOut',
                            }}
                             className='sideLogo' src={process.env.PUBLIC_URL+'/images/logotrans.png'} />}
                            {<motion.div initial={{
                                opacity: 0,
                                y: 0,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: 0
                            }}
                            transition={{
                                duration: 0.5,
                                ease: 'easeInOut',
                            }}
                            className='sideText' style={{marginLeft: 5}}>instituto superior politécnico alvorecer da juventude</motion.div>}
                        </div>
                        {selectedSide == 0 ? <motion.div
                        initial={{
                            opacity: 0,
                            x: -100
                        }}
                        animate={{
                            opacity: 1,
                            x: 0
                        }}
                         className='sideMenuItems'>
                            <div onClick={() => {
                                setSelectedSide(1)
                            }} className={location.pathname.includes('/sobre') ? 'sideMenuItem2' : 'sideMenuItem'}><span>Sobre</span><RightChevron /></div>
                            <div onClick={() => {
                                setSelectedSide(2)
                            }} className='sideMenuItem'><span>Ensino</span><RightChevron /></div>
                            <div onClick={() => {
                                setSelectedSide(3)
                            }} className={location.pathname.includes('admissoes') ? 'sideMenuItem2' : 'sideMenuItem'}><span>Admissões</span><RightChevron /></div>
                            <div onClick={() => {
                                setSelectedSide(4)
                            }} className={location.pathname.includes('colaboradores') ? 'sideMenuItem2' : 'sideMenuItem'}><span>Colaboradores</span><RightChevron /></div>
                            <div onClick={() => {
                                navigate('/noticias')
                            }} className={location.pathname.includes('/noticias') ? 'sideMenuItem2' : 'sideMenuItem'}><span>Notícias</span></div>
                        </motion.div>
                        : selectedSide == 1 ?
                        <SideMenuItem>
                        <div onClick={() => setSelectedSide(0)} className='sideMenuItem1'><LeftChevron /></div>
                        
                        <div className='sideMenuItem' onClick={() => {
                            navigate('/sobre')

                            localStorage.setItem('path',  'Sobre o ISPAJ')
                            setOpen(false)
                        }}><span>Sobre o ISPAJ</span></div>
                        <div className='sideMenuItem' onClick={() => {
                            navigate('/sobre')

                            localStorage.getItem('path') != 'Estrutura Orgânica' && localStorage.setItem('path',  'Estrutura Orgânica')
                            setOpen(false)

                        }}><span>Estrutura Orgânica</span></div>

                        <div onClick={() => {
                            navigate('/sobre')

                            localStorage.getItem('path') != 'Estrutura Administrativa' && localStorage.setItem('path',  'Estrutura Administrativa')
                            setOpen(false)

                        }} className='sideMenuItem'><span>Estrutura Administrativa</span></div>

                        <div className='sideMenuItem' onClick={() => {
                            navigate('/sobre')

                            localStorage.getItem('path') != 'Historial' && localStorage.setItem('path',  'Historial')
                            setOpen(false)

                        }} ><span>Historial</span></div>

                        <div className='sideMenuItem' onClick={() => {
                            navigate('/sobre')

                            localStorage.getItem('path') != 'Organigrama Insitucional' && localStorage.setItem('path',  'Organigrama Insitucional')
                            setOpen(false)

                        }}><span>Organigrama Insitucional</span></div>

                        <div className='sideMenuItem' onClick={() => {
                            navigate('/sobre')

                            localStorage.getItem('path') != 'Estatutos e Regulamentos' && localStorage.setItem('path',  'Estatutos e Regulamentos')
                            setOpen(false)

                        }}><span>Estatutos e Regulamentos</span></div>
                        
                    </SideMenuItem>:
                        selectedSide == 2 ?
                        <SideMenuItem>
                        <div onClick={() => setSelectedSide(0)} className='sideMenuItem1'><LeftChevron /></div>
                        <div className='sideMenuItem' onClick={() => {
                            navigate('/cursos', {
                                state: {
                                    ...departments[1]
                                }
                            })
                            localStorage.setItem('path', 'Sociais e Económicas')
                            window.location.reload()
                        }}><span>Ciências Sociais e Económicas</span></div>
                        <div className='sideMenuItem' onClick={() => {
                            navigate('/cursos', {
                                state: {
                                    ...departments[2]
                                }
                            })
                            localStorage.setItem('path', 'Engenharias e Ciências Exatas')
                            window.location.reload()
                        }}><span>Engenharias e Ciências Exatas</span></div>
                        <div className='sideMenuItem' onClick={() => {
                            navigate('/cursos', {
                                state: {
                                    ...departments[0]
                                }
                            })
                            localStorage.setItem('path', 'Saúde')
                            localStorage.setItem('course',departments[0]?.id)
                            window.location.reload()
                        }}><span>Ciências da Saúde</span></div>
                    </SideMenuItem>
                        : selectedSide == 3 ? <SideMenuItem>
                        <div onClick={() => setSelectedSide(0)} className='sideMenuItem1'><LeftChevron /></div>
                        <div className='sideMenuItem' onClick={() => {
                        axios.get(`${baseURL}/api/admissionsContents`)
                        .then(res => {
                            let content = [...res.data][0]
                            if (content.emolumentos) {
                                window.open(`${baseURL}/storage/pdfs/${content.emolumentos}`)

                            }else {
                                setDialogOpen(true)
                            }
                        setOpen(false)
                        })
                        
                    }}><span>Emolumentos/Propinas</span></div>
                        <div
                        onClick={() => {
                            
                            axios.get(`${baseURL}/api/admissionsContents`)
                        .then(res => {
                            let content = [...res.data][0]
                            if (content.calendario) {
                                window.open(`${baseURL}/storage/pdfs/${content.calendario}`)

                            }else {
                                setDialogOpen(true)
                            }
                        setOpen(false)
                        })
                        }} className='sideMenuItem'><span>Calendário Académico</span></div>

                        <div onClick={() => {
                            navigate('/admissoes')
                            localStorage.setItem('path', 'Exames de Acesso')
                            setOpen(false)

                        }} className='sideMenuItem'><span>Exames de acesso</span></div>
                        {/* <div className='sideMenuItem' onProgress={() => {
                            navigate('/admissoes')
                            localStorage.setItem('path', 'Horários')
                            setOpen(false)

                        }}><span>Horários</span></div> */}
                        {/* navigate('/admissoes')
                       localStorage.setItem('path', 'Sugestões e Reclamações') */}
                        <div className='sideMenuItem' onClick={() => {
                            navigate('/admissoes')
                            localStorage.setItem('path', 'Perguntas Frequentes')
                            setOpen(false)

                        }}><span>Perguntas frequentes</span></div>
                        <div className='sideMenuItem' onClick={() => {
                            navigate('/admissoes')
                            localStorage.setItem('path', 'Sugestões e Reclamações')
                            setOpen(false)

                        }}><span>Sugestões e Reclamações</span></div>
                    </SideMenuItem>
                    :
                    <SideMenuItem>
                        <div onClick={() => setSelectedSide(0)} className='sideMenuItem1'><LeftChevron /></div>
                        <div className='sideMenuItem' onClick={() => {
                            navigate('/colaboradores/bolsas', {
                            })
                        }}><span>Bolsa de professores</span></div>
                    </SideMenuItem>}
                    </div>
                </motion.div>
                            </SheetContent>
                        </Sheet>
                
                </div>
                <AlertDialog open={dialogOpen}>
                                {/* <AlertDialogTrigger style={{width: '100%'}}>
                                    
                                <div className='actionButton'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
                                                </div>
                                </AlertDialogTrigger> */}
                                <AlertDialogContent style={{flexDirection: 'column', display: 'flex', alignItems: 'center'}}>
                                    <span>
                                        <AlertDialogTitle style={{textAlign: 'center', alignSelf: 'center'}}>
                                            Documento não existe
                                        </AlertDialogTitle>
                                        <AlertDialogDescription style={{textAlign: 'center', alignSelf: 'center'}}>
                                            O documento solicitado encontra-se indisponível.
                                        </AlertDialogDescription>
                                    </span>
                                    <span style={{alignSelf: 'center', marginTop: 15, display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', }}>
                                    
                                    <AlertDialogAction onClick={() => {
                                        setDialogOpen(false)
                                        setSelected(0)
                                    }} style={{margin: 0}} >Ok</AlertDialogAction>
                                    </span>
                                    
                                </AlertDialogContent>
                            </AlertDialog> 
                {/* <div ref={menu} className={`mobileItems ${open ? 'fadeIn': 'fadeOut'}`}>
                        <div onClick={() => location.pathname != '/about' && navigate('/about')} className={location.pathname == '/about' ? 'mobileItem1' : 'mobileItem'}>About</div>
                        <div onClick={() => location.pathname != '/blog' && navigate('/blog')} className={location.pathname.includes('/blog') ? 'mobileItem1' : 'mobileItem'}>Blog</div>
                        <div onClick={() => location.pathname != '/projects' && navigate('/projects')} className={location.pathname.includes('/projects') ? 'mobileItem1' : 'mobileItem'}>Project</div>
                    </div> */}
            </div>
            
            {/* <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        loop
        slidesPerView={1}
        onChange={() => {
            console.log('changed')
        }}
        onSlideChange={(e) => {
            console.log('changeddddd', e.realIndex)
            setActiveIndex(e.realIndex)
        }}
        
        pagination={{
          clickable: true,
          
        }}
        onSwiper={(e) => {
            swiperRef.current = e
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide>
        <div className='slideTextCont'>{activeIndex == 0 && <motion.div initial={{opacity: 0, x: 200}} animate={{opacity: 1, x: 0}} transition={{duration: 0.8}} className='slideText'>Seja bem vindo ao Instituto Superior Politécnico Alvorecer Da Juventude</motion.div>}</div>

          <img src={process.env.PUBLIC_URL + '/images/welcome.png'} />
        </SwiperSlide>
        <SwiperSlide>
        <div className='slideTextCont'>{activeIndex == 1 && <motion.div initial={{opacity: 0, x: 200}} animate={{opacity: 1, x: 0}} transition={{duration: 0.8}} className='slideText'>Um lugar de descoberta, crescimento e sucesso. Experimente</motion.div>}</div>

          <img src={process.env.PUBLIC_URL + '/images/ispajview.png'}  />

        </SwiperSlide>
        <SwiperSlide>
        <div className='slideTextCont'>{activeIndex == 2 && <motion.div initial={{opacity: 0, x: 200}} animate={{opacity: 1, x: 0}} transition={{duration: 0.8}} className='slideText'>Educação transformadora</motion.div>}</div>

          <img src={process.env.PUBLIC_URL + '/images/lab.png'}  />

        </SwiperSlide>
        <div onClick={() => handlePrev()} className='button left'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
</svg></div>
        <div onClick={() => handleNext()} className='button right'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
</svg></div>
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper> */}
      

        </div>
    )
}
const SideMenuItem = ({children, ...props}) => {
    return (
        <motion.div className='sideMenuItems'
        initial={{
            opacity: 0,
            x: 100,
        }}
        animate={{
            opacity: 1,
            x: 0
        }}
        exit={{
            opacity: 0,
            x: 100
        }}
        >
            {children}
        </motion.div>
    )
}
const Content = ({ selected, dir, departments, setSelected }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [dialogOpen, setDialogOpen] = useState(false)
    return (

        <motion.div 
        initial={{
            opacity: 0,
            y: 30,
        }}
        animate={{
            opacity: 1,
            y: 0
        }}
        exit={{
            opacity: 0,
            y: 30
        }}
        style={{width: '250px'}} id='overlay-content' className="content absolute top-[calc(60px)]
         rounded-lg border border-gray-300 bg-gradient-to-b from-white via-white-100 to-white p-4">
            <AlertDialog open={dialogOpen}>
                                {/* <AlertDialogTrigger style={{width: '100%'}}>
                                    
                                <div className='actionButton'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
                                                </div>
                                </AlertDialogTrigger> */}
                                <AlertDialogContent style={{flexDirection: 'column', display: 'flex', alignItems: 'center'}}>
                                    <span>
                                        <AlertDialogTitle style={{textAlign: 'center', alignSelf: 'center'}}>
                                            Documento não existe
                                        </AlertDialogTitle>
                                        <AlertDialogDescription style={{textAlign: 'center', alignSelf: 'center'}}>
                                        O documento solicitado encontra-se indisponível.
                                        </AlertDialogDescription>
                                    </span>
                                    <span style={{alignSelf: 'center', marginTop: 15, display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', }}>
                                    
                                    <AlertDialogAction onClick={() => {
                                        setDialogOpen(false)
                                        setSelected(0)
                                    }} style={{margin: 0}} >Ok</AlertDialogAction>
                                    </span>
                                    
                                </AlertDialogContent>
                            </AlertDialog> 
            <div style={{position: 'absolute', top: '-40px', width: '100%'}} className=' absolute -top[40px] left-0 right 0 h-[40px]'></div>

            <motion.div
            initial={{
                opacity: 0,
                x: dir === 'l' ? 100 : dir === 'r'? -100 : 0
            }}
            animate={{
                opacity: 1,
                x: 0,
            }}
            transition={{
                duration: 0.25,
                ease: 'easeInOut'
            }}
            >
            {
                selected == 1 ?
                <div className='subMenu'>
                    <div className={localStorage.getItem('path')?.includes('Sobre') ? 'subItem1' : 'subItem'} onClick={() => {
                        location.pathname != '/sobre' && navigate('/sobre')
                        
                        localStorage.setItem('path', 'Sobre o ISPAJ')
                    }}>Sobre o ISPAJ</div>
                    <div onClick={() => {
                        navigate('/sobre')
                        
                        localStorage.setItem('path', 'Estrutura Orgânica')
                    }} className={localStorage.getItem('path')?.includes('Estrutura Orgânica') ? 'subItem1' : 'subItem'}>Estrutura Orgânica</div>
                    <div onClick={() => {
                        navigate('/sobre')
                        
                        localStorage.setItem('path', 'Estrutura Administrativa')
                    }} className={localStorage.getItem('path')?.includes('Estrutura Administrativa') ? 'subItem1' : 'subItem'}>Estrutura Administrativa</div>
                    <div onClick={() => {
                        navigate('/sobre')

                        localStorage.setItem('path',  'Historial')
                    }} className={localStorage.getItem('path')?.includes('Historial') ? 'subItem1' : 'subItem'}>Historial</div>
                    <div onClick={() => {
                        navigate('/sobre')

                        localStorage.setItem('path', 'Organigrama Institucional')
                    }} className={localStorage.getItem('path')?.includes('Organigrama') ? 'subItem1' : 'subItem'}>Organigrama Institucional</div>
                    <div  onClick={() => {
                        navigate('/sobre')

                        localStorage.setItem('path', 'Estatutos e Regulamentos')
                    }} className={localStorage.getItem('path')?.includes('Estatutos') ? 'subItem1' : 'subItem'}>Estatutos e Regulamentos</div>
                </div>
                : selected == 2?
                <div className='subMenu'>
                    {departments?.map((item) => {
                        return (
                            <div className={localStorage.getItem('path')?.includes(item?.info?.titulo) ? 'subItem1' : 'subItem'} onClick={() => {
                                navigate('/cursos', {
                                    state: {
                                        ...departments[item?.id]
                                    }
                                })
                                localStorage.setItem('path', `${item?.info?.titulo}`)
                                window.location.reload()

                        }}>{item?.info?.titulo}</div>
                        )
                    })}
                    {/* <div className='subItem' onClick={() => {
                                navigate('/cursos', {
                                    state: {
                                        ...departments[1]
                                    }
                                })
                                localStorage.setItem('path', 'Sociais e económicas')
                                window.location.reload()

                        }}>Ciências Sociais e Económicas</div>
                    <div className='subItem' onClick={() => {
                                navigate('/cursos', {
                                    state: {
                                        ...departments[2]
                                    }
                                })
                                localStorage.setItem('path', 'Engenharias e ciências exatas')
                                localStorage.setItem('course',departments[2]?.id)
                                window.location.reload()
                        }}>Engenharias e Ciências Exatas</div>
                    <div className='subItem' onClick={() => {
                                navigate('/cursos', {
                                    state: {
                                        ...departments[0]
                                    }
                                })
                                localStorage.setItem('path', 'Saúde')
                                localStorage.setItem('course',departments[0]?.id)
                                window.location.reload()

                        }}>Ciências da Saúde</div> */}
                    
                </div>
                : selected == 3 ? <div className='subMenu'>
                    
                    <div onClick={() => {
                        
                        axios.get(`${baseURL}/api/admissionsContents`)
                        .then(res => {
                            let content = [...res.data][0]
                            if (content.emolumentos) {
                                window.open(`${baseURL}/storage/pdfs/${content.emolumentos}`)

                            }else {
                                setDialogOpen(true)
                            }
                        })
                    }}>Emolumentos/Propinas</div>
                    <div onClick={() => {

                            axios.get(`${baseURL}/api/admissionsContents`)
                        .then(res => {
                            let content = [...res.data][0]
                            if (content.calendario) {
                                window.open(`${baseURL}/storage/pdfs/${content.calendario}`)

                            }else {
                                setDialogOpen(true)
                            }
                        })                    }}className='subItem' >Calendário Académico</div>
                    <div className={localStorage.getItem('path')?.includes('Exames') ? 'subItem1' : 'subItem'} onClick={() => {
                        navigate('/admissoes')
                        localStorage.setItem('path', 'Exames de Acesso')
                    }}>Exames de acesso</div>
                    {/* <div className='subItem' onClick={() => {
                         navigate('/admissoes')
                        localStorage.setItem('path', 'Horários')
                    }}>Horários</div> */}
                    <div className={localStorage.getItem('path')?.includes('Perguntas') ? 'subItem1' : 'subItem'} onClick={() => {
                         navigate('/admissoes')
                        localStorage.setItem('path', 'Perguntas Frequentes')
                    }}>Perguntas frequentes</div><div className={localStorage.getItem('path')?.includes('Sugestões') ? 'subItem1' : 'subItem'} onClick={() => {
                        navigate('/admissoes')
                       localStorage.setItem('path', 'Sugestões e Reclamações')
                   }}>Sugestões e Reclamações</div>
                </div>
                :
                <div className='subMenu'>
                    <div className={location.pathname.includes('bolsas') ? 'subItem1' : 'subItem'} onClick={() => {
                        navigate('/colaboradores/bolsas', {
                            
                        })
                    }}>Bolsa de professores</div>
                </div>

            }
            </motion.div>
        </motion.div>

    )
}
export default Header