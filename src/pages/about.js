import { useLocation, useNavigate } from "react-router-dom"
import Header from "../components/header"
import Swiper2 from "../components/swiper2"
import Footer from "../components/footer"
import '../css/about.css'
import { useEffect, useRef, useState } from "react"
import AboutSection from "../components/aboutSection"
import { motion } from "framer-motion"
import Organisation from "../components/organisation"
import EstruturaOrg from "../components/estruturaOrg"
import EstruturaAdmin from "../components/estruturaAdmin"
import History from "../components/history"
import Estatutos from "../components/estatutos"
import { baseURL } from "../api/api"
import axios from "axios"
import Swiper1 from "../components/swiper1"

const wrapperVariants = {
    open: {
      scaleY: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    closed: {
      scaleY: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.1,
      },
    },
  };
  
  const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
  };
  
  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
      },
    },
    closed: {
      opacity: 0,
      y: -15,
      transition: {
        when: "afterChildren",
      },
    },
  };
  
  const actionIconVariants = {
    open: { scale: 1, y: 0 },
    closed: { scale: 0, y: -7 },
  };

  const Option = ({ text, section, setSection, setOpen }) => {
    return (
      <motion.li
        variants={itemVariants}
        onClick={() => {
          !section.includes(text) && setSection(text)
          !section.includes(text) && localStorage.setItem('path', text)
          setOpen(false)
          
        }}
        className={section.includes(text) ? 'optionItem1' : 'optionItem'}
      >
        
        <span>{text}</span>
      </motion.li>
    );
  };
  const StaggeredDropDown = ({section, setSection}) => {
    
    const [open, setOpen] = useState(false);
    useEffect(() => {
      //('open', open)
    }, [open])
    const menuRef = useRef(null)
    useEffect(() => {
      const handleClickOutside = (e) => {
          if (menuRef.current && !menuRef.current.contains(e.target)){
              setOpen(false)
          }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
          document.removeEventListener('mousedown', handleClickOutside)
      }
  }, [])
  
    return (
      <div ref={menuRef} style={{zIndex: 50}} className="aboutOptions">
        <motion.div animate={open ? "open" : "closed"} className="relative">
          <button
            onClick={() => setOpen((pv) => !pv)}
            className="aboutOptionsButton"
          >
            <span className="aboutOptionsText">Navegação Adicional</span>
            <motion.span variants={iconVariants}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
</svg>
            </motion.span>
          </button>
  
          <motion.ul
            initial={wrapperVariants.closed}
            variants={wrapperVariants}
            style={{ originY: "top", translateX: 0}}
            className="aboutOptionsList"
          >
            
            <Option setOpen={setOpen} section={section} setSection={setSection}text="Sobre nós" />
            <Option setOpen={setOpen} section={section} setSection={setSection} text="Estrutura Administrativa" />
            <Option setOpen={setOpen} section={section} setSection={setSection} text="Historial" />
            <Option setOpen={setOpen} section={section} setSection={setSection} text="Organigrama Insitucional" />
            {/* <Option setOpen={setOpen} section={section} setSection={setSection} text="Estatutos e Regulamentos" /> */}
          </motion.ul>
        </motion.div>
      </div>
    );
  };
const About = () => {
    const [section, setSection] = useState('Sobre nós')
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
      localStorage.getItem('path') && setSection(localStorage.getItem('path'))
      window.scrollTo(0, 0)
    }, [section])
    useEffect(() => {
      localStorage.getItem('path') && setSection(localStorage.getItem('path'))
    })
    const [aboutContent, setAboutContent] = useState(null)
    useEffect(() => {
        axios.get(`${baseURL}/api/aboutContents`)
        .then(res => {
            setAboutContent([...res.data][0])
        })
    }, [])
    return (
        <div className="abtCont">
            <Header />
            <Swiper1 />
            <div className="aboutFirst">
              <div className="navigation">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-map-fill" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.598-.49L10.5.99 5.598.01a.5.5 0 0 0-.196 0l-5 1A.5.5 0 0 0 0 1.5v14a.5.5 0 0 0 .598.49l4.902-.98 4.902.98a.5.5 0 0 0 .196 0l5-1A.5.5 0 0 0 16 14.5zM5 14.09V1.11l.5-.1.5.1v12.98l-.402-.08a.5.5 0 0 0-.196 0zm5 .8V1.91l.402.08a.5.5 0 0 0 .196 0L11 1.91v12.98l-.5.1z"/>
                  </svg>
                  <span onClick={() => {
                              navigate('/')
                          }}>Home</span> <span>{'>'}</span><span>{section}</span>
                </div>
                <StaggeredDropDown section={section} setSection={setSection} />
            </div>
            
            <div className="aboutContainer">
                
                
                <section className="secondAboutSection" style={{flex: 1}}>
                    {
                        section.includes('Sobre') ?
                        <AboutSection aboutContent={aboutContent} />
                        : section.includes('Orgânica') ? <EstruturaOrg aboutContent={aboutContent} />
                        : section.includes('Administrativa') ? <EstruturaAdmin aboutContent={aboutContent} />
                        : section.includes('Historial') ? <History aboutContent={aboutContent} />
                        : section.includes('Organigrama') ? <Organisation aboutContent={aboutContent} />
                        : <Estatutos aboutContent={aboutContent} />
                    }
                </section>
            </div>
            
            <Footer />
        </div>
    )
}
export default About
