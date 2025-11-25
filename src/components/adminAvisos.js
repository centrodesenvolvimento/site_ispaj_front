import { useEffect, useRef, useState } from 'react'
import '../css/adminCalendar.css'
import { Edit, HeaderLabel } from './adminHome'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../@/components/ui/table'
import { format, getDay, parse, setDate, startOfWeek } from 'date-fns'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../@/components/ui/dialog'
import { ScrollArea } from '../@/components/ui/scroll-area'
import { Popover, PopoverContent, PopoverTrigger } from '../@/components/ui/popover'
import { Calendar } from '../@/components/ui/calendar'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '../@/components/ui/alert-dialog'
import { baseURL } from '../api/api'
import axios from 'axios'
import { Checkbox } from '../@/components/ui/checkbox'
import ReactQuill from 'react-quill'
import getCroppedImg from './cropImage'
import Cropper from 'react-easy-crop'
import ReactSwitch from 'react-switch'
const AdminAvisos = () => {

    const [selectedImage, setSelectedImage] = useState(null)
    const [crop, setCrop]= useState({x: 0, y: 0})
    const [zoom, setZoom]= useState(1)

    const [completedCrop, setCompletedCrop] = useState(null)
    const imageRef = useRef(null)
    const previewCanvasRef = useRef(null)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const createImage = (url) =>
        new Promise((resolve, reject) => {
            const image = new Image()
            image.addEventListener('load', () => resolve(image))
            image.addEventListener('error', error => reject(error))
            image.setAttribute('crossOrigin', 'anonymous')
            image.src = url
        })

    const onCropComplete = async (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
        const croppedImageUrl = await getCroppedImg(selectedImage, croppedAreaPixels)
        setCompletedCrop(croppedImageUrl)

    }
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [imagePreview, setImagePreview] = useState(null) 
    const [show, setShow] = useState(false)
    const [avisos, setAvisos] = useState([])
    const onCrop = async () => {
        const croppedImageUrl = await getCroppedImg(selectedImage, croppedAreaPixels)
        setCompletedCrop(croppedImageUrl)
    }
    const [errors, setErrors] = useState([])
    const [messages, setMessages] = useState([])
    const addAviso = async() => {
        setErrors([])
        setMessages([])
        if (title.length == 0 || !completedCrop) {
            setErrors(['Preencha todos os campos!'])
        }else {
            try {
                const response = await fetch(completedCrop)
                const blob = await response.blob()
                const reader = new FileReader()
                let b64 = ''
                reader.onloadend = () => {
                    b64 = reader.result
                    const regex = /^data:(.+);base64,/;
                    const match = b64.match(regex);
                    const base64Data = b64.replace(match[0], '')
                    
                    axios.post(`${baseURL}/api/addAviso`, {
                        image_data: base64Data,
                        title: title,
                        

                    })
                    .then(res => {
                        //('resss', res.data)
                        setMessages(['Aviso adicionado!'])
                        window.location.reload()

                    })
                    .catch(err => {
                        //('error', err.response.data.message)
                    })
                }
                reader.readAsDataURL(blob)
                

            }catch (err) {
                console.error('Error', err)
            }
        }
    }
    const editAviso = async (item) => {
        setErrors([])
        setMessages([])
        if (title == item.titulo && !completedCrop && `${item?.info?.show}` == `${show}`){
            setErrors(['Nenhuma alteração feita!'])
        }else {
            if (completedCrop){
                try {
                    const response = await fetch(completedCrop)
                    const blob = await response.blob()
                    const reader = new FileReader()
                    let b64 = ''
                    reader.onloadend = () => {
                        b64 = reader.result
                        const regex = /^data:(.+);base64,/;
                        const match = b64.match(regex);
                        const base64Data = b64.replace(match[0], '')
                        
                        axios.post(`${baseURL}/api/editAviso/${item?.id}`, {
                            image_data: base64Data,
                            title: title,
                            show: show
    
                        })
                        .then(res => {
                            //('resss', res.data)
                            setMessages(['Alterações guardadas!'])
                            window.location.reload()
    
                        })
                        .catch(err => {
                            //('error', err.response.data.message)
                        })
                    }
                    reader.readAsDataURL(blob)
                    
    
                }catch (err) {
                    console.error('Error', err)
                }
            }else {
                
                axios.post(`${baseURL}/api/editAviso/${item?.id}`, {
                    imagem: item?.info?.image,
                    title: title,
                    show: show

                })
                .then(res => {
                    //('resss', res.data)
                    setMessages(['Alterações guardadas!'])
                    window.location.reload()

                })
                .catch(err => {
                    //('error', err.response.data.message)
                })

            }
        }
    }
    useEffect(() => {
        axios.get(`${baseURL}/api/avisos`)
        .then(res => {
            setAvisos([...res.data])
        })
    })
    return (
        <div className="dashboardContainer" id='adminCalendar'>
            <div className="title">Calendário</div>

            <div className='first'>
                <section className='section' style={{}}>
                    <div className='header'>
                        <HeaderLabel title={'Avisos'}/>
                        <Dialog>
                            <DialogTrigger onClick={() => {
                                setSelectedImage(null)
                            setCompletedCrop(null)
                            setTitle('')
                            setDescription('')
                            
                            setDescription('')
                            
                            }}>
                                <Edit title={'Adicionar'}/>

                            </DialogTrigger>
                            <DialogContent style={{width: '100%', maxWidth: 800, display: 'flex', flexDirection: 'column'}}>
                                <DialogHeader>
                                    <DialogTitle>Adicionar</DialogTitle>
                                    <DialogDescription>Adicionar Aviso</DialogDescription>

                                </DialogHeader>
                                <ScrollArea style={{height: '90vh', marginTop: 20}}>
                                    <div className='sectionForms'>
                                    <div className="form">
                                <div className="label">Foto do aviso</div>
                                <input className='imageInput1' type='file' accept='image/*'  onChange={(e)=>{
                                    let file = e.target.files[0]
                                    if (file){
                                        const reader = new FileReader()
                                        reader.onload = (event) => {
                                            setSelectedImage(event.target.result)
                                            //('data', event.target.result)
                                        }
                                        reader.readAsDataURL(file)
                                    }else {
                                        setSelectedImage(null)
                                    }
                                }}/>
                                {/* <div className='selectedImage'>
                                    <img loading="lazy"src={selectedImage}/>
                                </div> */}
                                {selectedImage && <div style={{aspectRatio: '4/4'}}>
                                    <Cropper
                                    style={{height: '100%', width: '100%'}}
                                    image={selectedImage}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={4/4}
                                    onCropChange={setCrop}
                                    onCropComplete={onCropComplete}
                                    onZoomChange={setZoom}
                                    />
                                </div>}
                                {/* <canvas
                                ref={previewCanvasRef}
                                style={{
                                    width: Math.round(completedCrop?.width ?? 0),
                                    height: Math.round(completedCrop?.height ?? 0)
                                }}
                                /> */}
                                </div>
                                            <div className='form'>
                                                <div className='label'>Título do aviso</div>
                                                <input value={title} onChange={(e) => {
                                                    setTitle(e.target.value)
                                                }} placeholder='Título do aviso...' className='loginInput'/>
                                            </div>
                                    
                                    
                                    
                                                
  
    {/* <div className='form'>
        <div className='label'>Descrição do evento</div>
        <div className='textAreaContainer'>
            <ReactQuill placeholder='Descrição do evento...' value={description} onChange={setDescription}/>
        </div>
    </div> */}
    
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
                                                addAviso()
                                                // editDocument(item)
                                            }} className='save'>Adicionar</div>
                                        </div>
                                            </div>
                                </ScrollArea>
                            </DialogContent>
                        </Dialog>
                    </div>
                    {avisos.length > 0 ?
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nº</TableHead>
                                <TableHead>Imagem</TableHead>
                                <TableHead>Título</TableHead>
                                <TableHead className='tableActions'>Ações</TableHead>

                            </TableRow>
                        </TableHeader>
                        

                        <TableBody>
                        {
                                avisos.map((item, index) => {
                                    return (
                                        <TableRow>
                                            <TableCell>{index + 1}</TableCell>
                                            
                                            <TableCell>
                                                <div style={{width: 70, height: 40, borderRadius: 5, overflow: 'hidden'}}>
                                                    <img loading="lazy"style={{width: '100%', height: '100%', objectFit: 'cover'}} src={`${baseURL}/storage/images/${item?.info?.image}`}/>
                                                </div>
                                            </TableCell>
                                            <TableCell><div className='revText'>{item.info.title}</div></TableCell>
                                            
                                            <TableCell style={{}} className='tableActions'>
                                            
                                                <div className='actionButtons'>
                                                <Dialog>
                            <DialogTrigger onClick={() => {
                                setImagePreview(item.info.image)
                                setSelectedImage(null)
                            setCompletedCrop(null)
                            setTitle(item.info.title)
                            

                            if ((item.info?.show != undefined && item.info?.show == true) || (item.info?.show != undefined && item.info?.show == "true")){
                                setShow(true)
                            }else if ((item.info?.show != undefined && item.info?.show == false) || (item.info?.show != undefined && item.info?.show == "false")){
                                setShow(false)
                            }else {
                                setShow(true)
                            }
                            
                            }}>
<div className='actionButton'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
</svg>
                                                    </div>
                            </DialogTrigger>
                            <DialogContent style={{width: '100%', maxWidth: 800, display: 'flex', flexDirection: 'column'}}>
                                <DialogHeader>
                                    <DialogTitle>Editar</DialogTitle>
                                    <DialogDescription>Editar Aviso</DialogDescription>

                                </DialogHeader>
                                <ScrollArea style={{height: '90vh', marginTop: 20}}>
                                    <div className='sectionForms'>
                                    <div className="form">
                                <div className="label">Foto do aviso</div>
                                <input className='imageInput1' type='file' accept='image/*'  onChange={(e)=>{
                                    let file = e.target.files[0]
                                    if (file){
                                        const reader = new FileReader()
                                        reader.onload = (event) => {
                                            setSelectedImage(event.target.result)
                                            //('data', event.target.result)
                                        }
                                        reader.readAsDataURL(file)
                                    }else {
                                        setSelectedImage(null)
                                    }
                                }}/>
                                {/* <div className='selectedImage'>
                                    <img loading="lazy"src={selectedImage}/>
                                </div> */}
                                {selectedImage ? <div style={{aspectRatio: '4/4'}}>
                                    <Cropper
                                    style={{height: '100%', width: '100%'}}
                                    image={selectedImage}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={4/4}
                                    onCropChange={setCrop}
                                    onCropComplete={onCropComplete}
                                    onZoomChange={setZoom}
                                    />
                                </div>:
                                <div style={{aspectRatio: '4/4', overflow: 'hidden'}}>
                                    <img loading="lazy"style={{width: '100%', height: '100%', objectFit: 'cover'}} src={`${baseURL}/storage/images/${imagePreview}`}/>
                                </div> 
                                }
                                {/* <canvas
                                ref={previewCanvasRef}
                                style={{
                                    width: Math.round(completedCrop?.width ?? 0),
                                    height: Math.round(completedCrop?.height ?? 0)
                                }}
                                /> */}
                                </div>
                                            <div className='form'>
                                                <div className='label'>Título do aviso</div>
                                                <input value={title} onChange={(e) => {
                                                    setTitle(e.target.value)
                                                }} placeholder='Título do aviso...' className='loginInput'/>
                                            </div>
                                            <div className='form'>
    <ReactSwitch uncheckedIcon={null} checkedIcon={null} checked={show} onChange={() => {
                                            setShow(!show)
                                        }} />
                                </div>
                                    
                                    
                                    
                                                
  
    {/* <div className='form'>
        <div className='label'>Descrição do evento</div>
        <div className='textAreaContainer'>
            <ReactQuill placeholder='Descrição do evento...' value={description} onChange={setDescription}/>
        </div>
    </div> */}
    
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
                                        
                                                // editDocument(item)
                                                editAviso(item)
                                            }} className='save'>Guardar</div>
                                        </div>
                                            </div>
                                </ScrollArea>
                            </DialogContent>
                        </Dialog>
                                                
                                                    

                                                    <AlertDialog>
                                <AlertDialogTrigger style={{display: 'none'}}>
                                <div className='actionButton'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
                                                </div>
                                </AlertDialogTrigger>
                                <AlertDialogContent style={{flexDirection: 'column', display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                                    <span>
                                        <AlertDialogTitle>
                                            Apagar evento
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Deseja mesmo apagar esse evento?
                                        </AlertDialogDescription>
                                    </span>
                                    <span style={{alignSelf: 'center', marginTop: 15, display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', }}>
                                    <AlertDialogCancel style={{margin: 0}}>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction style={{margin: 0}} onClick={() => {
                                        axios.post(`${baseURL}/api/deleteEvent/${item.id}`, {
                                            imagem: item.info.imagem
                                        })
                                        .then(res =>{
                                            window.location.reload()
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
                    :<div style={{fontSize: 14, textAlign: 'center'}}>Nenhum aviso registrado. Adicione um.</div>
                    }
                </section>




                
            </div>
            
        </div>
    )
}
export default AdminAvisos