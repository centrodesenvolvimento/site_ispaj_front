import '../css/adminEstAdmin.css'
import { useEffect, useRef, useState } from 'react'
import '../css/adminHome.css'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../@/components/ui/dialog'
import ReactCrop from 'react-image-crop'
import { ScrollArea } from '../@/components/ui/scroll-area'
import Cropper from 'react-easy-crop'
import getCroppedImg from './cropImage'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'
import { baseURL } from '../api/api'
import { Popover, PopoverContent, PopoverTrigger } from '../@/components/ui/popover'
import { format, setDate } from 'date-fns'
import { Calendar } from '../@/components/ui/calendar'
import { Select, SelectContent, SelectItem, SelectTrigger } from '../@/components/ui/select'
import { SelectValue } from '@radix-ui/react-select'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '../@/components/ui/alert-dialog' 
import { Edit, HeaderLabel } from './adminHome'
const AdminEstAdmin = () => {
    const [errors, setErrors] = useState([])
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')
    const [health, setHealth] = useState('')
    const [engine, setEngine] = useState('')
    const [social, setSocial] = useState('')
    const [doc, setDoc] = useState('')

    const saveValue = (item) => {
        setErrors([])
        setMessages([])
        if (value.length == 0){
            setErrors(['Preencha todos os campos!'])
        }else {
            axios.get(`${baseURL}/api/aboutContents`)
        .then(res => {
            let content = [...res.data][0]
            let administracao = !content.administracao ? {
                saude: 0,
                engenharia: 0,
                sociais: 0,
                nao_docentes: 0
            }: content.administracao
            
            axios.post(`${baseURL}/api/editAboutContent/any/1`, {
                administracao: {
                    ...administracao,
                    ...item
                }
            })
            .then(res => {
                setMessages(['Editado com successo'])
                console.log('res', res.data)
                window.location.reload()
            })
        })
        }
        
    }
    useEffect(() => {
        axios.get(`${baseURL}/api/aboutContents`)
        .then(res => {
            let content = [...res.data][0]
            if (content.administracao){
                setHealth(content.administracao.saude)
                setEngine(content.administracao.engenharia)
                setSocial(content.administracao.sociais)
                setDoc(content.administracao.nao_docentes)
            }else {
                setHealth(0)
                setEngine(0)
                setSocial(0)
                setDoc(0)
            }
        })
    }, [])
    return (
        <div className="dashboardContainer" id='adminHomeContainer'>
            <div className="title">Estrutura Administrativa</div>

            <div className='first' id='first1' style={{display: 'grid'}}>
                <section className='section'>
                    <div className='header'>
                        <HeaderLabel title='Professores em cargo no Departamento de Ciências e Saúde'/>
                        <Dialog>
                            <DialogTrigger onClick={() => {
                                setValue(health)
                            }}>
                                <Edit title='Editar'/>
                            </DialogTrigger>
                            <DialogContent style={{width: '100%', maxWidth: 300, display: 'flex', flexDirection: 'column'}}>
                            <DialogHeader>
                            <DialogTitle>Editar</DialogTitle>
                            <DialogDescription>
                                Editar professores em cargo no Departamento de Ciências e Saúde
                            </DialogDescription>
                            </DialogHeader>
                            <div className='sectionForms'>
                                
                                <div className="form">
                                <div className="label">Número de funcionários</div>
                                <input type='number' placeholder='Número de funcionários
...' value={value} onChange={(e) => setValue(e.target.value)} className='loginInput'/>
                                </div>
                            
                            <div className="errors">
                            {errors.length > 0 && errors.map((item, index) => {
                                return (
                                    <div className="error" key={index}>
                                        {item}
                                    </div>
                                )
                            })}
                            <div className="errors">
                            {messages.length > 0 && messages.map((item, index) => {
                                return (
                                    <div style={{color: 'green'}}  className="error" key={index}>
                                        {item}
                                    </div>
                                )
                            })}
                        </div>
                        {/* {load && <div>Processando...</div>} */}
                                <div className='buttons' style={{marginBottom: 50}}>
                                    <div onClick={() => {
                                        saveValue({
                                            'saude': value
                                        })
                                    }} className='save'>Guardar</div>

                                </div>
                                {/* <div className='' dangerouslySetInnerHTML={{__html: prMessage}}>
                                </div> */}
                                
                                </div>
  
                            </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className='valueCont'>
                        <div className='value'>{health}</div>
                    </div>
                </section>
                <section className='section'>
                    <div className='header'>
                        <HeaderLabel title='Professores em cargo no Departamento de Engenharia

'/>
                        <Dialog>
                            <DialogTrigger onClick={() => {
                                setValue(engine)
                            }}>
                                <Edit title='Editar'/>
                            </DialogTrigger>
                            <DialogContent style={{width: '100%', maxWidth: 300, display: 'flex', flexDirection: 'column'}}>
                            <DialogHeader>
                            <DialogTitle>Editar</DialogTitle>
                            <DialogDescription>
                                Editar professores em cargo no Departamento de Ciências e Saúde
                            </DialogDescription>
                            </DialogHeader>
                            <div className='sectionForms'>
                                
                                <div className="form">
                                <div className="label">Número de funcionários</div>
                                <input type='number' placeholder='Número de funcionários
...' value={value} onChange={(e) => setValue(e.target.value)} className='loginInput'/>
                                </div>
                            
                            <div className="errors">
                            {errors.length > 0 && errors.map((item, index) => {
                                return (
                                    <div className="error" key={index}>
                                        {item}
                                    </div>
                                )
                            })}
                            <div className="errors">
                            {messages.length > 0 && messages.map((item, index) => {
                                return (
                                    <div style={{color: 'green'}}  className="error" key={index}>
                                        {item}
                                    </div>
                                )
                            })}
                        </div>
                        {/* {load && <div>Processando...</div>} */}
                                <div className='buttons' style={{marginBottom: 50}}>
                                    <div onClick={() => {
                                        saveValue({
                                            'engenharia': value
                                        })
                                    }} className='save'>Guardar</div>

                                </div>
                                {/* <div className='' dangerouslySetInnerHTML={{__html: prMessage}}>
                                </div> */}
                                
                                </div>
  
                            </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className='valueCont'>
                        <div className='value'>{engine}</div>
                    </div>
                </section>
                <section className='section'>
                    <div className='header'>
                        <HeaderLabel title='Professores em cargo no Departamento de Ciências Sociais e Económicas
'/>
                        <Dialog>
                            <DialogTrigger onClick={() => {
                                setValue(social)
                            }}>
                                <Edit title='Editar'/>
                            </DialogTrigger>
                            <DialogContent style={{width: '100%', maxWidth: 300, display: 'flex', flexDirection: 'column'}}>
                            <DialogHeader>
                            <DialogTitle>Editar</DialogTitle>
                            <DialogDescription>
                                Editar professores em cargo no Departamento de Ciências e Saúde
                            </DialogDescription>
                            </DialogHeader>
                            <div className='sectionForms'>
                                
                                <div className="form">
                                <div className="label">Número de funcionários</div>
                                <input placeholder='Número de funcionários
...' value={value} type='number' onChange={(e) => setValue(e.target.value)} className='loginInput'/>
                                </div>
                            
                            <div className="errors">
                            {errors.length > 0 && errors.map((item, index) => {
                                return (
                                    <div className="error" key={index}>
                                        {item}
                                    </div>
                                )
                            })}
                            <div className="errors">
                            {messages.length > 0 && messages.map((item, index) => {
                                return (
                                    <div style={{color: 'green'}}  className="error" key={index}>
                                        {item}
                                    </div>
                                )
                            })}
                        </div>
                        {/* {load && <div>Processando...</div>} */}
                                <div className='buttons' style={{marginBottom: 50}}>
                                    <div onClick={() => {
                                        saveValue({
                                            'sociais': value
                                        })
                                    }} className='save'>Guardar</div>

                                </div>
                                {/* <div className='' dangerouslySetInnerHTML={{__html: prMessage}}>
                                </div> */}
                                
                                </div>
  
                            </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className='valueCont'>
                        <div className='value'>{social}</div>
                    </div>
                </section>
                <section className='section'>
                    <div className='header'>
                        <HeaderLabel title='Funcionários com qualificação de não docentes

'/>
                        <Dialog>
                            <DialogTrigger onClick={() => {
                                setValue(doc)
                            }}>
                                <Edit title='Editar'/>
                            </DialogTrigger>
                            <DialogContent style={{width: '100%', maxWidth: 300, display: 'flex', flexDirection: 'column'}}>
                            <DialogHeader>
                            <DialogTitle>Editar</DialogTitle>
                            <DialogDescription>
                                Editar professores em cargo no Departamento de Ciências e Saúde
                            </DialogDescription>
                            </DialogHeader>
                            <div className='sectionForms'>
                                
                                <div className="form">
                                <div className="label">Número de funcionários</div>
                                <input placeholder='Número de funcionários
...' value={value} type='number' onChange={(e) => setValue(e.target.value)} className='loginInput'/>
                                </div>
                            
                            <div className="errors">
                            {errors.length > 0 && errors.map((item, index) => {
                                return (
                                    <div className="error" key={index}>
                                        {item}
                                    </div>
                                )
                            })}
                            <div className="errors">
                            {messages.length > 0 && messages.map((item, index) => {
                                return (
                                    <div style={{color: 'green'}}  className="error" key={index}>
                                        {item}
                                    </div>
                                )
                            })}
                        </div>
                        {/* {load && <div>Processando...</div>} */}
                                <div className='buttons' style={{marginBottom: 50}}>
                                    <div onClick={() => {
                                        saveValue({
                                            'nao_docentes': value
                                        })
                                    }} className='save'>Guardar</div>

                                </div>
                                {/* <div className='' dangerouslySetInnerHTML={{__html: prMessage}}>
                                </div> */}
                                
                                </div>
  
                            </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className='valueCont'>
                        <div className='value'>{doc}</div>
                    </div>
                </section>
            </div>
        </div>
    )
}
export default AdminEstAdmin