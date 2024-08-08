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

const AdminEstatutos = () => {
    const [errors, setErrors] = useState([])
    const [messages, setMessages] = useState([])
    const [dateAdded, setDateAdded] = useState(new Date())
    const [selectedDoc, setSelectedDoc] = useState(null)
    const [preview, setPreview] = useState(null)
    const [documents, setDocuments] = useState([])
    const [title, setTitle] = useState('')

    const addDocument = () => {
        setErrors([])
        setMessages([])

        if (title.length == 0 || !selectedDoc) {
            setErrors(['Preencha todos os campos por favor!'])
        }else {
            axios.post(`${baseURL}/api/editAboutContent/regulamentos/${1}`, {
                documento: selectedDoc,
                titulo: title,
                data: dateAdded,
            },{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(res => {
                setMessages(['Documento adicionado com sucesso!'])
                console.log('success', res.data)
                window.location.reload()
            })
            .catch(err => {
                setErrors([err.response.data.message])
            })
        }
    }
    const editDocument = (item) => {
        setErrors([])
        setMessages([])
        if (title.length == 0){
            setErrors(['Preencha todos os campos por favor!'])
        }else if (title == item.titulo && `${new Date(dateAdded)}`== `${new Date(item.data)}` && !selectedDoc){
            setErrors(['Nenhuma alteração feita!'])

        }else  {
            if (selectedDoc){
                axios.post(`${baseURL}/api/editAboutContent/regulamentos/${1}`, {
                    edit: true,
                    newDocumento: selectedDoc,
                    id: item.id,
                    titulo: title,
                    data: dateAdded,
                    documento: item.documento
                },{
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(res => {
                    setMessages(['Editado com sucesso!'])
                    console.log('success', res.data)
                    window.location.reload()
                })
                .catch(err => {
                    setErrors([err.response.data.message])
                })
            }else {
                axios.get(`${baseURL}/api/aboutContents`)
            .then(res => {
                let docs = documents
                let newDocs = docs.map((d) => {
                    if (d.id == item.id){
                        return {
                            id: item.id,
                            titulo: title,
                            data: dateAdded,
                            documento: item.documento
                        }
                    }else {
                        return d
                    }
                })
                axios.post(`${baseURL}/api/editAboutContent/regulamentos/${1}`, {
                    edit: true,
                    documentos: newDocs
                })
                .then(res => {
                    console.log('success')
                    setMessages(['Editado com sucesso.'])
                    window.location.reload()
                })
                .catch(err => {
                    setErrors([err.response.data.message])
                })

                
    })
                // axios.post(`${baseURL}/api/editAboutContent/regulamentos/${1}`, {
                //     edit: true,
                //     id: item.id,
                //     titulo: title,
                //     data: dateAdded,
                //     documento: item.documento
                // },{
                //     headers: {
                //         'Content-Type': 'multipart/form-data',
                //     },
                // })
                // .then(res => {
                //     setMessages(['Órgão adicionado com sucesso!'])
                //     console.log('success', res.data)
                //     // window.location.reload()
                // })
                // .catch(err => {
                //     setErrors([err.response.data.message])
                // })
            }
        }
    }
    useEffect(() => {
        axios.get(`${baseURL}/api/aboutContents`)
        .then(res => {
            let content = [...res.data][0]
            setDocuments(content.regulamentos)
        })
    }, [])
    return (
        <div className="dashboardContainer" id='adminHomeContainer'>
            <div className="title">Estatutos e Regulamentos</div>
            
            <div className='first'>
            <section className='section'>
                    <div className='header'>
                        <HeaderLabel title='Estatutos e Regulamentos'/>
                        <Dialog>
                            <DialogTrigger onClick={() =>{
                                
                            }}>
                                <Edit title='Adicionar'/>
                            </DialogTrigger>
                            <DialogContent style={{width: '100%', maxWidth: 1000, display: 'flex', flexDirection: 'column'}}>
                                <DialogHeader>
                                    <DialogTitle>Adicionar</DialogTitle>
                                    <DialogDescription>Adicionar um novo estatuto ou regulamento</DialogDescription>

                                </DialogHeader>
                                <ScrollArea style={{height: '90vh', marginTop: 20}}>
                                    <div className='sectionForms'>
                                        <div className='form'>
                                            <div className='label'>Título do estatuto ou regulamento</div>
                                            <input value={title} onChange={(e) => {
                                                setTitle(e.target.value)
                                            }} placeholder='Título do acontecimento...' className='loginInput'/>
                                        </div>
                                    
                                    
                                    
                                            <div className='form'>
                                            <div className='label'>Data em que foi aprovado</div>
                                            <Popover>
                                                <PopoverTrigger style={{maxWidth: 250}} onClick={() => {}}>
                                                    <div style={{maxWidth: 250, textAlign: 'left'}} placeholder={format(dateAdded, 'PPP')} disabled className='loginInput'>{dateAdded.getDate()}/{dateAdded.getMonth()+1}/{dateAdded.getFullYear()}</div>
                                                </PopoverTrigger>
                                                <PopoverContent className='w-auto p-0'>
                                                <section style={{all: 'unset'}}>
                                                <span>
                                                <Calendar
                                                mode="single"
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
                                        <div className="label">Documento</div>
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
                                            //         console.log('data', event.target.result)
                                            //     }
                                            //     reader.readAsDataURL(file)
                                            // }else {
                                            //     setSelectedImage(null)
                                            // }
                                        }}/>
                                       {videoPreview &&
                                       <div className='selectedVideo'>
                                        <video src={URL.createObjectURL(videoPreview)} loop muted controls />
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
                                            addDocument()
                                        }} className='save'>Adicionar</div>
                                    </div>
                                        </div>
                                </ScrollArea>
                            </DialogContent>
                        </Dialog>
                    </div>
                    {documents.length > 0 ?
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nº</TableHead>
                                <TableHead>Título</TableHead>
                                <TableHead>Data</TableHead>
                                
                                <TableHead className='tableActions'>Ações</TableHead>

                            </TableRow>
                        </TableHeader>
                        

                        <TableBody>
                        {
                                documents.map((item, index) => {
                                    return (
                                        <TableRow>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell><div className='revText'>{item.titulo}</div></TableCell>
                                            
                                            <TableCell><div className='revText'>{format(item.data, 'dd/MM/yyyy')} </div></TableCell>
                                            <TableCell style={{}} className='tableActions'>
                                            
                                                <div className='actionButtons'>
                                                <Dialog>
                            <DialogTrigger onClick={() => {
                                setDateAdded(new Date(item.data))
                                setTitle(item.titulo)
                                setPreview(item.documento)
                                setSelectedDoc(null)
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
                                    <DialogDescription>Editar Estatuto ou Regulamento</DialogDescription>

                                </DialogHeader>
                                <ScrollArea style={{height: '90vh', marginTop: 20}}>
                                    <div className='sectionForms'>
                                            <div className='form'>
                                                <div className='label'>Título do estatuto ou regulamento</div>
                                                <input value={title} onChange={(e) => {
                                                    setTitle(e.target.value)
                                                }} placeholder='Título do acontecimento...' className='loginInput'/>
                                            </div>
                                    
                                    
                                    
                                                <div className='form'>
                                                <div className='label'>Data em que foi aprovado</div>
                                                <Popover>
                                                    <PopoverTrigger style={{maxWidth: 250}} onClick={() => {}}>
                                                        <div style={{maxWidth: 250, textAlign: 'left'}} placeholder={format(dateAdded, 'PPP')} disabled className='loginInput'>{dateAdded.getDate()}/{dateAdded.getMonth()+1}/{dateAdded.getFullYear()}</div>
                                                    </PopoverTrigger>
                                                    <PopoverContent className='w-auto p-0'>
                                                    <section style={{all: 'unset'}}>
                                                    <span>
                                                    <Calendar
                                                    mode="single"
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
                                            <div className="label">Documento</div>
                                            <input value={''} className='imageInput3' type='file' accept='application/pdf'  onChange={(e)=>{
                                                setSelectedDoc(e.target.files[0])
                                            }}/>
                                            {selectedDoc ?
                                           <div style={{}}>
                                            <embed className='orgChart' src={URL.createObjectURL(selectedDoc)} style={{width: '100%', aspectRatio: 2/1.5}} />
                                            </div>
                                            : preview ? <div style={{}}>
                                            <embed className='orgChart' src={`${baseURL}/storage/images/${preview}`} style={{width: '100%', aspectRatio: 2/1.5}} />
                                            </div> : <div></div>}
                                    
                                            {/* <input value={''} className='imageInput2' type='file' accept='video/*'  onChange={(e)=>{
                                                setSelectedVideo()
                                                setVideoPreview(e.target.files[0])
                                                // let file = e.target.files[0]
                                                // if (file){
                                                //     const reader = new FileReader()
                                                //     reader.onload = (event) => {
                                                //         setSelectedImage(event.target.result)
                                                //         console.log('data', event.target.result)
                                                //     }
                                                //     reader.readAsDataURL(file)
                                                // }else {
                                                //     setSelectedImage(null)
                                                // }
                                            }}/>
                                           {videoPreview &&
                                           <div className='selectedVideo'>
                                            <video src={URL.createObjectURL(videoPreview)} loop muted controls />
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
                                                editDocument(item)
                                            }} className='save'>Salvar</div>
                                        </div>
                                            </div>
                                </ScrollArea>
                            </DialogContent>
                        </Dialog>
                                                    

                                                    <AlertDialog>
                                <AlertDialogTrigger>
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
                                            Apagar estatuto ou regulamento
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Deseja mesmo apagar esse estatuto ou regulamento?
                                        </AlertDialogDescription>
                                    </span>
                                    <span style={{alignSelf: 'flex-end', marginTop: 15, display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', }}>
                                    <AlertDialogCancel style={{margin: 0}}>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction style={{margin: 0}} onClick={() => {
                                        axios.get(`${baseURL}/api/aboutContents`)
                                        .then(res => {
                                            let docs = documents
                                            let newDocs = docs.filter((d) => d.id != item.id)
                                            axios.post(`${baseURL}/api/editAboutContent/regulamentos/${1}`, {
                                                delete: true,
                                                id: item.id,
                                                documentos: newDocs,
                                                documento: item.documento
                                            })
                                            .then(res => {
                                                console.log('success', res.data)
                                                // setMessages(['Editado com sucesso.'])
                                                window.location.reload()
                                            })
                                            .catch(err => {
                                                setErrors([err.response.data.message])
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
                    :<div style={{fontSize: 14, textAlign: 'center'}}>Nenhum documento registrado. Adicione um.</div>
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
export default AdminEstatutos