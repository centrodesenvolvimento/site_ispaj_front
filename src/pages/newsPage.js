import { useLocation, useNavigate } from "react-router-dom"
import Header from "../components/header"
import Swiper2 from "../components/swiper2"
import Footer from "../components/footer"
import '../css/about.css'
import { useEffect, useRef, useState } from "react"
import AboutSection from "../components/aboutSection"
import { motion } from "framer-motion"
import Organisation from "../components/organisation"
import EstruturaOrg from "../components/estruturaOrg"
import EstruturaAdmin from "../components/estruturaAdmin"
import History from "../components/history"
import Estatutos from "../components/estatutos"
import Swiper3 from "../components/swiper3"
import ExamsSection from "../components/examsSection"
import Fees from "../components/fees"
import Faq from "../components/faq"
import Timings from "../components/timings"
import HealthPage from "../components/healthPage"
import SocialsPage from "../components/socialsPage"
import EnginesPage from "../components/enginesPage"
import '../css/health.css'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "../@/components/ui/accordion"
import { ScrollArea } from "../@/components/ui/scroll-area"
import '../css/newsPage.css'
import ReactPaginate from "react-paginate"
import Skeleton from "react-loading-skeleton"
import axios from "axios"
import { baseURL } from "../api/api"
import toast, { Toaster } from "react-hot-toast"
const NewsPage = () => {
    const navigate = useNavigate()
    const [section, setSection] = useState('Notícias')
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
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('recent')
    const [posts, setPosts] = useState([])
    const [posts2, setPosts2] = useState([])
    const [posts1, setPosts1] = useState([])
    const [postPerPage, setPostPerPage] = useState(16)
    const [currentPage, setCurrentPage] = useState(1)
    const [pages, setPages] = useState([])
    const scrollDivRef = useRef(null)
    useEffect(() => {
        axios.get(`${baseURL}/api/news`)
        .then(res => {
            setPosts([...res.data])
            setPosts2([...res.data])
            for (let i = 1; i <= Math.ceil([...res.data].length/postPerPage); i++) {
                setPages([...pages, i])
            }
            const lastPostIndex = currentPage * postPerPage
            const firstPostIndex = lastPostIndex - postPerPage
            const currentPosts = [...res.data].slice(firstPostIndex, lastPostIndex)
            setPosts1(currentPosts.slice(2))
        })
        .catch(err => {
            toast(err.response.data.message)
        })
        
        
        
    }, [])
    useEffect(() => {
        if (searched.length > 0){
            console.log('changed', posts)
            const lastPostIndex = currentPage * postPerPage
            const firstPostIndex = lastPostIndex - postPerPage
            const currentPosts = posts2.slice(firstPostIndex, lastPostIndex)
            setPosts1(currentPosts)
        }else {
            console.log('changed', posts)
            const lastPostIndex = currentPage * postPerPage
            const firstPostIndex = lastPostIndex - postPerPage
            const currentPosts = posts2.slice(firstPostIndex, lastPostIndex).filter((item) => item.id != posts[0]?.id && item.id != posts[1]?.id)
            setPosts1(currentPosts.filter((item) => item.id != posts[0]?.id && item.id != posts[1]?.id))
        }
    }, [posts2, currentPage, filter])
    const [searched, setSearched] = useState('')
    const look = () => {
        if (search.length == 0){
            toast('Digite algo para ver resultados')
            setSearched(search)
            setPosts2(posts)
        }else {
            setSearched(search)
            setCurrentPage(1)
            setPosts2(posts.filter((item) => `${item.info.titulo}`.toLocaleLowerCase().includes(search.toLocaleLowerCase())))
            // scrollDivRef.current && window.scrollTo({
            //     top: scrollDivRef.current.getBoundingClientRect().top + window.scrollY - 120
            // })
        }
    }
    const location = useLocation()
    const prevLocationRef = useRef(location);

    useEffect(() => {
      if (prevLocationRef.current.pathname !== location.pathname) {
        window.location.reload();
    }
    prevLocationRef.current = location;

  }, [location])
    return (
        <div className="abtCont">
            <Toaster />
            <Header />
            {/* <div className="" style={{marginTop: 0, background: '#eeeeee', aspectRatio: 4/1.5, width: '100%', maxHeight: 300}}>
            <img style={{objectFit: 'cover', width: '100%', height: '100%'}} src={process.env.PUBLIC_URL + '/images/ispaj.png'}/></div> */}
            <div className="aboutFirst" style={{marginTop: 100, maxWidth: 1600}}>
              <div className="navigation" >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-map-fill" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.598-.49L10.5.99 5.598.01a.5.5 0 0 0-.196 0l-5 1A.5.5 0 0 0 0 1.5v14a.5.5 0 0 0 .598.49l4.902-.98 4.902.98a.5.5 0 0 0 .196 0l5-1A.5.5 0 0 0 16 14.5zM5 14.09V1.11l.5-.1.5.1v12.98l-.402-.08a.5.5 0 0 0-.196 0zm5 .8V1.91l.402.08a.5.5 0 0 0 .196 0L11 1.91v12.98l-.5.1z"/>
                  </svg>
                  <span onClick={() => {
                              navigate('/')
                          }}>Home</span> <span>{'>'}</span><span>{section}</span>
                </div>
            </div>
            
            <div className="aboutContainer" style={{maxWidth: 1600}}>
                
                <section className="secondAboutSection" style={{flex: 1}}>
                <div className='healthContainer'>
            
            <section className="secondContainer" style={{}}>
                <div className='aboutCourse'>
                    <div className="title">Notícias</div>
                    <div className="header">
                        <div className="searchContainer">
                            <div className="search">
                                <span onClick={() => {
                                    look()
                                }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg></span>
                                <input placeholder="Pesquise algo..." value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => {
                            if (e.key == 'Enter'){
                                
                                look()
                                
                            } 
                        }}/>
                                
                            </div>
                        </div>
                        <div className="tabs">
                            <div onClick={() => {
                                if (!filter.includes('recent')){
                                    setFilter('recent')
                                    let p = posts
                                    setPosts2(posts2.sort((a, b) => new Date(b?.info?.data) - new Date(a?.info?.data))
                                )
                                }

                                scrollDivRef.current && window.scrollTo({
                                    top: scrollDivRef.current.getBoundingClientRect().top + window.scrollY - 120
                                })
                            }} className={`tab ${filter.includes('recent') && 'tab1'}`}>Recentes</div>
                            <div onClick={() => {
                                if (!filter.includes('top')){
                                //     setFilter('top')
                                //     setPosts2(posts2.sort((a, b) => new Date(a?.info?.data) - new Date(b?.info?.data))
                                // )
                                // setCurrentPage(1)
                                }

                                // scrollDivRef.current && window.scrollTo({
                                //     top: scrollDivRef.current.getBoundingClientRect().top + window.scrollY - 120
                                // })
                            }} className={`tab ${filter.includes('top') && 'tab1'}`}>Mais Vistos</div>
                            <div onClick={() => {
                                if (!filter.includes('old')){
                                    setFilter('old')
                                    let p = posts

                                    setPosts2(posts2.sort((a, b) => new Date(a?.info?.data) - new Date(b?.info?.data))
                                )
                                setCurrentPage(1)
                                }

                                scrollDivRef.current && window.scrollTo({
                                    top: scrollDivRef.current.getBoundingClientRect().top + window.scrollY - 120
                                })
                            }} className={`tab ${filter.includes('old') && 'tab1'}`}>Mais Antigos</div>
                        </div>
                    </div>
                    {!searched.length > 0 && <div className="newsBanners">
                    <div className="newsBanner">
                    
                    <div className="infoContainer">
                        <div className="glance">Em Destaquee</div>
                        {posts.length > 2 && <img style={{opacity: 1}} src={`${baseURL}/storage/images/${posts[0]?.imagens[0]}`}/>}
                        <div className='info'>
                            {posts.length > 2 && <div className='postDate'>{new Date(posts[0]?.info?.data).getDate()}/{new Date(posts[0]?.info?.data).getMonth() + 1}/{new Date(posts[0]?.info?.data).getFullYear()}</div>}
                            {posts.length > 2 && <div style={{marginBottom: 10}} className='postTitle'>{posts[0]?.info?.titulo}</div>}
                            <div onClick={() => {
                                if (posts.length > 2){
                                    navigate(`/noticias/${posts[0]?.id}`)
                                }
                            }} style={{}}className='valueButton'>Ler Mais</div>
                        </div>
                    </div>
                    </div>
                    <div className="newsBanner">
                    {posts.length > 2 && <img style={{opacity: 1}} src={`${baseURL}/storage/images/${posts[1]?.imagens[0]}`}/>}
                    <div className="infoContainer">
                        <div className="glance">Em Destaque</div>

                        <div className='info'>
                            <div className='postDate'>{new Date(posts[1]?.info?.data).getDate()}/{new Date(posts[1]?.info?.data).getMonth() + 1}/{new Date(posts[1]?.info?.data).getFullYear()}</div>
                            {posts.length > 2 && <div style={{marginBottom: 10}} className='postTitle'>{posts[1]?.info?.titulo}</div>}
                            <div onClick={() => {
                                if (posts.length > 2) {
                                    navigate(`/noticias/${posts[1]?.id}`)
                                }
                            }} style={{}}className='valueButton'>Ler Mais</div>
                        </div>
                    </div>
                    </div>
                    </div>}
                    {searched.length > 0 && <div onClick={()=> {
                        setSearch('')
                        setSearched('')
                        setPosts2(posts)
                        setFilter('recent')
                        setCurrentPage(1)
                    }} style={{width: '100%'}} className="valueButton">Voltar a ver todas as notícias</div>}
                    {searched.length > 0 ? 
                    <div>
                        <div style={{}} className="subTitle" ref={scrollDivRef}>Resultados para "{searched}"<span>({posts2.length}) </span> <div style={{display: 'inline-flex', flexDirection: 'row', alignItems: 'center', marginLeft:10}}><span style={{color: '#d88c00', fontWeight: '500'}}>{filter == 'top' ? 'Mais Vistos' : filter == 'old' ? 'Mais Antigos' : 'Recentes'}</span></div></div>

                        <div></div>
                    </div>
                    :<div style={{}} className="subTitle" ref={scrollDivRef}>Veja mais <span>({posts2.length - 2 < 0 ? 0 : posts2.length - 2}) </span> <div style={{display: 'inline-flex', flexDirection: 'row', alignItems: 'center', marginLeft:10}}><span style={{color: '#d88c00', fontWeight: '500'}}>{filter == 'top' ? 'Mais Vistos' : filter == 'old' ? 'Mais Antigos' : 'Recentes'}</span></div></div>}
                    {
                        searched.length > 0 ? 
                        <>
                        <ReactPaginate
                    
                    breakLabel="..."
                            nextLabel=">"
                            onPageChange={(e) => {
                                setCurrentPage(e.selected + 1)
                                
                                scrollDivRef.current && window.scrollTo({
                                    top: scrollDivRef.current.getBoundingClientRect().top + window.scrollY - 120
                                })
                            }}
                            
                            forcePage={currentPage-1}
                            pageRangeDisplayed={5}
                            pageCount={posts2.slice(0, Math.ceil((posts2.length -2) /postPerPage)).map((item, index) => index + 1)}
                            previousLabel="<"
                            renderOnZeroPageCount={null}
                            containerClassName={'pagination'}
                            pageClassName={'page-item'}
                            pageLinkClassName={'page-link'}
                            previousClassName={'prev-item'}
                            previousLinkClassName={'prev-link'}
                            nextClassName={'next-item'}
                            nextLinkClassName={'next-link'}
                            breakLinkClassName={'break-link'}
                            activeClassName={'active'}
                            disabledClassName={'disabled'}
                            />
                   {posts1.length > 0 ? <div className="postGrid">
                        {posts1.map((post, index) => {
                            return (
                                <div key={index} className="newsBanner1" style={{}}>
                        <img src={`${baseURL}/storage/images/${[...post.imagens][0]}`}/>
                        <div className="infoContainer">
                            <div className="glance">Em Destaque</div>
                            <div className='info'>
                                <div className='postDate'>{new Date(post?.info?.data).getDate()}/{new Date(post?.info?.data).getMonth() + 1}/{new Date(post?.info?.data).getFullYear()}</div>
                                <div style={{marginBottom: 10}} className='postTitle'>{post?.info?.titulo}</div>
                                <div style={{}}className='valueButton' onClick={() => {
                                    // navigate(`/noticias/${post.id}`)
                                    navigate(`/noticias/${post.id}`)
                                }}>Ler Mais</div>
                            </div>
                        </div>
                        </div>
                            )
                        })}
                    </div>: <div>Nenhum resultado.</div>
                    }
                    <ReactPaginate
                    
                    breakLabel="..."
                            nextLabel=">"
                            onPageChange={(e) => {
                                setCurrentPage(e.selected + 1)
                                
                                scrollDivRef.current && window.scrollTo({
                                    top: scrollDivRef.current.getBoundingClientRect().top + window.scrollY - 120
                                })
                            }}
                            
                            forcePage={currentPage-1}
                            pageRangeDisplayed={5}
                            pageCount={posts2.slice(0, Math.ceil((posts2.length -2) /postPerPage)).map((item, index) => index + 1)}
                            previousLabel="<"
                            renderOnZeroPageCount={null}
                            containerClassName={'pagination'}
                            pageClassName={'page-item'}
                            pageLinkClassName={'page-link'}
                            previousClassName={'prev-item'}
                            previousLinkClassName={'prev-link'}
                            nextClassName={'next-item'}
                            nextLinkClassName={'next-link'}
                            breakLinkClassName={'break-link'}
                            activeClassName={'active'}
                            disabledClassName={'disabled'}
                            />
                    </>
                            
                            :
                            <>
                            <ReactPaginate
                    
                    breakLabel="..."
                            nextLabel=">"
                            onPageChange={(e) => {
                                setCurrentPage(e.selected + 1)
                                
                                scrollDivRef.current && window.scrollTo({
                                    top: scrollDivRef.current.getBoundingClientRect().top + window.scrollY - 120
                                })
                            }}
                            
                            forcePage={currentPage-1}
                            pageRangeDisplayed={5}
                            pageCount={posts2.slice(0, Math.ceil((posts2.length -2) /postPerPage)).map((item, index) => index + 1)}
                            previousLabel="<"
                            renderOnZeroPageCount={null}
                            containerClassName={'pagination'}
                            pageClassName={'page-item'}
                            pageLinkClassName={'page-link'}
                            previousClassName={'prev-item'}
                            previousLinkClassName={'prev-link'}
                            nextClassName={'next-item'}
                            nextLinkClassName={'next-link'}
                            breakLinkClassName={'break-link'}
                            activeClassName={'active'}
                            disabledClassName={'disabled'}
                            />
                    <div className="postGrid">
                        {posts.length > 2 ? 
                        posts1.map((post, index) => {
                            return (
                                <div key={index} className="newsBanner1" style={{}}>
                        <img src={`${baseURL}/storage/images/${[...post.imagens][0]}`}/>
                        <div className="infoContainer">
                            <div className="glance">Em Destaque</div>
                            <div className='info'>
                                <div className='postDate'>{new Date(post?.info?.data).getDate()}/{new Date(post?.info?.data).getMonth() + 1}/{new Date(post?.info?.data).getFullYear()}</div>
                                <div style={{marginBottom: 10}} className='postTitle'>{post?.info?.titulo}</div>
                                <div style={{}}className='valueButton' onClick={() => {
                                    // navigate(`/noticias/${post.id}`)
                                    navigate(`/noticias/${post.id}`)
                                }}>Ler Mais</div>
                            </div>
                        </div>
                        </div>
                            )
                        })
                        : placeholder.concat(placeholder).map((post, index) => {
                            return (
                                <div key={index} className="newsBanner1" style={{}}>
                                            <img style={{opacity: 0}} />
                                            <div className="infoContainer" style={{background: 'white'}}>
                                                <div className="glance">Em Destaque</div>
                                                <div className='info'>
                                                    {/* <div className='postDate'>{new Date(post.date).getDate()}/{new Date(post.date).getMonth() + 1}/{new Date(post.date).getFullYear()}</div> */}
                                                    <Skeleton />
                                                    <Skeleton className="postTitle"/>
                                                    {/* <div style={{marginBottom: 10}} className='postTitle'>{post.title}</div> */}
                                                    <Skeleton style={{width: 100, height: 35}}/>
                                                    
                                                </div>
                                            </div>
                                            </div>
                            )
                        })}
                    </div>
                    <ReactPaginate
                    
                    breakLabel="..."
                            nextLabel=">"
                            onPageChange={(e) => {
                                setCurrentPage(e.selected + 1)
                                scrollDivRef.current && window.scrollTo({
                                    top: scrollDivRef.current.getBoundingClientRect().top + window.scrollY - 120
                                })
                            }}
                            pageRangeDisplayed={5}
                            pageCount={posts2.slice(0, Math.ceil((posts2.length - 2)/postPerPage)).map((item, index) => index + 1)}
                            forcePage={currentPage-1}

                            previousLabel="<"
                            renderOnZeroPageCount={null}
                            containerClassName={'pagination'}
                            pageClassName={'page-item'}
                            pageLinkClassName={'page-link'}
                            previousClassName={'prev-item'}
                            previousLinkClassName={'prev-link'}
                            nextClassName={'next-item'}
                            nextLinkClassName={'next-link'}
                            breakLinkClassName={'break-link'}
                            activeClassName={'active'}
                            disabledClassName={'disabled'}
                            /></>
                    }
                    <div>
                        
                    </div>
                </div>

                {/*  */}

               
            </section>
        </div>
                </section>
            </div>
            
            <Footer />
        </div>
    )
}
export default NewsPage
