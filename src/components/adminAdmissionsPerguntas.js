import { Edit, HeaderLabel } from './adminHome'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../@/components/ui/dialog'
import ReactCrop from 'react-image-crop'
import { Select, SelectContent, SelectItem, SelectTrigger } from '../@/components/ui/select'
import { SelectValue } from '@radix-ui/react-select'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '../@/components/ui/alert-dialog'
import { Popover, PopoverContent, PopoverTrigger } from '../@/components/ui/popover'
import { format, setDate } from 'date-fns'
import { Calendar } from '../@/components/ui/calendar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { baseURL } from '../api/api'
import Cropper from 'react-easy-crop'
import getCroppedImg from './cropImage'
import { Checkbox } from '../@/components/ui/checkbox'
import { ScrollArea } from '../@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../@/components/ui/sheet'
import '../css/adminHistory.css'
import ReactQuill from 'react-quill'
const AdminAdmissionsPerguntas = () => {
    const [dateAdded, setDateAdded] = useState(new Date())
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState([])
    const [messages, setMessages] = useState([])
    const [historial, setHistorial] = useState([])
    // const reviews = [
    //     {
    //         titulo: 'Início do Projecto de Construção do ISPAJ',
    //         dateAdded: new Date(),
    //         descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.'
    //     },
    //     {
    //         titulo: 'Criação da Promotora PDA',
    //         dateAdded: new Date(),
    //         descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.'
    //     },

    // ]
    const [perguntas, setPerguntas] = useState([])
    useEffect(()=> {
        axios.get(`${baseURL}/api/admissionsContents`)
        .then(res => {
            let content = [...res.data][0]
            setPerguntas(content.perguntas)
            console.log(content.emolumentos)
        })
        }, [])
    const addQuestion = () => {
        setErrors([])
        setMessages([])
        if (title.length == 0 || description.length == 0){
            setErrors(['Por favor preencha todos os campos!'])
        }
        else {
            axios.get(`${baseURL}/api/admissionsContents`)
            .then(res => {
                let obj = [...res.data][0]
                if ([...obj.perguntas].length > 0){
                    axios.post(`${baseURL}/api/editAdmissionsContent/any/${2}`, {
                        perguntas: [
                            
                            {
                                id: [...obj.perguntas].length + 1,
                                pergunta: title,
                                resposta: description,
                                dateAdded: new Date(),
                            },
                            ...[...obj.perguntas]
                        ]
                    })
                    .then(res => {
                        console.log('success', res.data)
                        setMessages(['Pergunta adicionada com sucesso.'])
                        window.location.reload()
                    })
                    .catch(err => {
                        console.log('err', err.response.data.message)
                    })
                }else {
                    console.log('ok')
                    axios.post(`${baseURL}/api/editAdmissionsContent/any/${2}`, {
                        perguntas: [
                            {
                                id: [...obj.perguntas].length + 1,
                                pergunta: title,
                                resposta: description,
                                dateAdded: new Date(),
                            }
                        ]
                    })
                    .then(res => {
                        console.log('success', res.data)
                        setMessages(['Pergunta adicionada com sucesso.'])
                        window.location.reload()
                    })
                    .catch(err => {
                        console.log('err', err.response.data.message)
                    })
                }
                
    })
        }
    }
    const editQuestion = (item) => {
        setErrors([])
        setMessages([])
        if (title.length == 0 || description.length == 0){
            setErrors(['Por favor preencha todos os campos!'])
        }else if (title == item.pergunta && description == item.resposta) {
            setErrors(['Nenhuma alteração feita!'])

        }else {
            axios.get(`${baseURL}/api/admissionsContents`)
            .then(res => {
                let obj = [...res.data][0]
                let perg = [...obj?.perguntas]
                let newPerg = perg.map((p) => {
                    if (p.id == item.id){
                        return {
                            id: item.id,
                            pergunta: title,
                            resposta: description,
                            dateAdded: new Date(),
                        }
                    }else {
                        return p
                    }
                })
                axios.post(`${baseURL}/api/editAdmissionsContent/any/${2}`, {
                    perguntas: newPerg
                })
                .then(res => {
                    console.log('success')
                    setMessages(['Pergunta editada com sucesso.'])
                    window.location.reload()
                })
                .catch(err => {
                    console.log('err', err.response.data.message)
                })

                
    })
        }
        
    }
    return (
        <div className="dashboardContainer" id='adminHomeContainer'>
            <div className="title">Perguntas Frequentes</div>
            <div className='first'>
            <section className='section'>
                    <div className='header'>
                        <HeaderLabel title='Perguntas Frequentes'/>
                        <Dialog>
                            <DialogTrigger onClick={() =>{
                                setTitle('')
                                setDescription('')
                            }}>
                                <Edit title='Adicionar'/>
                            </DialogTrigger>
                            <DialogContent style={{width: '100%', maxWidth: 1000, display: 'flex', flexDirection: 'column'}}>
                                <DialogHeader>
                                    <DialogTitle>Adicionar</DialogTitle>
                                    <DialogDescription>Adicionar uma pergunta</DialogDescription>

                                </DialogHeader>
                                <div className='sectionForms'>
                                    <div className='form'>
                                        <div className='label'>Pergunta</div>
                                        <input value={title} onChange={(e) => {
                                            setTitle(e.target.value)
                                        }} placeholder='Pergunta...' className='loginInput'/>
                                    </div>
                                    <div className='form'>
                                        <div className='label'>Resposta</div>
                                        <div className='textAreaContainer'>
                                            <ReactQuill placeholder='Resposta...' value={description} onChange={setDescription}/>
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

                            <div className="errors">
                            {messages.length > 0 && messages.map((item, index) => {
                                return (
                                    <div style={{color: 'green'}}  className="error" key={index}>
                                        {item}
                                    </div>
                                )
                            })}
                        </div>
                                    <div className='buttons' style={{marginBottom: 50}}>
                                    <div onClick={() => {
                                        addQuestion()
                                    }} className='save'>Adicionar</div>

                                </div>
                                    </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    {perguntas.length > 0 ?
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nº</TableHead>
                                <TableHead>Pergunta</TableHead>
                                <TableHead>Resposta</TableHead>
                                
                                <TableHead className='tableActions'>Ações</TableHead>

                            </TableRow>
                        </TableHeader>
                        

                        <TableBody>
                        {
                                perguntas.map((item, index) => {
                                    return (
                                        <TableRow>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell><div className='revText'>{item.pergunta}</div></TableCell>
                                            
                                            <TableCell><div className='revText' dangerouslySetInnerHTML={{__html: item.resposta}}></div></TableCell>
                                            <TableCell style={{}} className='tableActions'>
                                            
                                                <div className='actionButtons'>
                                                <Dialog>
                            <DialogTrigger onClick={() => {
                                setTitle(item.pergunta)
                                setDescription(item.resposta)
                                // setTestName(item.nome)
                                // setTestVia(item.via)
                                // setTest(item.testemunho)
                                // setDateAdded(new Date(item.data))
                            }}>
                            <div className='actionButton'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
</svg>
                                                    </div>
                            </DialogTrigger>
                            <DialogContent style={{width: '100%', maxWidth: 1000, display: 'flex', flexDirection: 'column'}}>
                                <DialogHeader>
                                    <DialogTitle>Editar</DialogTitle>
                                    <DialogDescription>Editar Pergunta</DialogDescription>

                                </DialogHeader>
                                <div className='sectionForms'>
                                    <div className='form'>
                                        <div className='label'>Pergunta</div>
                                        <input value={title} onChange={(e) => {
                                            setTitle(e.target.value)
                                        }} placeholder='Pergunta...' className='loginInput'/>
                                    </div>
                                    <div className='form'>
                                        <div className='label'>Resposta</div>
                                        <div className='textAreaContainer'>
                                            <ReactQuill placeholder='Resposta...' value={description} onChange={setDescription}/>
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

                            <div className="errors">
                            {messages.length > 0 && messages.map((item, index) => {
                                return (
                                    <div style={{color: 'green'}}  className="error" key={index}>
                                        {item}
                                    </div>
                                )
                            })}
                        </div>
                                    <div className='buttons' style={{marginBottom: 50}}>
                                    <div onClick={() => {
                                        editQuestion(item)
                                    }} className='save'>Salvar</div>

                                </div>
                                    </div>
                            </DialogContent>
                        </Dialog>
                                                    

                                                    <AlertDialog>
                                <AlertDialogTrigger style={{width: '100%'}}>
                                <div className='actionButton'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
                                                </div>
                                </AlertDialogTrigger>
                                <AlertDialogContent style={{flexDirection: 'column', display: 'flex'}}>
                                    <span>
                                        <AlertDialogTitle>
                                            Apagar pergunta
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Deseja mesmo apagar essa pergunta?
                                        </AlertDialogDescription>
                                    </span>
                                    <span style={{alignSelf: 'flex-end', marginTop: 15, display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', }}>
                                    <AlertDialogCancel style={{margin: 0}}>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction style={{margin: 0}} onClick={() => {
                                        
                                        axios.get(`${baseURL}/api/admissionsContents`)
            .then(res => {
                let obj = [...res.data][0]
                let perguntas = [...obj.perguntas]
                
                axios.post(`${baseURL}/api/editAdmissionsContent/any/${2}`, {
                    perguntas: perguntas.filter((p) => p.id != item.id)
                })
                .then(res => {
                    console.log('success')
                    window.location.reload()
                })
                .catch(err => {
                    console.log('err', err.response.data.message)
                })
                
    })
                                    }}>Confirmar</AlertDialogAction>
                                    </span>
                                    
                                </AlertDialogContent>
                            </AlertDialog>
                                                    
                                                </div>
                                               
                                            </TableCell>



                                        </TableRow>
                                    )
                            })
                            
                        
                        }
                        
                        </TableBody>
                        

                    </Table>
                    :<div style={{fontSize: 14, textAlign: 'center'}}>Nenhuma pergunta registrada. Adicione um.</div>
                    }
                    {/* <div className='testCont'>
                        <div className='firstRow'>
                            {
                                reviews.map((item, index) => {
                                    return (
                                        <div className='rev'>
                                            <div className='revHeader'>
                                                <span className='name'>{item.name}</span>
                                                {item.via.toLocaleLowerCase() == 'facebook' ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                            </svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                          </svg>}
                                            </div>
                                            <div className='info'>
                                            1/4/2024 via {item.via}
                                            </div>
                                            <div className='text'>
                                                {item.review}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div> */}
                </section>
            </div>
        </div>
    )
}
export default AdminAdmissionsPerguntas