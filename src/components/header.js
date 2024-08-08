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
          console.log('res', res.data)
          setDepartments([...res.data])
      })
  }, [])
      return (
        <div style={{margin: 0, padding: 0}}>
            <div className='outerContainer'>
                <div className='container' >
                
                    <img onClick={() => location.pathname != '/' && navigate('/')} alt='logo' className='logo' src={process.env.PUBLIC_URL + '/images/logotrans.png'}/>
                    <div className='logoTextCont'>
                        <div onClick={() => location.pathname != '/' && navigate('/')} className='logoText'>instituto superior politécnico alvorecer da juventude</div>
                    </div>
                    <div className='menuItems'>
                            <div  onMouseLeave={() => setSelected(0)}  onMouseOver={() => setSelected(1)} id='tab1' className={location.pathname === '/sobre' ? 'menuItem1' : 'menuItem'}><span>Sobre</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                </svg> <AnimatePresence>
                    {
                        selected == 1 && <Content dir={'l'} selected={selected}/>
                    }
                </AnimatePresence></div>
                            <div onMouseLeave={() => setSelected(0)} onMouseOver={() => setSelected(2)} onClick={() => console.log('ad;lkfj ad;lkj f')} id='tab2' className={location.pathname.includes('/cursos') ? 'menuItem1' : 'menuItem'}><span>Ensino</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                </svg> <AnimatePresence>
                    {
                        selected == 2 && <Content dir={'l'} selected={selected}/>
                    }
                </AnimatePresence></div>
                            <div onMouseLeave={() => setSelected(0)}  onMouseOver={() => setSelected(3)} id='tab3' onClick={() => console.log('ad;lkfj ad;lkj f')} className={location.pathname.includes('admissoes') ? 'menuItem1' : 'menuItem'}><span>Admissões</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                </svg> <AnimatePresence>
                    {
                        selected == 3 && <Content dir={'l'} selected={selected}/>
                    }
                </AnimatePresence></div>
                <div onMouseLeave={() => setSelected(0)}  onMouseOver={() => setSelected(4)} id='tab3' onClick={() => console.log('ad;lkfj ad;lkj f')} className={location.pathname.includes('colaboradores') ? 'menuItem1' : 'menuItem'}><span>Colaboradores</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                </svg> <AnimatePresence>
                    {
                        selected == 4 && <Content dir={'l'} selected={selected}/>
                    }
                </AnimatePresence></div>
                            <div onClick={() => {
                                navigate('/noticias')
                            }} className={location.pathname.includes('/noticias') ? 'menuItem1' : 'menuItem'}><span>Notícias</span></div>
                
                
                        </div>
                        <div className='headerEnd' >
                            <div className='contact' onClick={() => {
                            navigate('/soon')
                        }}>
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
                            className='sideText'>instituto superior politécnico alvorecer da juventude</motion.div>}
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
                            localStorage.setItem('path', 'Sociais e económicas')
                            window.location.reload()
                        }}><span>Sociais e económicas</span></div>
                        <div className='sideMenuItem' onClick={() => {
                            navigate('/cursos', {
                                state: {
                                    ...departments[2]
                                }
                            })
                            localStorage.setItem('path', 'Engenharias e ciências exatas')
                            window.location.reload()
                        }}><span>Engenharias e ciências exatas</span></div>
                        <div className='sideMenuItem' onClick={() => {
                            navigate('/cursos', {
                                state: {
                                    ...departments[0]
                                }
                            })
                            localStorage.setItem('path', 'Saúde')
                            localStorage.setItem('course',departments[0]?.id)
                            window.location.reload()
                        }}><span>Saúde</span></div>
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
                                alert('Documento não existe')
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
                                alert('Documento não existe')
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
const Content = ({ selected, dir }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [departments, setDepartments] = useState([])
    
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
                    <div className='subItem' onClick={() => {
                        location.pathname != '/sobre' && navigate('/sobre')
                        
                        localStorage.setItem('path', 'Sobre o ISPAJ')
                    }}>Sobre o ISPAJ</div>
                    <div onClick={() => {
                        navigate('/sobre')
                        
                        localStorage.setItem('path', 'Estrutura Orgânica')
                    }} className='subItem'>Estrutura Orgânica</div>
                    <div onClick={() => {
                        navigate('/sobre')
                        
                        localStorage.setItem('path', 'Estrutura Administrativa')
                    }} className='subItem'>Estrutura Administrativa</div>
                    <div onClick={() => {
                        navigate('/sobre')

                        localStorage.setItem('path',  'Historial')
                    }}className='subItem'>Historial</div>
                    <div onClick={() => {
                        navigate('/sobre')

                        localStorage.setItem('path', 'Organigrama Institucional')
                    }}className='subItem'>Organigrama Institucional</div>
                    <div  onClick={() => {
                        navigate('/sobre')

                        localStorage.setItem('path', 'Estatutos e Regulamentos')
                    }} className='subItem'>Estatutos e Regulamentos</div>
                </div>
                : selected == 2?
                <div className='subMenu'>
                    <div className='subItem' onClick={() => {
                                navigate('/cursos', {
                                    state: {
                                        ...departments[1]
                                    }
                                })
                                localStorage.setItem('path', 'Sociais e económicas')
                                window.location.reload()

                        }}>Sociais e económicas</div>
                    <div className='subItem' onClick={() => {
                                navigate('/cursos', {
                                    state: {
                                        ...departments[2]
                                    }
                                })
                                localStorage.setItem('path', 'Engenharias e ciências exatas')
                                localStorage.setItem('course',departments[2]?.id)
                                window.location.reload()
                        }}>Engenharias e ciências exatas</div>
                    <div className='subItem' onClick={() => {
                                navigate('/cursos', {
                                    state: {
                                        ...departments[0]
                                    }
                                })
                                localStorage.setItem('path', 'Saúde')
                                localStorage.setItem('course',departments[0]?.id)
                                window.location.reload()

                        }}>Saúde</div>
                    
                </div>
                : selected == 3 ? <div className='subMenu'>
                    <div onClick={() => {
                        
                        axios.get(`${baseURL}/api/admissionsContents`)
                        .then(res => {
                            let content = [...res.data][0]
                            if (content.emolumentos) {
                                window.open(`${baseURL}/storage/pdfs/${content.emolumentos}`)

                            }else {
                                alert('Documento não existe')
                            }
                        })
                    }}className='subItem'>Emolumentos/Propinas</div>
                    <div onClick={() => {

                            axios.get(`${baseURL}/api/admissionsContents`)
                        .then(res => {
                            let content = [...res.data][0]
                            if (content.calendario) {
                                window.open(`${baseURL}/storage/pdfs/${content.calendario}`)

                            }else {
                                alert('Documento não existe')
                            }
                        })                    }}className='subItem' >Calendário Académico</div>
                    <div className='subItem' onClick={() => {
                        navigate('/admissoes')
                        localStorage.setItem('path', 'Exames de Acesso')
                    }}>Exames de acesso</div>
                    {/* <div className='subItem' onClick={() => {
                         navigate('/admissoes')
                        localStorage.setItem('path', 'Horários')
                    }}>Horários</div> */}
                    <div className='subItem' onClick={() => {
                         navigate('/admissoes')
                        localStorage.setItem('path', 'Perguntas Frequentes')
                    }}>Perguntas frequentes</div><div className='subItem' onClick={() => {
                        navigate('/admissoes')
                       localStorage.setItem('path', 'Sugestões e Reclamações')
                   }}>Sugestões e Reclamações</div>
                </div>
                :
                <div className='subMenu'>
                    <div className='subItem' onClick={() => {
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