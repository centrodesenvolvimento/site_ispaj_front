import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import '../css/login.css'
import axios from "axios"
import { baseURL } from "../api/api"

const Login = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const login = () => {
        // navigate('/admin')
        //('1')
        if (email.length == 0 || password.length == 0){
            setErrors(['Preencha por favor todos os campos.'])
        }else {
            setErrors([])

            axios.post(`${baseURL}/api/auth/login`, {
                email: email,
                password: password
            })
            .then(res => {
                localStorage.setItem('token', JSON.stringify(res.data.access_token))
                localStorage.setItem('user', JSON.stringify(res.data.access_token.user))
                localStorage.setItem('password', password)
                navigate('/admin')
            })
            .catch(err => {
                if ( err.response.data.error == 'Unauthorized'){
                    setErrors(['Nenhum utilizador activo com as credenciais fornecidas. Tente novamente.'])
                }else {
                    setErrors([err.response.data.error])
                }
            })
        }
    }
    const [see, setSee] = useState(false)
    
    return (
        <div style={{display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center'}}>
            <div className="loginContainer">
                <section className="leftSide">
                        <img loading="lazy"src={process.env.PUBLIC_URL + '/images/pitrucas.svg'}/>
                        <div className="info">
                            <div className='logoContainer' >
            
                                <img loading="lazy"onClick={() => location.pathname != '/' && navigate('/')} alt='logo' className='logo' src={process.env.PUBLIC_URL + '/images/logotrans.png'}/>
                                <div onClick={() => location.pathname != '/' && navigate('/')} className='logoTextCont'>
                                    <div className='logoText'>grupo colégios pitruca</div>
                                </div>
                        {/*  */}
                            </div>
                            <div className="bottom">
                                <div className="bottomText" style={{fontSize: 15}}>"Formamos líderes do amanhã com base em valores sólidos, qualidade educacional e inovação pedagógica."</div>
                            </div>
                        </div>
                </section>
                <section className="rightSide">
                    <div className="info">
                        <div className="title">Painel Administrativo</div>
                        <div className="description">Faça login para aceder ao painel administrativo</div>
                        <div className="form">
                            <div className="label">Email</div>
                            <input placeholder="Email..." className="loginInput" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="form">
                            <div className="label">Senha</div>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <input style={{borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRight: 0}}
                                security="false" placeholder="Senha..."
                                type={see ? 'text': 'password'}
                                className="loginInput" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <span style={{height: '100%', borderWidth: 1, borderColor: '#e2e2e2', height: 35, width: 35, display: 'flex', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 5, borderBottomRightRadius:5, cursor: 'pointer'}}
                                onClick={() => {
                                    setSee(!see)
                                }}>
                                    {
                                        see ?
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                                      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                                      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                                      <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
                                    </svg>:
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                    </svg>
                                    }
                                </span>
                            </div>
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
                        <div className="valueButton" onClick={() => {
                            login()
                        }}>
                            Login
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
export default Login