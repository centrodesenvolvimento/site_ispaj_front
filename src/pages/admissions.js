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
import Swiper3 from "../components/swiper3"
import ExamsSection from "../components/examsSection"
import Fees from "../components/fees"
import Faq from "../components/faq"
import Timings from "../components/timings"
import axios from "axios"
import { baseURL } from "../api/api"
import Sugestions from "../components/sugestions"

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
          if (`${text}`.includes('Emolumentos')){
            window.open(process.env.PUBLIC_URL + 'pdf/emolumentos.pdf')
            setOpen(false)
          }else if (`${text}`.includes('Calendário')){
            window.open(process.env.PUBLIC_URL + 'pdf/calendar.pdf')
            setOpen(false)

          }else {
            !section.includes(text) && setSection(text)
          !section.includes(text) && localStorage.setItem('path', text)
          }
          
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
      console.log('open', open)
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
      <div style={{zIndex: 50}} className="aboutOptions" ref={menuRef}>
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
            
            <Option setOpen={setOpen} section={section} setSection={setSection}text="Emolumentos/Propinas" />
            <Option setOpen={setOpen} section={section} setSection={setSection} text="Calendário Académico" />
            <Option setOpen={setOpen} section={section} setSection={setSection} text="Exames de Acesso" />
            {/* <Option setOpen={setOpen} section={section} setSection={setSection} text="Processo de Admissao" /> */}
            {/* <Option setOpen={setOpen} section={section} setSection={setSection} text="Horários" /> */}
            <Option setOpen={setOpen} section={section} setSection={setSection} text="Perguntas Frequentes" />
            <Option setOpen={setOpen} section={section} setSection={setSection} text="Sugestões e Reclamações" />

          </motion.ul>
        </motion.div>
      </div>
    );
  };
const Admissions = () => {
    const [section, setSection] = useState('Exames de Acesso')
    const navigate = useNavigate()
    const location = useLocation()
    
    
    
    useEffect(() => {
      localStorage.getItem('path') && setSection(localStorage.getItem('path'))
      window.scrollTo(0, 0)

      
    }, [])
    
    const [admissionsContents, setAdmissionsContents] = useState(null)
    useEffect(() => {
        axios.get(`${baseURL}/api/admissionsContents`)
        .then(res => {
            setAdmissionsContents([...res.data][0])
        })
    }, [])
    const secondContainerRef = useRef(null)
    useEffect(()=> {
      console.log('carlos')
        localStorage.getItem('path') && setSection(localStorage.getItem('path'))
        const adjustMargin = () => {
          if (section.includes('Sugestões')) {
              const outerContainerHeight = document.querySelector('.outerContainer')?.clientHeight || 0;
              console.log('window', outerContainerHeight + 10);

              if (secondContainerRef.current) {
                  secondContainerRef.current.style.marginTop = `${outerContainerHeight + 10}px`;
              }
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

    return (
        <div className="abtCont">
            <Header />
            {!section.includes('Sugestões') &&<Swiper3 />}
            {section.includes('Sugestões') && <div></div>}
            <div className="aboutFirst" ref={secondContainerRef} style={{marginTop: section.includes('Sugestões') && document.querySelector('.outerContainer')?.clientHeight + 10}}> 
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
                
                <section className="firstAboutSection" style={{display: 'none'}}>
                    
                    <div className="aboutSideMenu">
                        <div onClick={() => {
                            !section.includes('Sobre o ISPAJ') && setSection('Sobre o ISPAJ')

                            !section.includes('Sobre o ISPAJ') && localStorage.setItem('path', 'Sobre o ISPAJ')

                        }} className={section === 'Sobre o ISPAJ' ? 'aboutItem1' : "aboutItem"}>Sobre o ISPAJ</div>
                        <div onClick={() => {
                            !section.includes('Estrutura Orgânica') && setSection('path', 'Estrutura Orgânica')

                            !section.includes('Estrutura Orgânica') && localStorage.setItem('path', 'Estrutura Orgânica')
                        }} className={section === 'Estrutura Orgânica' ? 'aboutItem1' : "aboutItem"}>Estrutura Orgânica</div>
                        <div onClick={() => {
                            !section.includes('Estrutura Administrativa') && setSection('Estrutura Administrativa') 

                            !section.includes('Estrutura Administrativa') && localStorage.setItem('path', 'Estrutura Administrativa')
                        }} className={section === 'Estrutura Administrativa' ? 'aboutItem1' : "aboutItem"}>Estrutura Administrativa</div>
                        <div onClick={() => {
                            !section.includes('Historial') && setSection('Historial')
                            
                            !section.includes('Historial') && localStorage.setItem('path', 'Historial')
                        }} className={section === 'Historial' ? 'aboutItem1' : "aboutItem"}>Historial</div>
                        <div onClick={() => {
                            !section.includes('Organigrama Insitucional') && setSection('Organigrama Insitucional') 

                            !section.includes('Organigrama Insitucional') && localStorage.setItem('path', 'Organigrama Insitucional')
                        }} className={section === 'Organigrama Insitucional' ? 'aboutItem1' : "aboutItem"}>Organigrama Insitucional</div>
                        <div onClick={() => {
                            !section.includes('Estatutos e Regulamentos') && setSection('Estatutos e Regulamentos') 

                            !section.includes('Estatutos e Regulamentos') && localStorage.setItem('path', 'Estatutos e Regulamentos')
                        }} className={section === 'Estatutos e Regulamentos' ? 'aboutItem1' : "aboutItem"}>Estatutos e Regulamentos</div>
                    </div>
                </section>
                <section className="secondAboutSection" style={{flex: 1}}>
                {
                        section.includes('Emolumentos') ?
                        <Fees />
                        : section.includes('Calendário') ? <EstruturaOrg />
                        : section.includes('Exames') ? <ExamsSection admissionsContents={admissionsContents}/>
                        : section.includes('Sugestões') ? <Sugestions />
                        : section.includes('Horário') ? <Timings />
                        : <Faq admissionsContents={admissionsContents}/>
                    }
                </section>
            </div>
            
            <Footer />
        </div>
    )
}
export default Admissions
