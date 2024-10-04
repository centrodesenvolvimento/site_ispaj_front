import '../css/dashboard.css'
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { TrendingUp } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../@/components/ui/card"
  
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "../@/components/ui/chart"
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Edit, HeaderLabel } from './adminHome'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../@/components/ui/dialog'
import axios from 'axios'
import { baseURL } from '../api/api'
import Skeleton from 'react-loading-skeleton'


const Dashboard = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const chartConfig = {
        desktop: {
          label: "Visits",
          color: "hsl(var(--chart-1))",
        },
      }
      const [chartData, setChartData] = useState([
        { month: "Janeiro", visits: 0 },
        { month: "Fevereiro", visits: 0 },
        { month: "Março", visits: 0 },
        { month: "Abril", visits: 0 },
        { month: "Maio", visits: 0 },
        { month: "Junho", visits: 0 },
        { month: "Julho", visits: 0 }, // Replace with actual data for July
        { month: "Agosto", visits: 0 }, // Replace with actual data for August
        { month: "Setembro", visits: 0 }, // Replace with actual data for September
        { month: "Outubro", visits: 0 }, // Replace with actual data for October
        { month: "Novembro", visits: 0 }, // Replace with actual data for November
        { month: "Dezembro", visits: 0 } // Replace with actual data for December
    ]);
    const [months, setMonths] = useState([
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro"
  ])
    const [news, setNews] = useState([
      {
          id: 0,
          date: Date.now(),
          title: 'Dia do continente Berço da Humanidade, data instituída em 1963 pela União Africana',
          image: process.env.PUBLIC_URL + '/images/event3.png',
          location: 'ISPAJ, Nova Vida, rua 22'
      },
      {
          id: 1,
          date: Date.now(),
          title: 'Embaixador da China em Angola, Dr. Nzhang Bin, nas VIII Jornadas Científicas do ISPAJ',
          image: process.env.PUBLIC_URL + '/images/event4.png',
          location: 'ISPAJ, Nova Vida, rua 22'
      },
      {
          id: 2,
          date: Date.now(),
          title: 'Embaixador da China em Angola, Dr. Nzhang Bin, nas VIII Jornadas Científicas do ISPAJ',
          image: process.env.PUBLIC_URL + '/images/post4.png',
          location: 'Paz Flor, Morro Bento'
      },
      {
          id: 3,
          date: Date.now(),
          title: 'VIII JORNADAS CIENTÍFICAS DO ISPAJ 2024',
          image: process.env.PUBLIC_URL + '/images/post7.png',
          location: 'Nosso Centro, Gamek'
      },
      {
        id: 4,
        date: Date.now(),
        title: 'Embaixador da China em Angola, Dr. Nzhang Bin, nas VIII Jornadas Científicas do ISPAJ',
        image: process.env.PUBLIC_URL + '/images/event4.png',
        location: 'ISPAJ, Nova Vida, rua 22'
    },
  ])
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
    ])
    const [errors, setErrors] = useState([])
    const [messages, setMessages] = useState([])
    const [email1, setEmail1] = useState('')
    const [email2, setEmail2] = useState('')
    const [phone1, setPhone1] = useState('')
    const [phone2, setPhone2] = useState('')
    const [localizacao, setLocalizacao] = useState('')
    const editInfo = () => {
      setErrors([])
      setMessages([])
      const r = /^[^\s]*@[a-z0-9.-]*\.[a-z]{2,6}$/
      if (email1.length == 0 || email2.length == 0 || phone1.length == 0 || phone2.length == 0 || localizacao == 0){
        setErrors(['Preencha por favor todos os campos!'])
      }else if (!r.test(email1) || !r.test(email2)){
        setErrors(['Formato de email inválido!']) 
      }else if (email1 == email2){
        setErrors(['Email 2 tem de ser diferente do 1!']) 
      }else if (phone1 == phone2){
        setErrors(['Telefone 2 tem de ser diferente do 1!']) 
      }else {
        axios.get(`${baseURL}/api/info`)
        .then(res => {
          axios.post(`${baseURL}/api/editInfo/1`, {
            info: {
              email: email1,
              email2: email2,
              numero: phone1,
              numero2: phone2,
              localizacao: localizacao,
              monthstats: [...res.data][0]?.info?.monthstats
            }
          })
          .then(res => {
            setMessages(['Alterado com sucesso!'])
            window.location.reload()
          })
        })
        
      }
    }
    const [info, setInfo] = useState(null)
    const [articles, setArticles] = useState([])
    const [events, setEvents] = useState([])
    const [monthlyViews, setMonthlyViews] = useState([])
    useEffect(() => {
      axios.get(`${baseURL}/api/info`)
      .then(res => {
        let content = [...res.data][0]
        // setChartData([...res.data][0]?.info?.monthstats)
        setInfo([...res.data][0])
        setEmail1(content?.info?.email)
        setEmail2(content?.info?.email2)
        setPhone1(content?.info?.numero)
        setPhone2(content?.info?.numero2)
        setLocalizacao(content?.info?.localizacao)

      })
      axios.get(`${baseURL}/api/news?limit=1000&trend=true`)
      .then(res => {
        //('articles', res.data)
        setArticles([...res.data].filter((item) => {
          if (item.info?.show == undefined){
              return item
          }else if (item.info?.show == true){
              return item
          }
      }))
      })

      axios.get(`${baseURL}/api/eventosViews`)
      .then(res => {
        setEvents([...res.data].sort((a, b) => b?.views_count - a?.views_count).filter((item) => {
          if (item.info?.show == undefined){
              return item
          }else if (item.info?.show == true){
              return item
          }
      }))

      })
      axios.get(`${baseURL}/api/monthlyViews`)
      .then(res => {
        let mViews = [...res.data].filter((item)=> {
          if (new Date(item?.dateAdded).getFullYear() == new Date().getFullYear()) {
            return item
          }
        })
        setChartData( [
          {
              "month": "Janeiro",
              "visits": mViews.reduce((count, curr) => {
                const date = new Date(curr?.dateAdded);
            
                if (date.getMonth() === 0) {
                    count++;
                }
            
                return count;
            }, 0)
          },
          {
              "month": "Fevereiro",
              "visits": mViews.reduce((count, curr) => {
                const date = new Date(curr?.dateAdded);
            
                if (date.getMonth() === 1) {
                    count++;
                }
            
                return count;
            }, 0)
          },
          {
              "month": "Março",
              "visits": mViews.reduce((count, curr) => {
                const date = new Date(curr?.dateAdded);
            
                if (date.getMonth() === 2) {
                    count++;
                }
            
                return count;
            }, 0)
          },
          {
              "month": "Abril",
              "visits": mViews.reduce((count, curr) => {
                const date = new Date(curr?.dateAdded);
            
                if (date.getMonth() === 3) {
                    count++;
                }
            
                return count;
            }, 0)
          },
          {
              "month": "Maio",
              "visits": mViews.reduce((count, curr) => {
                const date = new Date(curr?.dateAdded);
            
                if (date.getMonth() === 4) {
                    count++;
                }
            
                return count;
            }, 0)
          },
          {
              "month": "Junho",
              "visits": mViews.reduce((count, curr) => {
                const date = new Date(curr?.dateAdded);
            
                if (date.getMonth() === 5) {
                    count++;
                }
            
                return count;
            }, 0)
          },
          {
              "month": "Julho",
              "visits": mViews.reduce((count, curr) => {
                const date = new Date(curr?.dateAdded);
            
                if (date.getMonth() === 6) {
                    count++;
                }
            
                return count;
            }, 0)
          },
          {
              "month": "Agosto",
              "visits": mViews.reduce((count, curr) => {
                const date = new Date(curr?.dateAdded);
            
                if (date.getMonth() === 7) {
                    count++;
                }
            
                return count;
            }, 0)
          },
          {
              "month": "Setembro",
              "visits": mViews.reduce((count, curr) => {
                const date = new Date(curr?.dateAdded);
            
                if (date.getMonth() === 8) {
                    count++;
                }
            
                return count;
            }, 0)
          },
          {
              "month": "Outubro",
              "visits": mViews.reduce((count, curr) => {
                const date = new Date(curr?.dateAdded);
            
                if (date.getMonth() === 9) {
                    count++;
                }
            
                return count;
            }, 0)
          },
          {
              "month": "Novembro",
              "visits": mViews.reduce((count, curr) => {
                const date = new Date(curr?.dateAdded);
            
                if (date.getMonth() === 10) {
                    count++;
                }
            
                return count;
            }, 0)
          },
          {
              "month": "Dezembro",
              "visits": mViews.reduce((count, curr) => {
                const date = new Date(curr?.dateAdded);
            
                if (date.getMonth() === 11) {
                    count++;
                }
            
                return count;
            }, 0)
          }
      ])
        setMonthlyViews([...res.data].filter((item)=> {
          if (new Date(item?.dateAdded).getFullYear() == new Date().getFullYear()) {
            return item
          }
        }))
      })
    }, [])
    
    return (
        <div className="dashboardContainer">
            <div className="title">Painel Administrativo</div>

            {/* <section className='firstStats'>
                <div className='stat'>
                    <div className='header'>
                        <div className='title'>
                            Número de visitantes
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart" viewBox="0 0 16 16">
  <path d="M4 11H2v3h2zm5-4H7v7h2zm5-5v12h-2V2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1z"/>
</svg>
                    </div>
                    <div className='statValue'>+348</div>
                    <div className='difference'>+180 desde o mês passado</div>
                </div>
                <div className='stat'>
                    <div className='header'>
                        <div className='title'>
                        Duração média/sessão
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart" viewBox="0 0 16 16">
  <path d="M4 11H2v3h2zm5-4H7v7h2zm5-5v12h-2V2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1z"/>
</svg>
                    </div>
                    <div className='statValue'>+348</div>
                    <div className='difference'>+180 desde o mês passado</div>
                </div>
                <div className='stat'>
                    <div className='header'>
                        <div className='title'>
                        Páginas vistas/sessão
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart" viewBox="0 0 16 16">
  <path d="M4 11H2v3h2zm5-4H7v7h2zm5-5v12h-2V2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1z"/>
</svg>
                    </div>
                    <div className='statValue'>+348</div>
                    <div className='difference'>+180 desde o mês passado</div>
                </div>
                <div className='stat'>
                    <div className='header'>
                        <div className='title'>
                        Documentos baixados
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart" viewBox="0 0 16 16">
  <path d="M4 11H2v3h2zm5-4H7v7h2zm5-5v12h-2V2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1z"/>
</svg>
                    </div>
                    <div className='statValue'>12</div>
                    <div className='difference'>+180 desde o mês passado</div>
                </div>
            </section> */}

            <section className='secondStats'>
             
            <Card style={{flex: 2}}>
      <CardHeader>
        <div className='cardTitle'>Visitantes ao longo do ano</div>
        <CardDescription>Janeiro - Dezembro {new Date().getFullYear()}</CardDescription>
      </CardHeader>
      <CardContent style={{}}>
        <ChartContainer className='chartContainer' style={{height: '100%', width: '100%',}} config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={(item) => {
                //(chartData.filter((item1)=> item1.month == item?.label)[0]?.visits)
                return (
              <div className='chartTTContent'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
</svg>
{chartData.filter((item1)=> item1.month == item.label)[0]?.visits}
              </div>)}}
            />
            <Bar dataKey="visits" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="leading-none text-muted-foreground">
        Mostrando o total de visitantes ao longo do ano
        </div>
      </CardFooter>
            </Card>
            <Card style={{flex: 1.3}}>
            <CardHeader>
                <div className='cardTitle'>Notícias mais vistas</div>
                {/* <CardDescription>Top 5</CardDescription> */}
                
            </CardHeader>
            <CardContent>
              <div className='topNews'>
                {articles.length > 0 ? 
                articles.slice(0, 5).map((item, index) => {
                  return (
                    <div className='news'>
                      <div className='imageContainer'>
                        <img loading="lazy"src={`${baseURL}/public/storage/images/${[...item.imagens][0]}`}/>
                      </div>
                      <div className='info'>
                        <div className='views'>{item?.info?.views} visualizações</div>
                        <div className='title'>{item?.info?.titulo}</div>
                      </div>
                      
                      
                    </div>
                  )
                }):
                  news.map((item, index) => {
                    return (
                      <div className='news'>
                        <div className='imageContainer'>
                        </div>
                        <div className='info'>
                          <Skeleton style={{margin: 0}} width={100} height={11} className='views'/>
                          <Skeleton count={2} style={{width: '100%'}} height={12}/>
                          <div className='date'>{new Date(item.date).getDate()} {months[new Date(item.date).getMonth()].slice(0, 3)}, {new Date(item.date).getFullYear()}</div>
                        </div>
                        
                        
                      </div>
                    )
                  })
                }
              </div>
            </CardContent>
            </Card>
            </section>

            {/* third row */}
            <section className='thirdStats'>
            <Card style={{flex: 1.3}}>
            <CardHeader>
                <div className='cardTitle'>Eventos mais vistos</div>
                {/* <CardDescription>Top 5</CardDescription> */}
                
            </CardHeader>
            <CardContent>
              <div className='topNews'>
                {events.length > 0 ? 
                events.slice(0, 5).map((item, index) => {
                  return (
                    <div className='news'>
                      <div className='imageContainer'>
                        <img loading="lazy"src={`${JSON.parse(item.info)?.info?.imagem}`}/>
                      </div>
                      <div className='info'>
                        <div className='views'>{item?.views_count} visualizações</div>
                        <div className='title'>{JSON.parse(item.info)?.info?.titulo}</div>
                      </div>
                      
                      
                    </div>
                  )
                }):
                  news.map((item, index) => {
                    return (
                      <div className='news'>
                        <div className='imageContainer'>
                        </div>
                        <div className='info'>
                          <Skeleton style={{margin: 0}} width={100} height={11} className='views'/>
                          <Skeleton count={2} style={{width: '100%'}} height={12}/>
                          <div className='date'>{new Date(item.date).getDate()} {months[new Date(item.date).getMonth()].slice(0, 3)}, {new Date(item.date).getFullYear()}</div>
                        </div>
                        
                        
                      </div>
                    )
                  })
                }
              </div>
            </CardContent>
            </Card>


                <Card style={{flex: 1.5, maxWidth: 800}}>
                  <div className='section'>
                    <div className='header'>
                      <HeaderLabel title={'Informação da Instituição'}/>
                      <Dialog>
                            <DialogTrigger onClick={() =>{
                                
                            }}>
                                <Edit title='Editar'/>
                            </DialogTrigger>
                            <DialogContent style={{width: '100%', maxWidth: 1000, display: 'flex', flexDirection: 'column'}}>
                                <DialogHeader>
                                    <DialogTitle>Editar</DialogTitle>
                                    <DialogDescription>Editar informação da instituição</DialogDescription>

                                </DialogHeader>
                                <div className='sectionForms'>
                                    <div className='form'>
                                        <div className='label'>Email 1</div>
                                        <input value={email1} onChange={(e) => {
                                          setEmail1(e.target.value)
                                        }} placeholder='Email 1...' className='loginInput'/>
                                    </div>
                                    <div className='form'>
                                        <div className='label'>Email 2</div>
                                        <input value={email2} onChange={(e) => {
                                          setEmail2(e.target.value)
                                        }} placeholder='Email 2...' className='loginInput'/>
                                    </div>
                                    <div className='form'>
                                        <div className='label'>Telefone 1</div>
                                        <input value={phone1} onChange={(e) => {
                                          setPhone1(e.target.value)
                                        }} placeholder='Telefone 1...' className='loginInput'/>
                                    </div>
                                    <div className='form'>
                                        <div className='label'>Telefone 2</div>
                                        <input value={phone2} onChange={(e) => {
                                          setPhone2(e.target.value)
                                        }} placeholder='Telefone 2...' className='loginInput'/>
                                    </div>
                                    <div className='form'>
                                        <div className='label'>Localização da instituição</div>
                                        <input value={localizacao} onChange={(e) => {
                                          setLocalizacao(e.target.value)
                                        }} placeholder='Localização...' className='loginInput'/>
                                    </div>
                                    <div className="errors">
                            {errors.length > 0 && errors.map((item, index) => {
                                return (
                                    <div className="error" key={index}>
                                        {item}
                                    </div>
                                )
                            })}
                            </div>

                            <div className="errors">
                            {messages.length > 0 && messages.map((item, index) => {
                                return (
                                    <div style={{color: 'green'}}  className="error" key={index}>
                                        {item}
                                    </div>
                                )
                            })}
                        </div>
                                    <div className='buttons' style={{marginBottom: 50}}>
                                    <div onClick={() => {
                                        editInfo()
                                    }} className='save'>Guardar</div>

                                </div>
                                    
                                </div>
                            </DialogContent>
                        </Dialog>                    </div>
                  </div>
                  <CardContent>
                    <div className='companyInfo'>
                      <section className='row'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
</svg>
<div className='info'>
  <div className='title'>Email 1</div>
  {info ? <div className='val'>{email1}</div>: <Skeleton/>}
</div>
                      </section>
                      <section className='row'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
</svg>
<div className='info'>
  <div className='title'>Email 2</div>
  {info ? <div className='val'>{email2}</div>: <Skeleton/>}
</div>
                      </section>

                      <section className='row'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
</svg>
<div className='info'>
  <div className='title'>Telefone 1</div>
  {info ? <div className='val'>{phone1}</div>: <Skeleton/>}
</div>
                      </section>
                      <section className='row'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
</svg>
<div className='info'>
  <div className='title'>Telefone 2</div>
  {info ? <div className='val'>{phone2}</div>: <Skeleton/>}
</div>
                      </section>
                      <section className='row'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg>
<div className='info'>
  <div className='title'>Localização</div>
  {info ? <div className='val'>{localizacao}</div>: <Skeleton/>}
</div>
                      </section>

                      <section className='row'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16">
  <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z"/>
</svg>
<div className='info'>
  <div className='title'>Website</div>
  <div className='val'>{window.location.protocol}//{window.location.host}</div>
</div>
                      </section>
                    </div>
                  </CardContent>
                </Card>
            </section>
        </div>
    )
}
export default Dashboard