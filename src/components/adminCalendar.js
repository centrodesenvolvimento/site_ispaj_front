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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "../@/components/ui/select"
import getCroppedImg from './cropImage'
import Cropper from 'react-easy-crop'
import {Calendar as BigCalendar, dateFnsLocalizer} from 'react-big-calendar'
import { enUS, ptBR } from 'date-fns/locale'
import "react-big-calendar/lib/css/react-big-calendar.css"
import ReactSwitch from 'react-switch'

const locales = {
    'pt-BR': ptBR,
}
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })


const AdminCalendar = () => {
    const [errors, setErrors] = useState([])
    const [messages, setMessages] = useState([])
    const [dateAdded, setDateAdded] = useState(new Date())
    const [finalDate, setFinalDate] = useState(new Date())
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [sameDay, setSameDay] = useState(false)
    const [hours, setHours] = useState('')
    const [hours2, setHours2] = useState('')
    const [localizacao, setLocalizacao] = useState('')
    const [imagePreview, setImagePreview] = useState('')
    const [show, setShow] = useState(false)
    const [events, setEvents] = useState([
       
    ])
    const [publics, setPublics] = useState([])
    const items = [
        {
          id: "Estudantes",
          label: "Estudantes",
        },
        {
          id: "Corpo Docente",
          label: "Corpo Docente",
        },
        {
          id: "Staff",
          label: "Staff",
        },
        {
          id: "Todos",
          label: "Todos",
        },
      ]
    const items2 = [
        "Admissões",
        "Artes",
        "Desenvolvimento de Carreira",
        "Cerimônias",
        "Concertos",
        "Conferência-Simpósio",
        "Dança",
        "Discussões-Fóruns",
        "Diversidade",
        "Exposições",
        "Programas Familiares",
        "Internacional",
        "Palestras-Seminários",
        "Eventos Não Universitários",
        "Contínuo",
        "Casas Abertas",
        "Pediatria",
        "Apresentações",
        "Política",
        "Programa de Desenvolvimento Profissional",
        "Publicações",
        "Leituras",
        "Recepções",
        "Religioso e Espiritual",
        "Pesquisa",
        "Exibições",
        "Organizações Estudantis",
        "Teatro",
        "Tours",
        "Treinamento-Workshops",
        "Oportunidades de Voluntariado",
        "Escrita"
      ]
    const [type, setType] = useState('')
    const [iframe, setIframe] = useState('')
    
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
    const onCrop = async () => {
        const croppedImageUrl = await getCroppedImg(selectedImage, croppedAreaPixels)
        setCompletedCrop(croppedImageUrl)
    }
    const addEvent = async() => {
        setErrors([])
        setMessages([])
        if (title.length == 0 || publics.length == 0 || localizacao.length == 0 || type.length == 0 || description == '<p><br></p>' || description.length == 0 || !completedCrop || (sameDay && hours.length == 0 || hours2.length == 0)) {
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
                    
                    axios.post(`${baseURL}/api/addEvent`, {
                        image_data: base64Data,
                        titulo: title,
                        mesmo_dia: sameDay,
                        iniDate: dateAdded,
                        finalDate: finalDate,
                        horario: `${hours} - ${hours2}`,
                        publico: publics,
                        descricao: description,
                        localizacao: localizacao,
                        tipo: type,
                        iframe: iframe

                    })
                    .then(res => {
                        console.log('resss', res.data)
                        setMessages(['Alterações salvas|'])
                        window.location.reload()

                    })
                    .catch(err => {
                        console.log('error', err.response.data.message)
                    })
                }
                reader.readAsDataURL(blob)
                

            }catch (err) {
                console.error('Error', err)
            }
        }
    }
    const editEvent = async (item, id) => {
        setErrors([])
        setMessages([])
        if (title == item.titulo && description == item.descricao && !completedCrop && localizacao == item.localizacao && type == item.tipo && iframe == item.iframe && `${new Date(dateAdded)}`== `${new Date(item.iniDate)}` && `${new Date(finalDate)}`== `${new Date(item.finalDate)}` && JSON.stringify(publics) == JSON.stringify([...item.publico]) && `${item?.info?.show}` == `${show}`){
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
                        
                        axios.post(`${baseURL}/api/editEvent/${id}`, {
                            image_data: base64Data,
                            imagem: item.imagem,
                            titulo: title,
                            mesmo_dia: sameDay,
                            iniDate: dateAdded,
                            finalDate: finalDate,
                            horario: `${hours} - ${hours2}`,
                            publico: publics,
                            descricao: description,
                            localizacao: localizacao,
                            tipo: type,
                            iframe: iframe,
                            show: show
    
                        })
                        .then(res => {
                            console.log('resss', res.data)
                            setMessages(['Alterações salvas|'])
                            window.location.reload()
    
                        })
                        .catch(err => {
                            console.log('error', err.response.data.message)
                        })
                    }
                    reader.readAsDataURL(blob)
                    
    
                }catch (err) {
                    console.error('Error', err)
                }
            }else {
                
                axios.post(`${baseURL}/api/editEvent/${id}`, {
                    imagem: `${item.imagem}`.split('storage/images/')[1],
                    titulo: title,
                    mesmo_dia: sameDay,
                    iniDate: dateAdded,
                    finalDate: finalDate,
                    horario: hours,
                    publico: publics,
                    descricao: description,
                    localizacao: localizacao,
                    tipo: type,
                    iframe: iframe,
                    show: show

                })
                .then(res => {
                    console.log('resss', res.data)
                    setMessages(['Alterações salvas|'])
                    window.location.reload()

                })
                .catch(err => {
                    console.log('error', err.response.data.message)
                })

            }
        }
    }
    useEffect(() => {
        axios.get(`${baseURL}/api/events`)
        .then(res => {
            setEvents(res.data)
        })
    }, [])
    return (
        <div className="dashboardContainer" id='adminCalendar'>
            <div className="title">Calendário</div>

            <div className='first'>
                <section className='section' style={{}}>
                    <div className='header'>
                        <HeaderLabel title={'Eventos'}/>
                        <Dialog>
                            <DialogTrigger onClick={() => {
                                setSelectedImage(null)
                            setCompletedCrop(null)
                            setTitle('')
                            setDescription('')
                            setSameDay(false)
                            setPublics([])
                            setDescription('')
                            setLocalizacao('')
                            setType('')
                            setIframe('')
                            }}>
                                <Edit title={'Adicionar'}/>

                            </DialogTrigger>
                            <DialogContent style={{width: '100%', maxWidth: 800, display: 'flex', flexDirection: 'column'}}>
                                <DialogHeader>
                                    <DialogTitle>Adicionar</DialogTitle>
                                    <DialogDescription>Adicionar Evento</DialogDescription>

                                </DialogHeader>
                                <ScrollArea style={{height: '90vh', marginTop: 20}}>
                                    <div className='sectionForms'>
                                    <div className="form">
                                <div className="label">Foto do evento</div>
                                <input className='imageInput1' type='file' accept='image/*'  onChange={(e)=>{
                                    let file = e.target.files[0]
                                    if (file){
                                        const reader = new FileReader()
                                        reader.onload = (event) => {
                                            setSelectedImage(event.target.result)
                                            console.log('data', event.target.result)
                                        }
                                        reader.readAsDataURL(file)
                                    }else {
                                        setSelectedImage(null)
                                    }
                                }}/>
                                {/* <div className='selectedImage'>
                                    <img src={selectedImage}/>
                                </div> */}
                                {selectedImage && <div style={{aspectRatio: '4/2'}}>
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
                                                <div className='label'>Título do evento</div>
                                                <input value={title} onChange={(e) => {
                                                    setTitle(e.target.value)
                                                }} placeholder='Título do evento...' className='loginInput'/>
                                            </div>
                                    
                                    
                                    
                                                
                                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 10, margin: '20px 0'}}>
        
        <input type='checkbox' value={sameDay} onChange={(e) => {
        setSameDay(!sameDay)                                                               
        }}/>
      <div style={{display: 'flex', flexDirection: 'column', gap: 1.5}}>
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Evento de apenas um dia?
        </label>
        
      </div>
    </div>
    {
        !sameDay ?
        <div className='form'>
                                                <div className='label'>Data inicial - Data final</div>
                                                <div>
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
                                                    </Popover> - 
                                                    <Popover>
                                                    <PopoverTrigger style={{maxWidth: 250}} onClick={() => {}}>
                                                        <div style={{maxWidth: 250, textAlign: 'left'}} placeholder={format(finalDate, 'PPP')} disabled className='loginInput'>{finalDate.getDate()}/{finalDate.getMonth()+1}/{finalDate.getFullYear()}</div>
                                                    </PopoverTrigger>
                                                    <PopoverContent className='w-auto p-0'>
                                                    <section style={{all: 'unset'}}>
                                                    <span>
                                                    <Calendar
                                                    mode="single"
                                                    selected={finalDate}
                                                    onSelect={setFinalDate}
                                                    initialFocus
                                                    />
                                                    </span>
                                                    </section>
                                                    </PopoverContent>
                                                </Popover>
                                                </div>
                                    
                                            </div>:
                                            <div>
                                                <div className='form'>
                                            <div className='label'>Data do evento</div>
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
                                        <div className='form'>
                                            <div  className='label'>
                                                Horário (clica no relógio)
                                            </div>
                                            <div className='label'>Hora de início - Hora de fim</div>
                                            <div style={{display: 'flex', flexDirection: 'row', maxWidth: 600,  gap: 10, alignItems: 'center'}}>
                                            <input style={{maxWidth: 150}}className='loginInput' type='time' value={hours} onChange={(e) => {
                                                setHours(e.target.value)
                                            }}/> - 
                                            <input style={{maxWidth: 150}}className='loginInput' type='time' value={hours2} onChange={(e) => {
                                                setHours2(e.target.value)
                                            }}/>
                                            </div>
                                            {/* <input value={hours} onChange={(e) => {
                                                setHours(e.target.value)
                                            }} className='loginInput' placeholder='Ex: 14:30 - 16:00'/> */}
                                        </div>
                                            </div>
    }
    <div className='form'>
        <div className='label'>Público-alvo</div>
        
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8}}>
            {
                items.map((item, index)=> {
                    return (
                        <div style={{display: 'flex', gap: 10, fontSize: 14}}>
                            <input type='checkbox' onChange={(e) => {
                                let pub = publics
                                if (pub.some((i) => i == item.label)){
                                    setPublics(publics.filter((i) => i!= item.label))
                                }else {
                                    setPublics([...publics, item.label])
                                }
                            }}/>
                            {item.label}
                        </div>
                    )
                })
            }
        </div>

    </div>
    <div className='form'>
        <div className='label'>Descrição do evento</div>
        <div className='textAreaContainer'>
            <ReactQuill placeholder='Descrição do evento...' value={description} onChange={setDescription}/>
        </div>
    </div>
    <div className='form'>
        <div className='label'>Localização</div>
        <input value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} maxLength={50} className='loginInput' placeholder='Localização...'/>
    </div>
    <div className='form'>
        <div className='label'>
            Tipo de evento
        </div>
        <Select onValueChange={(e) => {
            setType(e)
        }}>
    <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Seleccione um tipo" />
    </SelectTrigger>
    <SelectContent>
        {items2.map((item) => {
            return (
                <SelectItem value={item}>{item}</SelectItem>
            )
        })}
    </SelectContent>
    </Select>
    </div>
    <div className='form'>
        <div>
            <div className='label'>IFrame para o mapa (opcional)</div>
            <div style={{fontSize: 14}}>OBS: Vá para <a style={{color: 'blue'}} target='_blank' href='https://www.google.com/maps/'>Google Maps</a>; procure uma localização; procure opção de partilha; escolhe a opção de "incorporar um mapa"; copie o código HTML e cole aqui abaixo.</div>
        </div>
        <input value={iframe} onChange={(e) => setIframe(e.target.value)}  className='loginInput' placeholder='IFrame...'/>
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
                                                console.log(type)
                                                addEvent()
                                                // editDocument(item)
                                            }} className='save'>Adicionar</div>
                                        </div>
                                            </div>
                                </ScrollArea>
                            </DialogContent>
                        </Dialog>
                    </div>
                    {events.length > 0 ?
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nº</TableHead>
                                <TableHead>Título</TableHead>
                                <TableHead>Descrição</TableHead>
                                <TableHead>Data</TableHead>
                                <TableHead className='tableActions'>Ações</TableHead>

                            </TableRow>
                        </TableHeader>
                        

                        <TableBody>
                        {
                                events.map((item, index) => {
                                    return (
                                        <TableRow>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell><div className='revText'>{item.info.titulo}</div></TableCell>
                                            <TableCell><div className='revText' dangerouslySetInnerHTML={{__html: item.info.descricao}}></div></TableCell>
                                            <TableCell><div className='revText'>{format(item.info.iniDate, 'dd/MM/yyyy')} </div></TableCell>
                                            <TableCell style={{}} className='tableActions'>
                                            
                                                <div className='actionButtons'>
                                                <Dialog>
                            <DialogTrigger onClick={() => {
                                setImagePreview(item.info.imagem)
                                setSelectedImage(null)
                            setCompletedCrop(null)
                            setTitle(item.info.titulo)
                            setDescription(item.info.descricao)
                            setSameDay(item.info.mesmo_dia == 'true' ? true : false)
                            setPublics([...item.info.publico])
                            setLocalizacao(item.info.localizacao)
                            setType(item.info.tipo)
                            setIframe(item.info.iframe)
                            setDateAdded(new Date(item.info.iniDate))
                            setFinalDate(new Date(item.info.finalDate))
                            console.log('same', item.info.mesmo_dia == true)
                            setSameDay(item.info.mesmo_dia == true)
                            
                            setHours(`${item.info.horario}`.split(' - ')[0]?.trim())
                            setHours2(`${item.info.horario}`.split(' - ')[1]?.trim())

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
                                    <DialogDescription>Editar Evento</DialogDescription>

                                </DialogHeader>
                                <ScrollArea style={{height: '90vh', marginTop: 20}}>
                                    <div className='sectionForms'>
                                    <div className="form">
                                <div className="label">Foto do evento</div>
                                <input className='imageInput1' type='file' accept='image/*'  onChange={(e)=>{
                                    let file = e.target.files[0]
                                    if (file){
                                        const reader = new FileReader()
                                        reader.onload = (event) => {
                                            setSelectedImage(event.target.result)
                                            console.log('data', event.target.result)
                                        }
                                        reader.readAsDataURL(file)
                                    }else {
                                        setSelectedImage(null)
                                    }
                                }}/>
                                {/* <div className='selectedImage'>
                                    <img src={selectedImage}/>
                                </div> */}
                                {selectedImage ? <div style={{aspectRatio: '4/2'}}>
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
                                <div style={{aspectRatio: '4/2.8', overflow: 'hidden'}}>
                                    <img style={{width: '100%', height: '100%', objectFit: 'cover'}} src={imagePreview}/>
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
                                                <div className='label'>Título do evento</div>
                                                <input value={title} onChange={(e) => {
                                                    setTitle(e.target.value)
                                                }} placeholder='Título do evento...' className='loginInput'/>
                                            </div>
                                    
                                    
                                    
                                                
                                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 10, margin: '20px 0'}}>
        
        <input type='checkbox' value={sameDay} checked={sameDay} onChange={(e) => {
        setSameDay(!sameDay)                                                               
        }}/>
      <div style={{display: 'flex', flexDirection: 'column', gap: 1.5}}>
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Evento de apenas um dia?
        </label>
        
      </div>
    </div>
    {
        !sameDay ?
        <div className='form'>
                                                <div className='label'>Data inicial - Data final</div>
                                                <div>
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
                                                    </Popover> - 
                                                    <Popover>
                                                    <PopoverTrigger style={{maxWidth: 250}} onClick={() => {}}>
                                                        <div style={{maxWidth: 250, textAlign: 'left'}} placeholder={format(finalDate, 'PPP')} disabled className='loginInput'>{finalDate.getDate()}/{finalDate.getMonth()+1}/{finalDate.getFullYear()}</div>
                                                    </PopoverTrigger>
                                                    <PopoverContent className='w-auto p-0'>
                                                    <section style={{all: 'unset'}}>
                                                    <span>
                                                    <Calendar
                                                    mode="single"
                                                    selected={finalDate}
                                                    onSelect={setFinalDate}
                                                    initialFocus
                                                    />
                                                    </span>
                                                    </section>
                                                    </PopoverContent>
                                                </Popover>
                                                </div>
                                    
                                            </div>:
                                            <div>
                                                <div className='form'>
                                            <div className='label'>Data do evento</div>
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
                                        <div className='form'>
                                        <div className='form'>
                                            <div  className='label'>
                                                Horário (clica no relógio)
                                            </div>
                                            <div className='label'>Hora de início - Hora de fim</div>
                                            <div style={{display: 'flex', flexDirection: 'row', maxWidth: 600,  gap: 10, alignItems: 'center'}}>
                                            <input style={{maxWidth: 150}}className='loginInput' type='time' value={hours} onChange={(e) => {
                                                setHours(e.target.value)
                                            }}/> - 
                                            <input style={{maxWidth: 150}}className='loginInput' type='time' value={hours2} onChange={(e) => {
                                                setHours2(e.target.value)
                                            }}/>
                                            </div>
                                            {/* <input value={hours} onChange={(e) => {
                                                setHours(e.target.value)
                                            }} className='loginInput' placeholder='Ex: 14:30 - 16:00'/> */}
                                        </div>
                                        </div>
                                            </div>
    }
    <div className='form'>
        <div className='label'>Público-alvo</div>
        
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8}}>
            {
                items.map((item, index)=> {
                    return (
                        <div style={{display: 'flex', gap: 10, fontSize: 14}}>
                            <input checked={publics.includes(item.label)} type='checkbox' onChange={(e) => {
                                let pub = publics
                                if (pub.some((i) => i == item.label)){
                                    setPublics(publics.filter((i) => i!= item.label))
                                }else {
                                    setPublics([...publics, item.label])
                                }
                            }}/>
                            {item.label}
                        </div>
                    )
                })
            }
        </div>

    </div>
    <div className='form'>
        <div className='label'>Descrição do evento</div>
        <div className='textAreaContainer'>
            <ReactQuill placeholder='Descrição do evento...' value={description} onChange={setDescription}/>
        </div>
    </div>
    <div className='form'>
        <div className='label'>Localização</div>
        <input value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} maxLength={50} className='loginInput' placeholder='Localização...'/>
    </div>
    <div className='form'>
        <div className='label'>
            Tipo de evento
        </div>
        <Select value={type} onValueChange={(e) => {
            setType(e)
        }}>
    <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Seleccione um tipo" />
    </SelectTrigger>
    <SelectContent>
        {items2.map((item) => {
            return (
                <SelectItem value={item}>{item}</SelectItem>
            )
        })}
    </SelectContent>
    </Select>
    </div>
    <div className='form'>
        <div>
            <div className='label'>IFrame para o mapa</div>
            <div style={{fontSize: 14}}>OBS: Vá para <a style={{color: 'blue'}} target='_blank' href='https://www.google.com/maps/'>Google Maps</a>; procure uma localização; procure opção de partilha; escolhe a opção de "incorporar um mapa"; copie o código HTML e cole aqui abaixo.</div>
        </div>
        <input value={iframe} onChange={(e) => setIframe(e.target.value)}  className='loginInput' placeholder='IFrame...'/>
    </div>
    <div className='form'>
    <ReactSwitch uncheckedIcon={null} checkedIcon={null} checked={show} onChange={() => {
                                            setShow(!show)
                                        }} />
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
                                                console.log(type)
                                                editEvent(item.info, item.id)
                                                // editDocument(item)
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
                    :<div style={{fontSize: 14, textAlign: 'center'}}>Nenhum evento registrado. Adicione um.</div>
                    }
                </section>




                <section className='section' style={{}}>
                    <div className='header'>
                        <HeaderLabel title={'Calendário'}/>
                        {/* <Edit title={'Adicionar'}/> */}
                    </div>
                    <div className=''>
                        <BigCalendar 
                        events={events.map((item) => {
                            return {
                                ...item.info,
                                title: item.info.titulo,
                                start: new Date(item.info.iniDate),
                                end: new Date( item.info.mesmo_dia == 'true' ? item.info.iniDate : item.info.finalDate)
                            }
                        })}
                        localizer={localizer}
                        startAccessor={'start'}
                        endAccessor={'end'}
                        style={{height: 500}}
                        components={{
                            toolbar: ({navigate, view, label, onNavigate, onView}) => {
                                navigate = (action) => {
                                    onNavigate(action);
                                  };
                                
                                  view = (view) => {
                                    onView(view);
                                  };
                                return (
                                    <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <button type="button" onClick={() => navigate('PREV')}>Anterior</button>
          <button type="button" onClick={() => navigate('TODAY')}>Hoje</button>
          <button type="button" onClick={() => navigate('NEXT')}>Próximo</button>
        </span>
        <span className="rbc-toolbar-label">{label}</span>
        <span className="rbc-btn-group">
          <button type="button" onClick={() => view('month')}>Mês</button>
          {/* <button type="button" onClick={() => view('day')}>Dia</button> */}
          <button type="button" onClick={() => view('week')}>Semana</button>
        </span>
      </div>
                                )
                            },
                            event: ({event}) => {
                                return (
                                    <div style={{background: 'orange'}}>{event.title}</div>
                                )
                            },
                            
                            eventWrapper: ({event}) => {
                                return (
                                    <div className='event-container'>
                                    <div className='eventTitle' title={event.title}>
                                        {event.title}
                                    </div>
                                    {/* <div className='tooltip'>{event.title}</div> */}
                                    </div>
                                )
                            },
                           month: {
                            header: ({label}) => {
                                const weekdayTranslations = {
                                    Sunday: 'Domingo',
                                    Monday: 'Segunda',
                                    Tuesday: 'Terça',
                                    Wednesday: 'Quarta',
                                    Thursday: 'Quinta',
                                    Friday: 'Sexta',
                                    Saturday: 'Sábado'
                                  }
                                return (
                                    <div>{weekdayTranslations[label]}</div>
                                )
                            }
                           },
                           week: {
                            
                            header: ({label}) => {
                                const weekdayTranslations = {
                                    Sun: 'Dom',
                                    Mon: 'Seg',
                                    Tue: 'Ter',
                                    Wed: 'Qua',
                                    Thu: 'Qui',
                                    Fri: 'Sex',
                                    Sat: 'Sáb'
                                  }
                                return (
                                    <div>
                                        {label.split(' ')[0]} {weekdayTranslations[label.split(' ')[1]]}
                                    </div>
                                )
                            }
                           }
                            
                        }}
                        messages={{
                            today: 'Hoje',
                            previous: 'Voltar',
                            next: 'Avançar',
                            month: 'Mês',
                            week: 'Semana',
                            day: 'Dia',
                            agenda: 'Agenda',
                            date: 'Data',
                            time: 'Hora',
                            event: 'Evento',
                            allDay: 'Todo o dia',
                            weekHeader: 'Semana',
                            showMore: (total) => `+${total} mais`,
                            noEventsInRange: 'Não há eventos neste intervalo',
                            yesterday: 'Ontem',
                            tomorrow: 'Amanhã',
                            work_week: 'Semana de Trabalho',
                            weekday: {
                                0: 'Domingo',
                                1: 'Segunda',
                                2: 'Terça',
                                3: 'Quarta',
                                4: 'Quinta',
                                5: 'Sexta',
                                6: 'Sábado',
                            }

                          }}
                          
                        />
                    </div>
                </section>
            </div>
            
        </div>
    )
}
export default AdminCalendar