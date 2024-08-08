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
const AdminOrg = () => {
    const [errors, setErrors] = useState([])
    const [messages, setMessages] =useState([])
    const [selectedDoc, setSelectedDoc] = useState(null)
    const [preview, setPreview] = useState(null)
    const [load, setLoad] = useState(false)
    const editOrg = () => {
        setLoad(true)
        setErrors([])
        setMessages([])
        if (!selectedDoc){
            setErrors(['Selecione um PDF por favor!'])
            setLoad(false)
        }else {
            axios.get(`${baseURL}/api/aboutContents`)
            .then(res => {
                let content = [...res.data][0]
                if (content.organigrama){
                    console.log('yes')
                    axios.post(`${baseURL}/api/editAboutContent/any/1`, {
                        pdf: content.organigrama,
                        organigrama: selectedDoc
                    }, {
                        headers: {
                            "Content-Type": 'multipart/form-data'
                        }
                    })
                    .then(res => {
                        setLoad(false)
                        console.log('success', selectedDoc)
                        setMessages(['Organigrama atualizado com success!'])
                        window.location.reload()
                        
                    })
                    .catch(err => {
                        setErrors([err.response.data.message])
                        setLoad(false)
                    })
                }else {
                    axios.post(`${baseURL}/api/editAboutContent/any/1`, {
                        organigrama: selectedDoc
                    }, {
                        headers: {
                            "Content-Type": 'multipart/form-data'
                        }
                    })
                    .then(res => {
                        setLoad(false)
                        console.log('success', selectedDoc)
                        setMessages(['Organigrama atualizado com success!'])
                        window.location.reload()
                        
                    })
                    .catch(err => {
                        setErrors([err.response.data.message])
                        setLoad(false)
                    })
                }
            })
        }
    }
    useEffect(()=> {
    axios.get(`${baseURL}/api/aboutContents`)
    .then(res => {
        let content = [...res.data][0]
        setPreview(content.organigrama)
        console.log(content.organigrama)
    })
    }, [])
    return (
        <div className="dashboardContainer" id='adminHomeContainer'>
            <div className="title">Organigrama</div>
            
            <div className="first">
            <section className='section'>
                    <div className='header'>
                        <HeaderLabel title='Organigrama Institucional'/>
                        <Dialog>
                            <DialogTrigger onClick={() => {
                                setSelectedDoc(null)
                            }}>
                                <Edit title='Editar'/>
                            </DialogTrigger>
                            <DialogContent style={{width: '100%', maxWidth: 1000, display: 'flex', flexDirection: 'column'}}>
                            <DialogHeader>
                            <DialogTitle>Editar</DialogTitle>
                            <DialogDescription>
                                Editar Organigrama
                            </DialogDescription>
                            </DialogHeader>
                            <ScrollArea style={{height: '90vh', marginTop: 20}}>
                                <div className='sectionForms'>
                                
                                    <div className="form">
                                    <div className="label">Organigrama</div>
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
                                
                                                        <div className='buttons' style={{marginBottom: 50}}>
                                    <div onClick={() => {
                                        editOrg()
                                    }} className='save'>Adicionar</div>

                                </div>
                                </div>
                            </ScrollArea>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div style={{width: '100%', aspectRatio: 2/1.5, background: '#d3d3d3'}}>
                    {preview && <embed className='orgChart' src={`${baseURL}/storage/pdfs/${preview}`} style={{width: '100%', height: '100%'}} />
                    }
                    </div>
                </section>
            </div>
        </div>
    )
}
export default AdminOrg