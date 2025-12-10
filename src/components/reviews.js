import { useEffect, useState } from 'react'
import '../css/principles.css'
import Marquee from 'react-fast-marquee'
import '../css/reviews.css'
import axios from 'axios'
import { baseURL } from '../api/api'
import Skeleton from 'react-loading-skeleton'

const Reviews = () => {
    const [size, setSize] = useState(window.innerWidth)
    useEffect(() => {
        const handleSize = () => {
            setSize(window.innerWidth)
            //('changing', (window.innerWidth))
        }
        window.addEventListener('resize', handleSize)
        return () => {
            window.removeEventListener('resize', handleSize)
        }
    }, [])
    const [placeholder, setPlaceholder] = useState([
    {
        id: 0,
        name: 'Maria João',
        date: Date.now(),
        review: 'Estudar no Colégio Pitruca Camama foi uma experiência transformadora! A dedicação dos professores e o ambiente acolhedor fazem toda a diferença. Recomendo a todos!',
        via: 'Facebook',
    },
    {
        id: 1,
        name: 'Joana Almeida',
        date: Date.now(),
        review: 'A infraestrutura do Colégio Pitruca Nova Vida é excelente, com laboratórios modernos e bibliotecas bem equipadas. Sinto que meu filho está preparado para um futuro brilhante.',
        via: 'Instagram',
    },
    {
        id: 2,
        name: 'Pedro Nascimento',
        date: Date.now(),
        review: 'O Colégio Pitruca Camama oferece cursos e atividades inovadoras. Meu filho está sendo preparado para liderar e inovar no futuro.',
        via: 'Facebook',
    },
    {
        id: 3,
        name: 'Sofia Lopes',
        date: Date.now(),
        review: 'No Pitruca Camama Patriota, promovem um ambiente acadêmico saudável e colaborativo. Fiz grandes amizades e estou confiante na minha evolução como cidadão crítico e criativo.',
        via: 'Instagram',
    },
    {
        id: 4,
        name: 'Ricardo Mendez',
        date: Date.now(),
        review: 'Os eventos e palestras nos Colégios Pitruca Benguela são incríveis! Sempre aprendemos com profissionais renomados e estamos inspirados a fazer a diferença.',
        via: 'Facebook',
    },
    {
        id: 5,
        name: 'Luís Almeida',
        date: Date.now(),
        review: 'Recomendo o Colégio Pitruca Benguela para os pais que querem confiar na formação de seus filhos. A coordenação é organizada e comprometida com o desenvolvimento de cada estudante.',
        via: 'Instagram',
    },
    // Avaliações de pais
    {
        id: 6,
        name: 'Ana Pereira',
        date: Date.now(),
        review: 'Desde que meu filho começou no Colégio Pitruca Nova Vida, notei uma grande evolução em seu comportamento e aprendizado. A dedicação da equipe é admirável.',
        via: 'Facebook',
    },
    {
        id: 7,
        name: 'Carlos Silva',
        date: Date.now(),
        review: 'A segurança, o cuidado e a qualidade do ensino no Colégio Pitruca Camama me deixam tranquila. Minha filha adora ir para a escola todos os dias.',
        via: 'Instagram',
    },
    {
        id: 8,
        name: 'Beatriz Santos',
        date: Date.now(),
        review: 'Confiamos no Colégio Pitruca Benguela por sua reputação e pelos valores sólidos que ensinam. Nosso filho está crescendo como um cidadão responsável e criativo.',
        via: 'Facebook',
    },
    {
        id: 9,
        name: 'Sofia Ramos',
        date: Date.now(),
        review: 'A atenção individualizada e o ambiente estimulante no Colégio Pitruca Camama fazem dele a melhor escolha para a educação do nosso filho. Ele está muito feliz!',
        via: 'Instagram',
    },
    {
        id: 10,
        name: 'Miguel Ramos',
        date: Date.now(),
        review: 'Ver o desenvolvimento da nossa filha no Colégio Pitruca Nova Vida nos dá muita confiança. Uma educação de excelência com valores que fazem a diferença.',
        via: 'Facebook',
    },
])
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        axios.get(`${baseURL}/api/homeContents`)
        .then(res => {
            let revs = [...[...res.data][0].testemunhos]
            setReviews(revs.filter((item) => {
                if (item.show == undefined){
                    return item
                }else if (item.show == true){
                    return item
                }
            }))
            //('test', revs)


    })
    }, [])
    
    return (
        <div className="principlesContainer">
            <div className='principlesContainer1'>
                <div className='title'>O que as pessoas dizem sobre nós</div>
                <Marquee speed={50} gradient gradientWidth={size > 500 ? size / 200 * 20 : 50} gradientColor='white' pauseOnClick pauseOnHover style={{
                    display: 'flex',
                    justifyContent: 'stretch',

                    
                }}>
                    {reviews.length > 1 ? 
                    reviews.slice(0, reviews.length/2).map((review, index) => {
                        return (
                            <div key={index} class="card" >
                    <div class="cardTop">
                        <div class="cardInfo">
                            <div class="cardStars">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                            </div>
                            <div class="cardName">{review?.nome}</div>
                            <div class="cardData">{new Date(review.data).getDate()}/{new Date(review.data).getMonth()+1}/{new Date(review.data).getFullYear()} via {review.via}</div>
                        </div>
                        {review.via.toLocaleLowerCase() == 'facebook' ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                        </svg> : 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                      </svg>}
                    </div>
                    <div class="cardBottom">
                    {review.testemunho}
                    </div>
                </div>
                        )
                    })
                    :
                        placeholder.slice(0, 3).map((review, index) => {
                            return (
                                <div key={index} class="card" >
                    <div class="cardTop">
                        <div class="cardInfo">
                            <Skeleton style={{background: '#e3e3e3', margin: 0, padding: 0}} className='cardStars'/>
                            
                            <Skeleton style={{background: '#e3e3e3', margin: 0, padding: 0}} className='cardName'/>
                            <Skeleton style={{background: '#e3e3e3', margin: 0, padding: 0}} className='cardData'/>
                            <div style={{opacity: 0}} class="cardData">{new Date(review.date).getDate()}/{new Date(review.date).getMonth()+1}/{new Date(review.date).getFullYear()} via {review.via}</div>
                        </div>
                        <Skeleton style={{background: '#e3e3e3', margin: 0, padding: 0, width: 30, height: 30}} className='cardName'/>
                    </div>
                    <Skeleton style={{background: '#e3e3e3', margin: 0, padding: 0}}  count={2}/>
                    
                </div>
                            )
                        })
                    }
                </Marquee>
                {/* switch direction */}
                <Marquee direction='right' speed={50} gradient gradientColor='white' gradientWidth={size > 500 ? size / 200 * 20 : 50} pauseOnClick pauseOnHover style={{
                    display: 'flex',
                    
                }}>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'stretch', flex: 1, }}>
                    {reviews.length > 2 ? 
                    reviews.slice(reviews.length/2).map((review, index) => {
                        return (
                            <div key={index} class="card" >
                    <div class="cardTop">
                        <div class="cardInfo">
                            <div class="cardStars">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                            </div>
                            <div class="cardName">{review?.nome}</div>
                            <div class="cardData">{new Date(review.data).getDate()}/{new Date(review.data).getMonth()+1}/{new Date(review.data).getFullYear()} via {review.via}</div>
                        </div>
                        {review.via.toLocaleLowerCase() == 'facebook' ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                        </svg> : 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                      </svg>}
                    </div>
                    <div class="cardBottom">
                    {review.testemunho}
                    </div>
                </div>
                        )
                    
                    })
                    :
                        placeholder.slice(0, 3).map((review, index) => {
                            return (
                                <div key={index} class="card" >
                    <div class="cardTop">
                        <div class="cardInfo">
                            <Skeleton style={{background: '#e3e3e3', margin: 0, padding: 0}} className='cardStars'/>
                            
                            <Skeleton style={{background: '#e3e3e3', margin: 0, padding: 0}} className='cardName'/>
                            <Skeleton style={{background: '#e3e3e3', margin: 0, padding: 0}} className='cardData'/>
                            <div style={{opacity: 0}} class="cardData">{new Date(review.date).getDate()}/{new Date(review.date).getMonth()+1}/{new Date(review.date).getFullYear()} via {review.via}</div>
                        </div>
                        <Skeleton style={{background: '#e3e3e3', margin: 0, padding: 0, width: 30, height: 30}} className='cardName'/>
                    </div>
                    <Skeleton style={{background: '#e3e3e3', margin: 0, padding: 0}}  count={2}/>
                    
                </div>
                            )
                        })
                    }
                    </div>
                </Marquee>
            </div>
        </div>
    )
}
export default Reviews