import { Edit, HeaderLabel } from "./adminHome"
import '../css/adminDepartments.css'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../@/components/ui/dialog"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { baseURL } from "../api/api"
import { useNavigate } from "react-router-dom"
import getCroppedImg from "./cropImage"
import Cropper from "react-easy-crop"
import ReactQuill from "react-quill"
import { ScrollArea } from "../@/components/ui/scroll-area"

const AdminDepartments = () => {
    const navigate =useNavigate()
    const [selectedVideo, setSelectedVideo] = useState(null)
    const [videoPreview, setVideoPreview] = useState(null)
    const [load, setLoad] = useState(false)
    const [errors, setErrors] = useState([])
    const [messages, setMessages] = useState([])
    const [title, setTitle] = useState('')
    const [saidas, setSaidas] = useState('')
    const [description, setDescription] = useState('')
    const [departments, setDepartments] = useState([])
    const [selectedImage, setSelectedImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [crop, setCrop]= useState({x: 0, y: 0})
    const [zoom, setZoom]= useState(1)

    const [completedCrop, setCompletedCrop] = useState(null)
    const imageRef = useRef(null)    
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    
    const onCropComplete = async (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
        const croppedImageUrl = await getCroppedImg(selectedImage, croppedAreaPixels)
        setCompletedCrop(croppedImageUrl)

    }
    const onCrop = async () => {
        const croppedImageUrl = await getCroppedImg(selectedImage, croppedAreaPixels)
        setCompletedCrop(croppedImageUrl)
    }
    const saveDeparment = async (department) => {
        setLoad(true)
        setErrors([])
        setMessages([])
        if (title.length == 0 || description.length == 0 || !completedCrop && !imagePreview || saidas == '<p><br></p>' || saidas.length == 0){
            setErrors(['Campos em vazio!'])
            setLoad(false)
        }else if (title == department.info?.titulo && description == department.info.descricao && !videoPreview && !completedCrop && saidas == department?.info.saidas) {
            setErrors(['Nenhuma alteração feita!'])
            setLoad(false)
        }else {
            if (videoPreview && !completedCrop){
                
                //('carlos', department.info)
                let formData = new FormData()
                axios.post(`${baseURL}/api/editDepartment/info/${department.id}`, {
                    video: department.info?.video ? department.infovideo : '',
                    saidas: saidas,
                    video_data: videoPreview,
                    titulo: title, 
                    descricao: description,
                    imagem: department.info?.imagem ? department.info.imagem : ''
                    
                }, {
                    headers: {
                        "Content-Type": 'multipart/form-data'
                    }
                })
                .then(res => {
                    //('response', res.data)
                    setMessages(['Editado com successo.'])
                    window.location.reload()
                })
                .catch(err => {
                    setErrors([err.response.data.message])
                })
            }else if (completedCrop && !videoPreview){
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
                        //('carlos', department.info)
                        let formData = new FormData()
                        axios.post(`${baseURL}/api/editDepartment/info/${department.id}`, {
                            saidas: saidas,
                            video: department.info?.video ? department.info.video : '',
                            titulo: title, 
                            descricao: description,
                            image_data: base64Data,
                            imagem: department.info?.imagem ? department.info.imagem : ''
                            
                            
                        }, {
                            headers: {
                                "Content-Type": 'multipart/form-data'
                            }
                        })
                        .then(res => {
                            //('response', res.data)
                            setMessages(['Editado com successo.'])
                            window.location.reload()
                        })
                        .catch(err => {
                            setErrors([err.response.data.message])
                        })
                    }
                    reader.readAsDataURL(blob)
                }
                catch(err) {
                    setErrors([err.response.data.message])
                }
            }else if (completedCrop && videoPreview) {
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
                        //('carlos', department.info)
                        let formData = new FormData()
                        axios.post(`${baseURL}/api/editDepartment/info/${department.id}`, {
                            saidas: saidas,
                            video: department.info?.video ? department.info.video : '',
                            video_data: videoPreview,
                            titulo: title, 
                            descricao: description,
                            image_data: base64Data,
                            imagem: department.info?.imagem ? department.info.imagem : ''
                            
                            
                        }, {
                            headers: {
                                "Content-Type": 'multipart/form-data'
                            }
                        })
                        .then(res => {
                            //('response', res.data)
                            setMessages(['Editado com successo.'])
                            window.location.reload()
                        })
                        .catch(err => {
                            setErrors([err.response.data.message])
                        })
                    }
                    reader.readAsDataURL(blob)
                }
                catch(err) {
                    setErrors([err.response.data.message])
                }
            }
            else {
                

                axios.post(`${baseURL}/api/editDepartment/info/${department.id}`, {
                        ...department?.info,
                        titulo: title, 
                        descricao: description,
                        saidas: saidas
                })
                .then(res => {
                    //('res', res.data)
                    setMessages(['Editado com successo.'])
                    window.location.reload()
                })
                .catch(err => {
                    setErrors([err.response.data.message])
                })
                
            }
            setLoad(false)
        }
    }
    useEffect(() => {
        axios.get(`${baseURL}/api/departamentos`)
        .then(res => {
            //('res', res.data)
            setDepartments([...res.data])
        })
    }, [])
    return (
        <div className="dashboardContainer" id='adminHomeContainer'>
            <div className="title">Departamentos</div>

            <div style={{display: 'grid'}} className="first" id='first1'>
                <section className="section">
                    <div className="header">
                        <HeaderLabel title={'Ciências de Saúde'}/>
                        <Dialog>
                            <DialogTrigger onClick={() => {
                                setTitle(departments[0]?.info?.titulo)
                                setDescription(departments[0]?.info?.descricao)
                                setSaidas(departments[0]?.info?.saidas)
                                
                                setImagePreview(departments[0]?.info?.imagem)
                                //('info', departments[0]?.info)
                                setSelectedImage(null)
                                setCompletedCrop(null)
                            }}>
                                <Edit title='Editar'/>
                            </DialogTrigger>
                            <DialogContent style={{width: '100%', maxWidth: 1000, display: 'flex', flexDirection: 'column'}}>
                            <DialogHeader>
                            <DialogTitle>Editar</DialogTitle>
                            <DialogDescription>
                                Editar departamento
                            </DialogDescription>
                            </DialogHeader>
                            
                            <ScrollArea style={{height: '90vh', marginTop: 20}}>
                                <div className='sectionForms'>
                                    <div className="form">
                                        <div
                                        className="label">Título do departamento</div>
                                        <input value={title} onChange={(e)=> {
                                            setTitle(e.target.value)
                                        }} placeholder="Título do departamento..." className="loginInput"/>
                                    </div>
                                    <div className="form">
                                    <div className="label">Imagem do departamento</div>
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
                                    {selectedImage && <div style={{aspectRatio: '4/2'}}>
                                        <Cropper
                                        style={{height: '100%', width: '100%'}}
                                        image={selectedImage}
                                        crop={crop}
                                        zoom={zoom}
                                        aspect={4/3}
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
                                    {!completedCrop && imagePreview && <div style={{aspectRatio: '4/3', background: '#d3d3d3', borderRadius: 5, overflow: 'hidden'}}>
                                        <img loading="lazy"style={{width: '100%', height: '100%', objectFit: 'cover'}} src={`${baseURL}/storage/images/${imagePreview}`}/>
                                    </div>}
                                    </div>
                                    <div className='form'>
                                        <div className='label'>Descrição</div>
                                        <textarea value={description} onChange={(e)=>{
                                            setDescription(e.target.value)
                                        }} placeholder='Descrição...' className='loginInput' style={{height: 100}}/>
                                    </div>
                                <div className='form'>
                                    <div className='label'>Algumas saídas profissionais</div>
                                    <div className='textAreaContainer'>
                                        <ReactQuill placeholder="Algumas saídas profissionais..." value={saidas} onChange={setSaidas}/>
                                    </div>
                                </div>
                                    <div className="form">
                                    <div className="label">Vídeo da página "Quem somos"</div>
                                    <input value={''} className='imageInput2' type='file' accept='video/*'  onChange={(e)=>{
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
                                            saveDeparment(departments[0])
                                        }} className='save'>Guardar</div>
                                    </div>
                                    {/* <div className='' dangerouslySetInnerHTML={{__html: prMessage}}>
                                    </div> */}
                                
                                
                                </div>
                            </ScrollArea>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="header">
                        <div onClick={() => {
                            navigate('/admin/departamentos/departamento')
                            localStorage.setItem('department', JSON.stringify(departments[0]))
                        }}>
                            <Edit title='Editar Cursos'/>
                        </div>
                    </div>
                    <div className="info">
                        <div className="basicInfo">{departments[0]?.info?.descricao}
                            
                        </div>
                        <div className="videoCont">
                            {departments[0]?.info?.video && <video loading="lazy"  style={{width: '100%', height: '100%', objectFit: 'cover'}} src={`${baseURL}/storage/videos/${departments[0]?.info?.video}`} loop muted controls />}
                        </div>
                    </div>
                </section>




                <section className="section">
                    <div className="header">
                        <HeaderLabel title={'Ciências Sociais e Económicas'}/>
                        <Dialog>
                            <DialogTrigger onClick={() => {
                                setTitle(departments[1]?.info?.titulo)
                                setDescription(departments[1]?.info?.descricao)
                                setSaidas(departments[1]?.info?.saidas)
                                
                                setImagePreview(departments[1]?.info?.imagem)
                                //('info', departments[1]?.info)
                                setSelectedImage(null)
                                setCompletedCrop(null)
                            }}>
                                <Edit title='Editar'/>
                            </DialogTrigger>
                            <DialogContent style={{width: '100%', maxWidth: 1000, display: 'flex', flexDirection: 'column'}}>
                            <DialogHeader>
                            <DialogTitle>Editar</DialogTitle>
                            <DialogDescription>
                                Editar departamento
                            </DialogDescription>
                            </DialogHeader>
                            <ScrollArea style={{height: '90vh', marginTop: 20}}>
                                <div className='sectionForms'>
                                    <div className="form">
                                        <div
                                        className="label">Título do departamento</div>
                                        <input value={title} onChange={(e)=> {
                                            setTitle(e.target.value)
                                        }} placeholder="Título do departamento..." className="loginInput"/>
                                    </div>
                                    <div className="form">
                                    <div className="label">Imagem do departamento</div>
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
                                    {selectedImage && <div style={{aspectRatio: '4/2'}}>
                                        <Cropper
                                        style={{height: '100%', width: '100%'}}
                                        image={selectedImage}
                                        crop={crop}
                                        zoom={zoom}
                                        aspect={4/3}
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
                                    {!completedCrop && imagePreview && <div style={{aspectRatio: '4/3', background: '#d3d3d3', borderRadius: 5, overflow: 'hidden'}}>
                                        <img loading="lazy"style={{width: '100%', height: '100%', objectFit: 'cover'}} src={`${baseURL}/storage/images/${imagePreview}`}/>
                                    </div>}
                                    </div>
                                    <div className='form'>
                                        <div className='label'>Descrição</div>
                                        <textarea value={description} onChange={(e)=>{
                                            setDescription(e.target.value)
                                        }} placeholder='Descrição...' className='loginInput' style={{height: 100}}/>
                                    </div>
                                <div className='form'>
                                    <div className='label'>Algumas saídas profissionais</div>
                                    <div className='textAreaContainer'>
                                        <ReactQuill placeholder="Algumas saídas profissionais..." value={saidas} onChange={setSaidas}/>
                                    </div>
                                </div>
                                    <div className="form">
                                    <div className="label">Vídeo da página "Quem somos"</div>
                                    <input value={''} className='imageInput2' type='file' accept='video/*'  onChange={(e)=>{
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
                                            saveDeparment(departments[1])
                                        }} className='save'>Guardar</div>
                                    </div>
                                    {/* <div className='' dangerouslySetInnerHTML={{__html: prMessage}}>
                                    </div> */}
                                
                                
                                </div>
                            </ScrollArea>
                            </DialogContent>
                        </Dialog>

                    </div>
                    <div className="header">
                        <div onClick={() => {
                            navigate('/admin/departamentos/departamento')
                            localStorage.setItem('department', JSON.stringify(departments[1]))
                        }}>
                            <Edit title='Editar Cursos'/>
                        </div>
                    </div>
                    <div className="info">
                        <div className="basicInfo">{
                            departments[1]?.info?.descricao}
                            
                        </div>
                        <div className="videoCont">
                        {departments[1]?.info?.video && <video loading="lazy"  style={{width: '100%', height: '100%', objectFit: 'cover'}} src={`${baseURL}/storage/videos/${departments[1]?.info?.video}`} loop muted controls />}
                        </div>
                    </div>
                </section>



                <section className="section">
                    <div className="header">
                        <HeaderLabel title={'Ciências das Engenharias/Exatas'}/>
                        <Dialog>
                            <DialogTrigger onClick={() => {
                                setTitle(departments[2]?.info?.titulo)
                                setDescription(departments[2]?.info?.descricao)
                                setSaidas(departments[2]?.info?.saidas)
                                
                                setImagePreview(departments[2]?.info?.imagem)
                                //('info', departments[2]?.info)
                                setSelectedImage(null)
                                setCompletedCrop(null)
                            }}>
                                <Edit title='Editar'/>
                            </DialogTrigger>
                            <DialogContent style={{width: '100%', maxWidth: 1000, display: 'flex', flexDirection: 'column'}}>
                            <DialogHeader>
                            <DialogTitle>Editar</DialogTitle>
                            <DialogDescription>
                                Editar departamento
                            </DialogDescription>
                            </DialogHeader>
                            <ScrollArea style={{height: '90vh', marginTop: 20}}>
                                <div className='sectionForms'>
                                    <div className="form">
                                        <div
                                        className="label">Título do departamento</div>
                                        <input value={title} onChange={(e)=> {
                                            setTitle(e.target.value)
                                        }} placeholder="Título do departamento..." className="loginInput"/>
                                    </div>
                                    <div className="form">
                                    <div className="label">Imagem do departamento</div>
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
                                    {selectedImage && <div style={{aspectRatio: '4/2'}}>
                                        <Cropper
                                        style={{height: '100%', width: '100%'}}
                                        image={selectedImage}
                                        crop={crop}
                                        zoom={zoom}
                                        aspect={4/3}
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
                                    {!completedCrop && imagePreview && <div style={{aspectRatio: '4/3', background: '#d3d3d3', borderRadius: 5, overflow: 'hidden'}}>
                                        <img loading="lazy"style={{width: '100%', height: '100%', objectFit: 'cover'}} src={`${baseURL}/storage/images/${imagePreview}`}/>
                                    </div>}
                                    </div>
                                    <div className='form'>
                                        <div className='label'>Descrição</div>
                                        <textarea value={description} onChange={(e)=>{
                                            setDescription(e.target.value)
                                        }} placeholder='Descrição...' className='loginInput' style={{height: 100}}/>
                                    </div>
                                <div className='form'>
                                    <div className='label'>Algumas saídas profissionais</div>
                                    <div className='textAreaContainer'>
                                        <ReactQuill placeholder="Algumas saídas profissionais..." value={saidas} onChange={setSaidas}/>
                                    </div>
                                </div>
                                    <div className="form">
                                    <div className="label">Vídeo da página "Quem somos"</div>
                                    <input value={''} className='imageInput2' type='file' accept='video/*'  onChange={(e)=>{
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
                                            saveDeparment(departments[2])
                                        }} className='save'>Guardar</div>
                                    </div>
                                    {/* <div className='' dangerouslySetInnerHTML={{__html: prMessage}}>
                                    </div> */}
                                
                                
                                </div>
                            </ScrollArea>
                            </DialogContent>
                        </Dialog>

                    </div>
                    <div className="header">
                        <div onClick={() => {
                            navigate('/admin/departamentos/departamento')
                            localStorage.setItem('department', JSON.stringify(departments[2]))
                        }}>
                            <Edit title='Editar Cursos'/>
                        </div>
                    </div>
                    <div className="info">
                        <div className="basicInfo">{departments[2]?.info?.descricao}
                        </div>
                        <div className="videoCont">
                        {departments[2]?.info?.video && <video loading="lazy"  style={{width: '100%', height: '100%', objectFit: 'cover'}} src={`${baseURL}/storage/videos/${departments[2]?.info?.video}`} loop muted controls />}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
export default AdminDepartments