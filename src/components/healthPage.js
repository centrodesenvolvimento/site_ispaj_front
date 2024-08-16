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
import axios from 'axios'
import { baseURL } from '../api/api'
const HealthPage = ({curso, departamentos}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [outputs, setOutputs] = useState([
        "Unidades hospitalares públicas e privadas",
        "Laboratórios de análises clínicas",
        "Laboratórios de ensino e universitários",
        "Unidades hospitalares públicas e privadas de Cardiologia",
        "Unidades hospitalares públicas e privadas de Estudos de Função Respiratória",
        "Unidades de Cardiologia de Intervenção",
        "Blocos Operatórios de Cirurgia Cardiotorácica",
        "Urgências Geral e Pediátrica",
        "Unidades de Estudo do Sono (Estudo polissonográfico)",
        "Unidades hospitalares públicas e privadas de Folow up de Pacemaker",
        "Unidades de Medicina de Trabalho",
        "Centros de ensino e de investigação",
        "Unidades de estudos Angiológicos (Doppler transcraniano e carotídeo)",
        "Unidades de Neurologia (Estudo das perturbações do Sono)",
        "Marketing e Consultoria de Equipamentos Médicos e Próteses Cardíacas",
        "Laboratórios de saúde pública",
        "Centros de ensino e de investigação",
        "Clínicas privadas",
        "Centros de diagnóstico",
        "Centros de saúde"
    ])
    const openRef = useRef(null)
    const [courses, setCourses] = useState([
        {
            name: "Análises Clínicas e Saúde Pública",
            category: "Ciências de Saúde",
            subcategory: "Ciências da Saúde",
            description: "As Ciências Laboratoriais aplicadas na saúde são uma área científica inerente à investigação clínico - laboratorial, com a finalidade de dar suporte ao diagnóstico, tratamento e prevenção da doença. Baseia-se nos princípios da biologia celular e molecular, com vista à compreensão do funcionamento normal e patológico no homem e outros animais. A investigação nesta área científica é, actualmente, aquela que mais desenvolvimento tem tido na área das ciências biológicas.",
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
            image: 'https://www.africa.com/wp-content/uploads/2023/06/Healthcare.jpg'
        },
        
    ,{
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
},
{
    name: "Cardiopneumologia",
    category: "Ciências de Saúde",
    subcategory: "Ciências da Saúde",
    description: "A cardiopneumologia é uma área específica da saúde que abrange várias áreas, sendo as principais a cardiologia, pneumologia e cirurgia cárdiotorácica, e que tem como principais objectivos a prevenção, diagnóstico e tratamento de doenças cárdio-respiratórias. O técnico de Cardiopneumologia, actua integrado numa equipa de saúde multidisciplinar ao nível da identificação e resolução de problemas da comunidade, no âmbito do diagnóstico e terapêutica das doenças do foro cardiovascular e respiratório.",
    startDate: "2014-09-18",
    applicationsOpen: "SIM",
    curriculum: "INFORMAÇÕES / PLANO CURRICULAR",
    professionalOutcomes: "As competências adquiridas permitem-lhe actividades nas áreas seguintes: Unidades hospitalares públicas e privadas de Cardiologia; Unidades hospitalares públicas e privadas de Estudos de Função Respiratória; Unidades de Cardiologia de Intervenção; Blocos Operatórios de Cirurgia Cardiotorácica; Urgências Geral e Pediátrica; Unidades de Estudo do Sono (Estudo polissonográfico); Unidades hospitalares públicas e privadas de Follow-up de Pacemaker; Unidades de Medicina de Trabalho; Centros de ensino e de investigação; Unidades de estudos Angiológicos (Doppler transcraniano e carotídeo); Unidades de Neurologia (Estudo das perturbações do Sono); Marketing e Consultoria de Equipamentos Médicos e Próteses Cardíacas.",
    courseInformation: {
        type: "Licenciatura em Cardiopneumologia",
        duration: "4 anos",
        internship: "SIM"
    },
    assessment: "Uma prova de avaliação em cada semestre do ano e no último ano do curso defesa de um projecto.",
    image: process.env.PUBLIC_URL + '/images/cardiology.png'
},
{
    name: "Odontologia",
    category: "Ciências de Saúde",
    subcategory: "Ciências da Saúde",
    description: "De acordo com estatísticas da Organização Mundial da Saúde (OMS), entre 50% e 99% da população apresenta cáries dentárias ou doenças gengivais. Uma parcela relevante das comunidades ainda não tem acesso ao atendimento odontológico básico, não sabe a importância que a saúde dos dentes exerce sobre o bem-estar geral. Das suas atividades autónomas, aplicadas ao cliente/doente, compete-lhe o planeamento, execução, análise e avaliação de acções terapêuticas específicas ao nível do estudo geral do paciente, dispondo das bases científicas para o atendimento das doenças mais prevalentes da cavidade bucal, etiologia, patogenia, diagnóstico e tratamento das mesmas, bem como da sua estética.",
    startDate: "2014-10-16",
    applicationsOpen: "SIM",
    curriculum: "INFORMAÇÕES / PLANO CURRICULAR",
    professionalOutcomes: "Com base na estrutura do curso o tecnólogo em Odontologia pode exercer as suas funções em Instituições de prestação de cuidados de saúde públicas e privadas tais como: Hospitais; Clínicas de Especialidade, Gabinetes de Saúde Ocupacional; Lares; Centros de Apoio à Criança e ao Idoso; Escolas de Ensino Especial e em consultórios próprios.",
    courseInformation: {
        type: "Licenciatura em Odontologia",
        duration: "4 anos",
        internship: "SIM"
    },
    assessment: "Uma prova de avaliação em cada semestre do ano e no último ano do curso defesa de um projecto.",
    image: process.env.PUBLIC_URL + '/images/dentist.png'
},
{
    name: "Radiologia",
    category: "Ciências de Saúde",
    subcategory: "Ciências da Saúde",
    description: "As ciências radiológicas envolvem procedimentos diagnósticos, de intervenção e terapêutica em radiologia, radioterapia e medicina nuclear, bem como exames de rastreio e de investigação, exercendo a sua actividade num quadro ético e legal. Uma parte fundamental do papel destes profissionais consiste em gerir uma dinâmica interpessoal complexa, agindo como defensor de cada doente. Os Radiologistas são responsáveis pela realização de todos os exames da área da radiologia, pela programação, execução e avaliação de todas as técnicas radiológicas que intervêm na prevenção e promoção da saúde.",
    startDate: "2014-10-16",
    applicationsOpen: "SIM",
    curriculum: "INFORMAÇÕES / PLANO CURRICULAR",
    professionalOutcomes: "O profissional de Radiologia actua, não só na Radiologia de diagnóstico clínico, como na Radiologia de intervenção terapêutica, vascular e não vascular. As competências adquiridas permitem-lhe actividades nas áreas seguintes: Unidades hospitalares públicas e privadas; Clínicas privadas; Consultoria em entidades seguradoras; Centros de saúde; Centros de ensino e de investigação.",
    courseInformation: {
        type: "Licenciatura em Radiologia",
        duration: "4 anos",
        internship: "SIM"
    },
    assessment: "Uma prova de avaliação em cada semestre do ano e no último ano do curso defesa de um projecto.",
    image: process.env.PUBLIC_URL + '/images/radiology.png'
}
,
{
    name: "Educação Física e Desportos",
    category: "Ciências de Saúde",
    subcategory: "Ciências da Saúde",
    description: "As ciências do desporto são hoje uma realidade incontornável e importante e assumem-se como um conjunto de atividades físicas, planeadas e estruturadas, que estuda e explora a capacidade física e a aplicação do movimento humano. Os técnicos de educação física são responsáveis pela realização de todos os exames da área física, pela programação, execução e avaliação de todas as técnicas de bem estar físico que intervêm na prevenção e promoção desta actividade, assim como pela utilização das técnicas e normas de protecção e segurança.",
    startDate: "2014-10-16",
    applicationsOpen: "SIM",
    curriculum: "INFORMAÇÕES / PLANO CURRICULAR",
    professionalOutcomes: "No final do curso, o(a) licenciado (a) podem trabalhar como: personal trainer, ou em clubes, academias de ginástica ou empresas, para melhorar a saúde física das pessoas; Orientando atletas e equipas desportivas nos treinos e preparação para competição, de forma individual ou como parte de equipas multidisciplinares compostas por médicos, psicólogos e fisioterapeutas, entre outros profissionais; Dando aulas nos ensinos fundamental e médio (desde que tenha licenciatura em Educação Física).",
    courseInformation: {
        type: "Licenciatura",
        duration: "4 anos",
        internship: "SIM"
    },
    assessment: "Uma prova de avaliação em cada semestre do ano e no último ano do curso defesa de um projecto.",
    image: 'https://img.freepik.com/premium-photo/soccer-ball-football-player-portrait-black-man-with-smile-sports-training-game-match-pitch-happy-fitness-proud-african-athlete-practice-exercise-workout-grass-field_590464-210482.jpg'
}
,
{
    name: "Fisioterapia",
    category: "Ciências de Saúde",
    subcategory: "Ciências da Saúde",
    description: "As ciências da fisioterapia envolvem procedimentos diagnósticos, de intervenção e na área preventiva, terapêutica e na manutenção do quadro após a reabilitação, sendo um elemento importante na saúde pública pelo apoio à recuperação das pessoas. O Fisioterapeuta* actua na recuperação, reeducação, reabilitação e prevenção de incapacidades originadas por disfunções físicas, do foro funcional músculo-esquelético, cardiovascular, respiratório e neurológico, e disfunções psíquicas, com o objetivo de desenvolver a máxima funcionalidade e qualidade de vida dos indivíduos.",
    startDate: "2014-10-16",
    applicationsOpen: "SIM",
    curriculum: "INFORMAÇÕES / PLANO CURRICULAR",
    professionalOutcomes: "No final do curso, o(a) licenciado (a) podem trabalhar em Unidades hospitalares públicas e privadas; Clínicas e centros de reabilitação; Instituições e associações de saúde; Exercício liberal; Estabelecimentos termais; Centros desportivos; Escolas e Institutos do ensino especial; Instituições de apoio a idosos e Clínicas privadas.",
    courseInformation: {
        type: "Licenciatura",
        duration: "4 anos",
        internship: "SIM"
    },
    assessment: "Uma prova de avaliação em cada semestre do ano e no último ano do curso defesa de um projecto.",
    image: 'https://th.bing.com/th/id/OIP.wlxmrLlIVvT5brqvFIwUKgHaE8?rs=1&pid=ImgDetMain'
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
        console.log('carlos', curso?.info.saidas)
    }, [])
    const [departaments, setDepartments] = useState([])
    useEffect(() => {
        axios.get(`${baseURL}/api/departamentos`)
        .then(res => {
            console.log('res', res.data)
            setDepartments([...res.data])
        })

    }, [])
    return (
        <div className='healthContainer'>
            <section className='firstContainer'>
                <div className='section'>
                    <div className='player'>
                        <div className='videoContainer' style={{overflow: 'hidden'}}>
                            {curso?.info?.video && <video style={{height: '100%', width: '100%', objectFit: 'cover'}} controls src={`${baseURL}/storage/videos/${curso.info.video}`}/>}
                        </div>
                        <div className='playerInfo'>
                            <div className='imgContainer'>CS</div>
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
                        <div className='outputs' >
                            <div dangerouslySetInnerHTML={{__html: curso?.info ? curso?.info?.saidas :''}}></div>
                            {/* <div className='subTitle'>As competências adquiridas permitem-lhe actividades nas áreas seguintes e muito mais:
                    
                                {outputs.map((item, index) => {
                                    return (
                                        <div key={index} className='output'>{item}</div>
                                    )
                                })}
                            </div> */}
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
                                    <div onClick={() => {
                                        navigate('/cursos', {
                                            state: {
                                                ...departamentos[2]
                                            }
                                        })
                                        localStorage.setItem('path', departamentos[2]?.info?.titulo)
                                        window.location.reload()
                                    }}className='valueButton'>Saber Mais</div>
                                </div>
                            </div>
                            <div className='recom'>
                                <div className='imageContainer'><img src={`${baseURL}/storage/images/${departamentos[1]?.info?.imagem}`}/></div>
                                <div className='info'>
                                    <div className='title'>{departamentos[1]?.info?.titulo}</div>
                                    <div className='valueButton' onClick={() => {
                                        navigate('/cursos', {
                                            state: {
                                                ...departamentos[1]
                                            }
                                        })
                                        localStorage.setItem('path', departamentos[1]?.info?.titulo)
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
<div className='apply' onClick={() => {
    navigate('/soon')
}}>Inscreva-se</div>

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
           }).map((item, index) => {
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
export default HealthPage