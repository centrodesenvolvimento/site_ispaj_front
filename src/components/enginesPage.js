import '../css/health.css'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "../@/components/ui/accordion"
import { ScrollArea } from "../@/components/ui/scroll-area"

import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { baseURL } from '../api/api'
const EnginesPage = ({curso, departamentos}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [outputs, setOutputs] = useState([
        "Economia - Como economista na Administração Pública e privada, empresas e organizações que necessitam da presença de profissionais qualificados para a tomada de decisão e Profissional liberal",
        "Gestão de Empresas - Como responsável de gestão na Administração Pública e Privada, gestor de pequenas, médias e grandes empresas, escritórios e profissional liberal",
        "Gestão de Recursos Humanos - Gestão dos recursos humanos na Administração Pública e Privada, bancos, seguros e organizações não governamentais",
        "Administração Pública - Profissional altamente qualificado para trabalhar em todos os departamentos da Administração Pública nacional e local",
        "Contabilidade e Auditoria - Como contabilista ou auditor da Administração Pública e Privada, bem como em empresas e organizações e instituições de crédito ou financeiras",
        "Gestão Bancária e Seguradoras - Como especialista ao nível da banca e seguros, em entidades de crédito e financeira, ou ainda organizações que se dediquem a atividades na banca e nos seguros",
        "Relações Internacionais (no âmbito público e privado), por conta da integração regional",
       
       
    ])
    const openRef = useRef(null)
    const [courses, setCourses] = useState([
         {
            name: "Engenharia Informática",
            category: "Ciências das Engenharias e Ciências Exactas",
            subcategory: "Ciências das Engenharias e Ciências Exactas",
            description: "A informática é hoje, em todo o mundo, um elemento essencial, e em Angola, ainda mais pela emergência de muita actividade neste domínio. O licenciado em informática fica com excelentes competências nas áreas profissionais da Engenharia da Comunicação de Dados (Data Communications Engineering), Desenvolvimento de Software e Aplicações (Software and Application Development), Arquitecturas e Concepção de Software (Software Arcitecture and Design), Concepção de Aplicações Multimédia (Multimedia Design) e Especialista de Sistemas (Systems Specialist), sendo que todas as disciplinas tecnológicas incluem uma percentagem de componente prática laboratorial, em laboratório de Informática ou laboratório de Electrónica e Sistemas Digitais.",
            startDate: "2014-10-16",
            applicationsOpen: "SIM",
            curriculum: "INFORMAÇÕES / PLANO CURRICULAR",
            professionalOutcomes: "No final do curso, o(a) licenciado(a) pode trabalhar: Empresas de software, empresas de informática, sector público e privado como engenheiro de sistemas informáticos e por conta própria desenvolvendo software, páginas de internet e toda a multidisciplinar saída das engenharias, pode ainda trabalhar na investigação ou como professor.",
            courseInformation: {
                type: "Licenciatura",
                duration: "5 anos",
                internship: "SIM",
                coordinator: "Eng. Nelson Gime"
            },
            assessment: "Uma prova de avaliação em cada semestre do ano e no último ano do curso defesa de um projecto.",
            image: process.env.PUBLIC_URL + '/images/computer.png'
        },
        {
            name: "Engenharia Civil",
            category: "Ciências das Engenharias e Ciências Exactas",
            subcategory: "Ciências das Engenharias e Ciências Exactas",
            description: "A Engenharia Civil é um setor de suma importância, tanto na Economia mundial, como na Angolana. Este curso de licenciatura tem como principal objetivo garantir conhecimentos e desenvolver competências que permitam aos seus diplomados a capacidade de resolução de problemas de elevada complexidade, bem como desenvolver trabalhos em equipas multidisciplinares, respeitando os princípios de ética e deontologia profissional. Neste curso, procura-se essencialmente desenvolver projetos que proporcionem aos cidadãos melhores condições de vida e de bem-estar.",
            startDate: "2014-10-16",
            applicationsOpen: "SIM",
            curriculum: "INFORMAÇÕES / PLANO CURRICULAR",
            professionalOutcomes: "Saídas Profissionais: - Gabinetes de projetos; - Empresas de Construção Civil; - Empresas de auditoria e consultoria; - Peritos avaliadores; - Atividades de manutenção e gestão de operações; - Empresas de serviços (seguradoras e bancos); - Laboratórios de investigação; - Atividades de docência; - Direção e fiscalização de obras; - Empresas públicas.",
            courseInformation: {
                type: "Licenciatura",
                duration: "5 anos",
                internship: "SIM",
                coordinator: "Eng. António Vilela Gomes",
                email: "antoniovilela.ispaj@gmail.com"
            },
            assessment: "Uma prova de avaliação em cada semestre do ano e no último ano do curso defesa de um projeto.",
            image: process.env.PUBLIC_URL + '/images/civil.png'        
        },
        {
            name: "Arquitectura e Urbanismo",
            category: "Ciências das Engenharias e Ciências Exactas",
            subcategory: "Ciências das Engenharias e Ciências Exactas",
            description: "A Licenciatura em Arquitectura e Urbanismo em Angola é um dos sectores mais promissores. Esta licenciatura assegura relações entre a arquitectura e o urbanismo para conhecer e compreender a situação socio-económica territorial, urbana e rural, assim como as suas causas e modernização, e fomenta o desenvolvimento de uma formação integral que contemple valores culturais, éticos e morais: respeito pelo indivíduo e o grupo, solidariedade, responsabilidade, disciplina e empatia, na procura constante da verdade e da equidade que promovam com qualidade a arquitectura, urbanismo, ciência e a área ambiental.",
            startDate: "2014-10-16",
            applicationsOpen: "SIM",
            curriculum: "INFORMAÇÕES / PLANO CURRICULAR",
            professionalOutcomes: "Saídas Profissionais: No final do curso, o(a) licenciado(a) pode trabalhar no campo institucional (Estado), nas entidades que promovem o desenvolvimento espacial e o ordenamento territorial. Nos municípios, trabalhando nos planos reguladores de ordenamento territorial, e ainda no exercício privado da profissão na realização de projetos de arquitetura para edifícios de diferentes tipos e estilos e no ordenamento espacial para diferentes usos. No setor industrial, no setor de serviços, na administração pública, no ensino e na investigação.",
            courseInformation: {
                type: "Licenciatura em Arquitectura e Urbanismo",
                duration: "5 anos",
                internship: "SIM"
            },
            assessment: "Uma prova de avaliação em cada semestre do ano e no último ano do curso defesa de um projeto.",
            image: 'https://photos.peopleimages.com/picture/202302/2629117-black-man-architect-and-portrait-smile-with-blueprint-in-building-or-construction-plan-on-site.-happy-african-american-male-engineer-or-contractor-smiling-with-floor-plan-for-industrial-architecture-fit_400_400.jpg'       
        },
        {
            name: "Engenharia Industrial e Sistemas Eléctricos",
            category: "Ciências das Engenharias e Ciências Exactas",
            subcategory: "Ciências das Engenharias e Ciências Exactas",
            description: "Esta importante licenciatura, fundamental no futuro do país, vai de encontro a uma área importante do crescimento e emprego e assume-se como fulcral na estratégia de desenvolvimento de Angola como país de futuro. Nesse sentido, formar Engenheiros de Industria e de Sistemas Eléctricos, altamente qualificados, capazes de aplicar o método científico e tratar as questões tecnológicas e ambientais, deve ser uma preocupação. A indústria requer profissionais que possuam competências neste domínio do saber, o que levou o ISPAJ a propor esta licenciatura.",
            startDate: "2014-10-16",
            applicationsOpen: "SIM",
            curriculum: "INFORMAÇÕES / PLANO CURRICULAR",
            professionalOutcomes: "No final do curso, o(a) licenciado(a) pode trabalhar em: • Empresas de Geração Hídrica e Térmica; • Empresas de Transmissão, Distribuição e Utilização de Energia Eléctrica; • Potencial Energético de Bacias Hidrográficas; • Sistemas Eléctricos em Geral; • Instalações Eléctricas em Baixa Tensão; • Instalações Eléctricas em Alta Tensão; • Conservação de Energia; • Fontes Alternativas e Renováveis de Energia; • Auditorias, Gestão e Diagnósticos Energéticos; • Engenharia de Iluminação; • Sistemas, Instalações e Equipamentos Preventivos contra Descargas Atmosféricas.",
            courseInformation: {
                type: "Licenciatura",
                duration: "5 anos",
                internship: "SIM"
            },
            assessment: "Uma prova de avaliação em cada semestre do ano e no último ano do curso defesa de um projeto.",
            image: process.env.PUBLIC_URL + '/images/industrial.png'        
        },
        {
            name: "Engenharia de Recursos Naturais e Ambiente",
            category: "Ciências das Engenharias e Ciências Exactas",
            subcategory: "Ciências das Engenharias e Ciências Exactas",
            description: "A vasta extensão do território angolano e a emergência das suas necessidades são muito elevadas, sendo necessário formar Engenheiros de Recursos Naturais e Ambiente, altamente qualificados capazes, de aplicar método científico e tratar as questões tecnológicas e ambientais com uma visão multidisciplinar e transdisciplinar, que permite a identificação das causas e efeitos, a análise, o equacionamento, a implantação e o acompanhamento das soluções dos problemas das áreas de Recursos Naturais, Geotecnia e Geoquímica Ambiental, Saneamento Ambiental, Recursos Energéticos, Gestão Ambiental e Engenharia Legal, e a Operação dos Equipamentos de Engenharia referentes às respectivas áreas.",
            startDate: "2014-10-16",
            applicationsOpen: "SIM",
            curriculum: "INFORMAÇÕES / PLANO CURRICULAR",
            professionalOutcomes: "No final do curso, o(a) licenciado(a) pode trabalhar em: Engenharia de Recursos Naturais e Ambiente em Empresas Públicas e Privadas; Órgãos da Administração central e local; Empresas de extracção e transformação; As empresas de consultoria que elaboram planos de uso do solo, estudos de impactos no ambiente, pareceres técnicos e projectos específicos na área ambiental.",
            courseInformation: {
                type: "Licenciatura",
                duration: "5 anos",
                internship: "SIM"
            },
            assessment: "Uma prova de avaliação em cada semestre do ano e no último ano do curso defesa de um projeto.",
            image: process.env.PUBLIC_URL + '/images/naturalResources.png'        
        }
        
    ])
    const [course, setCourse] = useState(null)
    useEffect(() => {
        console.log('location', location?.state?.image)

    }, [location.pathname])
    const scrollDivRef = useRef(null)
    useEffect(() => {
        
        scrollDivRef.current && window.scrollTo({
            top: scrollDivRef.current.getBoundingClientRect().top + window.scrollY - 120
        })
    }, [location.pathname, scrollDivRef])
    useEffect(() => {
        window.scrollTo(0, 0)

    }, [])
    return (
        <div className='healthContainer'>
            <section className='firstContainer'>
                <div className='section'>
                    <div className='player'>
                        <div className='videoContainer' style={{overflow: 'hidden'}}>
                            {curso?.info && <video style={{height: '100%', width: '100%', objectFit: 'cover'}} src={`${baseURL}/storage/videos/${curso?.info?.video}`} controls/>}
                        </div>
                        <div className='playerInfo'>
                            <div className='imgContainer'>CEE</div>
                            <div className='title'>Cursos de {curso?.info?.titulo}</div>
                        </div>
                        <div className='description'>{curso?.info?.descricao}</div>
                    </div>
                </div>
                {/* <div className='section'>
                    <div className='title'>Algumas Saídas Profissionais</div>
                </div> */}
                <section className='accordions'>
                    <Accordion type="single" collapsible>
                    <AccordionItem value="item-1" className='section'>
                        <AccordionTrigger className='title' style={{ padding: 0}}>Algumas Saídas Profissionais</AccordionTrigger>
                        <AccordionContent>
                        <div className='outputs' dangerouslySetInnerHTML={{__html: curso?.info ? curso?.info?.saidas : ''}}>
                            
                        </div>
                        </AccordionContent>
                    </AccordionItem>
                    </Accordion>
                    <Accordion  defaultValue="item-1" type="single" collapsible>
                    <AccordionItem  value="item-1" className='section'>
                        <AccordionTrigger className='title' style={{ padding: 0}}>Veja Também</AccordionTrigger>
                        <AccordionContent>
                        <div className='recommendations'>
                        <div className='recom'>
                                <div className='imageContainer'><img src={`${baseURL}/storage/images/${departamentos[1]?.info?.imagem}`}/></div>
                                <div className='info'>
                                    <div className='title'>{departamentos[1]?.info?.titulo}</div>
                                    <div onClick={() => {
                                        navigate('/cursos', {
                                            state: {
                                                ...departamentos[1]
                                            }
                                        })
                                        localStorage.setItem('path',departamentos[1]?.info?.titulo)
                                        window.location.reload()
                                    }}className='valueButton'>Saber Mais</div>
                                </div>
                            </div>
                            <div className='recom'>
                                <div className='imageContainer'><img src={`${baseURL}/storage/images/${departamentos[0]?.info?.imagem}`}/></div>
                                <div className='info'>
                                    <div className='title'>{departamentos[0]?.info?.titulo}</div>
                                    <div className='valueButton' onClick={() => {
                                        navigate('/cursos', {
                                            state: {
                                                ...departamentos[0]
                                            }
                                        })
                                        localStorage.setItem('path',departamentos[0]?.info?.titulo)
                                        window.location.reload()
                                    }}>Saber Mais</div>
                                </div>
                            </div>
                        </div>
                        </AccordionContent>
                    </AccordionItem>
                    </Accordion>
                </section>
               
            </section>

{/* ,{
    name: "Enfermagem",
    category: "Ciências de Saúde",
    subcategory: "Ciências da Saúde",
    description: "A enfermagem cumpre seu papel social na assistência à saúde individual, saúde da família, na saúde da comunidade, no campo do ensino e da pesquisa. Com isso, a prática profissional envolve um conjunto de processos técnicos de ordem espacial e temporal, sujeitos a mudanças frequentes. Diante deste entendimento, as diretrizes curriculares do Curso de Enfermagem do ISPAJ retratam as necessidades de mudanças na formação do enfermeiro, implementando princípios, conteúdos, metodologias e estratégias que subsidiarão e reorientarão na formação e consequente trabalho deste profissional.",
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
    image: 'https://images.theconversation.com/files/333794/original/file-20200509-49573-1q84mpf.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1000&fit=clip'
}, */}
            <section className='secondContainer'>
                {
                    location.pathname.includes('curso/') && location.state ? 
                    <div className='aboutCourse' ref={scrollDivRef}>
                        <div className='imageContainer'>
                            <img src={`${baseURL}/storage/images/${location.state.imagem}`}/>
                        </div>
                        <div className='first'>
                            <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
</svg>Data de Início do Curso: {format(new Date(location.state.data), 'yyyy-MM-dd')}</span>
<span>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-badge" viewBox="0 0 16 16">
  <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492z"/>
</svg>Candidaturas Abertas: {location.state.candidaturas ? 'Sim' : 'Não'}
</span>
{/* <div className='apply' onClick={() => {
    navigate('/soon')
}}>Inscreva-se</div> */}

                        </div>
                        <div className='title'>Licenciatura em {location.state.titulo}</div>

                        <div className='description'>{location.state.descricao}</div>

                        <div className='subTitle'>Informações/Plano Curricular</div>
                        

                        <div className='first'>
                        <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
</svg>Nº Anos: {location.state.anos} ano{location.state.anos > 1 ? 's': ''}</span>
<span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-video2" viewBox="0 0 16 16">
  <path d="M10 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
  <path d="M2 1a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zM1 3a1 1 0 0 1 1-1h2v2H1zm4 10V2h9a1 1 0 0 1 1 1v9c0 .285-.12.543-.31.725C14.15 11.494 12.822 10 10 10c-3.037 0-4.345 1.73-4.798 3zm-4-2h3v2H2a1 1 0 0 1-1-1zm3-1H1V8h3zm0-3H1V5h3z"/>
</svg>Estágio Profissional: {location.state.estagio ? 'Sim' : 'Não'}</span>
<span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mortarboard-fill" viewBox="0 0 16 16">
  <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917z"/>
  <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466z"/>
</svg>Tipo: {location.state.tipo}</span>

                        </div>

                        <div className='subTitle'>Saídas Profissionais</div>
                        <div className='description' dangerouslySetInnerHTML={{__html: location.state.saidas}}></div>
                        <div className='subTitle'>Avaliação de Conhecimentos</div>
                        <div className='description'>{location.state.avaliacao}</div>

                        <div className='banner'>
                            <div className='title'>O ENSINO AO SERVI�O DE ANGOLA</div>
                            <div className='description'>Existimos para formar profissionais de excel�ncia</div>
                        </div>
                    </div>:

                    <ScrollArea className='coursesScrollArea'>
                   <div className='courses'>
                        {curso?.cursos && curso?.cursos?.map((item, index) => {
                            return (
                                <div className='course'>
                                    <div className='imageContainer'>
                                        <img src={`${baseURL}/storage/images/${item.imagem}`}/>
                                    </div>
                                    <div className='info'>
                                        <div className='title'>{item.titulo}
                                        </div>
                                        <div className='basicInfo'>
                                            Duração: <span>{item.anos} ano{item.anos > 1 ? 's' : ''}</span>
                                        </div>
                                        <div className='learnMore' onClick={() => {
                                            console.log(item)
                                            navigate(`curso/${item.titulo}`, {
                                                state: {
                                                    ...item
                                                }
                                            })
                                            setCourse(item)
                                        }}>
                                            Ler Mais
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </ScrollArea>}
                
            </section>
        </div>
    )
}
export default EnginesPage