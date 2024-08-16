import '../css/adminEstOrg.css'
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
import ReactSwitch from 'react-switch'

const AdminEstOrg = () => {
    const [errors, setErrors] = useState([])
    const [messages, setMessages] = useState([])
    const [dateAdded, setDateAdded] = useState(new Date())
    const [orgSing, setOrgSing] = useState([])
    const [orgCol, setOrgCol] = useState([])
    const [reviews, setReviews] = useState([])
    const [singulares, setSingulares] = useState([])
    const [isPresident, setIsPresident] = useState(false)
    const [isMultiple, setIsMultiple] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)
    const [crop, setCrop]= useState({x: 0, y: 0})
    const [zoom, setZoom]= useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [prName, setPrName] = useState('')
    const [role, setRole] = useState('')
    const [description, setDescription] = useState('')
    const [completedCrop, setCompletedCrop] = useState(null)
    const [show, setShow] = useState(false)
    const onCropComplete = async (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
        const croppedImageUrl = await getCroppedImg(selectedImage, croppedAreaPixels)
        setCompletedCrop(croppedImageUrl)

    }
    const onCrop = async () => {
        const croppedImageUrl = await getCroppedImg(selectedImage, croppedAreaPixels)
        setCompletedCrop(croppedImageUrl)
    }
    const addOrgSing = async () => {
        setErrors([])
        setMessages([])
        if (role.length == 0 || description.length == 0){
            setErrors(['Preencha todos os campos!'])
        }else if (isPresident && (prName.length == 0 || !completedCrop)){
            setErrors(['Preencha as informações do presidente!'])
        }else if (orgSing?.some((item) => item.cargo == role)) {
            setErrors([`Já tem órgão com o nome de ${role}!`])
        }else {
            if (isPresident){
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
                        axios.post(`${baseURL}/api/editAboutContent/singulares/${1}`, {
                            cargo: role,
                            descricao: description,
                            presidente: true,
                            nome: prName,
                            image_data: base64Data,
                        },{
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        })
                        .then(res => {
                            setMessages(['Órgão adicionado com sucesso!'])
                            window.location.reload()
                        })
                        .catch(err => {
                            setErrors([err.response.data.message])
                        })
                    }
                    reader.readAsDataURL(blob)
                }catch(err){
                    console.error('Error', err)

                }

                
            }else {
                axios.post(`${baseURL}/api/editAboutContent/singulares/${1}`, {
                    cargo: role,
                    descricao: description,
                    hasMembers: isMultiple,
                    membros: []
                },{
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(res => {
                    setMessages(['Órgão adicionado com sucesso!'])
                    window.location.reload()
                })
                .catch(err => {
                    setErrors([err.response.data.message])
                })
            }
        }
    }
    const addOrgCol = () => {
        setErrors([])
        setMessages([])
        if (role.length == 0 || description.length == 0){
            setErrors(['Preencha todos os campos!'])
        }else {
            
            axios.post(`${baseURL}/api/editAboutContent/colegiais/${1}`, {
                orgaos_colegiais: [
                    {
                        id: orgCol?.length + 1,
                        cargo: role,
                        descricao: description,
                        membros: []
                        },
                        ...orgCol
                ]
            })
            .then(res => {
                console.log('res', res.data)
                setMessages(['Órgão adicionado com sucesso!'])
                window.location.reload()
            })
            .catch(err => {
                setErrors([err.response.data.message])
            })
        }

    }
    const editOrgSing = async (item) => {
        setErrors([])
        setMessages([])
        if (role.length == 0 || description.length == 0){
            setErrors(['Preencha todos os campos!'])
        }else if (isPresident && (prName.length == 0 || !completedCrop)){
            setErrors(['Preencha as informações do presidente!'])
        }else if (prName == item.nome && description == item.descricao && role == item.cargo && !completedCrop && item?.show == show ){
            setErrors(['Nenhuma alteração feita!'])
        }else {
            if (completedCrop){
                console.log('completed')
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
                        axios.post(`${baseURL}/api/editAboutContent/any/${1}`, {
                            "orgaos_singulares": [{}],
                            "id": item.id,
                            "cargo": role,
                            "presidente": "true",
                            "nome": prName,
                            "descricao": description,
                            "image_data": base64Data,
                            "imagem": item.imagem,
                            "hasMembers": false,
                            "show": show
                        })
                        .then(res => {
                            setMessages(['Órgão adicionado com sucesso!'])
                            console.log('ressss', res.data)
                            window.location.reload()
                        })
                        .catch(err => {
                            setErrors([err.response.data.message])
                        })
                    }
                    reader.readAsDataURL(blob)
                }catch(err){
                    console.error('Error', err)

                }
            }else {
                if (item.presidente == 'true'){
                    axios.get(`${baseURL}/api/aboutContents`)
                .then(res => {
                let obj = [...res.data][0]
                let orgaos = [...obj.orgaos_singulares]
                let newOrgs = orgaos?.map((o) => {
                    if (o.id == item.id){
                        return {
                            "id": item.id,
                            "cargo": role,
                            "presidente": item.presidente,
                            "nome": prName,
                            "descricao": description,
                            "imagem": item.imagem,
                            "hasMembers": false,
                            "show": show
                        }
                    }else {
                        return o
                    }
                })
                axios.post(`${baseURL}/api/editAboutContent/any/${1}`, {
                    orgaos_singulares: newOrgs
                },
                
                )
                .then(res => {
                    console.log('success', res.data)
                    window.location.reload()
                })
                .catch(err => {
                    console.log('err', err.response.data.message)
                })
            })
                }else {
                    axios.get(`${baseURL}/api/aboutContents`)
                    .then(res => {
                    let obj = [...res.data][0]
                    let orgaos = [...obj.orgaos_singulares]
                    let newOrgs = orgaos?.map((o) => {
                        if (o.id == item.id){
                            return {
                                "id": item.id,
                                "cargo": role,
                                "descricao": description,
                                "hasMembers": item.hasMembers,
                                "show": show
                            }
                        }else {
                            return o
                        }
                    })
                    axios.post(`${baseURL}/api/editAboutContent/any/${1}`, {
                        orgaos_singulares: newOrgs
                    },
                    
                    )
                    .then(res => {
                        console.log('success', res.data)
                        window.location.reload()
                    })
                    .catch(err => {
                        console.log('err', err.response.data.message)
                    })
                }) 
                }
            }
        }
    }
    const editOrgCol = (item) => {
        setErrors([])
        setMessages([])
        if (role.length == 0 || description.length == 0){
            setErrors(['Preencha todos os campos!'])
        }else {
            axios.post(`${baseURL}/api/editAboutContent/colegiais/${1}`, {
                orgaos_colegiais: orgCol.map((i) => {
                    if (i.id == item.id){
                        return {
                            id: i.id,
                            cargo: role,
                            descricao: description,
                            membros: i.membros,
                            show: show
                        }
                    }
                    return i
                })
                
            },{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(res => {
                console.log('res', res.data.data)
                setMessages(['Órgão adicionado com sucesso!'])
                window.location.reload()
            })
            .catch(err => {
                setErrors([err.response.data.message])
            })
        }
    }
    const addMember = async (item) => {
        setErrors([])
        setMessages([])
        if (prName.length == 0 || role.length == 0 || !completedCrop){
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
                    axios.post(`${baseURL}/api/editAboutContent/any/1`, {
                        id: item.id,
                        orgaos_singulares: [],
                        add_member: true,
                        nome: prName,
                        cargo: role,
                        base64Data: base64Data
                    }, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(res => {
                        setMessages(['Membro adicionado com successo!'])
                        console.log('cadfa', res)
                        setRole('')
                        setPrName('')
                        setCompletedCrop(null)
                        setSelectedImage(null)
                        axios.get(`${baseURL}/api/aboutContents`)
                        .then(res => {
                            let list = [...res.data]
                            setOrgSing(list[0].orgaos_singulares)
                        })                    })
                }
                reader.readAsDataURL(blob)
            }catch(err){
                setErrors(err.response.data.message)
                console.error('Error', err)

            }
            
        }
    }
    const addMemberCol = async (item) => {
        setErrors([])
        setMessages([])
        if (prName.length == 0 || role.length == 0 || !completedCrop){
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
                    axios.post(`${baseURL}/api/editAboutContent/colegiais/1`, {
                        id: item.id,
                        orgaos_singulares: [],
                        add_member: true,
                        nome: prName,
                        cargo: role,
                        base64Data: base64Data
                    }, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(res => {
                        setMessages(['Membro adicionado com successo!'])
                        console.log('cadfa', res)
                        setRole('')
                        setPrName('')
                        setCompletedCrop(null)
                        setSelectedImage(null)
                        axios.get(`${baseURL}/api/aboutContents`)
                        .then(res => {
                            let list = [...res.data]
                            setOrgCol(list[0].orgaos_colegiais)
                        })                    })
                }
                reader.readAsDataURL(blob)
            }catch(err){
                setErrors(err.response.data.message)
                console.error('Error', err)

            }
            
        }
    }
    
    useEffect(() => {
        axios.get(`${baseURL}/api/aboutContents`)
        .then(res => {
            let list = [...res.data]
            setOrgSing(list[0].orgaos_singulares)
            setOrgCol(list[0].orgaos_colegiais)
            
        })
    }, [])
    return (
        <div className="dashboardContainer" id='adminHomeContainer'>
            <div className="title">Estrutura Orgánica</div>
            
            <div className='first'>
            <section className='section'>
                    <div className='header'>
                        <HeaderLabel title='Orgãos Singulares de Gestão'/>
                        <Dialog>
                            <DialogTrigger onClick={() =>{
                                setErrors([])
                                setMessages([])
                                setIsMultiple(false)
                                setRole('')
                                setDescription('')
                                setIsPresident(false)
                                setPrName('')
                                setCompletedCrop(null)
                                setSelectedImage(null)
                            }}>
                                <Edit title='Adicionar'/>
                            </DialogTrigger>
                            <DialogContent style={{width: '100%', maxWidth: 600, display: 'flex', flexDirection: 'column'}}>
                                <DialogHeader>
                                    <DialogTitle>Adicionar</DialogTitle>
                                    <DialogDescription>Adicionar um novo órgão singular</DialogDescription>

                                </DialogHeader>
                            <ScrollArea style={{height: '90vh', marginTop: 20}}>

                                <div className='sectionForms'>
                                    <div className='form'>
                                        <div className='label'>Cargo</div>
                                        <input value={role} onChange={(e) => {
                                            setRole(e.target.value)
                                        }} placeholder='Cargo do orgão...' className='loginInput'/>
                                    </div>
                                    
                                    
                                        <div className='form'>
                                        <div className='label'>Descrição</div>
                                        
                                        <textarea value={description} onChange={(e)=>{
                                            setDescription(e.target.value)
                                        }} style={{height: 100}} placeholder='Descrição...' className='loginInput' />
                                                                                                                </div>
                                                                                                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 10, margin: '20px 0'}}>
        
        {(!isMultiple && !orgSing?.some((item) => item.presidente == 'true')) ? <input type='checkbox' value={isPresident} onChange={(e) => {
        setIsPresident(!isPresident)                                                               
        }}/> : <Checkbox disabled />}
      <div style={{display: 'flex', flexDirection: 'column', gap: 1.5}}>
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          É o presidente?
        </label>
        <p className="text-sm text-muted-foreground">
          Atenção: Só pode ter um órgão com esse cargo.
        </p>
      </div>
    </div>
    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 10, margin: '20px 0'}}>

        {!isPresident ? <input type='checkbox' value={isMultiple} onChange={(e) => {
        setIsMultiple(!isMultiple)                                                               
        }}/> : <Checkbox disabled />}
      <div style={{display: 'flex', flexDirection: 'column', gap: 1.5}}>
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          É um conjunto de membros ou órgãos?
        </label>
        
      </div>
    </div>

    {isPresident && <div>
    <div className='form'>
    <div className='label'>Nome do presidente</div>
    <input value={prName} onChange={(e) => {
        setPrName(e.target.value)
    }} className='loginInput' placeholder='Nome do president...'/>
    </div>
    <div className="form">
                                <div className="label">Foto do Presidente</div>
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
    </div>}
    {isMultiple && <div>

        </div>}

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
                                        addOrgSing()
                                    }} className='save'>Adicionar</div>

                                </div>
                                </div>
                            </ScrollArea>
                            </DialogContent>
                        </Dialog>
                    </div>
                    {orgSing?.length > 0 ?
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nº</TableHead>
                                <TableHead>Cargo</TableHead>
                                <TableHead>Descrição</TableHead>                                
                                <TableHead className='tableActions'>Ações</TableHead>
                                <TableHead>Membros</TableHead>
                            </TableRow>
                        </TableHeader>
                        

                        <TableBody>
                        {
                                orgSing?.map((item, index) => {
                                    return (
                                        <TableRow>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell><div className='revText'>{item.cargo}</div></TableCell>
                                            <TableCell><div className='revText'>{item.descricao}</div></TableCell>
                                            <TableCell style={{}} className='tableActions'>
                                            
                                                <div className='actionButtons'>
                                                <Dialog>
                            <DialogTrigger onClick={() => {
                                if (item.presidente){
                                    setRole(item.cargo)
                                    setDescription(item.descricao)
                                    setPrName(item.nome) 
                                }else {
                                    setRole(item.cargo)
                                    setDescription(item.descricao)
                                }
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
                            <DialogContent style={{width: '100%', maxWidth: 600, display: 'flex', flexDirection: 'column'}}>
                                <DialogHeader>
                                    
                                    <DialogTitle>Editar</DialogTitle>
                                    <DialogDescription>Editar Órgão</DialogDescription>

                                </DialogHeader>
                                <ScrollArea style={{height: '90vh', marginTop: 20}}>

                                <div className='sectionForms'>
                                    <div className='form'>
                                        <div className='label'>Cargo</div>
                                        <input value={role} onChange={(e) => {
                                            setRole(e.target.value)
                                        }} placeholder='Cargo do orgão...' className='loginInput'/>
                                    </div>
                                    
                                    
                                        <div className='form'>
                                        <div className='label'>Descrição</div>
                                        
                                        <textarea value={description} onChange={(e)=>{
                                            setDescription(e.target.value)
                                        }} style={{height: 100}} placeholder='Descrição...' className='loginInput' />
                                                                                                                </div>
                                    {item.presidente == 'true' &&
                                    <div>
                                    <div className='form'>
                                    <div className='label'>Nome do presidente</div>
                                    <input value={prName} onChange={(e) => {
                                        setPrName(e.target.value)
                                    }} className='loginInput' placeholder='Nome do president...'/>
                                    </div>
                                    <div className="form">
                                    <div className="label">Foto do Presidente</div>
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
                                        aspect={4/2.8}
                                        onCropChange={setCrop}
                                        onCropComplete={onCropComplete}
                                        onZoomChange={setZoom}
                                        />
                                    </div> : <div style={{aspectRatio: '4/2'}}>
                                        <img style={{width: '100%', height: '100%', objectFit: 'cover', aspectRatio: '4/2'}} src={`${baseURL}/storage/images/${item.imagem}`}/>
                                        </div>}
                                    {/* <canvas
                                    ref={previewCanvasRef}
                                    style={{
                                        width: Math.round(completedCrop?.width ?? 0),
                                        height: Math.round(completedCrop?.height ?? 0)
                                    }}
                                    /> */}
                                    </div>
                                    </div>}                                                                    
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
                                        editOrgSing(item)
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
                                            Apagar Órgão
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Deseja mesmo apagar esse órgão?
                                        </AlertDialogDescription>
                                    </span>
                                    <span style={{alignSelf: 'center', marginTop: 15, display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', }}>
                                    <AlertDialogCancel style={{margin: 0}}>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction style={{margin: 0}} onClick={() => {
                                        console.log('deleted')
                                        axios.get(`${baseURL}/api/aboutContents`)
                                        .then(res => {
                let obj = [...res.data][0]
                let orgaos = [...obj.orgaos_singulares]
                axios.post(`${baseURL}/api/editAboutContent/any/${1}`, {
                    orgaos_singulares: orgaos.filter((o) => o.id != item.id)
                },
                )
                .then(res => {
                    console.log('success', res)
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
                                            <TableCell>
                                            <div className="actionButtons">
                                                {item.hasMembers == 'true' ? <Sheet onOpenChange={(e) => {
                                
                            }}>
                                <SheetTrigger onClick={() => {
                                    setIsMultiple(false)
                                    setPrName('')
                                    setRole('')
                                    setCompletedCrop(null)
                                    setSelectedImage(null)
                                }} style={{}}className='actionButton'>
                                    
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                                </svg>
                                </SheetTrigger>
                                <SheetContent className='profileSheet'>
                                <SheetHeader style={{alignItems: 'flex-start'}}>
                                <SheetTitle>Membros</SheetTitle>
                                <SheetDescription>
                                    
                                </SheetDescription>
                                </SheetHeader>
                                
                            
                            
                                <ScrollArea style={{height: '100%',marginTop: 20}}>
        <span className='modalComponent'>
            <div className='header' style={{display: 'flex', flexDirection: 'row'}}>
                <div className='title'>{item.nome}</div>
            </div>
            <div className='description'>{item.description}</div>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, margin: '20px 0'}}>
                <input value={isMultiple} onChange={(e) => {
                    setIsMultiple(!isMultiple)
                }} type='checkbox'/>
                <div className='label'>Adicionar Membro</div>
            </div>
            {isMultiple && <div className='sectionForms'>
                <div className='form'>
                    <div className='label'>Nome do membro</div>
                    <input placeholder='Nome do membro...' value={prName} onChange={(e)=>setPrName(e.target.value)} className='loginInput' />
                </div>
                <div className='form'>
                    <div className='label'>Cargo do membro</div>
                    <input placeholder='Cargo do membro...' value={role} onChange={(e)=>setRole(e.target.value)} className='loginInput' />
                </div>
                <div className="form">
                                    <div className="label">Foto do Membro</div>
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
                                        addMember(item)
                                    }} className='save'>Adicionar</div>

                                </div>
                                
            </div>}
            <div className='subTitle'>Membros</div>
           
            <div></div>
            <div className='members' style={{display: 'flex', flexDirection: 'row', gap: 40, flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
                {item.membros ? item.membros?.map((it, index) => {
                    return (
                      <span className='member' style={{minWidth: 120, maxWidth: 120, display: 'flex', flexDirection: 'column', justifyContent: ''}}>
                            <span className='memberImage'>
                                <img src={`${baseURL}/storage/images/${it.imagem}`}/>
                            </span>
                            <div className='memberName'>{it.nome}</div>
                            <AlertDialog>
                                <AlertDialogTrigger style={{}}>
                                <div style={{fontSize: 13, color:'red', border: '1px solid red', padding: '0 10px', margin:'5px 0', borderRadius: 5, cursor: 'pointer'}}>Deletar</div>
                                </AlertDialogTrigger>
                                <AlertDialogContent style={{flexDirection: 'column', display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                                    <span>
                                        <AlertDialogTitle>
                                            Apagar Membro
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Deseja mesmo apagar esse membro?
                                        </AlertDialogDescription>
                                    </span>
                                    <span style={{alignSelf: 'center', marginTop: 15, display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', }}>
                                    <AlertDialogCancel style={{margin: 0}}>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction style={{margin: 0}} onClick={() => {
                                        
                                        axios.get(`${baseURL}/api/aboutContents`)
                                        .then(res => {
                let obj = [...res.data][0]
                let list = item.membros
                let newList = [...list].filter((i) => i.id != it.id)
                axios.post(`${baseURL}/api/editAboutContent/any/${1}`, {
                    id: item.id,
                    delete_member: true,
                    newList: newList,
                    imagem: it.imagem
                },
                )
                .then(res => {
                    console.log('success', res)
                    axios.get(`${baseURL}/api/aboutContents`)
                        .then(res => {
                            let list = [...res.data]
                            setOrgSing(list[0].orgaos_singulares)
                        })  
                    // window.location.reload()
                })
                .catch(err => {
                    console.log('err', err.response.data.message)
                })      
    })
                                    }}>Confirmar</AlertDialogAction>
                                    </span>
                                    
                                </AlertDialogContent>
                            </AlertDialog>
                            
                            <div className='memberRole'>{it.cargo}</div>
                        </span>
                    )
                })
            :
            <div style={{fontSize: 14}}>Nenhum membro registrado.</div>}
            </div>
      
        </span>
         </ScrollArea>
                                </SheetContent>
                            </Sheet> :
                                                        <div style={{background: '#ff00003f', padding: '3px 10px', borderRadius: 5, textAlign: 'center', color: 'red', fontSize: 13, fontWeight:' 500'}}>Não</div>}
                                            </div>
                                            </TableCell>


                                        </TableRow>
                                    )
                            })
                            
                        
                        }
                        
                        </TableBody>
                        

                    </Table>
                    :<div style={{fontSize: 14, textAlign: 'center'}}>Nenhum órgão registrado. Adicione um.</div>
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
            <div className='first'>
            <section className='section'>
                    <div className='header'>
                        <HeaderLabel title='Orgãos Colegiais de gestão e consulta'/>
                        <Dialog>
                            <DialogTrigger onClick={() =>{
                                setRole('')
                                setDescription('')
                            }}>
                                <Edit title='Adicionar'/>
                            </DialogTrigger>
                            <DialogContent style={{width: '100%', maxWidth: 600, display: 'flex', flexDirection: 'column'}}>
                                <DialogHeader>
                                    <DialogTitle>Adicionar</DialogTitle>
                                    <DialogDescription>Adicionar um novo órgão colegial</DialogDescription>

                                </DialogHeader>
                                <div className='sectionForms'>
                                    <div className='form'>
                                        <div className='label'>Cargo</div>
                                        <input value={role} onChange={(e) => {
                                            setRole(e.target.value)
                                        }} placeholder='Cargo do orgão...' className='loginInput'/>
                                    </div>
                                    
                                    
                                        <div className='form'>
                                        <div className='label'>Descrição</div>
                                        
                                        <textarea value={description} onChange={(e)=>{
                                            setDescription(e.target.value)
                                        }} style={{height: 100}} placeholder='Descrição...' className='loginInput' />
                                                                                                                </div>
                                    <div className='form'>
                                        
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
                                        
                                        addOrgCol()
                                    }} className='save'>Adicionar</div>

                                </div>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    {orgCol?.length > 0 ?
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nº</TableHead>
                                <TableHead>Cargo</TableHead>
                                <TableHead>Descrição</TableHead>                                
                                <TableHead className='tableActions'>Ações</TableHead>
                                <TableHead>Membros</TableHead>


                            </TableRow>
                        </TableHeader>
                        

                        <TableBody>
                        {
                                orgCol.map((item, index) => {
                                    return (
                                        <TableRow>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell><div className='revText'>{item.cargo}</div></TableCell>
                                            
                                            <TableCell><div className='revText'>{item.descricao}</div></TableCell>
                                            <TableCell style={{}} className='tableActions'>
                                            
                                                <div className='actionButtons'>
                                                <Dialog>
                            <DialogTrigger onClick={() => {
                                setRole(item.cargo)
                                setDescription(item.descricao)
                                if (item.show != undefined && item.show == "true"){
                                    setShow(true)
                                }else if (item.show != undefined && item.show == "false"){
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
                            <DialogContent style={{width: '100%', maxWidth: 600, display: 'flex', flexDirection: 'column'}}>
                                <DialogHeader>
                                    <DialogTitle>Editar</DialogTitle>
                                    <DialogDescription>Editar órgão colegial</DialogDescription>

                                </DialogHeader>
                                <div className='sectionForms'>
                                    <div className='form'>
                                        <div className='label'>Cargo</div>
                                        <input value={role} onChange={(e) => {
                                            setRole(e.target.value)
                                        }} placeholder='Cargo do orgão...' className='loginInput'/>
                                    </div>
                                    
                                    
                                        <div className='form'>
                                        <div className='label'>Descrição</div>
                                        
                                        <textarea value={description} onChange={(e)=>{
                                            setDescription(e.target.value)
                                        }} style={{height: 100}} placeholder='Descrição...' className='loginInput' />
                                                                                                                </div>
                                    <div className='form'>
                                        
                                    <div className="errors">
                            {errors.length > 0 && errors.map((item, index) => {
                                return (
                                    <div className="error" key={index}>
                                        {item}
                                    </div>
                                )
                            })}
                            </div>
                            <div className='form'>
                            <ReactSwitch uncheckedIcon={null} checkedIcon={null} checked={show} onChange={() => {
                                            setShow(!show)
                                        }} />
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
                                        editOrgCol(item)
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
                                            Apagar Órgão
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Deseja mesmo apagar esse órgão?
                                        </AlertDialogDescription>
                                    </span>
                                    <span style={{alignSelf: 'center', marginTop: 15, display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', }}>
                                    <AlertDialogCancel style={{margin: 0}}>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction style={{margin: 0}} onClick={() => {
                                       axios.post(`${baseURL}/api/editAboutContent/colegiais/${1}`, {
                                        orgaos_colegiais: orgCol.filter((i) => i.id != item.id)
                                        
                                    },{
                                        headers: {
                                            'Content-Type': 'multipart/form-data',
                                        },
                                    })
                                    .then(res => {
                                        console.log('res', res.data.data)
                                        setMessages(['Órgão adicionado com sucesso!'])
                                        window.location.reload()
                                    })
                                    .catch(err => {
                                        setErrors([err.response.data.message])
                                    })
                                    }}>Confirmar</AlertDialogAction>
                                    </span>
                                    
                                </AlertDialogContent>
                            </AlertDialog>
                                                    
                                                </div>
                                               
                                            </TableCell>
                                            <TableCell className='actionButtons'>
                                            <Sheet onOpenChange={(e) => {
                                
                            }}>
                                <SheetTrigger onClick={() => {
                                    setIsMultiple(false)
                                    setPrName('')
                                    setRole('')
                                    setCompletedCrop(null)
                                    setSelectedImage(null)
                                }} style={{}}className='actionButton'>
                                    
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                                </svg>
                                </SheetTrigger>
                                <SheetContent className='profileSheet'>
                                <SheetHeader style={{alignItems: 'flex-start'}}>
                                <SheetTitle>Membros</SheetTitle>
                                <SheetDescription>
                                    
                                </SheetDescription>
                                </SheetHeader>
                                
                            
                            
                                <ScrollArea style={{height: '100%',marginTop: 20}}>
        <span className='modalComponent'>
            <div className='header' style={{display: 'flex', flexDirection: 'row'}}>
                <div className='title'>{item.nome}</div>
            </div>
            <div className='description'>{item.description}</div>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, margin: '20px 0'}}>
                <input value={isMultiple} onChange={(e) => {
                    setIsMultiple(!isMultiple)
                }} type='checkbox'/>
                <div className='label'>Adicionar Membro</div>
            </div>
            {isMultiple && <div className='sectionForms'>
                <div className='form'>
                    <div className='label'>Nome do membro</div>
                    <input placeholder='Nome do membro...' value={prName} onChange={(e)=>setPrName(e.target.value)} className='loginInput' />
                </div>
                <div className='form'>
                    <div className='label'>Cargo do membro</div>
                    <input placeholder='Cargo do membro...' value={role} onChange={(e)=>setRole(e.target.value)} className='loginInput' />
                </div>
                <div className="form">
                                    <div className="label">Foto do Membro</div>
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
                                        addMemberCol(item)
                                    }} className='save'>Adicionar</div>

                                </div>
                                
            </div>}
            <div className='subTitle'>Membros</div>
           
            <div></div>
            <div className='members' style={{display: 'flex', flexDirection: 'row', gap: 40, flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
                {item.membros ? item.membros?.map((it, index) => {
                    return (
                      <span className='member' style={{minWidth: 120, maxWidth: 120, display: 'flex', flexDirection: 'column', justifyContent: ''}}>
                            <span className='memberImage'>
                                <img src={`${baseURL}/storage/images/${it.imagem}`}/>
                            </span>
                            <div className='memberName'>{it.nome}</div>
                            <AlertDialog>
                                <AlertDialogTrigger style={{}}>
                                <div style={{fontSize: 13, color:'red', border: '1px solid red', padding: '0 10px', margin:'5px 0', borderRadius: 5, cursor: 'pointer'}}>Deletar</div>
                                </AlertDialogTrigger>
                                <AlertDialogContent style={{flexDirection: 'column', display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                                    <span>
                                        <AlertDialogTitle>
                                            Apagar Membro
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Deseja mesmo apagar esse membro?
                                        </AlertDialogDescription>
                                    </span>
                                    <span style={{alignSelf: 'center', marginTop: 15, display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', }}>
                                    <AlertDialogCancel style={{margin: 0}}>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction style={{margin: 0}} onClick={() => {
                                        
                                        axios.get(`${baseURL}/api/aboutContents`)
                                        .then(res => {
                let obj = [...res.data][0]
                let list = item.membros
                let newList = [...list].filter((i) => i.id != it.id)
                axios.post(`${baseURL}/api/editAboutContent/colegiais/${1}`, {
                    id: item.id,
                    delete_member: true,
                    newList: newList,
                    imagem: it.imagem
                },
                )
                .then(res => {
                    console.log('success', res)
                    axios.get(`${baseURL}/api/aboutContents`)
                        .then(res => {
                            let list = [...res.data]
                            setOrgCol(list[0].orgaos_colegiais)
                        })  
                    // window.location.reload()
                })
                .catch(err => {
                    console.log('err', err.response.data.message)
                })    
    })
                                    }}>Confirmar</AlertDialogAction>
                                    </span>
                                    
                                </AlertDialogContent>
                            </AlertDialog>
                            
                            <div className='memberRole'>{it.cargo}</div>
                        </span>
                    )
                })
            :
            <div style={{fontSize: 14}}>Nenhum membro registrado.</div>}
            </div>
      
        </span>
         </ScrollArea>
                                </SheetContent>
                            </Sheet>
                                            </TableCell>


                                        </TableRow>
                                    )
                            })
                            
                        
                        }
                        
                        </TableBody>
                        

                    </Table>
                    :<div style={{fontSize: 14, textAlign: 'center'}}>Nenhum órgão registrado. Adicione um.</div>
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
export default AdminEstOrg