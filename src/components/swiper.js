import { useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import '../css/header.css'
import axios from 'axios'
import { baseURL } from '../api/api'
const Swiper = () => {
    const [activeIndex, setActiveIndex] = useState(0)
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
    const [aboutContent, setAboutContent] = useState(null)
    useEffect(() => {
        axios.get(`${baseURL}/api/homeContents`)
        .then(res => {
            setAboutContent([...res.data][0])
        })
    }, [])
    const [canPlay, setCanPlay] = useState(false)
    return (
        <div className='secondContainer'>
            
        <div className='swiper' style={{}}>
            <div className='slideTextCont'>{activeIndex == 0 && <motion.div initial={{opacity: 0, x: 200}} animate={{opacity: 1, x: 0}} transition={{duration: 0.8}} className='slideText'>Seja bem vindo ao Instituto Superior Politécnico Alvorecer Da Juventude</motion.div>}</div>
            <div className='slideTextCont'>{activeIndex == 1 && <motion.div initial={{opacity: 0, x: 200}} animate={{opacity: 1, x: 0}} transition={{duration: 0.8}} className='slideText'>Um lugar de descoberta, crescimento e sucesso. Experimente</motion.div>}</div>
            <div className='slideTextCont'>{activeIndex == 2 && <motion.div initial={{opacity: 0, x: 200}} animate={{opacity: 1, x: 0}} transition={{duration: 0.8}} className='slideText'>Educação transformadora</motion.div>}</div>
            {/* <video src={process.env.PUBLIC_URL + 'images/homeVid1.mp4'} autoPlay loop muted /> */}
            {aboutContent && <video onCanPlay={() =>{
                setCanPlay(true)
            }} src={aboutContent?.videoInicial} style={{display: canPlay ? 'block' : 'none'}} autoPlay loop muted/>}
        </div>
    </div>
    )
}
export default Swiper 