import { useEffect, useState } from 'react';
import '../css/about.css'
import '../css/estatutos.css'
import Skeleton from 'react-loading-skeleton';
import { format } from 'date-fns';
import { baseURL } from '../api/api';
const ExamsSection = ({admissionsContents}) =>  {
    const [regulations, setRegulations] = useState([
        {
            title: "Engenharia Recursos Naturais e Ambiente",
            description: "Aprovado 9/7/2015",
            content: process.env.PUBLIC_URL + '/pdf/first.pdf',
            image: null
        },
        {
            title: "Arquitectura e Urbanismo, Engenharia Civil, Engenharia Industrial",
            description: "Aprovado 25/5/2015",
            content: process.env.PUBLIC_URL + "/pdf/second.pdf",
            image: null
        },
        {
            title: "Sistemas Eléctricos, Engenharia Informática",
            description: "Aprovado 09/07/2015",
            content: process.env.PUBLIC_URL + "/pdf/second.pdf",
            image: null
        },
        {
            title: "Análises Clínicas e Saúde Pública, Cardiopneumologia, Enfermagem",
            description: "Aprovado 8/6/2015",
            content: process.env.PUBLIC_URL + "/pdf/third.pdf",
            image: null
        },
        {
            title: "Fisioterapia, Odontologia e Radiologia",
            description: "Aprovado 17/6/2015",
            content: process.env.PUBLIC_URL + "/pdf/third.pdf",
            image: null
        },
        {
            title: "Psicologia",
            description: "Aprovado 9/7/2015",
            content: process.env.PUBLIC_URL + "/pdf/fourth.pdf",
            image: null
        },
        {
            title: "Relações Internacionais",
            description: "Aprovado 9/7/2015",
            content: process.env.PUBLIC_URL + "/pdf/fifth.pdf",
            image: null
        },
        {
            title: "Ciências Económicas e Gestão Estatística, Gestão de Informação",
            description: "Aprovado 8/6/2015",
            content: process.env.PUBLIC_URL + "/pdf/sixth.pdf",
            image: null
        },
        
    ])
    useEffect(() => {
        console.log('admissions', admissionsContents)
    }, [])
    return (
        <div className='sectionContainer'>
        <div className='container'>
            <div className='info' style={{height: '100%'}}>
                <div className='preTitle'>Tópicos para Exames de Acesso</div>
                <div className='title'>Abaixo constam os tópicos para exames de acesso, conforme os respectivos cursos:</div>
            </div>

            {/*  */}
        </div>
        <div className='container1'>
            <div className='regulations'>
                {admissionsContents?.exames && [...admissionsContents?.exames].length > 0 ? [...admissionsContents?.exames].filter((item) => {
               if (item.show == undefined){
                   return item
               }else if (item.show == true || item.show == 'true'){
                   return item
               }
           }).map((item, index)=> {
                    return (
                        <div className='regContainer'>
                            <div>
                            <div className='imgContainer'><img src={process.env.PUBLIC_URL + '/images/logoTrans.png'}/></div>
                            </div>
                            <div className='description'>Aprovado {format(new Date(item.data), 'dd/MM/yyyy')}</div>
                            <div className='title'>{item.nome}</div>
                            <div onClick={() => {
                                window.open(`${baseURL}/storage/pdfs/${item.documento}`, '_blank')
                            }} className='regButton'>Ver PDF</div>
                        </div>
                    )
                }): 
                regulations.map((item, index)=> {
                    return (
                        <div className='regContainer'>
                            <div>
                            <div className='imgContainer'><img src={process.env.PUBLIC_URL + '/images/logoTrans.png'}/></div>
                            </div>
                            <Skeleton className='description'/>
                            <Skeleton className='title'/>
                            <Skeleton className='regButton' style={{margin: 'auto', alignSelf: 'center'}}/>
                        </div>
                    )
                })}
            </div>
        </div>
        </div>
    )
}
export default ExamsSection