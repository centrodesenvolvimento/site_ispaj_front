import { useEffect, useState } from 'react'
import '../css/principles.css'
import '../css/news.css'
import { Card, CardContent, CardHeader } from '../@/components/ui/card'
import Skeleton from 'react-loading-skeleton'
import axios from 'axios'
import { baseURL } from '../api/api'
import { useNavigate } from 'react-router-dom'
const News = () => {
    const navigate = useNavigate()
    const [placeholder, setPlaceholder] = useState([
        {
            id: 1,
            title: 'Embaixador da China acreditado em Angola interessado em cooperar com o ISPAJ no domínio da saúde',
            date: Date.now(),
            image: process.env.PUBLIC_URL + '/images/post1.png'
        },
        {
            id: 2,
            title: 'AGENDA 2030 DA ONU FOI OBJECTO DE ESTUDO NAS VIII JORNADAS CIENTÍFICAS DO ISPAJ',
            date: Date.now(),
            image: process.env.PUBLIC_URL + '/images/post2.png'
        },
        {
            id: 3,
            title: 'Quer saber mais sobre o ANGOSAT 2?',
            date: Date.now(),
            image: process.env.PUBLIC_URL + '/images/post5.png'
        },
        {
            id: 4,
            title: 'Decorre hoje, no Bairro 28 de Agosto “Vulgo Lixeira” a Feira solidária da saúde organizada pelo ISPAJ',
            date: Date.now(),
            image: process.env.PUBLIC_URL + '/images/post3.png'

        },
        {
            id: 5,
            title: 'Marketing: estudantes do curso de Gestão Empresarial do ISPAJ submetidos a desafio',
            date: Date.now(),
            image: process.env.PUBLIC_URL + '/images/post6.png'

        },
        {
            id: 6,
            title: 'ISPAJ Presente na I Conferência Internacional CAEP',
            date: Date.now(),
            image: process.env.PUBLIC_URL + '/images/post7.png'
            
        },  
    ])
    const [posts, setPosts] = useState([])
    useEffect(() => {
        axios.get(`${baseURL}/api/news`)
        .then(res => {
            setPosts([...res.data])
        })
    }, [])
    return (
        <div className="principlesContainer" id='newsContainer'>
            <div className='newsContainer'>
                <div className="title">Notícias</div>

                
                   
                            <section className='grid'>
                                {posts.length >= 6 ?

                                posts.map((post, index) => {
                                    console.log(post)
                                    return (
                                        <div key={index} className="newsBanner" style={{}}>
                                            <img src={`${baseURL}/storage/images/${post.imagens[0]}`}/>
                                            <div className="infoContainer">
                                                <div className="glance">Em Destaque</div>
                                                <div className='info'>
                                                    <div className='postDate'>{new Date(post.info.data).getDate()}/{new Date(post.info.data).getMonth() + 1}/{new Date(post.info.data).getFullYear()}</div>
                                                    <div style={{marginBottom: 10}} className='postTitle'>{post.info.titulo}</div>
                                                    <div style={{}}className='valueButton' onClick={() => {
                                                        navigate(`/noticias/${post.id}`)
                                                    }}>Ler Mais</div>
                                                </div>
                                            </div>
                                            </div>
                                    )
                                })
                                :
                                    placeholder.map((post, index) => {
                                        return (
                                            <div key={index} className="newsBanner" style={{}}>
                                            {/* <Skeleton style={{background: '#e3e3e3', width: '100%', height: '100%'}}/> */}
                                            <div className="infoContainer">
                                                <div className="glance" style={{}}>Em Destaque</div>
                                                
                                                <div className='info' style={{}}>
                                                    <div className='postDate' style={{opacity: 0}}>{new Date().getDate()}/{new Date().getMonth() + 1}/{new Date().getFullYear()}</div>
                                                    <Skeleton style={{margin: 0, padding: 0, position: 'absolute'}} className='postTitle' count={2}/>
                                                    <div style={{marginBottom: 10, opacity: 0}} className='postTitle'></div>
                                                    <div style={{}}className='valueButton'>Ler Mais</div>
                                                </div>
                                            </div>
                                            </div>
                                        )
                                    })
                                }
                            </section>
                        
                <div className='seeMore' onClick={()=> {
                                navigate('/noticias')
                }}>Ver Mais</div>
            </div>
        </div>
    )
}
export default News