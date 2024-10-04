import { useEffect, useRef, useState } from 'react'
import '../css/services.css'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseURL } from '../api/api'
import Skeleton from 'react-loading-skeleton'
const Services = ({departments, setDepartments}) => {
    const scrollRef = useRef(null)
    const navigate = useNavigate()
    const location = useLocation()
    const [services, setServices] = useState([
        {
            id: 0,
            name: 'Ciências de Saúde',
            source: process.env.PUBLIC_URL + '/images/dentist.png',
            description: 'Descubra o mundo da saúde e medicina. Prepare-se para carreiras em medicina, enfermagem e pesquisa'
        },
        {
            id: 1,
            name: 'Ciências Sociais e Económicas',
            source: process.env.PUBLIC_URL + '/images/speaker.png',
            description: 'Explore as sociedades e políticas. Ideal para futuros líderes e pesquisadores sociais'
        },
        {
            id: 2,
            name: 'Ciências das Engenharias/Exatas',
            source: process.env.PUBLIC_URL + '/images/engineer.png',
            description: 'Desperte o engenheiro ou cientista em você. Prepare-se para inovar e liderar avanços tecnológicos'
        }
        
    ])
    const scrollRight = () => {
        if  (scrollRef.current) scrollRef.current.scrollBy({
            left: scrollRef.current.querySelector('.service').getBoundingClientRect().width,
            behavior: 'smooth'
    })
    }
    const scrollLeft = () => {
        if  (scrollRef.current) scrollRef.current.scrollBy({
            left: -(scrollRef.current.querySelector('.service').getBoundingClientRect().width),
            behavior: 'smooth'
    })
    }
    // const [departaments, setDepartments] = useState([])
    // useEffect(() => {
    //     axios.get(`${baseURL}/api/departamentos`)
    //     .then(res => {
    //         //('res', res.data)
    //         setDepartments([...res.data])
    //     })
    // }, [])
    
    return (
        <div className="servicesContainer" style={{marginTop: 50}}>
            <div className='servicesContainer1'>
                <div className='servicesHeader'>
                    <div className="title">Descubra as nossas ofertas formativas</div>
                    <div className='servicesControl'>
                        <svg onClick={() => scrollLeft()} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
                        </svg>
                        <svg onClick={() => scrollRight()} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
                        </svg>
                    </div>
                </div>
                
                <div className='services' ref={scrollRef}>
                    {departments?.[2]?.info?.titulo ?
                    departments.map((item, index) => {
                        //('imagem', item?.info?.imagem)
                        return (
                            <section className='service' key={index} style={{
                            }}>
                                    <div style={{width: '100%', overflow: 'hidden', borderTopLeftRadius: 15, borderTopRightRadius: 15}}><img loading="lazy"className='serviceImage' src={`${baseURL}/public/storage/images/${item.info.imagem}`}/></div>
                                    <div className='serviceInfo' style={{background: 'white'}}>
                                    <div className='serviceTitle'>
                                        {item.info.titulo}</div>
                                    <div className='serviceDescription'>{services[index].description}</div>
                                    <div onClick={() => {
                                        navigate('cursos/', {
                                            state: {
                                                ...item
                                            }
                                        })
                                        localStorage.setItem('path', item.info.titulo)
                                        localStorage.setItem('course',item.id)
                                    }}className='serviceButton'>Saber Mais</div>
                                    </div>
                                </section>
                        )
                        
                    })
                    :
                        services.map((service, index) => {
                            return (
                                <section key={index} className='service' style={{
                                    background: '#e3e3e3'
                                }}>
                                    <div style={{width: '100%', overflow: 'hidden', borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
                                    <Skeleton style={{background: '#e3e3e3', width: '100%'}} className='serviceImage' />
                                    </div>
                                    <div className='serviceInfo' style={{background: 'white'}}>
                                    <Skeleton style={{background: '#e3e3e3', margin: 0, padding: 0}} className='serviceTitle' />
                                    
                                    <Skeleton style={{background: '#e3e3e3', margin: 0, padding: 0}} className='serviceDescription' count={2}/>
                                    <Skeleton style={{background: '#e3e3e3', margin: 0, padding: 0, height: 40, maxWidth: 100}} />
                                    
                                    </div>
                                </section>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default Services
{/* <section className='service'>
                                    <div style={{width: '100%', overflow: 'hidden', borderTopLeftRadius: 15, borderTopRightRadius: 15}}><img loading="lazy"className='serviceImage' src={service.source}/></div>
                                    <div className='serviceInfo'>
                                    <div className='serviceTitle'>
                                        {service.name}</div>
                                    <div className='serviceDescription'>{service.description}</div>
                                    <div onClick={() => {
                                        navigate('cursos/')
                                        localStorage.setItem('path', service.name)
                                    }}className='serviceButton'>Saber Mais</div>
                                    </div>
                                </section> */}