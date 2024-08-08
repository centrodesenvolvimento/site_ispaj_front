import { useEffect, useRef, useState } from 'react'
import {motion, useAnimationControls} from 'framer-motion'
import '../css/header.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
const Swiper3 = () => {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0)
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
    return (
        <div className='secondContainer'>
            
            <Swiper
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
        <div className='slideTextCont'>{activeIndex == 0 && <motion.div initial={{opacity: 0, x: 200}} animate={{opacity: 1, x: 0}} transition={{duration: 0.8}} className='slideText'>Aqui no ISPAJ somos ativos, envolvidos, engajados</motion.div>}</div>

          <img src={process.env.PUBLIC_URL + '/images/join.png'} />
        </SwiperSlide>
        <SwiperSlide>
        <div className='slideTextCont'>{activeIndex == 1 && <motion.div initial={{opacity: 0, x: 200}} animate={{opacity: 1, x: 0}} transition={{duration: 0.8}} className='slideText'> Exploramos Fronteiras em Laboratórios Profissionais</motion.div>}</div>

          <img src={process.env.PUBLIC_URL + '/images/join2.png'}  />

        </SwiperSlide>
        <SwiperSlide>
        <div className='slideTextCont'>{activeIndex == 2 && <motion.div initial={{opacity: 0, x: 200}} animate={{opacity: 1, x: 0}} transition={{duration: 0.8}} className='slideText'>Junte-se a nós. Junte-se ao ISPAJ</motion.div>}</div>

          <img src={process.env.PUBLIC_URL + '/images/join3.png'}  />

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
      </Swiper>
    </div>
    )
}
export default Swiper3