import { useState } from 'react'
import '../css/about.css'
import '../css/history.css'
import { Chrono } from 'react-chrono'
import Skeleton from 'react-loading-skeleton'
const History = ({aboutContent}) => {
   const [months, setMonths] = useState([
      "Janeiro", 
      "Fevereiro", 
      "Março", 
      "Abril", 
      "Maio", 
      "Junho", 
      "Julho", 
      "Agosto", 
      "Setembro", 
      "Outubro", 
      "Novembro", 
      "Dezembro"
  ])
    const [timelineBlocks, setTimelineBlocks] = useState([
        {
          title: "Início do Projecto de Construção do ISPAJ",
          description: "23 de Março, 2014",
          content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.",
          image: null
        },
        {
          title: "Criação da Promotora PDA",
          description: "14 de Junho, 2016",
          content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.",
          image: null
        },
        {
          title: "Decreto Executivo nº 111/11 Autorização a Criação do ISPAJ",
          description: "22 de Abril, 2016",
          content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.",
          image: null
        },
        {
          title: "Início das Actividades Académica",
          description: "23 de Janeiro, 2019",
          content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.",
          image: null
        },
        {
            title: "Proposta de criação da clínica ISPAJ",
            description: "3 de Fevereiro, 2023",
            content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.",
            image: null
          },
        {
          title: "Início do Projecto de Construção da clínica ISPAJ",
          description: "23 de Fevereiro, 2023",
          content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.",
          image: null
        },
        {
            title: "Início das Actividades Académica na clínica ISPAJ",
            description: "23 de Fevereiro, 2023",
            content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.",
            image: null
          }
      ]);
    return (
        <div className='sectionContainer'>
        <div className='container'>
            <div className='info' style={{height: '100%'}}>
                <div className='preTitle'>Historial</div>
                <div className='title'>Nossa Trajetória</div>
                <div className='description'>Conheça a história e evolução do nosso grupo desde a sua fundação até os dias actuais:</div>
            </div>

            {/*  */}
        </div>
        {/* <div className='container1' style={{background: 'yellow'}}>
            <Chrono theme={{
                primary: 'orange',
            }} style={{backgroundColor: 'yellow'}} items={items} mode="VERTICAL_ALTERNATING" disableToolbar={true}/>
        </div> */}
        <div className='container1'>
            <div class="historyContainer">
            {
             aboutContent?.historial && [...aboutContent?.historial].length > 0 ? 
             [...aboutContent?.historial].filter((item) => {
               if (item.show == undefined){
                   return item
               }else if (item.show == true){
                   return item
               }
           }).sort((a, b) => new Date(a.data) - new Date(b.data)).map((item, index) => {
               //(index, item.title)
               return (
                   <div class={`timeline-block timeline-block-${index % 2 == 0 ? 'left' : 'right'}`}>
     <div class="marker"></div>
     <div class="timeline-content">
        <h3>{item.titulo}</h3>
        <span>{new Date(item.data).getDate()} de {months[new Date(item.data).getMonth()]}, {new Date(item.data).getFullYear()}</span>
        <p>{item.descricao}</p>
     </div>
  </div>
               )
            }):
            timelineBlocks.map((item, index) => {
               //(index, item.title)
               return (
                   <div class={`timeline-block timeline-block-${index % 2 == 0 ? 'left' : 'right'}`}>
     <div class="marker"></div>
     <div class="timeline-content">
        <Skeleton style={{height: 24}} count={2}/>
        <Skeleton style={{height: 20, width: 100}}/>
        <Skeleton count={5}/>
        <p style={{opacity: 0, height: 0}}>{item.content}</p>
     </div>
  </div>
               )
            })            }

{/* 23 de Março, 2014
 */}
{/* timelineBlocks.map((item, index) => {
                //(index, item.title)
                return (
                    <div class={`timeline-block timeline-block-${index % 2 == 0 ? 'left' : 'right'}`}>
      <div class="marker"></div>
      <div class="timeline-content">
         <h3>{item.title}</h3>
         <span>{item.description}</span>
         <p>{item.content}</p>
      </div>
   </div>
                )
             }) */}
   {/* <div class="timeline-block timeline-block-right">
      <div class="marker"></div>
      <div class="timeline-content">
         <h3>First Year</h3>
         <span>Some work experience</span>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>
      </div>
   </div>

   <div class="timeline-block timeline-block-left">
      <div class="marker"></div>
      <div class="timeline-content">
         <h3>Seconed Year</h3>
         <span>Some work experience</span>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>
      </div>
   </div>

   <div class="timeline-block timeline-block-right">
      <div class="marker"></div>
      <div class="timeline-content">
         <h3>Third Year</h3>
         <span>Some work experience</span>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>
      </div>
   </div>

   <div class="timeline-block timeline-block-left">
      <div class="marker"></div>
      <div class="timeline-content">
         <h3>Fourth Year</h3>
         <span>Some work experience</span>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>
      </div>
   </div>

   <div class="timeline-block timeline-block-right">
      <div class="marker"></div>
      <div class="timeline-content">
         <h3>Fifth Year</h3>
         <span>Some work experience</span>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>
      </div>
   </div> */}
        </div>
        </div>
    </div>
    )
}
export default History