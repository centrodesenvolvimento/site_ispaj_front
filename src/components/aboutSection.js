import { useEffect, useState } from 'react'
import '../css/about.css'
import axios from 'axios'
import { baseURL } from '../api/api'
import Skeleton from 'react-loading-skeleton'
const AboutSection = ({aboutContent}) => {
    const [objectives, setObjectives] = useState([
        'Formar diplomados, a nível intelectual e profissional, nas diferentes áreas de conhecimento, aptos para a inserção em sectores profissionais e para a participação no desenvolvimento da sociedade angolana, bem como colaborar na sua formação contínua.',
        'Estimular e valorizar a actividade dos seus investigadores, docentes e funcionários, incentivando o trabalho de pesquisa e investigação científica, visando o desenvolvimento da ciência e da tecnologia e a promoção e difusão da cultura.',
        'Criar o ambiente cultural e educativo apropriado às suas finalidade.',
        'Assegurar as condições para que todos os cidadãos devidamente habilitados possam ter acesso ao ensino por si ministrado e à aprendizagem ao longo da vida.',
        'Cooperar e promover o intercâmbio cultural, científico e técnico com instituições congéneres e promover a mobilidade de estudantes e docentes, tanto a nível nacional como internacional.',
        'Participar em actividades de ligação à sociedade, designadamente de difusão e transferência de conhecimento, assim como da valorização do conhecimento científico.',
        'Comunicar o saber através do ensino, de publicações ou de outras formas de comunicação, disponibilizando os recursos necessários a esses fins.'


    ])
    
    return (
        <div className='sectionContainer'>
            <section className='container'>
                <div className='info'>
                    <div className='preTitle'>Quem Somos?</div>
                    <div className='title'>Instituto Superior Politécnico Alvorecer da Juventude</div>
                    <div className='description'>{aboutContent?.somos}</div>
                </div>
                <div className='imgContainer' style={{ aspectRatio: '3.8/2'}}>
                    <video controls style={{width: '100%', height: '100%', objectFit: 'cover'}} autoPlay loop muted src={aboutContent?.video}/>
                    <video style={{opacity: 0}} autoPlay loop muted src={process.env.PUBLIC_URL+'/images/homevid.mp4'}/>
                </div>
            </section>

            <section className='container1'>
                
                <div className='preTitle'>Missão e Visão</div>
                <section className='grid1'>
                <section className='gridItem'>
                <img src={process.env.PUBLIC_URL + '/images/target.png'}/>
                    <div className='title'>Missão</div>
                    {aboutContent?.missao ? <div className='description'>{aboutContent?.missao}</div> : <Skeleton className='description' count={3}/>}
                    </section>  
                    <section className='gridItem'>
                    <img src={process.env.PUBLIC_URL + '/images/vision.png'}/>
                    <div className='title'>Visão</div>
                    {aboutContent?.visao ? <div className='description'>{aboutContent?.visao}</div> : <Skeleton className='description' count={3}/>}
                    </section>  
                </section>
                <div className='preTitle'>Valores</div>
                <section className='grid2'>
                    {aboutContent && [...aboutContent?.valores].length > 0 ?
                        aboutContent && [...aboutContent?.valores].filter((item) => {
                            if (item.show == undefined){
                                return item
                            }else if (item.show == true){
                                return item
                            }
                        }).map((item, index) => {
                            return (
                                <section className='value1'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gem" viewBox="0 0 16 16">
  <path d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6zm11.386 3.785-1.806-2.41-.776 2.413zm-3.633.004.961-2.989H4.186l.963 2.995zM5.47 5.495 8 13.366l2.532-7.876zm-1.371-.999-.78-2.422-1.818 2.425zM1.499 5.5l5.113 6.817-2.192-6.82zm7.889 6.817 5.123-6.83-2.928.002z"/>
</svg>
                                <div className='title'>{item.nome}</div>
                                <div className='description'>{item.descricao}</div>
                    
                        </section>
                            )
                        })
                        :
                        objectives.map((item, index) => {
                            return (
                                <section className='value1'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gem" viewBox="0 0 16 16">
  <path d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6zm11.386 3.785-1.806-2.41-.776 2.413zm-3.633.004.961-2.989H4.186l.963 2.995zM5.47 5.495 8 13.366l2.532-7.876zm-1.371-.999-.78-2.422-1.818 2.425zM1.499 5.5l5.113 6.817-2.192-6.82zm7.889 6.817 5.123-6.83-2.928.002z"/>
</svg>
                                <Skeleton className='title'/>
                                <Skeleton className='description' count={2}/>
                    
                        </section>
                            )
                        })

                    }
                </section>
                {/* <div style={{marginTop: 20}} className='preTitle'>Objectivos</div>
                <div className='aboutObjectives'>
                    {
                        objectives.map((item, index) => {
                            return (
                                <div key={index} className='aboutObjective'>
                                    <span className='iconContainer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-patch-check-fill" viewBox="0 0 16 16">
  <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
</svg>
                                  </span>
                                  <div className='objectiveText'>{item}</div>
                                </div>
                            )
                        })
                    }
                </div> */}

            </section>
        </div>
    )
}
export default AboutSection