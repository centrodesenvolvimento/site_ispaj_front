import { useNavigate } from 'react-router-dom'
import '../css/principles.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { baseURL } from '../api/api'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Director = () => {
    const navigate = useNavigate()
    const [aboutContent, setAboutContent] = useState(null)
    const [name, setName] = useState(null)
    useEffect(() => {
        axios.get(`${baseURL}/api/homeContents`)
        .then(res => {
            setAboutContent([...res.data][0])
        })
        axios.get(`${baseURL}/api/aboutContents`)
        .then(res => {
            // setAboutContent([...res.data][0])
            setName([...[...res.data][0].orgaos_singulares].filter((item) => item.presidente == 'true')[0]?.nome)
        })


    }, [])
    return (
        <div style={{backgroundImage: 'none'}} className="principlesContainer" id='principlesContainer'>
            <div className="principlesContainer1">
                <div className='title'>Mensagem do Presidente:</div>
                <div className='messageContainer'>

                <div className='info'>
                    {name ? <div className='title'>Dr. {name}</div> : <Skeleton style={{background: '#e3e3e3', marginLeft: '5%', width: '50%'}} count={1}/>}
                            {aboutContent ? <div className='message' dangerouslySetInnerHTML={{__html: aboutContent?.mensagemPr}}>
                            </div> : <Skeleton style={{background: '#e3e3e3', marginLeft: '5%', width: '90%'}} count={8}/>}
                            {aboutContent ? <div style={{margin: 25}} 
                            onClick={() => {
                                navigate('/mensagem_do_presidente')
                                localStorage.setItem('aboutContent', JSON.stringify(aboutContent))
                                localStorage.setItem('prName', name)
                            }}className='serviceButton'>Saber Mais</div>: <Skeleton style={{height: 40, width: 100, margin: 20}}/>}
                </div>
                <div className='messageImageContainer'>
                        {/* <img src={process.env.PUBLIC_URL + '/images/director.png'}/> */}
                        {aboutContent && <img src={aboutContent?.imagemPr}/>}
                           
                </div>
                
                    
                    </div>
                </div>
        </div>
    )
}
export default Director