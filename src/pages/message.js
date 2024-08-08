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
import HealthPage from "../components/healthPage"
import SocialsPage from "../components/socialsPage"
import EnginesPage from "../components/enginesPage"
import '../css/health.css'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "../@/components/ui/accordion"
import { ScrollArea } from "../@/components/ui/scroll-area"

const Message = () => {
    const navigate = useNavigate()
    const [section, setSection] = useState('Mensagem do Presidente')
    useEffect(() => {
        window.scrollTo(0, 0)

        
    }, [])
    return (
        <div className="abtCont">
            <Header />
            {/* <div className="" style={{marginTop: 0, background: '#eeeeee', aspectRatio: 4/1.5, width: '100%', maxHeight: 300}}>
            <img style={{objectFit: 'cover', width: '100%', height: '100%'}} src={process.env.PUBLIC_URL + '/images/ispaj.png'}/></div> */}
            <div className="aboutFirst" style={{marginTop: 100}}>
              <div className="navigation">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-map-fill" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.598-.49L10.5.99 5.598.01a.5.5 0 0 0-.196 0l-5 1A.5.5 0 0 0 0 1.5v14a.5.5 0 0 0 .598.49l4.902-.98 4.902.98a.5.5 0 0 0 .196 0l5-1A.5.5 0 0 0 16 14.5zM5 14.09V1.11l.5-.1.5.1v12.98l-.402-.08a.5.5 0 0 0-.196 0zm5 .8V1.91l.402.08a.5.5 0 0 0 .196 0L11 1.91v12.98l-.5.1z"/>
                  </svg>
                  <span onClick={() => {
                              navigate('/')
                          }}>Home</span> <span>{'>'}</span><span>{section}</span>
                </div>
            </div>
            
            <div className="aboutContainer">
                
                <section className="secondAboutSection" style={{flex: 1}}>
                <div className='healthContainer'>
            <section className='firstContainer' style={{flex: 1.5}}>
                <div className='section'>
                    <div className='player'>
                        <div className='videoContainer'>
                            <img src={JSON.parse(localStorage.getItem('aboutContent'))?.imagemPr}/>
                        </div>
                        <div className='playerInfo'>
                            <div className='imgContainer'>{`${localStorage.getItem('prName')}`[0]}{`${localStorage.getItem('prName')}`.split(' ')[1][0]}</div>
                            <div className='title'>{localStorage.getItem('prName')}</div>
                        </div>
                        <div className='description' dangerouslySetInnerHTML={{__html: JSON.parse(localStorage.getItem('aboutContent')).perfilPr}}></div>
                    </div>
                </div>
                {/* <div className='section'>
                    <div className='title'>Algumas Saídas Profissionais</div>
                </div> */}
                
               
            </section>
            <section className="secondContainer" style={{}}>
                <div className='aboutCourse'>
                    <div className="title">Mensagem do Presidente</div>
                    <svg style={{color: 'orange', width: 30, height: 30}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-quote" viewBox="0 0 16 16">
  <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388q0-.527.062-1.054.093-.558.31-.992t.559-.683q.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 9 7.558V11a1 1 0 0 0 1 1zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612q0-.527.062-1.054.094-.558.31-.992.217-.434.559-.683.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 3 7.558V11a1 1 0 0 0 1 1z"/>

</svg>
                    <div className="description" dangerouslySetInnerHTML={{__html: JSON.parse(localStorage.getItem('aboutContent')).mensagemPr}}></div>
                    {/* <div className="description" style={{marginBottom: 15, fontSize: 16}}>Não estaremos, certamente, equivocados ao afirmar que a sociedade angolana espera muito desta Universidade, sobretudo da sua responsabilidade social que inclui o impulso no desenvolvimento humano, sustentável e inclusivo, por via de uma formação multidisciplinar e integral que estimula atitudes éticas, humanas e cristãs que impregnem o ser e o agir das novas gerações comprometidas com o bem, o belo, o certo e o justo que não fragmenta nem vilipendia, mas une, engrandece e dignifica qualquer um (…).
                    </div>
<div className="description" style={{marginBottom: 15, fontSize: 16}}>
(…) Parece-nos que esta palavra “desafio” no plural é a mais acertada para o que nos espera à frente desta instituição, com inúmeras exigências tanto no plano interno, quanto no externo, numa altura em que o crescimento numérico das universidades no País reforça o sentido da concorrência que constitui uma oportunidade para a nossa afirmação, como uma instituição que se distingue pelo rigor, pela qualidade, pelos seus valores e missão. Mas expõe-nos, simultaneamente, ao risco potencial de perdermos estudantes e professores que, por razões diversas, podem vir a preferir essas outras universidades, se não estivermos à altura das exigências que esta concorrência nos impõe. De facto, se, em 1999, éramos a única Universidade privada de Angola, hoje a realidade é cada vez mais desafiante, facto que se agudiza por termos sido, durante alguns anos, a Universidade de Angola mais bem posicionada nos rankings das cem melhores universidades africanas e, no ano transacto, deixamos de constar entre as cem melhores.
</div>
<div className="description" style={{fontSize: 16}}>

Precisamos, pois, de nos reposicionar como Universidade Católica que sempre primou pela qualidade, excelência e distinção, por via de uma aposta clara na investigação científica e na formação multidisciplinar e multidimensional, tendo em vista uma formação integral que, nos termos do Papa Paulo VI, visa transformar o homem todo e todos os homens. Para isso, impõe-se a adopção de novas estratégias, novas atitudes e novas acções para, juntos e unidos, enfrentarmos esta concorrência, trabalhando no sentido de a UCAN continuar a ser atraente para aqueles que estão dentro e para aqueles que estão fora dela.
E, para isso, pensamos ser fundamental que, no plano interno, assumamos, entre outros, os seguintes desafios:
</div> */}
<svg style={{color: 'orange', width: 30, height: 30,  transform: 'rotate(180deg)'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-quote" viewBox="0 0 16 16">
  <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388q0-.527.062-1.054.093-.558.31-.992t.559-.683q.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 9 7.558V11a1 1 0 0 0 1 1zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612q0-.527.062-1.054.094-.558.31-.992.217-.434.559-.683.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 3 7.558V11a1 1 0 0 0 1 1z"/>
</svg>

                </div>
            </section>
        </div>
                </section>
            </div>
            
            <Footer />
        </div>
    )
}
export default Message
