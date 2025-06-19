import { useLocation, useNavigate } from 'react-router-dom'
import '../css/aboutEvent.css'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { format } from 'date-fns'
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import "yet-another-react-lightbox/plugins/counter.css"
import Counter from "yet-another-react-lightbox/plugins/counter"
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen"
import "yet-another-react-lightbox/styles.css"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"
import "yet-another-react-lightbox/plugins/thumbnails.css"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import { baseURL } from '../api/api'
const AboutEvent = ({
    item
}) => {
    const navigate = useNavigate()
    const location = useLocation()
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
    const [isOpen, setIsOpen] = useState(false)
    const [photoIndex, setPhotoIndex] = useState(0)
    const openLightbox = (index) => {
      setPhotoIndex(index);
      setIsOpen(true);
    };
    useEffect(() => {
        return () =>{
            localStorage.getItem('path') && localStorage.removeItem('path')
        }
    }, [])
    useEffect(() => {
    }, [isOpen])
    return (
        <div className="aboutEventContainer">
            <div className='first'>
            {item ? <div className='date'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
</svg>      
            <span>Publicado em {new Date(item?.info?.iniDate).getDate()} de {months[new Date(item?.info?.iniDate).getMonth()]}, {new Date(item?.info?.iniDate).getFullYear()}</span>

            
            </div> : <Skeleton className='date'/>}
                <svg onClick={() => {
                    if (location.state.fromHome){
                        navigate('/eventos')
                    }else {
                        navigate(-1)
                    }
                }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
</svg>
            </div>
            <div className='title'>{item?.info?.titulo}</div>
            {item ? <div onClick={() => {
            openLightbox(0)
        
        }} className='date1'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-fullscreen" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707m0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707m-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707"/>
        </svg>Tela Cheia</div> : <Skeleton className='date1'/>}
            <div className='imgContainer' style={{overflow: 'hidden', borderRadius: 10}}>
                {item?.info?.imagem && <img loading="lazy"src={`${baseURL}/public/storage/images/${item?.info?.imagem}`}/>}
            </div>
            {isOpen && (
        <Lightbox
        
        styles={{
          slide: {
          },
          container: {
            background: '#000000ea'
          }
        }}
        plugins={[Counter, Fullscreen, Zoom]}
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={[{src: `${baseURL}/public/storage/images/${item?.info?.imagem}`}]}
      />
      )}
            <div className='eventAttrs'>
                <section className='attr'>
                    
                    <div className='attrTitle'>{item?.info?.mesmo_dia ? 'Horário' : 'Duração'}</div>
                    <div className='attrValue'>{item?.info?.mesmo_dia ? item?.info?.horario : `${format(new Date(item?.info?.iniDate), 'dd/MM/yyyy')} - ${format(new Date(item?.info?.finalDate), 'dd/MM/yyyy')}`}</div>
                </section>
                <section className='attr'>
                    <div className='attrTitle'>Localização</div>
                    <div className='attrValue'>{item?.info?.localizacao}</div>
                </section>
                <section className='attr'>
                    
                    <div className='attrTitle'>Público-alvo</div>
                    <div className='attrValue'>{item?.info?.publico && [...item?.info?.publico].map((pub, index) => {
                        if (index == [...item.info.publico].length -1 && [...item.info.publico].length > 1){
                            return (
                                `e ${pub}`
                            )
                        }else {
                            if ([...item.info.publico].length > 1){
                                return `${pub}, `
                            }else {
                                return pub
                            }
                        }
                    })} </div>
                </section>
                <section className='attr'>
                    <div className='attrTitle'>Tipo de Evento</div>
                    <div className='attrValue'>{item?.info?.tipo}</div>
                </section>
            </div>

            <div className='eventContent'>
                <div className='' dangerouslySetInnerHTML={{__html: item?.info?.descricao}}>

                </div>
                {item?.info?.iframe && <div className='mapView' dangerouslySetInnerHTML={{__html: item?.info?.iframe}}>
                </div>}
                
            </div>
        </div>
    )
}
export default AboutEvent