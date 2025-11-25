import Marquee from 'react-fast-marquee'
import '../css/footer.css'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseURL } from '../api/api'
import Skeleton from 'react-loading-skeleton'
const Footer = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [size, setSize] = useState(window.innerWidth)
    useEffect(() => {
        const handleSize = () => {
            setSize(window.innerWidth)
            
        }
        window.addEventListener('resize', handleSize)
        return () => {
            window.removeEventListener('resize', handleSize)
        }
    }, []) 
    const [info, setInfo] = useState(null)
    const [departments, setDepartments] = useState([])
     const [courses, setCourses] = useState([
          {
            name: "Polo Nova Vida",
            phone: " 938 997 849",
            description:
              "Nosso polo principal, com infraestrutura moderna e completa, oferecendo educação desde o ensino primário até o secundário.",
            tags: [
              "Ensino Primário",
              "Secundário",
              "Técnico",
              "Laboratórios Modernos",
              "Bibliotecas Modernas",
              "Campo Desportivo",
            ],
            category: "Ciências de Saúde",
            subcategory: "Ciências da Saúde",
      
            startDate: "2014-09-18",
            applicationsOpen: "SIM",
            curriculum: "INFORMAÇÕES / PLANO CURRICULAR",
            professionalOutcomes:
              "Para além das duas grandes áreas de intervenção que constituem a essência da profissão, diagnóstico e prevenção, o Técnico de Análises Clínicas e Saúde Pública pode também exercer a sua actividade no âmbito da terapêutica, da investigação, da gestão e do ensino. As competências adquiridas, permitem-lhe actividades nas áreas seguintes: Unidades hospitalares públicas e privadas; Laboratórios de análises clínicas; Laboratórios de ensino e universitários; Laboratórios de saúde pública; Centros de ensino e de investigação; Clínicas privadas; Centros de diagnóstico; Centros de saúde.",
            courseInformation: {
              type: "Licenciatura em Análises Clínicas e Saúde Pública",
              duration: "4 anos",
              internship: "SIM",
            },
            assessment:
              "Uma prova de avaliação em cada semestre do ano e no último ano do curso defesa de um projecto.",
            image: process.env.PUBLIC_URL + "/images/polo-nova-vida.svg",
          },
      
          ,
          {
            name: "Polo Camama",
            phone: " 949 751 072",
            description:
              "Localizado no coração de Camama, este polo destaca-se pelo seu programa de incentivo às ciências e tecnologias.",
            tags: [
              "Ensino Primário, Secundário e Técnico",
              "Laboratórios Modernos",
              "Bibliotecas Modernas",
              "Campo Desportivo",
              "Incusivo",
              "Laboratório de Informática",
              "Clube de Robótica",
              "Salas de Aula Interativas",
            ],
            category: "Ciências de Saúde",
            subcategory: "Ciências da Saúde",
      
            startDate: "2014-09-18",
            applicationsOpen: "SIM",
            curriculum: "INFORMAÇÕES / PLANO CURRICULAR",
            professionalOutcomes:
              "As competências adquiridas, permitem que o Licenciado em Enfermagem, na sua qualidade de profissional, possa desenvolver actividades de carácter terapêutico, propedêutica e educativas nos vários grupos de risco, com especial atenção para as áreas seguintes: Exercício da Função de Enfermeiro em Hospitais, Clínicas e outras Instituições do ramo; Gestão de Instituições de Saúde; Gestão de Programas de Saúde em Instituições Sociais; Gestão de Escolas e Programas de Ensino em Enfermagem; Desenvolvimento de Investigações Científicas em Saúde.",
            courseInformation: {
              type: "Licenciatura em Enfermagem",
              duration: "4 anos",
              internship: "SIM",
            },
            assessment:
              "Uma prova de avaliação em cada semestre do ano e no último ano do curso defesa de um projecto.",
            image: process.env.PUBLIC_URL + "/images/polo-camama_front.svg",
          },
          {
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
          {
            name: "Polo Kinaxixi",
            phone: " 925 678 901",
            description:
              "Situado no centro da cidade, o Polo Kinaxixi é conhecido pelo seu programa de línguas estrangeiras e intercâmbios culturais.",
            tags: [
              "Ensino Multilíngue",
              "Programa de Intercâmbio",
              "Biblioteca Internacional",
              "Centro Cultural",
            ],
            category: "Ciências de Saúde",
            subcategory: "Ciências da Saúde",
      
            startDate: "2014-10-16",
            applicationsOpen: "SIM",
            curriculum: "INFORMAÇÕES / PLANO CURRICULAR",
            professionalOutcomes:
              "Com base na estrutura do curso o tecnólogo em Odontologia pode exercer as suas funções em Instituições de prestação de cuidados de saúde públicas e privadas tais como: Hospitais; Clínicas de Especialidade, Gabinetes de Saúde Ocupacional; Lares; Centros de Apoio à Criança e ao Idoso; Escolas de Ensino Especial e em consultórios próprios.",
            courseInformation: {
              type: "Licenciatura em Odontologia",
              duration: "4 anos",
              internship: "SIM",
            },
            assessment:
              "Uma prova de avaliação em cada semestre do ano e no último ano do curso defesa de um projecto.",
          },
          {
            name: "Polo Benguela",
            phone: " 926 789 012",
            description:
              "Localizado na província de Benguela, este polo combina o ensino tradicional com foco na cultura e história local.",
            tags: [
              "Programa Cultural Local",
              "Museu Escolar",
              "Horta Pedagógica",
              "Centro de História Regional",
            ],
            category: "Ciências de Saúde",
            subcategory: "Ciências da Saúde",
      
            startDate: "2014-10-16",
            applicationsOpen: "SIM",
            curriculum: "INFORMAÇÕES / PLANO CURRICULAR",
            professionalOutcomes:
              "O profissional de Radiologia actua, não só na Radiologia de diagnóstico clínico, como na Radiologia de intervenção terapêutica, vascular e não vascular. As competências adquiridas permitem-lhe actividades nas áreas seguintes: Unidades hospitalares públicas e privadas; Clínicas privadas; Consultoria em entidades seguradoras; Centros de saúde; Centros de ensino e de investigação.",
            courseInformation: {
              type: "Licenciatura em Radiologia",
              duration: "4 anos",
              internship: "SIM",
            },
            assessment:
              "Uma prova de avaliação em cada semestre do ano e no último ano do curso defesa de um projecto.",
            // image: process.env.PUBLIC_URL + '/images/radiology.png'
          },
          {
            name: "Polo Lobito",
            phone: " 927 890 123",
            description:
              "Com vista para o mar, o Polo Lobito oferece programas especiais em ciências marinhas e actividades náuticas.",
            tags: [
              "Programa de Ciências Marinhas",
              "Clube Náutico",
              "Laboratório Oceanográfico",
              "Observatório Costeiro",
            ],
            category: "Ciências de Saúde",
            subcategory: "Ciências da Saúde",
      
            startDate: "2014-10-16",
            applicationsOpen: "SIM",
            curriculum: "INFORMAÇÕES / PLANO CURRICULAR",
            professionalOutcomes:
              "No final do curso, o(a) licenciado (a) podem trabalhar como: personal trainer, ou em clubes, academias de ginástica ou empresas, para melhorar a saúde física das pessoas; Orientando atletas e equipas desportivas nos treinos e preparação para competição, de forma individual ou como parte de equipas multidisciplinares compostas por médicos, psicólogos e fisioterapeutas, entre outros profissionais; Dando aulas nos ensinos fundamental e médio (desde que tenha licenciatura em Educação Física).",
            courseInformation: {
              type: "Licenciatura",
              duration: "4 anos",
              internship: "SIM",
            },
            assessment:
              "Uma prova de avaliação em cada semestre do ano e no último ano do curso defesa de um projecto.",
            image: process.env.PUBLIC_URL + "/images/lobito.svg",
          },
          {
            name: "Polo Soyo",
            phone: " 928 901 234",
            description:
              "No Polo Soyo, o foco está na formação técnica e profissionalizante, preparando os alunos para o mercado de trabalho local.",
            tags: [
              "Ensino Primário e Secundário",
              "Parcerias com Empresas",
              "Laboratórios de Energia",
              "Programa de Estágios",
            ],
            category: "Ciências de Saúde",
            subcategory: "Ciências da Saúde",
      
            startDate: "2014-10-16",
            applicationsOpen: "SIM",
            curriculum: "INFORMAÇÕES / PLANO CURRICULAR",
            professionalOutcomes:
              "No final do curso, o(a) licenciado (a) podem trabalhar em Unidades hospitalares públicas e privadas; Clínicas e centros de reabilitação; Instituições e associações de saúde; Exercício liberal; Estabelecimentos termais; Centros desportivos; Escolas e Institutos do ensino especial; Instituições de apoio a idosos e Clínicas privadas.",
            courseInformation: {
              type: "Licenciatura",
              duration: "4 anos",
              internship: "SIM",
            },
            assessment:
              "Uma prova de avaliação em cada semestre do ano e no último ano do curso defesa de um projecto.",
          },
        ]);
    useEffect(() => {
        axios.get(`${baseURL}/api/info`)
        .then(res => {
            setInfo([...res.data][0]?.info)
        })
        .catch(err => {
            //('error', err.response.data.message)
        })

        axios.get(`${baseURL}/api/departamentos`)
        .then(res  => {
            setDepartments([...res.data])
        })
        .catch(err => {
            //('error', err.response.data.message)
        })
    }, []) 
      
    return (
        <div className='footerCont'>
            <div class="footerCont1">
                
                    <div className='footerLeft'>
                    <div>
                        <div className='imgCont'>
                            <img style={{ filter: 'brightness(0) invert(100%) ' }} 
 loading="lazy" src={process.env.PUBLIC_URL + '/images/logotrans2.png'}/>
                        </div>
                        <span>GRUPO COLÉGIOS PITRUCA - EDUCAÇÃO DE Excelência</span>
                </div>
                </div>
                <div className='footerBottom'>
                    <div className='footerGrid'>
                         <section className='column'>
                            <div className='title'>Polos</div>
                            {courses?.map((item, index) => {
                                return (
                                    <div key={index} style={{cursor: 'pointer'}} className='item' onClick={() => {
                                        navigate(`/polos/polo/${item?.name}`, {
                                            state: {
                                                ...item
                                            }
                                        })
                                        localStorage.setItem('path', `${item?.name}`)
                                        window.location.reload()
                                    }}>{item?.name}</div>
                                )
                            })
                            }
                            {/* <div style={{cursor: 'pointer'}} className='item' onClick={() => {
                                navigate('/cursos')
                                localStorage.setItem('path', 'Ciências Sociais e Económicas')
                            }}>Ciências Sociais e Económicas</div>
                            <div style={{cursor: 'pointer'}} className='item' onClick={() => {
                                navigate('/cursos')
                                localStorage.setItem('path', 'Ciências das Engenharias/Exatas')
                            }}>Engenharias e Ciências Exactas</div>
                            <div style={{cursor: 'pointer'}} className='item' onClick={() => {
                                navigate('/cursos')
                                localStorage.setItem('path', 'Ciências de Saúde')
                            }}>Ciências da Saúde</div> */}


                        </section>
                        <section className='column'>
                            <div className='title'>Sobre</div>
                            <div style={{cursor: 'pointer'}} className='item' onClick={()=> {
                                navigate('/sobre')

                                localStorage.setItem('path',  'Sobre nós')
                            }}>Sobre nós</div>
                            {/* <div style={{cursor: 'pointer'}} className='item' onClick={() => {
                                navigate('/sobre')

                                localStorage.getItem('path') != 'Estrutura Orgânica' && localStorage.setItem('path',  'Estrutura Orgânica')
                            }}>Estrutura Orgánica</div> */}
                            <div style={{cursor: 'pointer'}} className='item' onClick={() => {
                                navigate('/sobre')

                                localStorage.getItem('path') != 'Estrutura Administrativa' && localStorage.setItem('path',  'Estrutura Administrativa')
                            }}>Estrutura Administrativa</div>
                            <div style={{cursor: 'pointer'}} className='item' onClick={() => {
                                navigate('/sobre')

                                localStorage.getItem('path') != 'Historial' && localStorage.setItem('path',  'Historial')
                            }}>Historial</div>
                            <div style={{cursor: 'pointer'}} className='item' onClick={() => {
                                navigate('/sobre')

                                localStorage.getItem('path') != 'Organigrama Insitucional' && localStorage.setItem('path',  'Organigrama Insitucional')
                            }}>Organigrama</div>
                            {/* <div style={{cursor: 'pointer'}} className='item' onClick={() => {
                                navigate('/sobre')

                                localStorage.getItem('path') != 'Estatutos e Regulamentos' && localStorage.setItem('path',  'Estatutos e Regulamentos')
                            }}>Estatutos e Regulamentos</div> */}

                        </section>
                        {/* second column */}
                       
                        {/* third column */}
                        {/* <section className='column'>
                            <div className='title'>Outros sites nossos</div>
                            <div style={{cursor: 'pointer'}} className='item' onClick={() => {
                                navigate('/soon')
                            }}>Pitruca</div>
                            <div style={{cursor: 'pointer'}} className='item' onClick={() => {
                                navigate('/soon')
                            }}>Clínica ISPAJ</div>
                        </section> */}
                        <section className='column'>
                            <div className='title'>Nos Contacte</div>
                            {/* <div style={{cursor: 'pointer'}} className='item'><a style={{textDecoration: 'none'}} href={`mailto:${info?.email}`}>{info?.email}</a></div> */}
                            <div style={{cursor: 'pointer'}} className='item'><a style={{textDecoration: 'none'}}>{'geral@colegiospitruca.co.ao'}</a></div>

                            <div className='item'>{info?.numero}/{info?.numero2}</div>
                            <div className='item' onClick={() => {
                                window.open('https://maps.app.goo.gl/nUDyQHvXJAktK6YD9')
                            }} style={{cursor: 'pointer', display: 'none', flexDirection: 'row', alignItems: 'center', gap: 10}}>Endereço <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-map" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.5.5 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103M10 1.91l-4-.8v12.98l4 .8zm1 12.98 4-.8V1.11l-4 .8zm-6-.8V1.11l-4 .8v12.98z"/>
</svg></div>
                        </section>
                    </div>
                    <div className='footerGrid1'>
                        <div className='column' style={{textAlign: 'justify', textJustify: 'inter-word'}}>
                        © 2024. Grupo Colégios Pitruca - Educação de Excelência. Todos os direitos reservados. Os <span onClick={() => {
                            navigate('/login')
                        }}>Colégios Pitruca</span> são referência em educação de qualidade em Angola, com mais de 15 anos a formar cidadãos críticos, criativos e responsáveis.Para questões gerais, entre em contato conosco pelo telefone (+244) {false ? info?.numero: '938 997 849'}/{false && info?.numero2} ou envie um e-mail para {false ? info?.email : 'geral@colegiospitruca.co.ao'}. Mantenha-se conectado connosco através de nossos canais de mídia social: Facebook, Instagram e Twitter.
                        </div>
                        <div className='column'>
                        <svg style={{cursor: 'pointer'}} onClick={() => {
                            window.open('https://www.facebook.com/colegiospitruca/')
                        }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                        </svg>
                        <svg style={{cursor: 'pointer'}} onClick={() => {
                            window.open('https://www.instagram.com/colegiospitruca')
                        }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                        </svg>
                        
                        <svg style={{cursor: 'pointer', display: 'none'}} onClick={() => {
                            window.open('https://x.com/ispaj_ao')
                        }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                        </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className='madeBy'>
                    <div><span style={{textTransform: 'uppercase'}}>© {new Date().getFullYear()} GRUPO COLÉGIOS PITRUCA - EDUCAÇÃO DE Excelência - </span> <span>Made by Level-Soft</span></div>
            </div>
        </div>
    )
}
export default Footer