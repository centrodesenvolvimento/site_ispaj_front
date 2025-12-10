import "../css/health.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../@/components/ui/accordion";
import { ScrollArea } from "../@/components/ui/scroll-area";

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";
import { baseURL } from "../api/api";
const PolosPage = ({ curso, departamentos }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const openRef = useRef(null);
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
  const [course, setCourse] = useState(null);
  const [showFullText, setShowFullText] = useState(false);

  const handleReadMore = () => {
    setShowFullText(!showFullText);
  };
  const shortText = `Os polos dos Colégios Pitruca representam a nossa presença física e compromisso com a educação de qualidade em diferentes regiões de Angola. Cada polo foi cuidadosamente localizado em áreas estratégicas para garantir acesso fácil e conveniente às famílias, promovendo uma educação de excelência para crianças e jovens em todo o país.
<br/><br/>
Cada unidade dos Pitruca é equipada com infraestrutura moderna, ambientes acolhedores e recursos pedagógicos inovadores, que estimulam o aprendizado, a criatividade e o desenvolvimento de habilidades essenciais para o futuro. `;

  const fullText = `
    ${shortText}
    Nossos polos oferecem ambientes seguros, supervisionados por uma equipe de profissionais dedicados, que seguem os nossos valores sólidos de formação de cidadãos críticos, responsáveis e criativos.
    <br/><br/>
    Nos polos, a educação vai além da sala de aula, incluindo atividades extracurriculares, eventos culturais, palestras e programas de formação que visam promover o crescimento integral dos estudantes. Venha fazer parte desta história de sucesso e transformação!
  `;
  const scrollDivRef = useRef(null);
  useEffect(() => {
    scrollDivRef.current &&
      window.scrollTo({
        top:
          scrollDivRef.current.getBoundingClientRect().top +
          window.scrollY -
          180,
      });
  }, [location.pathname, scrollDivRef.current]);
  useEffect(() => {
    !location.pathname.includes("curso/") && window.scrollTo(0, 0);
  }, []);

  return (
    <div className="healthContainer">
      <section className="firstContainer">
        <div className="section">
          <div className="player">
            <div className="videoContainer" style={{ overflow: "hidden" }}>
              {/* curso?.info?.video  */}
              {true && (
                <iframe
                  src="https://player.vimeo.com/video/205580202?badge=0&autopause=0&player_id=0&app_id=58479"
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
            <div className="playerInfo">
              <div className="imgContainer">CP</div>
              <div className="title">Nossos Polos</div>
            </div>
            <div className="description">
              {showFullText ? (
                <div dangerouslySetInnerHTML={{ __html: fullText }} />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: shortText }} />
              )}
              {showFullText ? (
                <button
                  onClick={handleReadMore}
                  style={{ fontWeight: "600", color: "#005c8a" }}
                >
                  Ler Menos
                </button>
              ) : (
                <button
                  onClick={handleReadMore}
                  style={{ fontWeight: "600", color: "#005c8a" }}
                >
                  Ler Mais
                </button>
              )}
            </div>
          </div>
        </div>
        {/* <div className='section'>
                    <div className='title'>Algumas Saídas Profissionais</div>
                </div> */}
        <section className="accordions">
          <Accordion style={{ display: "none" }} type="single" collapsible>
            <AccordionItem value="item-1" className="section">
              <AccordionTrigger className="title" style={{ padding: 0 }}>
                Algumas Saídas Profissionais
              </AccordionTrigger>
              <AccordionContent>
                <div className="outputs">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: curso?.info ? curso?.info?.saidas : "",
                    }}
                  ></div>
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
          {/* <Accordion  defaultValue="item-1" type="single" collapsible>
                    <AccordionItem  value="item-1" className='section'>
                        <AccordionTrigger className='title' style={{ padding: 0}}>Veja Também</AccordionTrigger>
                        <AccordionContent>
                        <div className='recommendations'>
                        <div className='recom'>
                                <div className='imageContainer'><img loading="lazy"src={`${baseURL}/storage/images/${departamentos[2]?.info?.imagem}`}/></div>
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
                                <div className='imageContainer'><img loading="lazy"src={`${baseURL}/storage/images/${departamentos[1]?.info?.imagem}`}/></div>
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
                    </Accordion> */}
        </section>
      </section>

      <section className="secondContainer">
        {location.pathname.includes("polo/") && location.state ? (
          <div className="aboutCourse" ref={scrollDivRef}>
            <div
              className="imageContainer"
              style={{
                animationName: !location?.state?.image && "drl",
                backgroundColor: !location?.state?.image && "#DDDDDD",
                backgroundImage: !location?.state?.image && "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {!location?.state?.image ? (
                <div
                  style={{
                    color: "#1A4B8C",
                    fontWeight: "600",
                    fontSize: 38,
                    textAlign: "center",
                    paddingInline: 10,
                    display: "inline-block",
                  }}
                >
                  {location?.state?.name}
                </div>
              ) : (
                <img loading="lazy" src={`${location?.state?.image}`} />
              )}
            </div>
            <div className="first">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
</svg>
                Telefone: {location?.state?.phone}
              </span>
              <span>
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
</svg>
                Email:{" "}
                {(
                  `${location?.state?.name}`
                    .toLocaleLowerCase()
                    ?.split(" ")
                    ?.slice(1) + "@pitruca.edu.ao"
                ).replace(",", "")}
              </span>
              {/* <div className='apply' onClick={() => {
    navigate('/soon')
}}>Inscreva-se</div> */}
            </div>
            <div className="title"> {location?.state?.name}</div>

            <div className="description">{location?.state?.description}</div>

            <div className="subTitle">Informações adicionais</div>

            <div className="first">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-calendar"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                </svg>
                Horário: Segunda à Sexta-feira 7h30 às 17h30
              </span>
              {/* <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-video2" viewBox="0 0 16 16">
  <path d="M10 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
  <path d="M2 1a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zM1 3a1 1 0 0 1 1-1h2v2H1zm4 10V2h9a1 1 0 0 1 1 1v9c0 .285-.12.543-.31.725C14.15 11.494 12.822 10 10 10c-3.037 0-4.345 1.73-4.798 3zm-4-2h3v2H2a1 1 0 0 1-1-1zm3-1H1V8h3zm0-3H1V5h3z"/>
</svg>Estágio Profissional: {location.state.estagio ? 'Sim' : 'Não'}</span>
<span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mortarboard-fill" viewBox="0 0 16 16">
  <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917z"/>
  <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466z"/>
</svg>Tipo: {location.state.tipo}</span> */}
            </div>

            <div className="subTitle">Destaques</div>
            {/* <div className='description' dangerouslySetInnerHTML={{__html: location.state.saidas}}></div> */}

            <div className="description">
              <ul>
                {[...location?.state?.tags].map((item, index) => {
                  return <li key={index}>{item}</li>;
                })}
              </ul>
            </div>
            {/* <div className='subTitle'>Avaliação de Conhecimentos</div>
                        <div className='description'>{location.state.avaliacao}</div> */}

            <div className="banner">
              <div className="title">O ENSINO AO SERVIÇO DE ANGOLA</div>
              <div className="description">
                Existimos para formar profissionais de excelência
              </div>
            </div>
          </div>
        ) : (
          <ScrollArea className="coursesScrollArea">
            <div className="courses">
              {/* curso?.cursos && curso?.cursos?.filter */}
              {true &&
                courses
                  ?.filter((item) => {
                    if (item.show == undefined) {
                      return item;
                    } else if (item.show == true) {
                      return item;
                    }
                  })
                  .map((item, index) => {
                    return (
                      <div className="course">
                        <div
                          className="imageContainer"
                          style={{
                            animationName: !item?.image && "drl",
                            backgroundColor: !item?.image && "#DDDDDD",
                            backgroundImage: !item?.image && "none",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {!item?.image ? (
                            <div
                              style={{
                                color: "#1A4B8C",
                                fontWeight: "600",
                                fontSize: 38,
                                textAlign: "center",
                                paddingInline: 10,
                                display: "inline-block",
                              }}
                            >
                              {item?.name}
                            </div>
                          ) : (
                            <img loading="lazy" src={`${item?.image}`} />
                          )}
                        </div>
                        <div className="info">
                          <div className="title">{item?.name}</div>
                          <div className="basicInfo">
                            Telefone: <span>{item?.phone}</span>
                          </div>
                          <div
                            className="learnMore"
                            onClick={() => {
                              //(item)
                              navigate(`polo/${item?.name}`, {
                                state: {
                                  ...item,
                                },
                              });
                              setCourse(item);
                            }}
                          >
                            Ler Mais
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </ScrollArea>
        )}
      </section>
    </div>
  );
};
export default PolosPage;
