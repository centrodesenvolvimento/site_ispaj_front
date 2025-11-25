import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useRef, useState } from "react";
import "../css/header.css";
import { useEffect } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectFade,
  FreeMode,
  Navigation,
  Pagination,
  Thumbs,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from "../@/components/ui/sheet";
import axios from "axios";
import { baseURL } from "../api/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogTitle,
} from "../@/components/ui/alert-dialog";
import { Overlay } from "@radix-ui/react-alert-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
} from "../@/components/ui/dialog";
import { Close } from "@radix-ui/react-dialog";
import { Carousel } from "react-responsive-carousel";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "yet-another-react-lightbox/styles.css";
import Skeleton from "react-loading-skeleton";

const containerVariants = {
  close: {
    width: "0px",
    transition: {
      type: "spring",
      damping: 15,
      duratino: 0.5,
    },
  },
  open: {
    width: "16rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
};

const RightChevron = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-chevron-right"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
      />
    </svg>
  );
};
const LeftChevron = () => {
  return (
    <svg
      style={{ cursor: "pointer" }}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-arrow-left-short"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
      />
    </svg>
  );
};
const Header = () => {
  const dialogRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const sideMenuRef = useRef(null);
  const [selected, setSelected] = useState(0);
  const [selectedSide, setSelectedSide] = useState(0);
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [avisos, setAvisos] = useState([]);
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
      // //('index', activeIndex)
      if (activeIndex == 2) {
        setActiveIndex(0);
      } else {
        setActiveIndex(activeIndex + 1);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sideMenuRef.current &&
        !sideMenuRef.current.contains(e.target) &&
        !icon.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [departments, setDepartments] = useState([]);
  const [info, setInfo] = useState(null);
  useEffect(() => {
    axios.get(`${baseURL}/api/departamentos`).then((res) => {
      //   //('departamentos', res.data)
      setDepartments([...res.data]);
    });
    axios.get(`${baseURL}/api/info`).then((res) => {
      let content = [...res.data][0];
      console.log("content", content);
      setInfo([...res.data][0]?.info);
    });
  }, []);
  const preHeaderRef = useRef(null);
  const preHeaderRef1 = useRef(null);
  useEffect(() => {
    let lastScrollTop = 0;
    const delta = 15;

    window.addEventListener("scroll", function () {
      let st = window.pageYOffset || document.documentElement.scrollTop;

      if (Math.abs(lastScrollTop - st) <= delta) {
        return;
      }

      if (preHeaderRef.current && preHeaderRef1.current) {
        if (st > lastScrollTop && lastScrollTop > 0) {
          preHeaderRef1.current.style.marginTop = "-55px";
          // preHeaderRef.current.style.marginTop = "0";
        } else if (st <= 80) {
          // upscroll code
          // preHeaderRef.current.style.marginTop = "55px"
          preHeaderRef1.current.style.marginTop = "0px";
        }
      }

      lastScrollTop = st;
    });
  }, []);
  const [alerta, setAlerta] = useState(true);

  useEffect(() => {
    // //('inside avisos useeffect')
    axios
      .get(`${baseURL}/api/avisos`)
      .then((res) => {
        //   //('avisosssssssssssssssssssssssssssssssss', res.data)
        setDialogOpen1(true && !sessionStorage.getItem("viewedAlert"));
        setAvisos(
          [...res.data].filter((item) => {
            if (item?.info?.show == undefined) {
              return item;
            } else if (item?.info?.show == true) {
              return item;
            }
          })
        );
        setDialogOpen1(true && !sessionStorage.getItem("viewedAlert"));
      })
      .catch((err) => {
        //   //('avisos error', err.response.data.message)
      });
  }, []);
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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpen1, setDialogOpen1] = useState(false);
  //   useEffect(() => {

  //     var count = 0;
  //     var directions = {
  //     prev: 0,
  //     next: 1
  //     }
  //     var prevButton = document.querySelector(".slidernavigation button:first-child");
  //     var nextButton = document.querySelector(".slidernavigation button:last-child");
  //     var sliders = document.querySelectorAll(".slidercontent figure");
  //     function initListeners() {
  //         nextButton?.addEventListener("click", onNavigationClick);
  //         prevButton?.addEventListener("click", onNavigationClick);
  //     }
  //     function getElementIndex(element) {
  //         return Array.from(element.parentElement.children).indexOf(element);
  //     }
  //     function countController(directionIndex) {
  //         var result = { new: 0, old: count };
  //         var max = avisos.length

  //         if(directionIndex === directions.next) {
  //           count = count === max - 1 ? 0 : (count + 1);
  //         }

  //         if(directionIndex === directions.prev) {
  //           count = count === 0 ? (max - 1) : (count - 1);
  //         }

  //         result.new = count;

  //         return result;
  //       }
  //     function onNavigationClick(e) {
  //         var currentButton = e.target;

  //         var index = getElementIndex(e.target);
  //         var controlledCount = countController(index);

  //         var oldSlideItem = sliders[controlledCount.old];

  //         var newSlideItem = sliders[controlledCount.new];

  //         oldSlideItem?.classList.remove("show");
  //         currentButton?.classList.add("disabled");

  //         var showNextSliderItemInterval = setInterval(function() {
  //         newSlideItem?.classList.add("show");
  //         currentButton.classList.remove("disabled");
  //         clearInterval(showNextSliderItemInterval);
  //         }, 150);
  //     }
  //     //('hello')
  //     initListeners();

  // })
  useEffect(() => {}, []);

  return (
    <div style={{ margin: 0, padding: 0 }}>
      <ToastContainer />
      {avisos.length > 0 && (
        <Dialog
          open={dialogOpen1}
          ref={dialogRef}
          onOpenChange={() => {
            sessionStorage.setItem("viewedAlert", true);
            // //('11111')
            setDialogOpen1(false);
            toast.info(
              <div
                onClick={() => {
                  sessionStorage.setItem("viewedAlert", false);
                  setDialogOpen1(true);
                  // //('sessionstorage', sessionStorage.getItem('viewedAlert'))
                  toast.dismiss();
                }}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  cursor: "pointer",
                }}
              >
                Voltar a ver anúncios?
              </div>,
              {
                position: "bottom-right",
                autoClose: false,

                transition: Bounce,
                // closeOnClick: true,
                onClose: () => {
                  sessionStorage.setItem("viewedAlert", true);
                  localStorage.setItem("toastClosed", "true");
                },
                render: (
                  <div>
                    Voltar a ver anúncios?
                    <button
                      onClick={() => {
                        sessionStorage.setItem("viewedAlert", false);
                        toast.dismiss();
                      }}
                    >
                      Ver
                    </button>
                  </div>
                ),
              }
            );
          }}
          defaultOpen={true}
        >
          <div>
            {/* <AlertDialogTrigger style={{width: '100%'}}>
                                    
                                <div className='actionButton'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
                                                </div>
                                </AlertDialogTrigger> */}
            <DialogOverlay
              style={{ zIndex: 1000 }}
              onClick={() => {
                setDialogOpen1(false);
                toast.info(
                  <div
                    onClick={() => {
                      sessionStorage.setItem("viewedAlert", false);
                      setDialogOpen1(true);
                      // //('sessionstorage', sessionStorage.getItem('viewedAlert'))
                      toast.dismiss();
                    }}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                      cursor: "pointer",
                    }}
                  >
                    Voltar a ver anúncios?
                  </div>,
                  {
                    position: "bottom-right",
                    autoClose: false,

                    transition: Bounce,
                    // closeOnClick: true,
                    onClose: () => {
                      sessionStorage.setItem("viewedAlert", true);
                      localStorage.setItem("toastClosed", "true");
                    },
                    render: (
                      <div>
                        Voltar a ver anúncios?
                        <button
                          onClick={() => {
                            sessionStorage.setItem("viewedAlert", false);
                            toast.dismiss();
                          }}
                        >
                          Ver
                        </button>
                      </div>
                    ),
                  }
                );
              }}
            />
            <DialogContent
              style={{
                flexDirection: "column",
                display: "flex",
                zIndex: 1001,
                maxWidth: 700,
                overflow: "hidden",
                margin: "auto",
              }}
            >
              <span>
                <DialogTitle
                  style={{ textAlign: "center", alignSelf: "center" }}
                >
                  Aviso
                </DialogTitle>
                <DialogDescription
                  style={{ textAlign: "center", alignSelf: "center" }}
                ></DialogDescription>

                <Carousel
                  autoPlay
                  infiniteLoop
                  renderArrowPrev={(onClickHandler, hasPrev, label) =>
                    hasPrev && (
                      <div
                        className="alertButtonPrev"
                        onClick={onClickHandler}
                        title={label}
                        style={{ left: 15 }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          class="bi bi-chevron-left"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                          />
                        </svg>
                      </div>
                    )
                  }
                  renderArrowNext={(onClickHandler, hasNext, label) =>
                    hasNext && (
                      <div
                        className="alertButtonNext"
                        onClick={onClickHandler}
                        title={label}
                        style={{ right: 15 }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          class="bi bi-chevron-right"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                          />
                        </svg>
                      </div>
                    )
                  }
                  swipeable={true}
                  thumbWidth={60}
                  showIndicators={false}
                >
                  {avisos.concat(avisos).length > 0 &&
                    avisos.map((item, index) => {
                      return (
                        <div
                          style={{ position: "relative" }}
                          className="alertAviso"
                        >
                          <div className="alertContainer">
                            <img
                              loading="lazy"
                              className="alertImage"
                              src={`${baseURL}/storage/images/${item?.info?.image}`}
                            />
                          </div>
                          <div className="alertInfo">
                            <div className="profile">
                              <div className="profilepic">
                                <img
                                  loading="lazy"
                                  src={
                                    process.env.PUBLIC_URL + "/images/logo.png"
                                  }
                                />
                              </div>
                              <div className="profileTitle">
                                grupo colégios pitruca
                              </div>
                            </div>
                            <div className="caption">{item?.info?.title}</div>
                          </div>
                        </div>
                      );
                    })}
                </Carousel>
                {/* <div className="slider">
                                <div className="slidercontent">
                                {
                                    avisos.length > 0 && avisos.map((item, index) => {
                                        if (index == 0){
                                            return (
                                                <figure className='show'>
                                              <img loading="lazy"src={`${baseURL}/storage/images/${item?.info?.image}`}/>
                                            
                                                </figure>
                                            )
                                        }
                                        return (
                                            <figure>
                                                
                                              <img loading="lazy"src={`${baseURL}/storage/images/${item?.info?.image}`}/>
                                            
                                            </figure>
                                            
                                        )
                                    })
                                }
                                </div>
                                <div class="slidernavigation">
                                <button style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                            </svg>
                                    <i className="fa-solid fa-chevron-left"></i>
                                </button>
                                <button style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                                    <i className="fa-solid fa-chevron-right"></i>
                                </button>
                                </div>
                            </div> */}
              </span>
            </DialogContent>
          </div>
        </Dialog>
      )}
      <div className="outerContainer">
        <div className="preHeader" ref={preHeaderRef1}>
          <section className="socials">
            <svg
              onClick={() => {
                window.open("https://www.facebook.com/colegiospitruca/");
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-facebook"
              viewBox="0 0 16 16"
            >
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
            </svg>
            <svg
              onClick={() => {
                window.open("https://www.instagram.com/colegiospitruca");
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-instagram"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
            </svg>
            <svg
              style={{ display: "none" }}
              onClick={() => {
                window.open("https://x.com/ispaj_ao");
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-twitter-x"
              viewBox="0 0 16 16"
            >
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
            </svg>
          </section>
          <div className="params">
            <section className="param">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-telephone"
                viewBox="0 0 16 16"
              >
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
              </svg>
              <div className="info">
                <div className="paramTitle">Contacto</div>
                {info ? (
                  <div className="description">
                    {info?.numero}/{info?.numero2}
                  </div>
                ) : (
                  <Skeleton className="description" style={{ width: "100%" }} />
                )}
              </div>
            </section>
            <section className="param">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-envelope-paper"
                viewBox="0 0 16 16"
              >
                <path d="M4 0a2 2 0 0 0-2 2v1.133l-.941.502A2 2 0 0 0 0 5.4V14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5.4a2 2 0 0 0-1.059-1.765L14 3.133V2a2 2 0 0 0-2-2zm10 4.267.47.25A1 1 0 0 1 15 5.4v.817l-1 .6zm-1 3.15-3.75 2.25L8 8.917l-1.25.75L3 7.417V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1zm-11-.6-1-.6V5.4a1 1 0 0 1 .53-.882L2 4.267zm13 .566v5.734l-4.778-2.867zm-.035 6.88A1 1 0 0 1 14 15H2a1 1 0 0 1-.965-.738L8 10.083zM1 13.116V7.383l4.778 2.867L1 13.117Z" />
              </svg>
              <div className="info">
                <div className="paramTitle">Email</div>
                {info ? (
                  <div className="description">{info?.email}</div>
                ) : (
                  <Skeleton className="description" />
                )}
              </div>
            </section>
            <section
              className="param"
              style={{ cursor: "pointer", opacity: 0 }}
              onClick={() => {
                window.open("https://maps.app.goo.gl/nUDyQHvXJAktK6YD9");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pin-map"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8z"
                />
                <path
                  fill-rule="evenodd"
                  d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"
                />
              </svg>
              <div className="info">
                <div className="paramTitle">Localização</div>
                {info ? (
                  <div className="description">{info?.localizacao}</div>
                ) : (
                  <Skeleton className="description" />
                )}
              </div>
            </section>
          </div>
        </div>
        <div className="container" ref={preHeaderRef}>
          <img
            loading="lazy"
            onClick={() => location.pathname != "/" && navigate("/")}
            alt="logo"
            className="logo"
            src={process.env.PUBLIC_URL + "/images/logotrans.png"}
          />
          <div className="logoTextCont">
            <div
              onClick={() => location.pathname != "/" && navigate("/")}
              className="logoText"
            >
              grupo colégios pitruca
            </div>
          </div>
          <div className="menuItems">
            <div
              onMouseLeave={() => setSelected(0)}
              onMouseOver={() => setSelected(1)}
              id="tab1"
              className={
                location.pathname === "/sobre" ? "menuItem1" : "menuItem"
              }
            >
              <span>Sobre</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-chevron-down"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                />
              </svg>{" "}
              <AnimatePresence>
                {selected == 1 && (
                  <Content
                    dir={"l"}
                    selected={selected}
                    setSelected={setSelected}
                  />
                )}
              </AnimatePresence>
            </div>
            <div
              onMouseLeave={() => setSelected(0)}
              onMouseOver={() => setSelected(2)}
              onClick={() => {}}
              id="tab2"
              className={
                location.pathname.includes("/cursos") ? "menuItem1" : "menuItem"
              }
            >
              <span>Polos</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-chevron-down"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                />
              </svg>{" "}
              <AnimatePresence>
                {selected == 2 && (
                  <Content
                    dir={"l"}
                    selected={selected}
                    departments={courses}
                    setSelected={setSelected}
                  />
                )}
              </AnimatePresence>
            </div>
            <div
              onMouseLeave={() => setSelected(0)}
              onMouseOver={() => setSelected(3)}
              id="tab3"
              onClick={() => {}}
              className={
                location.pathname.includes("admissoes")
                  ? "menuItem1"
                  : "menuItem"
              }
            >
              <span>Admissões</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-chevron-down"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                />
              </svg>{" "}
              <AnimatePresence>
                {selected == 3 && (
                  <Content
                    dir={"l"}
                    selected={selected}
                    setSelected={setSelected}
                  />
                )}
              </AnimatePresence>
            </div>
            <div
              onMouseLeave={() => setSelected(0)}
              onMouseOver={() => setSelected(4)}
              id="tab3"
              onClick={() => {}}
              className={
                location.pathname.includes("colaboradores")
                  ? "menuItem1"
                  : "menuItem"
              }
            >
              <span>Colaboradores</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-chevron-down"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                />
              </svg>{" "}
              <AnimatePresence>
                {selected == 4 && (
                  <Content
                    dir={"l"}
                    selected={selected}
                    setSelected={setSelected}
                  />
                )}
              </AnimatePresence>
            </div>
            <div
              className={
                location.pathname.includes("sugestoes")
                  ? "menuItem1"
                  : "menuItem"
              }
              onClick={() => {
                navigate("/sugestoes_e_reclamacoes");
                localStorage.setItem("path", "Sugestões/Reclamações");
              }}
            >
              <span>Sugestões/Reclamações</span>
            </div>

            <div
              onClick={() => {
                navigate("/noticias");
              }}
              className={
                location.pathname.includes("/noticias")
                  ? "menuItem1"
                  : "menuItem"
              }
            >
              <span>Notícias</span>
            </div>
          </div>

          <div className="headerEnd">
            <div
              className="contact"
              onClick={() => {
                window.open("https://recrutamento.colegiospitruca.com/");
              }}
            >
              Grupo Pitruca - Recrutamento
            </div>
          </div>
          <Sheet
            open={open}
            style={{ zIndex: 111000100101, outline: "none", border: "none" }}
          >
            <SheetTrigger
              style={{ outline: "none", border: "none" }}
              onClick={() => {
                setSelectedSide(0);
                setOpen(true);
              }}
            >
              <div
                ref={icon}
                onClick={() => {
                  // setOpen(!open)
                }}
                className={open ? "bi-listCont1" : "bi-listCont"}
              >
                {!open ? (
                  <svg
                    ref={icon}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-list"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                    />
                  </svg>
                ) : (
                  <svg
                    ref={icon}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-x"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                  </svg>
                )}
              </div>
            </SheetTrigger>
            <SheetOverlay></SheetOverlay>
            <SheetContent
              style={{
                zIndex: 2010129391831298,
                padding: 0,
                paddingTop: 25,
                overflow: "hidden",
              }}
            >
              <SheetHeader>
                <SheetTitle></SheetTitle>
              </SheetHeader>
              <motion.div
                ref={sideMenuRef}
                className="sideMenu flex flex-col z-10 gap-5 h-full "
              >
                <div className="flex flex-col w-full justify-between place-items-center">
                  <div className="sideHeader" style={{}}>
                    {
                      <motion.img
                        initial={{
                          opacity: 0,
                          y: 0,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.5,
                          ease: "easeInOut",
                        }}
                        className="sideLogo"
                        src={process.env.PUBLIC_URL + "/images/logotrans.png"}
                      />
                    }
                    {
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 0,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.5,
                          ease: "easeInOut",
                        }}
                        className="sideText"
                        style={{ marginLeft: 5 }}
                      >
                        grupo colégios pitruca
                      </motion.div>
                    }
                  </div>
                  {selectedSide == 0 ? (
                    <motion.div
                      initial={{
                        opacity: 0,
                        x: -100,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      className="sideMenuItems"
                    >
                      <div
                        onClick={() => {
                          setSelectedSide(1);
                        }}
                        className={
                          location.pathname.includes("/sobre")
                            ? "sideMenuItem2"
                            : "sideMenuItem"
                        }
                      >
                        <span>Sobre</span>
                        <RightChevron />
                      </div>
                      <div
                        onClick={() => {
                          setSelectedSide(2);
                        }}
                        className="sideMenuItem"
                      >
                        <span>Polos</span>
                        <RightChevron />
                      </div>
                      <div
                        onClick={() => {
                          setSelectedSide(3);
                        }}
                        className={
                          location.pathname.includes("admissoes")
                            ? "sideMenuItem2"
                            : "sideMenuItem"
                        }
                      >
                        <span>Admissões</span>
                        <RightChevron />
                      </div>
                      <div
                        onClick={() => {
                          setSelectedSide(4);
                        }}
                        className={
                          location.pathname.includes("colaboradores")
                            ? "sideMenuItem2"
                            : "sideMenuItem"
                        }
                      >
                        <span>Colaboradores</span>
                        <RightChevron />
                      </div>
                      <div
                        className={
                          location.pathname.includes("sugestoes")
                            ? "sideMenuItem2"
                            : "sideMenuItem"
                        }
                        onClick={() => {
                          setOpen(false);

                          setTimeout(() => {
                            navigate("/sugestoes_e_reclamacoes");
                            localStorage.setItem(
                              "path",
                              "Sugestões/Reclamações"
                            );
                          }, 500);
                        }}
                      >
                        Sugestões/Reclamações
                      </div>
                      <div
                        onClick={() => {
                          setOpen(false);
                          setTimeout(() => {
                            navigate("/noticias");
                          }, 500);
                        }}
                        className={
                          location.pathname.includes("/noticias")
                            ? "sideMenuItem2"
                            : "sideMenuItem"
                        }
                      >
                        <span>Notícias</span>
                      </div>

                      <div
                        onClick={() => {
                          setOpen(false);
                          setTimeout(() => {
                            window.open(
                              "https://recrutamento.colegiospitruca.com/"
                            );
                          }, 150);
                        }}
                        style={{ textTransform: "unset" }}
                        className={
                          location.pathname.includes("/noticias")
                            ? "sideMenuItem2"
                            : "sideMenuItem"
                        }
                      >
                        <span style={{ textTransform: "none" }}>
                          Grupo Pitruca - Recrutamento
                        </span>
                      </div>
                      <div></div>
                    </motion.div>
                  ) : selectedSide == 1 ? (
                    <SideMenuItem>
                      <div
                        onClick={() => setSelectedSide(0)}
                        className="sideMenuItem1"
                      >
                        <LeftChevron />
                      </div>

                      <div
                        className="sideMenuItem"
                        onClick={() => {
                          setOpen(false);
                          setTimeout(() => {
                            navigate("/sobre");

                            localStorage.setItem("path", "Sobre nós");
                          }, 500);
                        }}
                      >
                        <span>Sobre nós</span>
                      </div>

                      <div
                        onClick={() => {
                          setOpen(false);
                          setTimeout(() => {
                            navigate("/sobre");
                            localStorage.getItem("path") !=
                              "Estrutura Administrativa" &&
                              localStorage.setItem(
                                "path",
                                "Estrutura Administrativa"
                              );
                          }, 500);
                        }}
                        className="sideMenuItem"
                      >
                        <span>Estrutura Administrativa</span>
                      </div>

                      <div
                        className="sideMenuItem"
                        onClick={() => {
                          setOpen(false);
                          setTimeout(() => {
                            navigate("/sobre");

                            localStorage.getItem("path") != "Historial" &&
                              localStorage.setItem("path", "Historial");
                            setOpen(false);
                          }, 500);
                        }}
                      >
                        <span>Historial</span>
                      </div>

                      <div
                        className="sideMenuItem"
                        onClick={() => {
                          setOpen(false);
                          setTimeout(() => {
                            navigate("/sobre");

                            localStorage.getItem("path") !=
                              "Organigrama Insitucional" &&
                              localStorage.setItem(
                                "path",
                                "Organigrama Insitucional"
                              );
                            setOpen(false);
                          }, 500);
                        }}
                      >
                        <span>Organigrama Insitucional</span>
                      </div>
                    </SideMenuItem>
                  ) : selectedSide == 2 ? (
                    <SideMenuItem>
                      <div
                        onClick={() => setSelectedSide(0)}
                        className="sideMenuItem1"
                      >
                        <LeftChevron />
                      </div>
                      {courses?.map((item) => {
                        return (
                          <div
                            className="sideMenuItem"
                            onClick={() => {
                              setOpen(false);
                              setTimeout(() => {
                                navigate(`/polos/polo/${item?.name}`, {
                                  state: {
                                    ...item,
                                  },
                                  replace: true,
                                });
                                localStorage.setItem("path", `${item?.name}`);
                              }, 500);
                            }}
                          >
                            {item?.name}
                          </div>
                        );
                      })}
                    </SideMenuItem>
                  ) : selectedSide == 3 ? (
                    <SideMenuItem>
                      <div
                        onClick={() => setSelectedSide(0)}
                        className="sideMenuItem1"
                      >
                        <LeftChevron />
                      </div>

                      {/* <div className='sideMenuItem' onProgress={() => {
                            navigate('/admissoes')
                            localStorage.setItem('path', 'Horários')
                            setOpen(false)

                        }}><span>Horários</span></div> */}
                      {/* navigate('/admissoes')
                       localStorage.setItem('path', 'Sugestões e Reclamações') */}
                      <div
                        className="sideMenuItem"
                        onClick={() => {
                          setOpen(false);
                          setTimeout(() => {
                            navigate("/admissoes");
                            localStorage.setItem(
                              "path",
                              "Perguntas Frequentes"
                            );
                            setOpen(false);
                          }, 500);
                        }}
                      >
                        <span>Perguntas frequentes</span>
                      </div>
                      {/* <div className='sideMenuItem' onClick={() => {
                            navigate('/admissoes')
                            localStorage.setItem('path', 'Sugestões e Reclamações')
                            setOpen(false)

                        }}><span>Sugestões e Reclamações</span></div> */}
                    </SideMenuItem>
                  ) : (
                    <SideMenuItem>
                      <div
                        onClick={() => setSelectedSide(0)}
                        className="sideMenuItem1"
                      >
                        <LeftChevron />
                      </div>
                      <div
                        style={{ display: "none" }}
                        className="sideMenuItem"
                        onClick={() => {
                          setOpen(false);
                          setTimeout(() => {
                            navigate("/colaboradores/bolsas", {});
                            setOpen(false);
                          }, 500);
                        }}
                      >
                        <span>Bolsa de professores</span>
                      </div>
                      <div
                        className="sideMenuItem"
                        onClick={() => {
                          setOpen(false);
                          setTimeout(() => {
                            window.open(
                              "https://recrutamento.colegiospitruca.com/vagas.php"
                            );
                            setOpen(false);
                          }, 500);
                        }}
                      >
                        <span>Candidaturas Espontâneas</span>
                      </div>
                    </SideMenuItem>
                  )}
                </div>
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>
        <AlertDialog open={dialogOpen}>
          {/* <AlertDialogTrigger style={{width: '100%'}}>
                                    
                                <div className='actionButton'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
                                                </div>
                                </AlertDialogTrigger> */}
          <AlertDialogContent
            style={{
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span>
              <AlertDialogTitle
                style={{ textAlign: "center", alignSelf: "center" }}
              >
                Documento não existe
              </AlertDialogTitle>
              <AlertDialogDescription
                style={{ textAlign: "center", alignSelf: "center" }}
              >
                O documento solicitado encontra-se indisponível.
              </AlertDialogDescription>
            </span>
            <span
              style={{
                alignSelf: "center",
                marginTop: 15,
                display: "flex",
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              <AlertDialogAction
                onClick={() => {
                  setDialogOpen(false);
                  setSelected(0);
                }}
                style={{ margin: 0 }}
              >
                Ok
              </AlertDialogAction>
            </span>
          </AlertDialogContent>
        </AlertDialog>
        {/* <div ref={menu} className={`mobileItems ${open ? 'fadeIn': 'fadeOut'}`}>
                        <div onClick={() => location.pathname != '/about' && navigate('/about')} className={location.pathname == '/about' ? 'mobileItem1' : 'mobileItem'}>About</div>
                        <div onClick={() => location.pathname != '/blog' && navigate('/blog')} className={location.pathname.includes('/blog') ? 'mobileItem1' : 'mobileItem'}>Blog</div>
                        <div onClick={() => location.pathname != '/projects' && navigate('/projects')} className={location.pathname.includes('/projects') ? 'mobileItem1' : 'mobileItem'}>Project</div>
                    </div> */}
      </div>

      {/* <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        loop
        slidesPerView={1}
        onChange={() => {
            //('changed')
        }}
        onSlideChange={(e) => {
            //('changeddddd', e.realIndex)
            setActiveIndex(e.realIndex)
        }}
        
        pagination={{
          clickable: true,
          
        }}
        onSwiper={(e) => {
            swiperRef.current = e
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide>
        <div className='slideTextCont'>{activeIndex == 0 && <motion.div initial={{opacity: 0, x: 200}} animate={{opacity: 1, x: 0}} transition={{duration: 0.8}} className='slideText'>Seja bem vindo ao Instituto Superior Politécnico Alvorecer Da Juventude</motion.div>}</div>

          <img loading="lazy"src={process.env.PUBLIC_URL + '/images/welcome.png'} />
        </SwiperSlide>
        <SwiperSlide>
        <div className='slideTextCont'>{activeIndex == 1 && <motion.div initial={{opacity: 0, x: 200}} animate={{opacity: 1, x: 0}} transition={{duration: 0.8}} className='slideText'>Um lugar de descoberta, crescimento e sucesso. Experimente</motion.div>}</div>

          <img loading="lazy"src={process.env.PUBLIC_URL + '/images/ispajview.png'}  />

        </SwiperSlide>
        <SwiperSlide>
        <div className='slideTextCont'>{activeIndex == 2 && <motion.div initial={{opacity: 0, x: 200}} animate={{opacity: 1, x: 0}} transition={{duration: 0.8}} className='slideText'>Educação transformadora</motion.div>}</div>

          <img loading="lazy"src={process.env.PUBLIC_URL + '/images/lab.png'}  />

        </SwiperSlide>
        <div onClick={() => handlePrev()} className='button left'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
</svg></div>
        <div onClick={() => handleNext()} className='button right'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
</svg></div>
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper> */}
    </div>
  );
};
const SideMenuItem = ({ children, ...props }) => {
  return (
    <motion.div
      className="sideMenuItems"
      initial={{
        opacity: 0,
        x: 100,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: 100,
      }}
    >
      {children}
    </motion.div>
  );
};
const Content = ({ selected, dir, departments, setSelected }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 30,
      }}
      style={{ width: "250px", top: "60px", position: "absolute" }}
      id="overlay-content"
      className="content absolute top-[calc(60px)]
         rounded-lg border border-gray-300 bg-gradient-to-b from-white via-white-100 to-white p-4"
    >
      <AlertDialog open={dialogOpen}>
        {/* <AlertDialogTrigger style={{width: '100%'}}>
                                    
                                <div className='actionButton'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
                                                </div>
                                </AlertDialogTrigger> */}
        <AlertDialogContent
          style={{
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span>
            <AlertDialogTitle
              style={{ textAlign: "center", alignSelf: "center" }}
            >
              Documento não existe
            </AlertDialogTitle>
            <AlertDialogDescription
              style={{ textAlign: "center", alignSelf: "center" }}
            >
              O documento solicitado encontra-se indisponível.
            </AlertDialogDescription>
          </span>
          <span
            style={{
              alignSelf: "center",
              marginTop: 15,
              display: "flex",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <AlertDialogAction
              onClick={() => {
                setDialogOpen(false);
                setSelected(0);
              }}
              style={{ margin: 0 }}
            >
              Ok
            </AlertDialogAction>
          </span>
        </AlertDialogContent>
      </AlertDialog>
      <div
        style={{ position: "absolute", top: "-40px", width: "100%" }}
        className=" absolute -top[40px] left-0 right 0 h-[40px]"
      ></div>

      <motion.div
        initial={{
          opacity: 0,
          x: dir === "l" ? 100 : dir === "r" ? -100 : 0,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.25,
          ease: "easeInOut",
        }}
      >
        {selected == 1 ? (
          <div className="subMenu">
            <div
              className={
                localStorage.getItem("path")?.includes("Sobre")
                  ? "subItem1"
                  : "subItem"
              }
              onClick={() => {
                location.pathname != "/sobre" && navigate("/sobre");

                localStorage.setItem("path", "Sobre nós");
              }}
            >
              Sobre nós
            </div>

            <div
              onClick={() => {
                navigate("/sobre");

                localStorage.setItem("path", "Estrutura Administrativa");
              }}
              className={
                localStorage
                  .getItem("path")
                  ?.includes("Estrutura Administrativa")
                  ? "subItem1"
                  : "subItem"
              }
            >
              Estrutura Administrativa
            </div>
            <div
              onClick={() => {
                navigate("/sobre");

                localStorage.setItem("path", "Historial");
              }}
              className={
                localStorage.getItem("path")?.includes("Historial")
                  ? "subItem1"
                  : "subItem"
              }
            >
              Historial
            </div>
            <div
              onClick={() => {
                navigate("/sobre");

                localStorage.setItem("path", "Organigrama Institucional");
              }}
              className={
                localStorage.getItem("path")?.includes("Organigrama")
                  ? "subItem1"
                  : "subItem"
              }
            >
              Organigrama Institucional
            </div>
          </div>
        ) : selected == 2 ? (
          <div className="subMenu">
            {departments?.map((item) => {
              return (
                <div
                  className={
                    localStorage.getItem("path")?.includes(item?.name)
                      ? "subItem1"
                      : "subItem"
                  }
                  onClick={() => {
                    navigate(`/polos/polo/${item?.name}`, {
                      state: {
                        ...item,
                      },
                      replace: true,
                    });
                    localStorage.setItem("path", `${item?.name}`);
                    // window.location.reload();
                  }}
                >
                  {item?.name}
                </div>
              );
            })}
            {/* <div className='subItem' onClick={() => {
                                navigate('/cursos', {
                                    state: {
                                        ...departments[1]
                                    }
                                })
                                localStorage.setItem('path', 'Sociais e económicas')
                                window.location.reload()

                        }}>Ciências Sociais e Económicas</div>
                    <div className='subItem' onClick={() => {
                                navigate('/cursos', {
                                    state: {
                                        ...departments[2]
                                    }
                                })
                                localStorage.setItem('path', 'Engenharias e ciências exatas')
                                localStorage.setItem('course',departments[2]?.id)
                                window.location.reload()
                        }}>Engenharias e Ciências Exatas</div>
                    <div className='subItem' onClick={() => {
                                navigate('/cursos', {
                                    state: {
                                        ...departments[0]
                                    }
                                })
                                localStorage.setItem('path', 'Saúde')
                                localStorage.setItem('course',departments[0]?.id)
                                window.location.reload()

                        }}>Ciências da Saúde</div> */}
          </div>
        ) : selected == 3 ? (
          <div className="subMenu">
            {/* <div className='subItem' onClick={() => {
                         navigate('/admissoes')
                        localStorage.setItem('path', 'Horários')
                    }}>Horários</div> */}
            <div
              className={
                localStorage.getItem("path")?.includes("Perguntas")
                  ? "subItem1"
                  : "subItem"
              }
              onClick={() => {
                navigate("/admissoes");
                localStorage.setItem("path", "Perguntas Frequentes");
              }}
            >
              Perguntas frequentes
            </div>
          </div>
        ) : (
          <div className="subMenu">
            <div
              style={{ display: "none" }}
              className={
                location.pathname.includes("bolsas") ? "subItem1" : "subItem"
              }
              onClick={() => {
                navigate("/colaboradores/bolsas", {});
                // window.open('https://recrutamento.colegiospitruca.com/vagas.php')
              }}
            >
              Bolsa de professores
            </div>
            <div
              className={
                location.pathname.includes("bolsas") ? "subItem1" : "subItem"
              }
              onClick={() => {
                // navigate("/colaboradores/bolsas", {});
                window.open(
                  "https://recrutamento.colegiospitruca.com/vagas.php"
                );
              }}
            >
              Candidaturas Espontâneas
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
export default Header;
