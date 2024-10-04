import '../css/bolsas.css'
import { useLocation, useNavigate } from "react-router-dom"
import Footer from "../components/footer"
import Header from "../components/header"
import { useEffect, useRef, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import { baseURL } from "../api/api"
import Lottie from "lottie-react"
import { Popover, PopoverContent, PopoverTrigger } from '../@/components/ui/popover'
import { format } from 'date-fns'
import { Calendar } from '../@/components/ui/calendar'

const Bolsa = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [section, setSection] = useState('Bolsa de professores')
    const [load, setLoad] = useState(false)
    const [errors, setErrors] = useState([])
    const [dateAdded, setDateAdded] = useState(new Date())
    const [selectedDoc, setSelectedDoc] = useState(null)
    const [name, setName] = useState('')
    const [nacionalidade, setNacionalidade] = useState('')
    const [residencia, setResidencia] = useState('')
    const [contacto, setContacto] = useState('')
    const [email, setEmail] = useState('')


    const secondContainerRef = useRef(null)
    
    const send = () => {
        setErrors([])
        setLoad(true)
        const r = /^[^\s]*@[a-z0-9.-]*\.[a-z]{2,6}$/
        if (name.length == 0 || nacionalidade.length == 0 || residencia.length == 0 || contacto.length == 0 || email.length == 0 || !selectedDoc){
            setErrors(['Preencha por favor todos os campos.'])
            setLoad(false)
        }else if (!r.test(email)){
            setErrors(['Formato de email inválido!'])
            setLoad(false) 
        }else if (new Date(dateAdded).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)){
            setErrors(['Data de nascimento inválida!']) 
            setLoad(false)
        // }else if (new Date().getFullYear() - new Date(dateAdded) < 18) {
        //     setErrors(['Precisas de mais de 18 anos de idade!']) 
        // }else {
            
        }else {
            //('doc', selectedDoc)
            axios.post(`${baseURL}/api/send-email`, {
                name: `Nome: ${name}; Email: ${email};Contacto: ${contacto}`,
                email: 'ricardoyosai1610@gmail.com',
                title: 'Candidatura para docente/não docente',
                body: `Nome: ${name};\nData de nascimento: ${format(new Date(dateAdded), 'dd/MM/yyyy')};\nNacionalidade: ${nacionalidade};\nResidência: ${residencia};\nContacto: ${contacto};\n\n\nNesse email encontra-se anexado o curriculum do candidato \n`,
                fromEmail: email,
                document: selectedDoc
            },{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(res => {
                //('response', res.data)
                setName('')
                setDateAdded(new Date())
                setNacionalidade('')
                setResidencia('')
                setContacto('')
                setEmail('')
                setSelectedDoc(null)
                toast('Email enviado com sucesso!')
                setLoad(false)
            })
            .catch(err => {
                toast(err.response.data.message)
                setLoad(false)
            })
        }
        
        
    }
    useEffect(() => {
        const adjustMargin = () => {
            if (secondContainerRef.current) {
                const outerContainerHeight = document.querySelector('.outerContainer')?.clientHeight + 20 || 0;
                secondContainerRef.current.style.marginTop = `${outerContainerHeight}px`;
            }
        };

        const intervalId = setInterval(() => {
            adjustMargin(); // Call the function to adjust margin at regular intervals
        }, 1); // Adjust the interval time as needed

        // Cleanup the interval on component unmount
        return () => {
            clearInterval(intervalId);
        };
    })
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className="abtCont">
            <Header />
            <Toaster/>

            <div className='newsArticleContainer' ref={secondContainerRef} style={{marginTop: document.querySelector('.outerContainer')?.clientHeight + 20}}>
                <div className='firstCont'>
                <div className="navigation" style={{margin: 0, marginBottom: 30}}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-map-fill" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.598-.49L10.5.99 5.598.01a.5.5 0 0 0-.196 0l-5 1A.5.5 0 0 0 0 1.5v14a.5.5 0 0 0 .598.49l4.902-.98 4.902.98a.5.5 0 0 0 .196 0l5-1A.5.5 0 0 0 16 14.5zM5 14.09V1.11l.5-.1.5.1v12.98l-.402-.08a.5.5 0 0 0-.196 0zm5 .8V1.91l.402.08a.5.5 0 0 0 .196 0L11 1.91v12.98l-.5.1z"/>
                  </svg>
                  <span onClick={() => {
                              navigate('/')
                          }}>Home</span> <span>{'>'}</span><span>{section}</span>
                </div>
                <div className="bolsasContainer" style={{maxWidth: '100%', margin: 0}}>
                    <section className="leftSide">
                            <img loading="lazy"src={process.env.PUBLIC_URL + '/images/lab.png'}/>
                            <div className="info">
                                <div className='logoContainer' >
                
                                    <img loading="lazy"onClick={() => location.pathname != '/' && navigate('/')} alt='logo' className='logo' src={process.env.PUBLIC_URL + '/images/logotrans.png'}/>
                                    <div onClick={() => location.pathname != '/' && navigate('/')} className='logoTextCont'>
                                        <div className='logoText'>instituto superior politécnico alvorecer da juventude</div>
                                    </div>
                            {/*  */}
                                </div>
                                <div className="bottom">
                                    <div className="bottomText">"Existimos para formar profissionais de excelência"</div>
                                </div>
                            </div>
                    </section>
                    <section className="rightSide">
                        <div className="info" style={{maxWidth: 1000, width: '100%'}}>
                            <div className="title">Bolsas de professores</div>
                            <div className="description" style={{fontSize: 13}}>O ISPAJ mantem aberto permanentemente a bolsa de professores, visando satisfazer as necessidades da Instituição e dos docentes. </div>
                            <div className='description' style={{fontSize: 13}}>
                            Os candidatos, devem sentir-se preparados para o ensino, terem experiência e o título mínimo de Licenciaturas. Tem preferencia os Doutores e Mestres.
                            </div>
                            <div className="form">
                                <div className="label">Nome completo</div>
                                <input value={name} placeholder="Nome completo..." className="loginInput"onChange={(e) => {
                                    setName(e.target.value)
                                }}/>
                            </div>
                            <div className='form'>
                                <div className='label'>Data de nascimento</div>
                                <Popover>
                                    <PopoverTrigger style={{maxWidth: 250}} onClick={() => {
                                        
                                    }}>
                                        <div style={{maxWidth: 250, textAlign: 'left'}} placeholder={format(dateAdded, 'PPP')} disabled className='loginInput'>{dateAdded.getDate()}/{dateAdded.getMonth()+1}/{dateAdded.getFullYear()}</div>
                                    </PopoverTrigger>
                                    <PopoverContent className='w-auto p-0'>
                                    <section style={{all: 'unset'}}>
                                    <span>
                                    <Calendar
                                    mode="single"

                                    maxDate={new Date()}
                                    selected={dateAdded}
                                    onSelect={setDateAdded}
                                    initialFocus
                                    />
                                    </span>
                                    </section>
                                    </PopoverContent>
                                </Popover>
                    
                            </div>
                            <div className="form">
                                <div className="label">Nacionalidade</div>
                                <input value={nacionalidade} placeholder="Nacionalidade..." className="loginInput"onChange={(e) => {
                                    setNacionalidade(e.target.value)
                                }}/>
                            </div>
                            <div className="form">
                                <div className="label">Residência </div>
                                <input value={residencia} placeholder="Residência..." className="loginInput"onChange={(e) => {
                                    setResidencia(e.target.value)
                                }}/>
                            </div>
                            <div className="form">
                                <div className="label">Contacto</div>
                                <input value={contacto} placeholder="Contacto..." className="loginInput"onChange={(e) => {
                                    setContacto(e.target.value)
                                }}/>
                            </div>
                            <div className="form">
                                <div className="label">Email</div>
                                <input value={email} type='email' placeholder="Email..." className="loginInput"onChange={(e) => {
                                    setEmail(e.target.value)
                                }}/>
                            </div>
                            
                            <div className="form">
                                    <div className="label">Curriculum </div>
                                    <input value={''} className='imageInput3' type='file' accept='application/pdf'  onChange={(e)=>{
                                        setSelectedDoc(e.target.files[0])
                                    }}/>
                                    {selectedDoc &&
                                   <div style={{}}>
                                    <embed className='orgChart' src={URL.createObjectURL(selectedDoc)} style={{width: '100%', aspectRatio: 2/1.5}} />
                                    </div>}
                                    
                                    {/* <input value={''} className='imageInput2' type='file' accept='video/*'  onChange={(e)=>{
                                        setSelectedVideo()
                                        setVideoPreview(e.target.files[0])
                                        // let file = e.target.files[0]
                                        // if (file){
                                        //     const reader = new FileReader()
                                        //     reader.onload = (event) => {
                                        //         setSelectedImage(event.target.result)
                                        //         //('data', event.target.result)
                                        //     }
                                        //     reader.readAsDataURL(file)
                                        // }else {
                                        //     setSelectedImage(null)
                                        // }
                                    }}/>
                                   {videoPreview &&
                                   <div className='selectedVideo'>
                                    <video loading="lazy"  src={URL.createObjectURL(videoPreview)} loop muted controls />
                                    </div>}
                                    */}
                                </div>
                            <div className="errors">
                                {errors.length > 0 && errors.map((item, index) => {
                                    return (
                                        <div className="error" key={index}>
                                            {item}
                                        </div>
                                    )
                                })}
                            </div>
                            {load && <Lottie rendererSettings={
                            {
                                preserveAspectRatio: 'xMidYMid slice'
                            }
                            } autoplay loop animationData={require('../components/lottie1.json')} height={400} width={400}/>}
                            {!load && <div style={{paddingBottom: 50}}>
                                <div style={{}}className="valueButton" onClick={() => {
                                    send()
                                }}>
                                    Enviar
                                </div>
                            </div>}
                        </div>
                    </section>
                </div>
            </div>
            </div>

            <Footer />
        </div>
    )
}
export default Bolsa