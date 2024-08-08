import { useLocation, useNavigate } from "react-router-dom"
import Header from "../components/header"
import { useEffect, useRef, useState } from "react"
import '../css/eventsPage.css'
import Calendar from "react-calendar"
import { ptBR } from "date-fns/locale"
import Footer from "../components/footer"
import EventCont from "../components/eventCont"
import AboutEvent from "../components/aboutEvent"
import '../css/health.css'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "../@/components/ui/accordion"
  import { Checkbox } from "../@/components/ui/checkbox"
import axios from "axios"
import { baseURL } from "../api/api"
import { element } from "three/examples/jsm/nodes/shadernode/ShaderNode"
const EventsPage = () => {
    const navigate = useNavigate()
    const [section, setSection] = useState('Eventos')
    const [date, setDate] = useState(new Date())
    const [events, setEvents] = useState([])
    const [posts, setPosts] = useState([
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
        
    ])
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
    const [clickedMonth, setClickedMonth] = useState(new Date())
    const [clickedYear, setClickedYear] = useState(new Date())
    const titleClassName = ({ date, view }) => {
        if (view == 'month'){
            const today = new Date()
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
            const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
            if (date < firstDayOfMonth || date > lastDayOfMonth) {
                return 'other-month'
            }
        }else if (view == 'year'){
            if (new Date(clickedMonth).getMonth() == new Date(date).getMonth())
                return 'selected-month'
        }else if (view == 'decade'){
            console.log('decadeeeee')
            if (new Date(clickedYear).getFullYear() == new Date(date).getFullYear())
                return 'selected-year'
        }
    }
    const [view, setView] = useState('month')
    const [search, setSearch] = useState('')
    const [looked, setLooked] = useState(false)
    const location = useLocation()
    const look = () => {
        if (search.length == 0){
            alert('Digite algo para ver resultados.')
        }else {
            scrollSearchRef.current && window.scrollTo({
                top: scrollSearchRef.current.getBoundingClientRect().top + window.scrollY - 170
            })
            navigate('/eventos')
            setView('')
            setLooked(true)
            
        }
    }
    useEffect(() => {
        if(looked){
            scrollSearchRef.current && window.scrollTo({
                top: scrollSearchRef.current.getBoundingClientRect().top + window.scrollY - 170
            })
        }
    }, [looked])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const navigatePost = (item) => {
        setPost(item)
    }
    const scrollDivRef = useRef(null)
    const scrollSearchRef = useRef(null)
    useEffect(() => {
        console.log('carlos', scrollDivRef.current && window.scrollTo({
            top: scrollDivRef.current.getBoundingClientRect().top
        }))
        scrollDivRef.current && window.scrollTo({
            top: scrollDivRef.current.getBoundingClientRect().top + window.scrollY - 170
        })

        
    }, [location.pathname, location])
    
    const [post, setPost] = useState(null)

    const tileClassName = ({ d, view }) => {
        // Add custom class to the selected month tiles
        if (view === 'month' && date.getMonth() === date.getMonth()) {
          return 'selected-month';
        }
        return null;
      };
    const [eventos, setEventos] = useState([])
    const [filterEvents, setFilteredEvents] = useState([])
    useEffect(() => {
        axios.get(`${baseURL}/api/events`)
        .then(res => {
            setEventos([...res.data])
            setFilteredEvents([...res.data])
        })
    }, [])
    const [publics, setPublics] = useState([])

    useEffect(()=> {
        console.log(clickedMonth, view)
        
        if (view == 'month'){
            console.log('inside month', eventos.filter((item) => {
                const initial = new Date(date)
                const final = new Date(date)
                // Set the initial date to the beginning of the day
                initial.setHours(0, 0, 0, 0);
    
                // Set the final date to the end of the day
                final.setHours(23, 59, 59, 999);
                const itemDate = new Date(item.info.iniDate)
                if (!item.info?.mesmo_dia){
                    const initial1 = new Date(item.info.iniDate)
                    initial1.setHours(0, 0, 0, 0);
                    const final1 = new Date(item.info.finalDate)
                    final1.setHours(23, 59, 59, 999);
                    if (initial >= initial1 && final <= final1){
                        return item
                    }
                }else {
                    if (itemDate >= initial && itemDate <= final){
                        console.log('date', date >= initial)
                        return item
                    }
                }
                
            }))
            setFilteredEvents(eventos.filter((item) => {
                const initial = new Date(date)
                const final = new Date(date)
                // Set the initial date to the beginning of the day
                initial.setHours(0, 0, 0, 0);
    
                // Set the final date to the end of the day
                final.setHours(23, 59, 59, 999);
                const itemDate = new Date(item.info.iniDate)
                if (!item.info?.mesmo_dia){
                    const initial1 = new Date(item.info.iniDate)
                    initial1.setHours(0, 0, 0, 0);
                    const final1 = new Date(item.info.finalDate)
                    final1.setHours(23, 59, 59, 999);
                    if (initial >= initial1 && final <= final1){
                        return item
                    }
                }else {
                    if (itemDate >= initial && itemDate <= final){
                        console.log('date', date >= initial)
                        return item
                    }
                }
                
            }).filter((item) => {
                if (publics.every(element => [...item?.info?.publico].includes(element))){
                    return item
                }
            }))
        }else if (view == 'year'){
            console.log('year')
            setFilteredEvents( eventos.filter((item) => {
                const initial = new Date(clickedMonth)
                const final = new Date(clickedMonth)
                  // Set the initial date to the beginning of the month
                initial.setDate(1);
                initial.setHours(0, 0, 0, 0);

    
                // Set the final date to the end of the month
                final.setMonth(final.getMonth() + 1);
                final.setDate(0);
                final.setHours(23, 59, 59, 999);

                const itemDate = new Date(item.info.iniDate)
                if (!item.info?.mesmo_dia){
                    const initial1 = new Date(item.info.iniDate)
                    initial1.setHours(0, 0, 0, 0);
                    const final1 = new Date(item.info.finalDate)
                    final1.setHours(23, 59, 59, 999);
                    if (initial1 >= initial && final1 <= final){
                        return item
                    }
                }else {
                    if (itemDate >= initial && itemDate <= final){
                        return item
                    }
                }
                
            }).filter((item) => {
                if (publics.every(element => [...item?.info?.publico].includes(element))){
                    return item
                }
            }))
        }else if (view == 'decade'){
            console.log('decade', clickedYear)
            setFilteredEvents( eventos.filter((item) => {
                const initial = new Date(clickedYear)
                const final = new Date(clickedYear)
                // Set the initial date to the beginning of the year
                initial.setMonth(0); // January
                initial.setDate(1); // 1st
                initial.setHours(0, 0, 0, 0);

    
                // Set the final date to the end of the year
                final.setMonth(11); // December
                final.setDate(31); // 31st
                final.setHours(23, 59, 59, 999);

                const itemDate = new Date(item.info.iniDate)
                if (!item.info?.mesmo_dia){
                    const initial1 = new Date(item.info.iniDate)
                    initial1.setHours(0, 0, 0, 0);
                    const final1 = new Date(item.info.finalDate)
                    final1.setHours(23, 59, 59, 999);
                    if (initial1 >= initial && final1 <= final){
                        return item
                    }
                }else {
                    if (itemDate >= initial && itemDate <= final){
                        return item
                    }
                }
                
            }).filter((item) => {
                if (publics.every(element => [...item?.info?.publico].includes(element))){
                    return item
                }
            }))
        }
    }, [date, publics, eventos])
    // tommorow work on about event page and publics filtering
    // 
    // 
    // 
    // 
    // 
    const [corpo, setCorpo] = useState(false)
    const [staff, setStaff] = useState(false)
    const [estudantes, setEstudantes] = useState(false)
    const [todos, setTodos] = useState(false)
    const items = [{
        id: "Estudantes",
        label: "Estudantes",
      },
      {
        id: "Corpo Docente",
        label: "Corpo Docente",
      },
      {
        id: "Staff",
        label: "Staff",
      },
      {
        id: "Todos",
        label: "Todos",
      }]
    useEffect(() => {
        console.log('publics', eventos.filter((item) => {
            if (publics.every(element => [...item?.info?.publico].includes(element))){
                return item
            }
        }))
        
    }, [publics])
    return (
        <div className="abtCont" >
            <Header />
            <div className="aboutFirst" style={{paddingTop: 80, maxWidth: 1430}}>
              <div className="navigation">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-map-fill" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.598-.49L10.5.99 5.598.01a.5.5 0 0 0-.196 0l-5 1A.5.5 0 0 0 0 1.5v14a.5.5 0 0 0 .598.49l4.902-.98 4.902.98a.5.5 0 0 0 .196 0l5-1A.5.5 0 0 0 16 14.5zM5 14.09V1.11l.5-.1.5.1v12.98l-.402-.08a.5.5 0 0 0-.196 0zm5 .8V1.91l.402.08a.5.5 0 0 0 .196 0L11 1.91v12.98l-.5.1z"/>
                  </svg>
                  <span onClick={() => {
                              navigate('/')
                          }}>Home</span> <span>{'>'}</span><span>{section}</span>
                </div>
                
            </div>
            <div className="eventsPageContainer">
                <section className="firstSection">
                    <div className="search">
                        <span onClick={() => {
                            look()
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                        </span>
                        <input onKeyDown={(e) => {
                            if (e.key == 'Enter'){
                                
                                look()
                                
                            } 
                        }} placeholder="Pesquise..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <Calendar 
                    onChange={(newDate) => {
                        console.log('changed', newDate)
                        setDate(newDate)
                    }}
                    value={date}
                    formatShortWeekday={(locale, date) => {
                        const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
                        return weekDays[date.getDay()]
                    }}
                    locale={ptBR}
                    
                    formatMonth={(local, d) => {
                        const months = [
                            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
                          ];
                          return `${months[d.getMonth()]}`
                    }}
                    
                    activeStartDate={date}
                    onViewChange={() => {
                        setDate(new Date())
                        
                    }}
                    onClickDay={(date) => {
                        setDate(date)
                    }}
                    onClickMonth={(date) => {
                        console.log('date', date)
                        setClickedMonth(date)
                        setDate(date)
                    }}
                    onClickYear={(date) => {
                        console.log('dateDecde', date)
                        setClickedYear(date)
                        setDate(date)
                    }}
                    formatMonthYear={(local, d) => {
                        const months = [
                            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
                          ];
                          return `${months[d.getMonth()]} ${d.getFullYear()}`
                    }}
                    nextLabel={<div onClick={() => {
                        setDate((prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() + 1)));

                    }} className="calendar-buttons">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
</svg>
                    </div>}
                    
                    prevLabel={(<div onClick={() => {
                        setDate((prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() - 1)));

                    }} className="calendar-buttons">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
</svg>
                    </div>)}
                    prev2Label={null}
                    next2Label={null}
                    tileClassName={titleClassName}
                    view={view}
                    />
                    <div className="eventsAccordion">
                    <Accordion type="single" collapsible defaultValue="item-1">
                    <AccordionItem value="item-1" className='section'>
                        <AccordionTrigger className='title' style={{ padding: 0}}>Público-Alvo</AccordionTrigger>
                        <AccordionContent>
                            
                            <div className="audiences">
                            {
                items.map((item, index)=> {
                    return (
                        <div className="audience flex items-center space-x-2">
                                <input type='checkbox' onChange={(e) => {
                                let pub = publics
                                if (pub.some((i) => i == item.label)){
                                    setPublics(publics.filter((i) => i!= item.label))
                                }else {
                                    setPublics([...publics, item.label])

                                    // if (item.label == 'Todos'){
                                    //     setPublics([item.label])
                                    // }else {
                                    //     setPublics([...publics, item.label])
                                    // }
                                }
                            }}/>
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                     {item.label}
                        </label>
                        
                           
                        </div>
                    )
                })
            }
                                {/* <div >
                                <input value={corpo} type="checkbox" onChange={() => {
                                    setCorpo(!corpo)
                                }}/>
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Corpo Docente
                                </label>
                                </div>
                                <div className="audience flex items-center space-x-2">
                                <input value={staff} type="checkbox" onChange={() => {
                                    setStaff(!staff)
                                }}/>
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Staff
                                </label>
                                </div>
                                <div className="audience flex items-center space-x-2">
                                <input value={estudantes} type="checkbox" onChange={() => {
                                    setEstudantes(!estudantes)
                                }}/>
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Estudantes
                                </label>
                                </div>
                                <div className="audience flex items-center space-x-2">
                                <input value={todos} type="checkbox" onChange={() => {
                                    setTodos()
                                }}/>
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Todos
                                </label>
                                </div> */}
                            </div>
                            
                        </AccordionContent>
                    </AccordionItem>
                    </Accordion>
                    <div className="section" onClick={() => {
                        axios.get(`${baseURL}/api/admissionsContents`)
                        .then(res => {
                            let content = [...res.data][0]
                            if (content.calendario) {
                                window.open(content.calendario)

                            }else {
                                alert('Documento não existe')
                            }
                        })

                    }}>
                        <div className="title">Calendário Académico</div>
                    </div>
                    
                    </div>
                </section>
                <section className="secondSection">
                    <div className="top">
                        <span onClick={() => {
                            view != 'month' && setView('month')
                            navigate('/eventos')
                            setLooked(false)
                            setSearch('')
                        }} className={`section ${view == 'month' && 'selected-section'}`} >Hoje é {new Date().getDate()} de {months[new Date().getMonth()]}, {new Date().getFullYear()}</span>
                        <span onClick={() => {
                            view != 'month' && setView('month')
                            setDate(new Date())
                            navigate('/eventos')
                            setClickedMonth(new Date())
                            setClickedYear(new Date())
                            setLooked(false)
                            setSearch('')


                        }} className={`section ${view == 'month' && 'selected-section'}`}>Diário</span>
                        <span onClick={() => {
                            view != 'year' && setView('year')
                            navigate('/eventos')
                            setDate(new Date())
                            setClickedMonth(new Date())
                            setClickedYear(new Date())
                            setLooked(false)
                            setSearch('')


                        }} className={`section ${view == 'year' && 'selected-section'}`}>Mensal</span>
                        <span  onClick={() => {
                            view != 'decade' && setView('decade')
                            navigate('/eventos')
                            setDate(new Date())
                            setClickedMonth(new Date())
                            setClickedYear(new Date())
                            setLooked(false)
                            setSearch('')


                        }} className={`section ${view == 'decade' && 'selected-section'}`}>Anual</span>

                    </div>
                    {location.pathname.includes('event/') && location.state ? <div>
                        <div ref={scrollDivRef}>
                            <AboutEvent item={location.state.item}/>
                        </div>
                    </div>:
                    <>
                    {
                        looked ?
                        <div>
                            <div ref={scrollSearchRef} className="subTitle">Pesquisa</div>

                            {posts.length > 0 ?
                            <div>
                                <div className="noResults">
                                {eventos.filter((item) => `${item.info.titulo}`.toLocaleLowerCase().includes(search.toLocaleLowerCase())).length} resultado{eventos.filter((item) => `${item.info.titulo}`.toLocaleLowerCase().includes(search.toLocaleLowerCase())).length > 1 ? 's': ''} para "{search}".
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
                            {eventos.filter((item) => `${item.info.titulo}`.toLocaleLowerCase().includes(search.toLocaleLowerCase())).map((item, index) => {
                                
                        return (
                            <EventCont item={item} key={index} navigatePost={navigatePost}/>
                        )
                    })}</div>
                            
                            </div>
                            :
                            <div className="noResults">
                                Nenhum resultado para "{search}".
                            </div>
                            }
                            
                        </div>
                        :
                        <>
                        {view == 'year' ? 
                        <div className="subTitle">Eventos de {months[clickedMonth.getMonth()]}, {clickedMonth.getFullYear()}</div>
                    : view == 'decade' ? <div className="subTitle">Eventos de {new Date(clickedYear).getFullYear()}</div>
                :
                <div className="subTitle">Eventos de {(date.getFullYear() == new Date().getFullYear() && date.getMonth() == new Date().getMonth() && date.getDate() == new Date().getDate()) ? 'Hoje' : `${date.getDate()} de ${months[date.getMonth()]}, ${date.getFullYear()}`}</div>
                }

                    {filterEvents.length > 0 ? filterEvents.map((item, index) => {
                        return (
                            <EventCont item={item} key={index} navigatePost={navigatePost} />
                        )
                    })
                    : 
                    <div>
                        {<div className="noResults">
                            Nenhum resultado.
                        </div>}
                        
                    </div>}</>
                    }
                    <div className="subTitle" style={{marginBottom: 0}}>Eventos em Curso</div>
                        {
                            eventos.filter((item) => {
                                const initial = new Date()
                                const final = new Date()
                                // Set the initial date to the beginning of the day
                                initial.setHours(0, 0, 0, 0);

                                // Set the final date to the end of the day
                                final.setHours(23, 59, 59, 999);
                                const itemDate = new Date(item.info.iniDate)
                                if (final < itemDate){
                                    return item
                                }
                            }).map((item, index) => {
                                return (
                                    <EventCont item={item} key={index} navigatePost={navigatePost} />
                                )
                            })
                        }</>}
                </section>
            </div>

            <Footer />
        </div>
    )
}
export default EventsPage