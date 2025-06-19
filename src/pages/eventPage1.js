import { useLocation, useNavigate } from "react-router-dom"
import Header from "../components/header"
import { useEffect, useState } from "react"
import '../css/eventsPage.css'
import Calendar from "react-calendar"
import { ptBR } from "date-fns/locale"
import Footer from "../components/footer"
import EventCont from "../components/eventCont"
import AboutEvent from "../components/aboutEvent"
const EventsPage1 = () => {
    const location = useLocation()
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
    const titleClassName = ({ date, view }) => {
        if (view == 'month'){
            const today = new Date()
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
            const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
            if (date < firstDayOfMonth || date > lastDayOfMonth) {
                return 'other-month'
            }
        }
    }
    const [view, setView] = useState('decade')
    const [search, setSearch] = useState('')
    const [looked, setLooked] = useState(false)
    const look = () => {
        if (search.length == 0){
            alert('Digite algo para ver resultados.')
        }else {
            setView('')
            setLooked(true)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const navigatePost = (item) => {
        setPost(item)
    }
    const [post, setPost] = useState(null)
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
                    formatMonthYear={(local, d) => {
                        const months = [
                            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
                          ];
                          return `${months[d.getMonth()]} ${d.getFullYear()}`
                    }}
                    nextLabel={<div className="calendar-buttons">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
</svg>
                    </div>}
                    
                    prevLabel={(<div className="calendar-buttons">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
</svg>
                    </div>)}
                    prev2Label={null}
                    next2Label={null}
                    tileClassName={titleClassName}
                    view={view}
                    />
                </section>
                <section className="secondSection">
                    <div className="top">
                        <span onClick={() => {
                            view != 'month' && setView('month')
                            setLooked(false)
                            setSearch('')
                        }} className={`section ${view == 'month' && 'selected-section'}`} >Hoje é {new Date().getDate()} de {months[new Date().getMonth()]}, {new Date().getFullYear()}</span>
                        <span onClick={() => {
                            view != 'month' && setView('month')
                            setLooked(false)
                            setSearch('')


                        }} className={`section ${view == 'month' && 'selected-section'}`}>Diário</span>
                        <span onClick={() => {
                            view != 'year' && setView('year')
                            setLooked(false)
                            setSearch('')


                        }} className={`section ${view == 'year' && 'selected-section'}`}>Mensal</span>
                        <span  onClick={() => {
                            view != 'decade' && setView('decade')
                            setLooked(false)
                            setSearch('')


                        }} className={`section ${view == 'decade' && 'selected-section'}`}>Anual</span>

                    </div>
                    {location ? <div>
                        <AboutEvent item={post}/>
                    </div>:
                    <>
                    {
                        looked ?
                        <div>
                            <div className="subTitle">Pesquisa</div>

                            {posts.length > 0 ?
                            <div>
                                <div className="noResults">
                                {posts.length} resultado{posts.length > 1 ? 's': ''} para "{search}".
                            </div>
                            <>
                            {posts.concat(posts).concat(posts).map((item, index) => {
                        return (
                            <EventCont item={item} key={index} navigatePost={navigatePost}/>
                        )
                    })}</>
                            
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
                        <div className="subTitle">Eventos de {months[new Date().getMonth()]}, {new Date().getFullYear()}</div>
                    : view == 'decade' ? <div className="subTitle">Eventos de {new Date().getFullYear()}</div>
                :
                <div className="subTitle">Eventos de Hoje</div>
                }

                    {posts.length > 0 ? posts.concat(posts).concat(posts).map((item, index) => {
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
                            posts.concat(posts).concat(posts).map((item, index) => {
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
export default EventsPage1