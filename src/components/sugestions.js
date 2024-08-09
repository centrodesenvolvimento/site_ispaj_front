import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import '../css/sugestions.css'
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import { baseURL } from "../api/api"
import Lottie from "lottie-react"

const Sugestions = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [errors, setErrors] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [contacto, setContacto] = useState('')
    const [assunto, setAssunto] = useState('')
    const [mensagem, setMensagem] = useState('')
    const [load, setLoad] = useState(false)
    
    const send = () => {
        setErrors([])
        setLoad(true)
        const r = /^[^\s]*@[a-z0-9.-]*\.[a-z]{2,6}$/
    //   if (email1.length == 0 || email2.length == 0 || phone1.length == 0 || phone2.length == 0 || localizacao == 0){
    //     setErrors(['Preencha por favor todos os campos!'])
    //   }else if (!r.test(email1) || !r.test(email2)){
    //     setErrors(['Formato de email inválido!']) 
    //   }else if (email1 == email2){
    //     setErrors(['Email 2 tem de ser diferente do 1!']) 
    //   }else if (phone1 == phone2){
    //     setErrors(['Telefone 2 tem de ser diferente do 1!']) 
    //   }else {
        if (name.length == 0 || email.length == 0 || contacto.length == 0 || assunto.length == 0 || mensagem.length == 0){
            setErrors(['Preencha por favor todos os campos!'])
            setLoad(false)

        }else if (!r.test(email)){
            setErrors(['Formato de email inválido!']) 
            setLoad(false)

        }else if (load){

        }else  {
            axios.post(`${baseURL}/api/send-email`, {
                name: `Nome: ${name}; Email: ${email};Contacto: ${contacto}`,
                email: 'ricardoyosai1610@gmail.com',
                title: assunto,
                body: mensagem,
                fromEmail: email
            })
            .then(res => {
                setName('')
                setEmail('')
                setContacto('')
                setAssunto('')
                setMensagem('')
                toast("Mensagem enviada com sucesso!")
                setLoad(false)


            })
            .catch(err => {
                toast(err.response.data.message)
                setLoad(false)

            })
        }
    }
    const [see, setSee] = useState(false)
    const [animationData, setAnimationData] = useState(null)
    useEffect(() => {
        // Fetch the Lottie JSON animation file
        fetch('http://localhost:3000/images/lottie1.json')
          .then(response => response.json())
          .then(data => setAnimationData(data))
          .catch(error => console.error('Error loading animation data:', error));
      }, []);
      const secondContainerRef = useRef(null)
    useEffect(() => {
        if (secondContainerRef.current){
            secondContainerRef.current.style.marginTop = document.querySelector('.outerContainer')?.clientHeight
        }
    })
    return (
        <div style={{display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', }}>
            <Toaster/>
            <div className="container1" style={{width: '100%', height: '100%'}}>
                <div className="sugestionsContainer" style={{maxWidth: '100%', margin: 0}}>
                    <section className="leftSide">
                            <img src={process.env.PUBLIC_URL + '/images/post2.png'}/>
                            <div className="info">
                                <div className='logoContainer' >
                
                                    <img onClick={() => location.pathname != '/' && navigate('/')} alt='logo' className='logo' src={process.env.PUBLIC_URL + '/images/logotrans.png'}/>
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
                            <div className="title">Sugestões e Reclamações</div>
                            <div className="description">Envie sugestões e reclamações para nós</div>
                            <div className="form">
                                <div className="label">Nome Completo</div>
                                <input value={name} placeholder="Nome completo..." className="loginInput"onChange={(e) => {
                                    setName(e.target.value)
                                }}/>
                            </div>
                            <div className="form">
                                <div className="label">Email</div>
                                <input type="email" value={email} placeholder="Email..." className="loginInput"onChange={(e) => {
                                    setEmail(e.target.value)
                                }}/>
                            </div>
                            <div className="form">
                                <div className="label">Contacto</div>
                                <input value={contacto} placeholder="Contacto..." className="loginInput"onChange={(e) => {
                                    setContacto(e.target.value)
                                }}/>
                            </div>
                            <div className="form">
                                <div className="label">Assunto</div>
                                <input value={assunto} placeholder="Assunto..." className="loginInput"onChange={(e) => {
                                    setAssunto(e.target.value)
                                }}/>
                            </div>
                            <div className="form">
                                <div className="label">Mensagem</div>
                                <textarea value={mensagem} onChange={(e)=>{
                                    setMensagem(e.target.value)
                                }} placeholder='Mensagem...' className='loginInput' style={{height: 100}}/>
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
                            {!load && <div className="valueButton" onClick={() => {
                                send()
                            }}>
                                Enviar
                            </div>}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
export default Sugestions