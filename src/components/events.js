import '../css/principles.css'
import '../css/events.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import axios from 'axios'
import { baseURL } from '../api/api'
const Events = () => {
    const navigate = useNavigate()
    const [events, setEvents] = useState([
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
    const [eventos, setEventos] = useState([])
    useEffect(() => {
        axios.get(`${baseURL}/api/events`)
        .then(res => {
            setEventos([...res.data])
        })
    }, [])
    return (
        <div className="principlesContainer" id='eventPrinciplesContainer'>
        <div className='principlesContainer1' style={{maxWidth: 1700}}>
            <div style={{maxWidth: 1700, marginLeft: 'auto', marginRight: 'auto'
            }} className='title'>Eventos</div>

            <section className='eventsContainer'>
                {eventos && eventos.length > 1 ?
                eventos.filter((item) => {
                    if (item.info?.show == undefined){
                        return item
                    }else if (item.info?.show == true){
                        return item
                    }
                }).slice(0, 4).map((event, index) => {
                    return (
                        <div key={index} className='eventContainer'>
                                <img loading="lazy"src={`${baseURL}/public/storage/images/${event?.info?.imagem}`}/>
                                <div className='eventInfo'>
                                <span className='eventTitle' onClick={()=> {
                                    navigate(`eventos/event/${event.id}`, {
                                        state: {
                                            item: event,
                                            fromHome: true

                                        }
                                    })
                                }}>{event?.info?.titulo}</span>
                                <span className='eventDate'>{new Date(event.info.iniDate).getDate()} {months[new Date(event.info.iniDate).getMonth()].slice(0, 3)}, {new Date(event.info.iniDate).getFullYear()}</span>

                                <div className='eventLocation'>
                                    <span className='iconContainer'>
                                        <img loading="lazy"src={process.env.PUBLIC_URL + '/images/pin-map.png'}/>
                                    </span>
                                    <span className='eventLocationInfo'>{event?.info?.localizacao}</span>
                                </div>
                                <div className='eventButton' onClick={() => {
                                    navigate(`eventos/event/${event.id}`, {
                                        state: {
                                            item: event,
                                            fromHome: true
                                        },
                                    })
                                }}>
                                    Saber Mais
                                </div>
                                </div>
                            </div>
                    )
                }):
                    events.map((event, index) => {
                        return (
                            <div key={index} className='eventContainer'>
                                <div className='eventInfo'>
                                <Skeleton className='eventTitle'/>
                                <Skeleton className='eventDate' style={{width: 100}}/>
                                <Skeleton className='eventLocation'/>
                                <Skeleton style={{width: 100, height: 33}}/>
                                
                                </div>
                            </div>
                        )
                    })
                }
            </section>
            
            <div onClick={()=> navigate('/eventos')} className='seeMore'>Ver Mais</div>
        </div>
        </div>
    )
}
export default Events


