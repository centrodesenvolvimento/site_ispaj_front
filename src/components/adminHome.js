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
import Switch from "react-switch";



export const HeaderLabel = ({title}) => {
    
    return (
        <div className='label'>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bounding-box-circles" viewBox="0 0 16 16">
  <path d="M2 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2M0 2a2 2 0 0 1 3.937-.5h8.126A2 2 0 1 1 14.5 3.937v8.126a2 2 0 1 1-2.437 2.437H3.937A2 2 0 1 1 1.5 12.063V3.937A2 2 0 0 1 0 2m2.5 1.937v8.126c.703.18 1.256.734 1.437 1.437h8.126a2 2 0 0 1 1.437-1.437V3.937A2 2 0 0 1 12.063 2.5H3.937A2 2 0 0 1 2.5 3.937M14 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2M2 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
                        </svg>
        <div className='title'>{title}</div>
        </div>
    )

}
export const Edit = ({title}) => {
    return (
        <div className='editCont'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>
<div>{title}</div>
        </div>
    )
}
const AdminHome = () => {
    const [homeContent, setHomeContent] = useState(null)
    const [prMessage, setPrMessage] = useState(homeContent?.mensagemPr ?? '')
    const [message, setMessage] = useState({

    })
    const [reviews, setReviews] = useState([
        
    ])
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
    const [errors, setErrors] = useState([])
    const [messages, setMessages] = useState([])
    const [base64, setBase64] = useState('')
    const [testName, setTestName] = useState('')
    const [testVia, setTestVia] = useState('')
    const [dateAdded, setDateAdded] = useState(new Date())
    const [test, setTest] = useState('')
    useEffect(() => {
        console.log('message', prMessage)
    }, [prMessage])
    const saveVideo = () => {
        setLoad(true)
        setErrors([])
        setMessages([])
        if (!videoPreview) {
            setErrors(['Selecione um vídeo!'])
            setLoad(false)
        }else {
            // console.log('videoPreview', videoPreview)
            // const formData = new FormData()
            // formData.append('video-data', videoPreview)
            axios.post(`${baseURL}/api/editHomeContent/video/${1}`, {
                'video_data': videoPreview
            }, 
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                  },
            })
            .then(res => {
                setLoad(false)
                console.log('resss', res.data)
                setMessages(['Alterações salvas|'])
                window.location.reload()
            })
            .catch(err => {
                console.log('errrrr', err.response)
                setLoad(false)

            })
            
        }

    }
    const savePR = async () => {
        setErrors([])
        setMessages([])
        if (prMessage.length == 0 || prMessage == '<p><br></p>' || profile == '<p><br></p>' || profile.length == 0){
            setErrors(['Preencha tudo por favor!'])

        }else if (prMessage == homeContent?.mensagemPr && !completedCrop && profile == homeContent?.perfilPr){

            setErrors(['Nenhuma alteração feita!'])

        }else {
            console.log(completedCrop)
            if (completedCrop){
                try {
                    const response = await fetch(completedCrop)
                    const blob = await response.blob()
                    const reader = new FileReader()
                    let b64 = ''
                    reader.onloadend = () => {
                        setBase64(reader.result)
                        b64 = reader.result
                        const regex = /^data:(.+);base64,/;
                        const match = b64.match(regex);
                        const base64Data = b64.replace(match[0], '')
                        let obj = {
                            "id": 1,
                            "videoInicial": null,
                            "imagemPr": null,
                            "mensagemPr": "This is a sample message.",
                            "testemunhos": [
                                {
                                    "author": "John Doe",
                                    "message": "Great product!"
                                },
                                {
                                    "author": "Jane Smith",
                                    "message": "Excellent service!"
                                }
                            ],
                            "created_at": "2024-07-15T14:19:31.000000Z",
                            "updated_at": "2024-07-15T14:19:31.000000Z"
                        }
                        
                        
                        axios.post(`${baseURL}/api/editHomeContent/any/${obj.id}`, {
                            image_data: base64Data,
                            "mensagemPr": prMessage,
                            "perfilPr": profile

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
                let obj = {
                    "id": 1,
                    "videoInicial": null,
                    "imagemPr": null,
                    "mensagemPr": "This is a sample message.",
                    "testemunhos": [
                        {
                            "author": "John Doe",
                            "message": "Great product!"
                        },
                        {
                            "author": "Jane Smith",
                            "message": "Excellent service!"
                        }
                    ],
                    "created_at": "2024-07-15T14:19:31.000000Z",
                    "updated_at": "2024-07-15T14:19:31.000000Z"
                }
                axios.post(`${baseURL}/api/editHomeContent/any/${obj.id}`, {
                    "mensagemPr": prMessage,
                    "perfilPr": profile

                }, {
                    
                })
                .then(res => {
                    console.log('res', res.data)
                    setMessages(['Alterações salvas|'])
                    window.location.reload()
                    
                })
                .catch(err => {
                    console.log('err', console.log(err))
                })
            }
            
            
        }
    }
    const addTest = () => {
        setErrors([])
        setMessages([])
        if (testName.length == 0 || testVia.length == 0 || test.length == 0){
            setErrors(['Por favor preencha todos os campos!'])
        }
        else if (testName.split(/\s(?=\S)/ig).length < 2) {
            setErrors(['Segundo nome necessário!'])
        }
        else if (testName.split(/\s(?=\S)/ig).length > 2) {
            setErrors(['Só o primeiro e último nome são necessários!'])
        }else {
            axios.get(`${baseURL}/api/homeContents`)
            .then(res => {
                let obj = [...res.data][0]
                if ([...obj.testemunhos].length > 0){
                    axios.post(`${baseURL}/api/editHomeContent/testemunhos/${1}`, {
                        testemunhos: [
                            
                            {
                                id: [...obj.testemunhos].length + 1,
                                nome: testName,
                                via: testVia,
                                data: dateAdded,
                                testemunho: test,
                                dateAdded: new Date(),
                                show: true
                            },
                            ...[...obj.testemunhos]
                        ]
                    })
                    .then(res => {
                        console.log('success')
                        setMessages(['Testemunho adicionado com sucesso.'])
                        window.location.reload()
                    })
                    .catch(err => {
                        console.log('err', err.response.data.message)
                    })
                }else {
                    console.log('ok')
                    axios.post(`${baseURL}/api/editHomeContent/testemunhos/${1}`, {
                        testemunhos: [
                            {
                                id: [...obj.testemunhos].length + 1,
                                nome: testName,
                                via: testVia,
                                data: dateAdded,
                                testemunho: test,
                                dateAdded: new Date(),
                                show: true
                            }
                        ]
                    })
                    .then(res => {
                        console.log('success')
                        setMessages(['Testemunho adicionado com sucesso.'])
                        window.location.reload()
                    })
                    .catch(err => {
                        console.log('err', err.response.data.message)
                    })
                }
                
    })
        }
    }
    const editTest = (item) => {
        setErrors([])
        setMessages([])
        if (testName.length == 0 || testVia.length == 0 || test.length == 0){
            setErrors(['Por favor preencha todos os campos!'])
        }
        else if (testName.split(/\s(?=\S)/ig).length < 2) {
            setErrors(['Segundo nome necessário!'])
        }
        else if (testName.split(/\s(?=\S)/ig).length > 2) {
            setErrors(['Só o primeiro e último nome são necessários!'])
        }else if (testName == item.nome && testVia == item.via && test == item.via && dateAdded == item.data && (item?.show == show)){
            setErrors(['Nenhuma alteração feita!'])
        }else {
            axios.get(`${baseURL}/api/homeContents`)
            .then(res => {
                let obj = [...res.data][0]
                let testemunhos = [...obj.testemunhos]
                let newTest = testemunhos.map((t) => {
                    if (t.id == item.id){
                        return {
                            id: item.id,
                            nome: testName,
                            via: testVia,
                            data: dateAdded,
                            testemunho: test,
                            dateAdded: new Date(),
                            show: show
                        }
                    }else {
                        return t
                    }
                })
                axios.post(`${baseURL}/api/editHomeContent/testemunhos/${1}`, {
                    testemunhos: newTest
                })
                .then(res => {
                    console.log('success')
                    setMessages(['Testemunho editado com sucesso.'])
                    window.location.reload()
                })
                .catch(err => {
                    console.log('err', err.response.data.message)
                })

                
    })
        }
        
    }
    const [load, setLoad] = useState(false)
    const [prImage, setPrImage] = useState(null)
    const [profile, setProfile] = useState('')
    const [selectedVideo, setSelectedVideo] = useState(null)
    const [videoPreview, setVideoPreview] = useState(null)
    const [iniVideo, setIniVideo] = useState(null)
    useEffect(() => {
        setSelectedImage(null)
        setVideoPreview(null)
        setSelectedVideo(null)
        axios.get(`${baseURL}/api/homeContents`)
        .then(res => {
            setPrMessage(res.data[0].mensagemPr)
            setPrImage(res.data[0].imagemPr)
            setIniVideo(res.data[0].videoInicial)
            setReviews(res.data[0].testemunhos)
            setHomeContent(res.data[0])
            setProfile(res.data[0].perfilPr)
        })
    }, [])
    const [show, setShow] = useState(false)
    return (
        <div className="dashboardContainer" id='adminHomeContainer'>
            <div className="title">Página Inicial</div>

            <div className='first'>
                <section className='section'>
                    <div className='header'>
                        <HeaderLabel title='Vídeo Inicial'/>
                        <Dialog>
                            <DialogTrigger>
                                <Edit title='Editar'/>
                            </DialogTrigger>
                            <DialogContent style={{width: '100%', maxWidth: 1000, display: 'flex', flexDirection: 'column'}}>
                            <DialogHeader>
                            <DialogTitle>Editar</DialogTitle>
                            <DialogDescription>
                                Editar vídeo inicial
                            </DialogDescription>
                            </DialogHeader>
                            <div className='sectionForms'>
                                
                                <div className="form">
                                <div className="label">Vídeo Inicial</div>
                                <input value={''} className='imageInput2' type='file' accept='video/*'  onChange={(e)=>{
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
                        </div>
                        {load && <div>Processando...</div>}
                                <div className='buttons' style={{marginBottom: 50}}>
                                    <div onClick={() => {
                                        saveVideo()
                                    }} className='save'>Guardar</div>

                                </div>
                                {/* <div className='' dangerouslySetInnerHTML={{__html: prMessage}}>
                                </div> */}
                                
                                  
                            </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className='videoCont'>
                    {iniVideo && <video src={iniVideo} loop muted controls />}
                    </div>
                </section>
                <section className='section' style={{}}>
                    <div className='header'>
                        <HeaderLabel title='Mensagem do PR'/>
                        <Dialog>
                            <DialogTrigger>
                            <Edit  title='Editar'/>
                            </DialogTrigger>
                            <DialogContent style={{width: '100%', maxWidth: 1000, display: 'flex', flexDirection: 'column'}}>
                            <DialogHeader>
                            <DialogTitle>Editar</DialogTitle>
                            <DialogDescription>
                                Editar mensagem do presidente
                            </DialogDescription>
                            </DialogHeader>
                            <ScrollArea style={{height: '90vh', marginTop: 20}}>

                                <div className='sectionForms'>
                                
                                <div className="form">
                                <div className="label">Foto do PR</div>
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
                                    aspect={4/2.8}
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
                                    <div className='label'>Perfil do PR</div>
                                    <div className='textAreaContainer'>
                                        <ReactQuill value={profile} onChange={setProfile}/>
                                    </div>
                                </div>
                                <div className='form'>
                                    <div className='label'>Mensagem do PR</div>
                                    <div className='textAreaContainer'>
                                        <ReactQuill value={prMessage} onChange={setPrMessage}/>
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
                            <div className="errors">
                            {messages.length > 0 && messages.map((item, index) => {
                                return (
                                    <div key={index} style={{color: 'green'}}  className="error">
                                        {item}
                                    </div>
                                )
                            })}
                        </div>
                        </div>
                                <div className='buttons' style={{marginBottom: 50}}>
                                    <div onClick={() => {
                                        savePR()
                                    }} className='save'>Guardar</div>

                                </div>
                                {/* <div className='' dangerouslySetInnerHTML={{__html: prMessage}}>
                                </div> */}
                                
                                                            
                                </div>
                            </ScrollArea>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div style={{margin: 10, display: 'flex', gap: 10}}>
                        <div style={{width: '60%', background: '#ececec', borderRadius: 5, marginRight: 10, overflow: 'hidden', width: '100%', height: '100%', aspectRatio: '4/4', maxHeight: 350}}>
                            {prImage && <img style={{width: '100%', height: '100%', objectFit: 'cover'}} src={prImage}/>}
                        </div>
                        <div className='textCont' dangerouslySetInnerHTML={{__html: homeContent?.mensagemPr}}>
                        </div>
                    </div>
                </section>
            </div>
            <div className='first' style={{marginTop: 10}}>
            <section className='section'>
                    <div className='header'>
                        <HeaderLabel title='Testemunhos'/>
                        <Dialog>
                            <DialogTrigger onClick={() =>{
                                setTestName('')
                                setTestVia('')
                                setTest('')
                                setDateAdded(new Date())
                            }}>
                                <Edit title='Adicionar'/>
                            </DialogTrigger>
                            <DialogContent style={{width: '100%', maxWidth: 500, display: 'flex', flexDirection: 'column'}}>
                                <DialogHeader>
                                    <DialogTitle>Adicionar</DialogTitle>
                                    <DialogDescription>Adicionar um novo testemunho</DialogDescription>

                                </DialogHeader>
                                <div className='sectionForms'>
                                    <div className='form'>
                                        <div className='label'>Nome da testemunha</div>
                                        <input value={testName} onChange={(e) => {
                                            setTestName(e.target.value)
                                        }} placeholder='Nome da testemunha...' className='loginInput'/>
                                    </div>
                                    <div className='form'>
                                        <div className='label'>Via</div>
                                        <Select value={testVia} onValueChange={(e) =>{
                                            console.log(e)
                                            setTestVia(e)
                                        }}>
                                            <SelectTrigger style={{outline: 'none', focus:'none'}}>
                                                <SelectValue placeholder='Selecione...'/>
                                            </SelectTrigger>
                                            <SelectContent>
                                            <SelectItem value="Facebook">Facebook</SelectItem>
                                            <SelectItem value="Instagram">Instagram</SelectItem>
                                            
                                            </SelectContent>
                                        </Select>
                                        {/* <input style={{textTransform: 'capitalize'}} autoCapitalize='true' maxLength={9} value={testVia} onChange={(e) => {
                                            setTestVia(e.target.value)
                                        }} placeholder='Ex: Facebook...' className='loginInput'/> */}
                                    </div>
                                    <div className='form'>
                                        <div className='label'>Data do testemunho</div>
                                        <Popover>
                                            <PopoverTrigger style={{maxWidth: 250}} onClick={() => setDateAdded(new Date())}>
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
                                        <div className='form'>
                                        <div className='label'>Testemunho</div>
                                        <textarea value={test} onChange={(e)=>setTest(e.target.value)} style={{height: 100}} placeholder='Digite o testemunho...' className='loginInput' />
                                        
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
                                        addTest()
                                    }} className='save'>Adicionar</div>

                                </div>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    {reviews.length > 0 ?
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nº</TableHead>
                                <TableHead>Nome</TableHead>
                                <TableHead>Via</TableHead>
                                <TableHead>Testemunho</TableHead>
                                
                                <TableHead className='tableActions'>Ações</TableHead>

                            </TableRow>
                        </TableHeader>
                        

                        <TableBody>
                        {
                                reviews.map((item, index) => {
                                    return (
                                        <TableRow>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell><div className='revText'>{item.nome}</div></TableCell>
                                            <TableCell><div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                                <span>{item.via.toLocaleLowerCase() == 'facebook' ? <svg style={{color: 'black', width: 22, height: 22}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
</svg>
 :
    <svg style={{color: 'black', width: 20, height: 20}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                                                                          </svg>}</span>
                                            </div></TableCell>
                                            <TableCell><div className='revText'>{item.testemunho}</div></TableCell>
                                            <TableCell style={{}} className='tableActions'>
                                            
                                                <div className='actionButtons'>
                                                <Dialog>
                            <DialogTrigger onClick={() => {
                                setTestName(item.nome)
                                setTestVia(item.via)
                                setTest(item.testemunho)
                                setDateAdded(new Date(item.data))
                                if (item.show != undefined && item.show == true){
                                    setShow(true)
                                }else if (item.show != undefined && item.show == false){
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
                            <DialogContent style={{width: '100%', maxWidth: 500, display: 'flex', flexDirection: 'column'}}>
                                <DialogHeader>
                                    <DialogTitle>Editar</DialogTitle>
                                    <DialogDescription>Editar testemunho</DialogDescription>

                                </DialogHeader>
                                <div className='sectionForms'>
                                    <div className='form'>
                                        <div className='label'>Nome da testemunha</div>
                                        <input value={testName} onChange={(e) => {
                                            setTestName(e.target.value)
                                        }} placeholder='Nome da testemunha...' className='loginInput'/>
                                    </div>
                                    <div className='form'>
                                        <div className='label'>Via</div>
                                        <Select value={testVia} onValueChange={(e) =>{
                                            console.log(e)
                                            setTestVia(e)
                                        }}>
                                            <SelectTrigger style={{outline: 'none', focus:'none'}}>
                                                <SelectValue placeholder='Selecione...'/>
                                            </SelectTrigger>
                                            <SelectContent>
                                            <SelectItem value="Facebook">Facebook</SelectItem>
                                            <SelectItem value="Instagram">Instagram</SelectItem>
                                            
                                            </SelectContent>
                                        </Select>
                                        {/* <input style={{textTransform: 'capitalize'}} autoCapitalize='true' maxLength={9} value={testVia} onChange={(e) => {
                                            setTestVia(e.target.value)
                                        }} placeholder='Ex: Facebook...' className='loginInput'/> */}
                                    </div>
                                    <div className='form'>
                                        <div className='label'>Data do testemunho</div>
                                        <Popover>
                                            <PopoverTrigger style={{maxWidth: 250}} onClick={() => setDateAdded(new Date())}>
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
                                        <div className='form'>
                                        <div className='label'>Testemunho</div>
                                        <textarea value={test} onChange={(e)=>setTest(e.target.value)} style={{height: 100}} placeholder='Digite o testemunho...' className='loginInput' />
                                        
                                    </div>
                                    <div className='form'>
                                        <Switch uncheckedIcon={null} checkedIcon={null} checked={show} onChange={() => {
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
                                        editTest(item)
                                    }} className='save'>Guardar</div>

                                </div>
                                    </div>
                                </div>
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
                                            Apagar Testemunho
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Deseja mesmo apagar esse testemunho?
                                        </AlertDialogDescription>
                                    </span>
                                    <span style={{alignSelf: 'center', marginTop: 15, display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', }}>
                                    <AlertDialogCancel style={{margin: 0}}>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction style={{margin: 0}} onClick={() => {
                                        
                                        axios.get(`${baseURL}/api/homeContents`)
            .then(res => {
                let obj = [...res.data][0]
                let testemunhos = [...obj.testemunhos]
                
                axios.post(`${baseURL}/api/editHomeContent/testemunhos/${1}`, {
                    testemunhos: testemunhos.filter((t) => t.id != item.id)
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
                    :<div style={{fontSize: 14, textAlign: 'center'}}>Nenhum testemunho registrado. Adicione um.</div>
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
export default AdminHome