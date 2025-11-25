import { useEffect, useRef, useState } from 'react'
import '../css/services.css'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseURL } from '../api/api'
import Skeleton from 'react-loading-skeleton'
const Polos = ({departments, setDepartments}) => {
    const scrollRef = useRef(null)
    const navigate = useNavigate()
    const location = useLocation()
    const [services, setServices] = useState([
        {
            id: 0,
            name: 'Polo Nova Vida',
            source: process.env.PUBLIC_URL + '/images/polo-nova-vida.svg',
            description: 'Nosso polo principal, com infraestrutura moderna e completa, oferecendo educação desde o ensino primário até o secundário',
            ... {
            name: "Polo Nova Vida",
            phone: ' 938 997 849',
            description: 'Nosso polo principal, com infraestrutura moderna e completa, oferecendo educação desde o ensino primário até o secundário.',
            "tags": [
    "Ensino Primário",
    "Secundário",
    "Técnico",
    "Laboratórios Modernos",
    "Bibliotecas Modernas",
    "Campo Desportivo"
  ],
            category: "Ciências de Saúde",
            subcategory: "Ciências da Saúde",
            
            startDate: "2014-09-18",
            applicationsOpen: "SIM",
            curriculum: "INFORMAÇÕES / PLANO CURRICULAR",
            professionalOutcomes: "Para além das duas grandes áreas de intervenção que constituem a essência da profissão, diagnóstico e prevenção, o Técnico de Análises Clínicas e Saúde Pública pode também exercer a sua actividade no âmbito da terapêutica, da investigação, da gestão e do ensino. As competências adquiridas, permitem-lhe actividades nas áreas seguintes: Unidades hospitalares públicas e privadas; Laboratórios de análises clínicas; Laboratórios de ensino e universitários; Laboratórios de saúde pública; Centros de ensino e de investigação; Clínicas privadas; Centros de diagnóstico; Centros de saúde.",
            courseInformation: {
                type: "Licenciatura em Análises Clínicas e Saúde Pública",
                duration: "4 anos",
                internship: "SIM"
            },
            assessment: "Uma prova de avaliação em cada semestre do ano e no último ano do curso defesa de um projecto.",
            image: process.env.PUBLIC_URL + '/images/polo-nova-vida.svg'
        }
        },
        {
            id: 1,
            name: 'Polo Camama',
            source: process.env.PUBLIC_URL + '/images/polo-camama_front.svg',
            description: 'Localizado no coração do Camama, este polo destaca-se pelo seu programa de incentivo às ciências e tecnologias',
            ...{
    name: "Polo Camama",
    phone: ' 949 751 072',
    description: 'Localizado no coração de Camama, este polo destaca-se pelo seu programa de incentivo às ciências e tecnologias.',
    "tags": [
    "Ensino Primário, Secundário e Técnico",
    "Laboratórios Modernos",
    "Bibliotecas Modernas",
    "Campo Desportivo",
    "Incusivo",
    "Laboratório de Informática",
    "Clube de Robótica",
    "Salas de Aula Interativas"
  ],
    category: "Ciências de Saúde",
    subcategory: "Ciências da Saúde",
    
    startDate: "2014-09-18",
    applicationsOpen: "SIM",
    curriculum: "INFORMAÇÕES / PLANO CURRICULAR",
    professionalOutcomes: "As competências adquiridas, permitem que o Licenciado em Enfermagem, na sua qualidade de profissional, possa desenvolver actividades de carácter terapêutico, propedêutica e educativas nos vários grupos de risco, com especial atenção para as áreas seguintes: Exercício da Função de Enfermeiro em Hospitais, Clínicas e outras Instituições do ramo; Gestão de Instituições de Saúde; Gestão de Programas de Saúde em Instituições Sociais; Gestão de Escolas e Programas de Ensino em Enfermagem; Desenvolvimento de Investigações Científicas em Saúde.",
    courseInformation: {
        type: "Licenciatura em Enfermagem",
        duration: "4 anos",
        internship: "SIM"
    },
    assessment: "Uma prova de avaliação em cada semestre do ano e no último ano do curso defesa de um projecto.",
    image: process.env.PUBLIC_URL + '/images/polo-camama_front.svg'
}
        },
        {
            id: 2,
            name: 'Polo Patriota',
            source: process.env.PUBLIC_URL + '/images/polo-patriota2.svg',
            description: 'Com foco no desporto e artes, o Polo Patriota oferece uma educação equilibrada entre o académico e as actividades extracurriculares',
            ...{
      name: "Polo Patriota",
      phone: " 924 567 890",
      description:
        "Com foco no desporto e artes, o Polo Patriota oferece uma educação equilibrada entre o académico e as actividades extracurriculares.",
      category: "Ciências de Saúde",
      tags: [
        "Ensino Primário e Secundário",

        "Academia de Desportos",
        "Estúdio de Artes",
        "Serviço de Transporte",
        "Auditório para Performances",
      ],
      subcategory: "Ciências da Saúde",

      startDate: "2014-09-18",
      applicationsOpen: "SIM",
      curriculum: "INFORMAÇÕES / PLANO CURRICULAR",
      professionalOutcomes:
        "As competências adquiridas permitem-lhe actividades nas áreas seguintes: Unidades hospitalares públicas e privadas de Cardiologia; Unidades hospitalares públicas e privadas de Estudos de Função Respiratória; Unidades de Cardiologia de Intervenção; Blocos Operatórios de Cirurgia Cardiotorácica; Urgências Geral e Pediátrica; Unidades de Estudo do Sono (Estudo polissonográfico); Unidades hospitalares públicas e privadas de Follow-up de Pacemaker; Unidades de Medicina de Trabalho; Centros de ensino e de investigação; Unidades de estudos Angiológicos (Doppler transcraniano e carotídeo); Unidades de Neurologia (Estudo das perturbações do Sono); Marketing e Consultoria de Equipamentos Médicos e Próteses Cardíacas.",
      courseInformation: {
        type: "Licenciatura em Cardiopneumologia",
        duration: "4 anos",
        internship: "SIM",
      },
      assessment:
        "Uma prova de avaliação em cada semestre do ano e no último ano do curso defesa de um projecto.",
      image: process.env.PUBLIC_URL + "/images/polo-patriota2.svg",
    },
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
                    <div className="title">Descubra os nossos polos</div>
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
                    {/* departments?.[2]?.info?.titulo */}
                    {false ?
                    departments.map((item, index) => {
                        //('imagem', item?.info?.imagem)
                        return (
                            <section className='service' key={index} style={{
                            }}>
                                    <div style={{width: '100%', overflow: 'hidden', borderTopLeftRadius: 15, borderTopRightRadius: 15}}><img loading="lazy"className='serviceImage' src={`${baseURL}/storage/images/${item.info.imagem}`}/></div>
                                    <div className='serviceInfo' style={{background: 'white'}}>
                                    <div className='serviceTitle'>
                                        {item.info.titulo}</div>
                                    <div className='serviceDescription'>{services[index].description}</div>
                                    <div onClick={() => {
                                        navigate('polo/', {
                                            state: {
                                                ...item
                                            }
                                        })
                                        localStorage.setItem('path', item.info.titulo)
                                        localStorage.setItem('course',item?.id)
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
                                    <div style={{width: '100%', overflow: 'hidden', borderTopLeftRadius: 15, borderTopRightRadius: 15}}><img loading="lazy"className='serviceImage' src={`${service?.source}`}/></div>
                                    <div className='serviceInfo' style={{background: 'white'}}>
                                    <div className='serviceTitle'>
                                        {service?.name}</div>
                                    <div className='serviceDescription'>{service?.description}</div>
                                    <div onClick={() => {
                                        navigate(`polos/polo/${service?.name}`, {
                                            state: {
                                                ...service
                                            }
                                        })
                                        localStorage.setItem('path', service?.name)
                                        localStorage.setItem('course', index)
                                    }}className='serviceButton'>Saber Mais</div>
                                    </div>
                                </section>
                            )
                        })
                    }
                </div>
                <div style={{marginBottom: -10}} className='seeMore' onClick={()=> {
                                navigate('/polos')
                }}>Ver Mais</div>
            </div>
        </div>
    )
}
export default Polos
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