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
const SocialsPage = ({curso, departamentos}) => {
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
            name: "Ciências Económicas e Gestão",
            category: "Ciências Sociais e Económicas",
            subcategory: "Ciências Económicas e Gestão",
            description: "As ciências económicas são fundamentais no nosso país e constituem um baluarte exponencial na gestão das empresas, qualquer que seja a sua dimensão. O conhecimento científico que o licenciado adquire ao nível de diferentes saberes torna-o capaz de, com autonomia, desempenhar esse papel importante de gestão.",
            startDate: "2014-10-16",
            applicationsOpen: "SIM",
            curriculum: "INFORMAÇÕES / PLANO CURRICULAR",
            specializations: `O ISPAJ,  tendo em conta a múltipla aquisição de saberes e de especialização , estruturou-se os cursos do modo seguinte - no 1º e 2º ano disciplinas de tronco comum às várias especialidades no 3º e 4º ano , os alunos optam por uma destas especializações que lhes confere o titulo de licenciatura:
 Licenciatura em Economia;
 Licenciatura em Gestão de Empresas;
 Licenciatura em Gestão de Recursos Humanos;
 Licenciatura em Administração Pública;
 Licenciatura em Contabilidade e Auditoria.
 Licenciatura em Gestão Bancária e Seguradoras`,
            professionalOutcomes: `Tendo em conta os diferentes niveis de especialização, indica-se de modo mais detalhado algumas saídas profissionais:
 Economia - Como economista na Administração Pública e privada, empresas e organizações que  necessitam da presença de profissionais qualificados para a tomada de decisão e Profissional liberal;
 Gestão de Empresas - Como responsável de gestão na Administração Pública e Privada, gestor de pequenas,médias e grandes empresas,escritórios e profissional liberal;
 Gestão de Recursos Humanos- Gestão dos recursos humanos na Administração Pública e Privada, bancos, seguros e
 organizações não governamentais;
 Administração Pública- Profissional altamente qualificado para trabalhar em todos os departamentos da Administração Pública nacional e local;
 Contabilidade e Auditoria - Como contabilista ou auditor da Administração Pública e Privada, bem como em empresas e organizações e instituições de crédito ou financeiras;
 Gestão Bancária e Seguradoras- Como especialista ao nível da banca e seguros, em entidades de crédito e financeira, ou ainda organizações que se dediquem a actividades na banca e nos seguros.
`,
            courseInformation: {
                type: "Licenciatura",
                duration: "4 anos",
                internship: "SIM"
            },
            assessment: "Uma prova de avaliação em cada semestre do ano e no último ano do curso defesa de um projecto.",
            image: process.env.PUBLIC_URL + '/images/accounting.png'
        },
        {
            name: "Psicologia",
            category: "Ciências Sociais e Económicas",
            subcategory: "Ciências Económicas e Gestão",
            description: "Uma reduzida cobertura no país, desta profissão, que favoreça uma melhoria da qualidade de vida da população através do papel importante do psicólogo, foi uma preocupação do ISPAJ na implementação desta licenciatura. Nesse sentido, ressalta o campo indispensável da psicologia na sociedade moderna no apoio às pessoas, às empresas ou organizações, hospitais ou clínicas, escolas e outras importantes atividades.",
            startDate: "2014-10-16",
            applicationsOpen: "SIM",
            curriculum: "INFORMAÇÕES / PLANO CURRICULAR",
            specializations: `Foi fruto destas necessidades que o ISPAJ direccionou o curso superior de psicologia com as especialidades seguintes:
 Licenciatura em Psicologia Clínica;
 Licenciatura em Psicologia Criminal;
 Licenciatura em Psicologia Escolar ou de Educação;
 Licenciatura em Psicologia do Trabalho.`,
            professionalOutcomes: `Desenvolve  actividades individualmente, ou em equipa, de acordo com a especialidade  de psicologia que optou em: Hospitais ou clínicas;  Apoio a serviços de justiça; Departamentos públicos ou privados na área da educação e nas áreas do trabalho em  organismos públicos e privados e em consultório próprio, individual ou em equipa;
 Psicologia Clínica;
 Psicologia Criminal;   
 Psicologia Escolar ou da Educação;     
 Psicologia do Trabalho;     
Trabalho em hospitais, clínicas, centros de saúde.`,
            courseInformation: {
                type: "Licenciatura",
                duration: "4 anos",
                internship: "SIM"
            },
            assessment: "Uma prova de avaliação em cada semestre do ano e no último ano do curso defesa de um projecto.",
            image: process.env.PUBLIC_URL + '/images/psicology.png'
        },
        {
            name: "Relações Internacionais",
            category: "Ciências Sociais e Económicas",
            subcategory: "Ciências Económicas e Gestão",
            description: "Esta licenciatura tem por objetivo a formação de quadros dotados dos conhecimentos necessários a uma análise, a uma interpretação e a uma perspetiva tão específicas quanto globalizantes, da realidade internacional, num mundo que se caracteriza por uma profunda e acelerada mutação. Com efeito, tendo-se verificado uma universalização do sistema, numa tendência multipolar, assiste-se à complexidade crescente da sociedade internacional e até à internacionalização da vida privada. É com vista a essa necessária preparação que a licenciatura em Relações Internacionais está estruturada.",
            startDate: "2014-10-16",
            applicationsOpen: "SIM",
            curriculum: "INFORMAÇÕES / PLANO CURRICULAR",
            professionalOutcomes: `Organizações e administração de negócios internacionais; Diplomacia e assessoria especializada na área de Relações Internacionais (no âmbito público e privado), por conta da integração regional; Assessoria política e comercial em câmaras de comércio, consulados, embaixadas e representações internacionais; Elaboração de estudos e estratégias em sindicatos patronais e de trabalhadores; Organizações públicas e Privadas na busca de excelência na qualidade, produtividade e competitividade.`,
            courseInformation: {
                type: "Licenciatura",
                duration: "4 anos",
                internship: "SIM"
            },
            assessment: "Uma prova de avaliação em cada semestre do ano e no último ano do curso defesa de um projecto.",
            image: process.env.PUBLIC_URL + '/images/internationalRelations.png'
        },
        {
            name: "Estatística e Gestão de Informação",
            category: "Ciências Sociais e Económicas",
            subcategory: "Ciências Económicas e Gestão",
            description: "Perante os desafios do milénio, o mundo encontra grandes dificuldades em produzir quantitativa e qualitativamente as informações necessárias para acompanhar as tendências do desenvolvimento, permitindo aos governos orientar politicas, traçar metas e consequentemente alcançar o preconizado. As “informações” necessitam de métodos apropriados para a sua recolha, tratamento, difusão e armazenamento. A informação é considerada como uma unidade fundamental na tomada de decisão e por isso a estatística é hoje aplicada em todos os domínios do saber.",
            startDate: "2014-10-16",
            applicationsOpen: "SIM",
            curriculum: "INFORMAÇÕES / PLANO CURRICULAR",
            professionalOutcomes: `Saídas Profissionais
A natureza multidisciplinar do curso está ajustada às exigências do mercado de trabalho nacional e internacional, o que permite uma rápida integração na estrutura de gestão nos mais variados sectores de actividade:
 Administração Pública;
 Investigação;
 Bancos;
 Seguros;
 Telecomunicações;
 Empresas de TI;
 Consultoria;
 Marketing;
 Docente e formador;
 Empreendedor, criando o seu próprio negócio, transformando a informação em conhecimento, ou seja transformando a informação num recurso estratégico.`,
            courseInformation: {
                type: "Licenciatura",
                duration: "4 anos",
                internship: "SIM"
            },
            assessment: "Uma prova de avaliação em cada semestre do ano e no último ano do curso defesa de um projecto.",
            image: 'https://www.nlm.nih.gov/oet/ed/stats/img/library-stats.jpg'
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
                            {curso?.info && <video src={`${baseURL}/storage/videos/${curso?.info?.video}`} style={{height: '100%', width: '100%', objectFit: 'cover'}} controls/>}
                        </div>
                        <div className='playerInfo'>
                            <div className='imgContainer'>CSE</div>
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
                        <div className='outputs' dangerouslySetInnerHTML={{__html: curso?.info ? curso?.info?.saidas: ''}}>
                           
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
                                <div className='imageContainer'><img src={`${baseURL}/storage/images/${departamentos[2]?.info?.imagem}`}/></div>
                                <div className='info'>
                                    <div className='title'>{departamentos[2]?.info?.titulo}</div>
                                    <div className='valueButton' onClick={() => {
                                        navigate('/cursos', {
                                            state: {
                                                ...departamentos[2]
                                            }
                                        })
                                        
                                        localStorage.setItem('path', departamentos[2]?.info?.titulo)
                                        window.location.reload()
                                    }}>Saber Mais</div>
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
                            <div className='title'>O ENSINO AO SERVIÇO DE ANGOLA</div>
                            <div className='description'>Existimos para formar profissionais de excelência</div>
                        </div>
                    </div>:

                    <ScrollArea className='coursesScrollArea'>
                    <div className='courses'>
                        {curso?.cursos && curso?.cursos?.filter((item) => {
               if (item.show == undefined){
                   return item
               }else if (item.show == true){
                   return item
               }
           })?.map((item, index) => {
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
export default SocialsPage