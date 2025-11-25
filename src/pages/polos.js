import { useLocation, useNavigate } from "react-router-dom"
import Header from "../components/header"
import Footer from "../components/footer"
import '../css/about.css'
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import HealthPage from "../components/healthPage"
import SocialsPage from "../components/socialsPage"
import EnginesPage from "../components/enginesPage"
import axios from "axios"
import { baseURL } from "../api/api"
import PolosPage from "../components/polosPage"

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
  
  

  const Option = ({departamentos, item, text, section, setSection, setOpen }) => {
    const location = useLocation()
    const navigate = useNavigate()
    return (
      <motion.li
        variants={itemVariants}
        onClick={() => {
          const element = document.querySelector('.aboutCourse');

          
          
          // window.location.reload()
          // //('text', text)
          navigate(`/polos/polo/${item?.name}`, {
              state: {
                ...item,
              },
            });
            if (element){
              const rect = element.getBoundingClientRect();
  window.scrollTo({ top: window.scrollY + rect.top, behavior: 'smooth' });

            }
  
          setOpen(false)
          // window.location.reload()
          
        // localStorage.setItem('path', `${item?.info?.titulo}`)
          
          
        }}
        className={`${location?.state?.name}`.includes(item?.name) ? 'optionItem1' : 'optionItem'}
      >
        
        <span>{item?.name}</span>
      </motion.li>
    );
  };
  const StaggeredDropDown = ({departamentos, section, setSection}) => {
    
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
    return (
      <div style={{zIndex: 100}} className="aboutOptions" ref={menuRef}>
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
            {courses?.map((item) => {
                        return (
                          <Option departamentos={departamentos} item={item} setOpen={setOpen} section={section} setSection={setSection}text={`${item?.info?.titulo}`} />
                        )
                        })}
            {/* <Option setOpen={setOpen} section={section} setSection={setSection}text="Ciências de Saúde" />
            <Option setOpen={setOpen} section={section} setSection={setSection} text="Ciências Sociais e Económicas" />
            <Option setOpen={setOpen} section={section} setSection={setSection} text="Ciências das Engenharias/Exatas" /> */}
            
          </motion.ul>
        </motion.div>
      </div>
    );
  };
const Courses = () => {
    const [section, setSection] = useState('Ciências da Saúde')
    const [curso, setCurso] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()
    
    
    
    const [departamentos, setDepartmentos] = useState([])
    useEffect(() => {
      axios.get(`${baseURL}/api/departamentos`)
      .then(res => {
        setDepartmentos([...res.data])

        if (location?.state?.id){
          //('locationnnnn', location.state.id)
            axios.get(`${baseURL}/api/department/${location?.state?.id}`)
          .then(res => {
            setCurso(res.data)
          })
          .catch(err => {
            //('departmentError', location.state, err.response.data)
          })
        }else {
          //('else', localStorage.getItem('path'))
          if (localStorage.getItem('path').toLowerCase().includes('saúde')) {
            //('saudeeeeeeeee')
          axios.get(`${baseURL}/api/department/${[...res.data][0]?.id}`)
          .then(res => {
            setCurso(res.data)
          })
          .catch(err => {
            //('departmentError1', err.response.data)
          })
         }else if (localStorage.getItem('path').toLowerCase().includes('sociais')) {
          //('socialssss')
          axios.get(`${baseURL}/api/department/${[...res.data][1]?.id}`)
                        .then(res => {
                          setCurso(res.data)
                        })
                        .catch(err => {
                          //('departmentError1', err.response.data)
                        })
          } else {
            //('engineeeesss')
            axios.get(`${baseURL}/api/department/${[...res.data][2]?.id}`)
            .then(res => {
              setCurso(res.data)
            })
            .catch(err => {
              //('departmentError1', err.response.data)
            })
          
        }
      }
      })
      localStorage.getItem('path') && setSection(localStorage.getItem('path'))
      window.scrollTo(0, 0)

      
    }, [])
  
    useEffect(() => {
        //('carlos')
        localStorage.getItem('path') && setSection(localStorage.getItem('path'))
    }, [])

    const secondContainerRef = useRef(null)
    useEffect(() => {

      const adjustMargin = () => {
        if (secondContainerRef.current) {
            const outerContainerHeight = document.querySelector('.outerContainer')?.clientHeight  + 10|| 0;
            secondContainerRef.current.style.marginTop = `${outerContainerHeight}px`;
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
            <div className="aboutFirst" ref={secondContainerRef} style={{marginTop: document.querySelector('.outerContainer')?.clientHeight + 10}}>
              <div className="navigation">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-map-fill" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.598-.49L10.5.99 5.598.01a.5.5 0 0 0-.196 0l-5 1A.5.5 0 0 0 0 1.5v14a.5.5 0 0 0 .598.49l4.902-.98 4.902.98a.5.5 0 0 0 .196 0l5-1A.5.5 0 0 0 16 14.5zM5 14.09V1.11l.5-.1.5.1v12.98l-.402-.08a.5.5 0 0 0-.196 0zm5 .8V1.91l.402.08a.5.5 0 0 0 .196 0L11 1.91v12.98l-.5.1z"/>
                  </svg>
                  <span onClick={() => {
                              navigate('/')
                          }}>Home</span> <span>{'>'}</span><span onClick={() => {
                            navigate('/polos')
                          }} style={{cursor: 'pointer',}}>Polos</span>
                </div>
                {location.pathname.includes("polo/") && <StaggeredDropDown departamentos={departamentos} section={section} setSection={setSection} />}
            </div>
            
            <div className="aboutContainer">
                
                <section className="secondAboutSection" style={{flex: 1}}>
                {
                      <PolosPage/>
                    }
                </section>
            </div>
            
            <Footer />
        </div>
    )
}
export default Courses
