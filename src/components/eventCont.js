import { useLocation, useNavigate, useParams } from 'react-router-dom'
import '../css/events.css'
import { baseURL } from '../api/api'

const EventCont = ({item, navigatePost}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const params = useParams()

    return (
        <div className="event">
            <div className="imgContainer"><img loading="lazy"src={`${baseURL}/storage/images/${item?.info?.imagem}`}/></div>
            <div className="info">
                {item?.info?.mesmo_dia ? <div className="date">{new Date(item.info.iniDate).getDate()}/{new Date(item.info.iniDate).getMonth()+1}/{new Date(item.info.iniDate).getFullYear()} das {item?.info?.horario}</div> :  <div className="date">De {new Date(item.info.iniDate).getDate()}/{new Date(item.info.iniDate).getMonth()+1}/{new Date(item.info.iniDate).getFullYear()} à {new Date(item.info.finalDate).getDate()}/{new Date(item.info.finalDate).getMonth()+1}/{new Date(item.info.finalDate).getFullYear()}</div>}
                <div className="title" onClick={()=> {
            
            navigate(`event/${item.id}`, {
                state: {
                    item: item
                }
            })
            navigatePost(item)
        }}>{item.info.titulo}</div>
                <div className="location">
                <span className='iconContainer'>
                <img loading="lazy"src={process.env.PUBLIC_URL + '/images/pin-map.png'}/>
                </span>
                {item?.info?.localizacao}
                </div>
            </div>
        </div>
    )
}
export default EventCont