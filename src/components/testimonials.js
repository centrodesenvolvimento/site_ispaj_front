import { useEffect, useRef, useState } from "react";
import "../css/testimonials.css";
import { motion, useAnimationControls } from "framer-motion";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../api/api";
import Skeleton from "react-loading-skeleton";

const Testimonials = ({ departments, setDepartments }) => {
  const navigate = useNavigate();
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const icon = useRef(null);
  const [open, setOpen] = useState(false);
  const containerControls = useAnimationControls();
  useEffect(() => {
    if (open) {
      containerControls.start("open");
    } else {
      containerControls.start("close");
    }
  }, [open]);
  const menu = useRef(null);
  const swiperRef = useRef(null);
  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };
  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };
  useEffect(() => {
    const interval = setInterval(() => {
      //('index', activeIndex)
      if (activeIndex == 2) {
        setActiveIndex(0);
      } else {
        setActiveIndex(activeIndex + 1);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [activeIndex]);
  const [health, setHealth] = useState([
    {
      name: "Cardiopneumologia",
      category: "Ciências de Saúde",
      subcategory: "Ciências da Saúde",
      description:
        "A cardiopneumologia é uma área específica da saúde que abrange várias áreas, sendo as principais a cardiologia, pneumologia e cirurgia cárdiotorácica, e que tem como principais objectivos a prevenção, diagnóstico e tratamento de doenças cárdio-respiratórias. O técnico de Cardiopneumologia, actua integrado numa equipa de saúde multidisciplinar ao nível da identificação e resolução de problemas da comunidade, no âmbito do diagnóstico e terapêutica das doenças do foro cardiovascular e respiratório.",
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
      image: process.env.PUBLIC_URL + "/images/cardiology.png",
    },
    {
      name: "Odontologia",
      category: "Ciências de Saúde",
      subcategory: "Ciências da Saúde",
      description:
        "De acordo com estatísticas da Organização Mundial da Saúde (OMS), entre 50% e 99% da população apresenta cáries dentárias ou doenças gengivais. Uma parcela relevante das comunidades ainda não tem acesso ao atendimento odontológico básico, não sabe a importância que a saúde dos dentes exerce sobre o bem-estar geral. Das suas atividades autónomas, aplicadas ao cliente/doente, compete-lhe o planeamento, execução, análise e avaliação de acções terapêuticas específicas ao nível do estudo geral do paciente, dispondo das bases científicas para o atendimento das doenças mais prevalentes da cavidade bucal, etiologia, patogenia, diagnóstico e tratamento das mesmas, bem como da sua estética.",
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
      image: process.env.PUBLIC_URL + "/images/dentist.png",
    },
    {
      name: "Radiologia",
      category: "Ciências de Saúde",
      subcategory: "Ciências da Saúde",
      description:
        "As ciências radiológicas envolvem procedimentos diagnósticos, de intervenção e terapêutica em radiologia, radioterapia e medicina nuclear, bem como exames de rastreio e de investigação, exercendo a sua actividade num quadro ético e legal. Uma parte fundamental do papel destes profissionais consiste em gerir uma dinâmica interpessoal complexa, agindo como defensor de cada doente. Os Radiologistas são responsáveis pela realização de todos os exames da área da radiologia, pela programação, execução e avaliação de todas as técnicas radiológicas que intervêm na prevenção e promoção da saúde.",
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
      image: process.env.PUBLIC_URL + "/images/radiology.png",
    },
  ]);
  const [economics, setEconomics] = useState([
    {
      name: "Ciências Económicas e Gestão",
      category: "Ciências Sociais e Económicas",
      subcategory: "Ciências Económicas e Gestão",
      description:
        "As ciências económicas são fundamentais no nosso país e constituem um baluarte exponencial na gestão das empresas, qualquer que seja a sua dimensão. O conhecimento científico que o licenciado adquire ao nível de diferentes saberes torna-o capaz de, com autonomia, desempenhar esse papel importante de gestão.",
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
        internship: "SIM",
      },
      assessment:
        "Uma prova de avaliação em cada semestre do ano e no último ano do curso defesa de um projecto.",
      image: process.env.PUBLIC_URL + "/images/accounting.png",
    },
    {
      name: "Psicologia",
      category: "Ciências Sociais e Económicas",
      subcategory: "Ciências Económicas e Gestão",
      description:
        "Uma reduzida cobertura no país, desta profissão, que favoreça uma melhoria da qualidade de vida da população através do papel importante do psicólogo, foi uma preocupação do ISPAJ na implementação desta licenciatura. Nesse sentido, ressalta o campo indispensável da psicologia na sociedade moderna no apoio às pessoas, às empresas ou organizações, hospitais ou clínicas, escolas e outras importantes atividades.",
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
        internship: "SIM",
      },
      assessment:
        "Uma prova de avaliação em cada semestre do ano e no último ano do curso defesa de um projecto.",
      image: process.env.PUBLIC_URL + "/images/psicology.png",
    },
    {
      name: "Relações Internacionais",
      category: "Ciências Sociais e Económicas",
      subcategory: "Ciências Económicas e Gestão",
      description:
        "Esta licenciatura tem por objetivo a formação de quadros dotados dos conhecimentos necessários a uma análise, a uma interpretação e a uma perspetiva tão específicas quanto globalizantes, da realidade internacional, num mundo que se caracteriza por uma profunda e acelerada mutação. Com efeito, tendo-se verificado uma universalização do sistema, numa tendência multipolar, assiste-se à complexidade crescente da sociedade internacional e até à internacionalização da vida privada. É com vista a essa necessária preparação que a licenciatura em Relações Internacionais está estruturada.",
      startDate: "2014-10-16",
      applicationsOpen: "SIM",
      curriculum: "INFORMAÇÕES / PLANO CURRICULAR",
      professionalOutcomes: `Organizações e administração de negócios internacionais; Diplomacia e assessoria especializada na área de Relações Internacionais (no âmbito público e privado), por conta da integração regional; Assessoria política e comercial em câmaras de comércio, consulados, embaixadas e representações internacionais; Elaboração de estudos e estratégias em sindicatos patronais e de trabalhadores; Organizações públicas e Privadas na busca de excelência na qualidade, produtividade e competitividade.`,
      courseInformation: {
        type: "Licenciatura",
        duration: "4 anos",
        internship: "SIM",
      },
      assessment:
        "Uma prova de avaliação em cada semestre do ano e no último ano do curso defesa de um projecto.",
      image: process.env.PUBLIC_URL + "/images/internationalRelations.png",
    },
  ]);
  const [engines, setEngines] = useState([
    {
      name: "Engenharia Informática",
      category: "Ciências das Engenharias e Ciências Exactas",
      subcategory: "Ciências das Engenharias e Ciências Exactas",
      description:
        "A informática é hoje, em todo o mundo, um elemento essencial, e em Angola, ainda mais pela emergência de muita actividade neste domínio. O licenciado em informática fica com excelentes competências nas áreas profissionais da Engenharia da Comunicação de Dados (Data Communications Engineering), Desenvolvimento de Software e Aplicações (Software and Application Development), Arquitecturas e Concepção de Software (Software Arcitecture and Design), Concepção de Aplicações Multimédia (Multimedia Design) e Especialista de Sistemas (Systems Specialist), sendo que todas as disciplinas tecnológicas incluem uma percentagem de componente prática laboratorial, em laboratório de Informática ou laboratório de Electrónica e Sistemas Digitais.",
      startDate: "2014-10-16",
      applicationsOpen: "SIM",
      curriculum: "INFORMAÇÕES / PLANO CURRICULAR",
      professionalOutcomes:
        "No final do curso, o(a) licenciado(a) pode trabalhar: Empresas de software, empresas de informática, sector público e privado como engenheiro de sistemas informáticos e por conta própria desenvolvendo software, páginas de internet e toda a multidisciplinar saída das engenharias, pode ainda trabalhar na investigação ou como professor.",
      courseInformation: {
        type: "Licenciatura",
        duration: "5 anos",
        internship: "SIM",
        coordinator: "Eng. Nelson Gime",
      },
      assessment:
        "Uma prova de avaliação em cada semestre do ano e no último ano do curso defesa de um projecto.",
      image: process.env.PUBLIC_URL + "/images/computer.png",
    },
    {
      name: "Engenharia Civil",
      category: "Ciências das Engenharias e Ciências Exactas",
      subcategory: "Ciências das Engenharias e Ciências Exactas",
      description:
        "A Engenharia Civil é um setor de suma importância, tanto na Economia mundial, como na Angolana. Este curso de licenciatura tem como principal objetivo garantir conhecimentos e desenvolver competências que permitam aos seus diplomados a capacidade de resolução de problemas de elevada complexidade, bem como desenvolver trabalhos em equipas multidisciplinares, respeitando os princípios de ética e deontologia profissional. Neste curso, procura-se essencialmente desenvolver projetos que proporcionem aos cidadãos melhores condições de vida e de bem-estar.",
      startDate: "2014-10-16",
      applicationsOpen: "SIM",
      curriculum: "INFORMAÇÕES / PLANO CURRICULAR",
      professionalOutcomes:
        "Saídas Profissionais: - Gabinetes de projetos; - Empresas de Construção Civil; - Empresas de auditoria e consultoria; - Peritos avaliadores; - Atividades de manutenção e gestão de operações; - Empresas de serviços (seguradoras e bancos); - Laboratórios de investigação; - Atividades de docência; - Direção e fiscalização de obras; - Empresas públicas.",
      courseInformation: {
        type: "Licenciatura",
        duration: "5 anos",
        internship: "SIM",
        coordinator: "Eng. António Vilela Gomes",
        email: "antoniovilela.ispaj@gmail.com",
      },
      assessment:
        "Uma prova de avaliação em cada semestre do ano e no último ano do curso defesa de um projeto.",
      image: process.env.PUBLIC_URL + "/images/civil.png",
    },
    {
      name: "Engenharia de Recursos Naturais e Ambiente",
      category: "Ciências das Engenharias e Ciências Exactas",
      subcategory: "Ciências das Engenharias e Ciências Exactas",
      description:
        "A vasta extensão do território angolano e a emergência das suas necessidades são muito elevadas, sendo necessário formar Engenheiros de Recursos Naturais e Ambiente, altamente qualificados capazes, de aplicar método científico e tratar as questões tecnológicas e ambientais com uma visão multidisciplinar e transdisciplinar, que permite a identificação das causas e efeitos, a análise, o equacionamento, a implantação e o acompanhamento das soluções dos problemas das áreas de Recursos Naturais, Geotecnia e Geoquímica Ambiental, Saneamento Ambiental, Recursos Energéticos, Gestão Ambiental e Engenharia Legal, e a Operação dos Equipamentos de Engenharia referentes às respectivas áreas.",
      startDate: "2014-10-16",
      applicationsOpen: "SIM",
      curriculum: "INFORMAÇÕES / PLANO CURRICULAR",
      professionalOutcomes:
        "No final do curso, o(a) licenciado(a) pode trabalhar em: Engenharia de Recursos Naturais e Ambiente em Empresas Públicas e Privadas; Órgãos da Administração central e local; Empresas de extracção e transformação; As empresas de consultoria que elaboram planos de uso do solo, estudos de impactos no ambiente, pareceres técnicos e projectos específicos na área ambiental.",
      courseInformation: {
        type: "Licenciatura",
        duration: "5 anos",
        internship: "SIM",
      },
      assessment:
        "Uma prova de avaliação em cada semestre do ano e no último ano do curso defesa de um projeto.",
      image: process.env.PUBLIC_URL + "/images/naturalResources.png",
    },
  ]);
  const firstVid = useRef(null);
  const secondVid = useRef(null);
  const thirdVid = useRef(null);
  const videoRefs = useRef([]);

  useEffect(() => {
    localStorage.getItem("path") && localStorage.removeItem("path");
  }, []);
  useEffect(() => {
    videoRefs.current = [];
  }, [departments]);

  return (
    <div className="testContainer">
      <Swiper
        spaceBetween={30}
        slidesPerGroup={1}
        centeredSlides={true}
        autoplay={{
          delay: 15000,
          disableOnInteraction: false,
        }}
        loop
        slidesPerView={1}
        onChange={() => {
          // //('changed', firstVid.current)
        }}
        onSlideChange={(e) => {
          // //('changeddddd')
          setActiveIndex(e.realIndex);
        }}
        pagination={{
          clickable: true,
        }}
        onSwiper={(e) => {
          swiperRef.current = e;
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper1"
        style={{ background: "white" }}
        ref={swiperRef}
        onSlideChangeTransitionStart={() => {
          videoRefs.current.forEach((video) => {
            if (video && !video.paused) {
              video.pause();
            }
          });
        }}
      >
        {departments?.[0]?.info?.descricao
          ? [...departments].map((item, index) => {
              return (
                <SwiperSlide className="swiperTest" key={index}>
                  <section className="firstCont">
                    <div className="videoCont">
                      {item?.info?.video && (
                        <video
                          ref={(el) => (videoRefs.current[index] = el)}
                          loading="lazy"
                          onPlay={() => {
                            swiperRef.current?.autoplay?.stop();
                          }}
                          onPause={() => {
                            swiperRef.current?.autoplay?.start();
                          }}
                          onEnded={() => {
                            swiperRef.current?.autoplay?.start();
                          }}
                          controls
                          src={`${baseURL}/public/storage/videos/${item?.info?.video}`}
                        />
                      )}
                    </div>
                    <div className="info">
                      <div className="title">
                        Veja o que os estudantes de {item?.info?.titulo} dizem
                      </div>
                      <div className="profile">
                        <div className="profileInfo">
                          <span
                            className="profileImageContainer"
                            style={{ textTransform: "uppercase" }}
                          >
                            D
                            {`${item?.info?.titulo}`
                              .split(" ")
                              .map((chars) => {
                                return chars[0];
                              })
                              .slice(0, 3)}
                          </span>
                          <span className="profileName">
                            Departamento de {item?.info?.titulo}
                          </span>
                        </div>
                        <div
                          className="learnMore"
                          onClick={() => {
                            navigate("cursos/", {
                              state: {
                                ...item,
                              },
                            });
                            localStorage.setItem("path", item.info.titulo);
                            localStorage.setItem("course", item.id);
                          }}
                        >
                          Saber Mais
                        </div>
                      </div>
                      <div className="aboutCourse">{item?.info?.descricao}</div>
                    </div>
                  </section>
                  <section className="secondCont">
                    <div className="header">Alguns Cursos</div>
                    <div className="courses">
                      {[...item?.cursos].length >= 1
                        ? [...item?.cursos].slice(0, 3).map((course, index) => {
                            return (
                              <div className="courseContainer" key={index}>
                                <div className="imgContainer">
                                  {course?.imagem && (
                                    <img
                                      loading="lazy"
                                      src={`${baseURL}/public/storage/images/${course.imagem}`}
                                    />
                                  )}
                                </div>
                                <div
                                  className="title"
                                  onClick={() => {
                                    localStorage.setItem(
                                      "path",
                                      item?.info?.titulo
                                    );
                                    localStorage.setItem("course", item.id);
                                    navigate(`cursos/curso/${course?.titulo}`, {
                                      state: {
                                        ...course,
                                      },
                                    });
                                  }}
                                >
                                  {course?.titulo}
                                </div>
                                <div className="description">
                                  {item?.info?.titulo}
                                </div>
                              </div>
                            );
                          })
                        : health.map((item, index) => {
                            return (
                              <div className="courseContainer" key={index}>
                                <Skeleton className="imgContainer" />

                                <Skeleton className="title" />
                                <Skeleton className="description" />
                              </div>
                            );
                          })}
                    </div>
                  </section>
                </SwiperSlide>
              );
            })
          : [".", ".", "."].map((item, index) => {
              return (
                <SwiperSlide className="swiperTest" key={index}>
                  <section className="firstCont">
                    {<Skeleton className="videoCont" />}
                    <div className="info">
                      {
                        <Skeleton
                          style={{
                            background: "#e3e3e3",
                            margin: 0,
                            padding: 0,
                            marginTop: 5,
                          }}
                          className="title"
                        />
                      }
                      <div className="profile">
                        <div className="profileInfo">
                          <div
                            style={{ background: "#eeeeee" }}
                            className="profileImageContainer"
                          />
                          {
                            <Skeleton
                              style={{
                                background: "#e3e3e3",
                                margin: 0,
                                padding: 0,
                                height: 14,
                                width: 150,
                              }}
                              count={2}
                              className="profileName"
                            />
                          }
                        </div>
                        {
                          <Skeleton
                            style={{
                              background: "#e3e3e3",
                              margin: 0,
                              padding: 0,
                              height: 40,
                              width: 100,
                            }}
                          />
                        }
                      </div>
                      {
                        <div className="aboutCourse">
                          <Skeleton
                            style={{
                              background: "#e3e3e3",
                              margin: 0,
                              padding: 0,
                              height: 14,
                              width: "100%",
                            }}
                            count={4}
                          />
                        </div>
                      }
                    </div>
                  </section>
                  <section className="secondCont">
                    <div className="header">Alguns Cursos</div>
                    <div className="courses">
                      {health.map((item, index) => {
                        return (
                          <div className="courseContainer" key={index}>
                            <Skeleton className="imgContainer" />

                            <Skeleton className="title" />
                            <Skeleton className="description" />
                          </div>
                        );
                      })}
                    </div>
                  </section>
                </SwiperSlide>
              );
            })}

        {/* <SwiperSlide className='swiperTest'>
        <section className='firstCont'>
            {!departments?.[0]?.info?.video ? <div className='videoCont'>
                <video loading="lazy"  controls src={process.env.PUBLIC_URL + 'videos/cantaIspaj.mp4'}/>
            </div> :
            <Skeleton className='videoCont'/>}
                <div className='info'>
                    {!departments?.[0]?.info?.video ? <div className='title'>Veja o que os estudantes de Ciências de Saúde dizem</div> : <Skeleton style={{background: '#e3e3e3', margin: 0, padding: 0, marginTop: 5}} className='title' />}
                    <div className='profile'>
                        <div className='profileInfo'>
                            <span className='profileImageContainer'>
                                DCS
                            </span>
                            {!departments?.[0]?.info?.video ? <span className='profileName'>Departamento de Ciências de Saúde</span> : <Skeleton style={{background: '#e3e3e3', margin: 0, padding: 0, height: 14, width: 150}}count={2} className='profileName' />}
                        </div>
                        {!departments?.[0]?.info?.video ? <div className='learnMore' onClick={() => {
                            navigate('/cursos')
                            localStorage.setItem('path', 'Ciências de Saúde')
                        }}>
                            Saber Mais
                        </div>: <Skeleton style={{background: '#e3e3e3', margin: 0, padding: 0, height: 40, width: 100}} />}
                    </div>
                    {!departments?.[0]?.info?.video ? <div className='aboutCourse'>
                    Explore a nossa gama abrangente de cursos de saúde concebidos para o equipar com o conhecimento e as competências necessárias para uma carreira de sucesso na indústria dos cuidados de saúde. Nosso currículo abrange várias disciplinas, incluindo saúde pública, cardiopneumologia, odontologia, etc. Ministrados por profissionais experientes. Junte-se a nós.
                    </div>: <div className='aboutCourse'><Skeleton style={{background: '#e3e3e3', margin: 0, padding: 0, height: 14, width: '100%'}} count={4} /></div>}
                </div>
            
        </section>
        <section className='secondCont'>
            <div className='header'>
                Alguns Cursos
            </div>
            <div className='courses'>
                {!departments?.[0]?.info?.video ? 
                health.map((item, index) => {
                    return (
                        <div className='courseContainer'>
                            <div className='imgContainer'>
                                <img loading="lazy"src={item.image}/>
                            </div>
                            <div className='title' onClick={() => {
                                            localStorage.setItem('path', 'Ciências de Saúde')

                                            navigate(`cursos/curso/${item.name}`, {
                                                state: {
                                                    ...item
                                                }
                                            })
                                        }}>{item.name}</div>
                            <div className='description'>Ciências de Saúde</div>
                        </div>
                    )
                })
                :health.map((item, index) => {
                    return (
                        <div className='courseContainer'>
                            <Skeleton className='imgContainer'/>

                            <Skeleton className='title' />
                            <Skeleton className='description' />
                        </div>
                    )
                })}
            </div>
        </section>
        
        </SwiperSlide>
        <SwiperSlide className='swiperTest'>
        <section className='firstCont'>
            {!departments?.[0]?.info?.video ? <div className='videoCont'>
                <video loading="lazy"  controls src={process.env.PUBLIC_URL + 'videos/cantaIspaj.mp4'}/>
            </div> :
            <Skeleton className='videoCont'/>}
                <div className='info'>
                    {!departments?.[0]?.info?.video ? <div className='title'>Veja o que os estudantes de Ciências de Saúde dizem</div> : <Skeleton style={{background: '#e3e3e3', margin: 0, padding: 0, marginTop: 5}} className='title' />}
                    <div className='profile'>
                        <div className='profileInfo'>
                            <span className='profileImageContainer'>
                                DCS
                            </span>
                            {!departments?.[0]?.info?.video ? <span className='profileName'>Departamento de Ciências de Saúde</span> : <Skeleton style={{background: '#e3e3e3', margin: 0, padding: 0, height: 14, width: 150}}count={2} className='profileName' />}
                        </div>
                        {!departments?.[0]?.info?.video ? <div className='learnMore' onClick={() => {
                            navigate('/cursos')
                            localStorage.setItem('path', 'Ciências de Saúde')
                        }}>
                            Saber Mais
                        </div>: <Skeleton style={{background: '#e3e3e3', margin: 0, padding: 0, height: 40, width: 100}} />}
                    </div>
                    {!departments?.[0]?.info?.video ? <div className='aboutCourse'>
                    Explore a nossa gama abrangente de cursos de saúde concebidos para o equipar com o conhecimento e as competências necessárias para uma carreira de sucesso na indústria dos cuidados de saúde. Nosso currículo abrange várias disciplinas, incluindo saúde pública, cardiopneumologia, odontologia, etc. Ministrados por profissionais experientes. Junte-se a nós.
                    </div>: <div className='aboutCourse'><Skeleton style={{background: '#e3e3e3', margin: 0, padding: 0, height: 14, width: '100%'}} count={4} /></div>}
                </div>
            
        </section>
        <section className='secondCont'>
            <div className='header'>
                Alguns Cursos
            </div>
            <div className='courses'>
                {!departments?.[0]?.info?.video ? 
                health.map((item, index) => {
                    return (
                        <div className='courseContainer'>
                            <div className='imgContainer'>
                                <img loading="lazy"src={item.image}/>
                            </div>
                            <div className='title' onClick={() => {
                                            localStorage.setItem('path', 'Ciências de Saúde')

                                            navigate(`cursos/curso/${item.name}`, {
                                                state: {
                                                    ...item
                                                }
                                            })
                                        }}>{item.name}</div>
                            <div className='description'>Ciências de Saúde</div>
                        </div>
                    )
                })
                :health.map((item, index) => {
                    return (
                        <div className='courseContainer'>
                            <Skeleton className='imgContainer'/>

                            <Skeleton className='title' />
                            <Skeleton className='description' />
                        </div>
                    )
                })}
            </div>
        </section>
        
        </SwiperSlide> */}
        {/* <SwiperSlide className='swiperTest'>
        <section className='firstCont'>

        </section>
        <section className='secondCont'>

        </section>
        </SwiperSlide>
        <SwiperSlide className='swiperTest'>
        <section className='firstCont'>

        </section>
        <section className='secondCont'>

        </section>
        </SwiperSlide> */}
        {/* <div onClick={() => handlePrev()} className='button left'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
</svg></div>
        <div onClick={() => handleNext()} className='button right'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
</svg></div> */}
        <div className="swiper-footer">
          <div
            className="servicesControl1"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <svg
              onClick={() => handlePrev()}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-left-circle-fill servicesControlButton"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
            </svg>

            <svg
              onClick={() => handleNext()}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-right-circle-fill servicesControlButton"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
            </svg>
          </div>
          <div className="swiper-pagination">
            {/* <div className='swiper-pagination-bullet'></div>
                <div className='swiper-pagination-bullet'></div>
                <div className='swiper-pagination-bullet'></div> */}
          </div>
          <div
            id="autoPlay1"
            className="autoplay-progress"
            slot="container-end"
          >
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </div>
      </Swiper>
    </div>
  );
};
export default Testimonials;
