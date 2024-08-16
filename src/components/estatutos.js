import { useState } from 'react';
import '../css/about.css'
import '../css/estatutos.css'
import Skeleton from 'react-loading-skeleton';
import { format } from 'date-fns';
import { baseURL } from '../api/api';
const Estatutos = ({aboutContent}) =>  {
    const [regulations, setRegulations] = useState([
        {
            title: "Estatuto Orgânico do ISPAJ",
            description: "Aprovado 9/7/2015",
            content: process.env.PUBLIC_URL + '/pdf/Estatuto Organico do ISPAJ aprovado CD 9_7_2015.pdf',
            image: null
        },
        {
            title: "Regulamento Assembleia",
            description: "Aprovado 25/5/2015",
            content: process.env.PUBLIC_URL + "/pdf/REGULAMENTO ASSEMBLEIA_apr-Cd_25_5_2015.pdf",
            image: null
        },
        {
            title: "Regulamento Conselho Cientifico",
            description: "Aprovado 09/07/2015",
            content: process.env.PUBLIC_URL + "/pdf/Regulamento Conselho Cientifico CD 09_07_2015.pdf",
            image: null
        },
        {
            title: "Regulamento de Laboratórios do ISPAJ",
            description: "Aprovado 8/6/2015",
            content: process.env.PUBLIC_URL + "/pdf/Regulamento de Laboratorios do ISPAJ_apr_Cd_8_6_2015.pdf",
            image: null
        },
        {
            title: "Regulamento de Prestação de Serviços",
            description: "Aprovado 17/6/2015",
            content: process.env.PUBLIC_URL + "/pdf/Regulamento de Prestacao de Servicos_apr_CD_17_6_2015 1.pdf",
            image: null
        },
        {
            title: "Regulamento do Conselho Pedagógico",
            description: "Aprovado 9/7/2015",
            content: process.env.PUBLIC_URL + "/pdf/Regulamento do Conselho Pedagogico CD 9_7_2015.pdf",
            image: null
        },
        {
            title: "Regulamento do Provedor dos Estudantes do ISPAJ",
            description: "Aprovado 9/7/2015",
            content: process.env.PUBLIC_URL + "/pdf/Regulamento do Provedor dos Estudantes do ISPAJ CD 9_7_2015.pdf",
            image: null
        },
        {
            title: "Regulamento do TFC da Licenciatura",
            description: "Aprovado 8/6/2015",
            content: process.env.PUBLIC_URL + "/pdf/Regulamento do TFC da licenciatura_apr_Cd_8_6_2015.pdf",
            image: null
        },
        {
            title: "Regulamento Eleitoral para a Eleição da Assembleia do ISPAJ",
            description: "Aprovado 14/5/2015",
            content: process.env.PUBLIC_URL + "/pdf/Regulamento eleitoral para a eleicao da Assembleia do ISPAJ apr CD 14_5_2015.pdf",
            image: null
        },
        {
            title: "Regulamento Estágios",
            description: "Junho 2015",
            content: process.env.PUBLIC_URL + "/pdf/Regulamento Estagios Junho 2015.pdf",
            image: null
        },
        {
            title: "Regulamento Regime Académico e Avaliação Conhecimentos",
            description: "Aprovado 9/7/2015",
            content: process.env.PUBLIC_URL + "/pdf/Regulamento Regime Académico e Avaliacao Conhecimentos CD 9_7_2015.pdf",
            image: null
        },
        {
            title: "Regulamento de Conduta e Ética",
            description: "Aprovado 3/11/2015",
            content: process.env.PUBLIC_URL + "/pdf/Draft Regulamento de conduta e etica CD 3_11_2015.pdf",
            image: null
        },
        {
            title: "Regulamento Disciplinar dos Estudantes",
            description: "Aprovado 3/11/2015",
            content: process.env.PUBLIC_URL + "/pdf/Draft Regulamento disciplinar dos estudantes CD 3_11_2015.pdf",
            image: null
        },
        {
            title: "Regulamento Disciplinar Pessoal",
            description: "Aprovado 3/11/2015",
            content: process.env.PUBLIC_URL + "/pdf/Draft Regulamento disciplinar pessoal CD 3_11_2015.pdf",
            image: null
        },
        {
            title: "Procedimentos Trabalho de Fim de Curso",
            description: "Aprovado 3/11/2015",
            content: process.env.PUBLIC_URL + "/pdf/PROCEDIMENTOS TRABALHOS DE FIM DE CURSO.pdf",
            image: null
        },
        {
            title: "Norma de Aplicação para Trabalhos de Fim de Curso de Licenciatura",
            description: "Aprovado 1/11/2016",
            content: process.env.PUBLIC_URL + "/pdf/NORMA DE APLICAÇÃO PARA TRABALHOS DE FIM DE CURSO DE LICENCIATURA CD 01_11_2016.pdf",
            image: null
        },
        {
            title: "Regulamento Laboral ISPAJ",
            description: "Aprovado 1/11/2016",
            content: process.env.PUBLIC_URL + "/pdf/REGULAMENTO LABORAL ISPAJ CD 01_11_2016.pdf",
            image: null
        }
    ])
    return (
        <div className='sectionContainer'>
        <div className='container'>
            <div className='info' style={{height: '100%'}}>
                <div className='preTitle'>Estatutos e Regulamentos</div>
                <div className='title'>Explore os estatutos e regulamentos que guiam as actividades académicas e administrativas do ISPAJ</div>
            </div>

            {/*  */}
        </div>
        {/* Aprovado 25/5/2015
 */}
        <div className='container1'>
            <div className='regulations'>
                {aboutContent?.regulamentos && [...aboutContent?.regulamentos].length > 0 ? [...aboutContent?.regulamentos].filter((item) => {
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
                            <div className='title'>{item.titulo}</div>
                            <div onClick={() => {
                                window.open(`${baseURL}/storage/pdfs/${item.documento}`, '_blank')
                            }} className='regButton'>Ver PDF</div>
                        </div>
                    )
                }) :
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
                })
                }
            </div>
        </div>
        </div>
    )
}
export default Estatutos