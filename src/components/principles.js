import { useNavigate } from 'react-router-dom'
import '../css/principles.css'
import Testimonials from './testimonials'
const Principles = ({departments, setDepartments}) => {
    const navigate = useNavigate()
    return (
        <div className="principlesContainer" id='principlesContainer' style={{}}>
            <div className="principlesContainer1">
                <div className='title'>Promovemos ideais e humanidade</div>
                

                {/* testimonials */}
                <div className=''>
                    <Testimonials departments={departments} setDepartments={setDepartments}/>
                </div>



                {/* <div style={{display: 'flex', height: '100%'}}>
                    <section className='values'>
                        <section className='value'>
                            <div className='imgContainer'><img loading="lazy"src={process.env.PUBLIC_URL + '/images/service1.png'}/></div>
                            <div className='valueInfo'>
                                <div className='title'>Impacto na comunidade</div>
                                <div className='description'> Investimos em Luanda em áreas como saúde, educação, crescimento econômico e artes.</div>
                                <div className='valueButton' onClick={() => {
                                    navigate('/impact')
                                }}>Saber Mais</div>
                                </div>
                        </section>
                        <section className='value1'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-arms-up" viewBox="0 0 16 16">
                                    <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                                    <path d="m5.93 6.704-.846 8.451a.768.768 0 0 0 1.523.203l.81-4.865a.59.59 0 0 1 1.165 0l.81 4.865a.768.768 0 0 0 1.523-.203l-.845-8.451A1.5 1.5 0 0 1 10.5 5.5L13 2.284a.796.796 0 0 0-1.239-.998L9.634 3.84a.7.7 0 0 1-.33.235c-.23.074-.665.176-1.304.176-.64 0-1.074-.102-1.305-.176a.7.7 0 0 1-.329-.235L4.239 1.286a.796.796 0 0 0-1.24.998l2.5 3.216c.317.316.475.758.43 1.204Z"/>
                                </svg>
                                <div className='title'>Ética e Transparência</div>
                                <div className='description'>Dedicamo-nos a apoiar o desenvolvimento académico, pessoal e profissional dos nossos alunos para garantir o seu sucesso</div>
                    
                        </section>
                        <section className='value1'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-arms-up" viewBox="0 0 16 16">
                                    <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                                    <path d="m5.93 6.704-.846 8.451a.768.768 0 0 0 1.523.203l.81-4.865a.59.59 0 0 1 1.165 0l.81 4.865a.768.768 0 0 0 1.523-.203l-.845-8.451A1.5 1.5 0 0 1 10.5 5.5L13 2.284a.796.796 0 0 0-1.239-.998L9.634 3.84a.7.7 0 0 1-.33.235c-.23.074-.665.176-1.304.176-.64 0-1.074-.102-1.305-.176a.7.7 0 0 1-.329-.235L4.239 1.286a.796.796 0 0 0-1.24.998l2.5 3.216c.317.316.475.758.43 1.204Z"/>
                                </svg>
                                <div className='title'>Espírito crítico</div>
                                <div className='description'>Dedicamo-nos a apoiar o desenvolvimento académico, pessoal e profissional dos nossos alunos para garantir o seu sucesso</div>
                        </section>
                        <section className='value1'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-arms-up" viewBox="0 0 16 16">
                                    <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                                    <path d="m5.93 6.704-.846 8.451a.768.768 0 0 0 1.523.203l.81-4.865a.59.59 0 0 1 1.165 0l.81 4.865a.768.768 0 0 0 1.523-.203l-.845-8.451A1.5 1.5 0 0 1 10.5 5.5L13 2.284a.796.796 0 0 0-1.239-.998L9.634 3.84a.7.7 0 0 1-.33.235c-.23.074-.665.176-1.304.176-.64 0-1.074-.102-1.305-.176a.7.7 0 0 1-.329-.235L4.239 1.286a.796.796 0 0 0-1.24.998l2.5 3.216c.317.316.475.758.43 1.204Z"/>
                                </svg>
                                 <div className='title'>A ausência de discriminação</div>
                                <div className='description'>Dedicamo-nos a apoiar o desenvolvimento académico, pessoal e profissional dos nossos alunos para garantir o seu sucesso</div>
                         </section>
                        <section className='value'>
                            <div className='imgContainer'><img loading="lazy"src={process.env.PUBLIC_URL + '/images/expo.png'}/></div>
                            <div className='valueInfo'>
                                <div className='title'>Exposições Académicas</div>
                                <div className='description'> Estamos constantemente envolvidos em Simpósios e Exposições Académicas, promovendo a colaboração e inovação em diversas áreas.</div>
                                <div className='valueButton'  onClick={() => {
                                    navigate('/soon')
                                }}>Saber Mais</div>
                                </div>
                        </section>
                        <section className='value1'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-arms-up" viewBox="0 0 16 16">
                                    <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                                    <path d="m5.93 6.704-.846 8.451a.768.768 0 0 0 1.523.203l.81-4.865a.59.59 0 0 1 1.165 0l.81 4.865a.768.768 0 0 0 1.523-.203l-.845-8.451A1.5 1.5 0 0 1 10.5 5.5L13 2.284a.796.796 0 0 0-1.239-.998L9.634 3.84a.7.7 0 0 1-.33.235c-.23.074-.665.176-1.304.176-.64 0-1.074-.102-1.305-.176a.7.7 0 0 1-.329-.235L4.239 1.286a.796.796 0 0 0-1.24.998l2.5 3.216c.317.316.475.758.43 1.204Z"/>
                                </svg>
                                <div className='title'>A ausência de discriminação</div>
                                <div className='description'>Dedicamo-nos a apoiar o desenvolvimento académico, pessoal e profissional dos nossos alunos para garantir o seu sucesso</div>
                    
                        </section>
                        <section className='value1'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-arms-up" viewBox="0 0 16 16">
                                    <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                                    <path d="m5.93 6.704-.846 8.451a.768.768 0 0 0 1.523.203l.81-4.865a.59.59 0 0 1 1.165 0l.81 4.865a.768.768 0 0 0 1.523-.203l-.845-8.451A1.5 1.5 0 0 1 10.5 5.5L13 2.284a.796.796 0 0 0-1.239-.998L9.634 3.84a.7.7 0 0 1-.33.235c-.23.074-.665.176-1.304.176-.64 0-1.074-.102-1.305-.176a.7.7 0 0 1-.329-.235L4.239 1.286a.796.796 0 0 0-1.24.998l2.5 3.216c.317.316.475.758.43 1.204Z"/>
                                </svg>
                                <div className='title'>A ausência de discriminação</div>
                                <div className='description'>Dedicamo-nos a apoiar o desenvolvimento académico, pessoal e profissional dos nossos alunos para garantir o seu sucesso</div>
                    
                        </section>
                        <section className='value1'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-arms-up" viewBox="0 0 16 16">
                                    <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                                    <path d="m5.93 6.704-.846 8.451a.768.768 0 0 0 1.523.203l.81-4.865a.59.59 0 0 1 1.165 0l.81 4.865a.768.768 0 0 0 1.523-.203l-.845-8.451A1.5 1.5 0 0 1 10.5 5.5L13 2.284a.796.796 0 0 0-1.239-.998L9.634 3.84a.7.7 0 0 1-.33.235c-.23.074-.665.176-1.304.176-.64 0-1.074-.102-1.305-.176a.7.7 0 0 1-.329-.235L4.239 1.286a.796.796 0 0 0-1.24.998l2.5 3.216c.317.316.475.758.43 1.204Z"/>
                                </svg>
                                <div className='title'>O mérito individual</div>
                                <div className='description'>Dedicamo-nos a apoiar o desenvolvimento académico, pessoal e profissional dos nossos alunos para garantir o seu sucesso</div>
                    
                        </section>
                        <section className='value1'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-arms-up" viewBox="0 0 16 16">
                                    <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                                    <path d="m5.93 6.704-.846 8.451a.768.768 0 0 0 1.523.203l.81-4.865a.59.59 0 0 1 1.165 0l.81 4.865a.768.768 0 0 0 1.523-.203l-.845-8.451A1.5 1.5 0 0 1 10.5 5.5L13 2.284a.796.796 0 0 0-1.239-.998L9.634 3.84a.7.7 0 0 1-.33.235c-.23.074-.665.176-1.304.176-.64 0-1.074-.102-1.305-.176a.7.7 0 0 1-.329-.235L4.239 1.286a.796.796 0 0 0-1.24.998l2.5 3.216c.317.316.475.758.43 1.204Z"/>
                                </svg>
                                <div className='title'>A liberdade académica</div>
                                <div className='description'>Dedicamo-nos a apoiar o desenvolvimento académico, pessoal e profissional dos nossos alunos para garantir o seu sucesso</div>
                    
                        </section>
                    </section>
                </div> */}
               
            </div>
        </div>
    )
}
export default Principles

{/* <section className='principle' style={{marginTop: 15}}>
                    <div className='principleInfo'>
                        <div className='title'>Experiência Transformadora no <span>ISPAJ</span></div>
                        <div className='description'>Junte-se a uma longa tradição de excelência acadêmica e envolvimento da comunidade que molda líderes e pensadores.</div>


                        

                        <div className='principleIcons'>
                            <section className='principleIcon'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mortarboard-fill" viewBox="0 0 16 16">
  <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917z"/>
  <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466z"/>
                            </svg>
                                <div className='title'>Excelência Académica</div>
                                <div className='description'>Empenhados em manter os mais elevados padrões de ensino e aprendizagem</div>
                            </section>

                            <section className='principleIcon'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lightbulb-fill" viewBox="0 0 16 16">
                                <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5"/>
                            </svg>
                                <div className='title'>Inovação e Investigação</div>
                                <div className='description'>Incentivamos o pensamento inovador e a investigação inovadora</div>
                            </section>

                            <section className='principleIcon'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                            </svg>
                                <div className='title'>Sucesso dos Alunos</div>
                                <div className='description'>Dedicamo-nos a apoiar o desenvolvimento académico, pessoal e profissional dos nossos alunos para garantir o seu sucesso</div>
                            </section>

                            <section className='principleIcon'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-arms-up" viewBox="0 0 16 16">
                                <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                                <path d="m5.93 6.704-.846 8.451a.768.768 0 0 0 1.523.203l.81-4.865a.59.59 0 0 1 1.165 0l.81 4.865a.768.768 0 0 0 1.523-.203l-.845-8.451A1.5 1.5 0 0 1 10.5 5.5L13 2.284a.796.796 0 0 0-1.239-.998L9.634 3.84a.7.7 0 0 1-.33.235c-.23.074-.665.176-1.304.176-.64 0-1.074-.102-1.305-.176a.7.7 0 0 1-.329-.235L4.239 1.286a.796.796 0 0 0-1.24.998l2.5 3.216c.317.316.475.758.43 1.204Z"/>
                            </svg>
                                <div className='title'>Envolvimento com a comunidade</div>
                                <div className='description'>Envolvemo-nos ativamente com as nossas comunidades locais, contribuindo para o bem-estar social.</div>
                            </section>
                        </div>

                    </div>
                    
                    <div className='principleImageContainer'>
                        <img loading="lazy"src={process.env.PUBLIC_URL + '/images/class.png'}/>
                    </div>
                </section> */}