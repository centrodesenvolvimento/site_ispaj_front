import { Tree, TreeNode } from 'react-organizational-chart'
import '../css/organisation.css'
import { Worker } from '@react-pdf-viewer/core'
import { Document, Page, pdfjs } from 'react-pdf'
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/full-screen/lib/styles/index.css';
import Skeleton from 'react-loading-skeleton';
import { baseURL } from '../api/api';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Organisation = ({aboutContent}) => {
    return (
            <div className='sectionContainer'>
              <div className='container'>
              <div className='info' style={{height: '100%'}}>
                      <div className='preTitle'>Organigrama Insitucional</div>
                      <div className='title'>A estrutura organizacional do ISPAJ</div>
                      <div className='description'>segue o organigrama abaixo, onde se destaca os diferentes departamentos, unidades administrativas e suas inter-relações:</div>
                  </div>
            </div>
                
          
          <div className='container1'>
            <div className='orgChartContainer' style={{background: '#e3e3e3', width: '100%', aspectRatio: 4/3, maxHeight: 600, overflow: 'hidden'}}>
              
          {aboutContent?.organigrama &&  <embed src={`${baseURL}/storage/pdfs/${aboutContent?.organigrama}`} style={{width: '100%', aspectRatio: 4/3, maxHeight: 600}}  />}
            
            </div>
            {`${aboutContent?.organigrama}`.length > 8 && <div style={{display: 'flex', flexDirection: 'row'}}><div
            onClick={() => {
              window.open(`${baseURL}/storage/pdfs/${aboutContent?.organigrama}`)
            }} className='seeMore'>Tela Cheia</div>
            {/* <a href={aboutContent?.organigrama} download={'OrganigramaISPAJ'} className='seeMore'>Baixar PDF</a> */}
            </div>}
          </div>

            {/* <div class="content">
  <figure class="org-chart cf">
    <ul class="administration">
      <li>					
        <ul class="director">
          <li>
            <a><span>Direcção Geral</span></a>
            <ul class="subdirector">
              <li><a><span>Assessorias</span></a></li>
            </ul>
            <ul class="departments cf">								
              <li><a><span>Gabinete de Direcção Geral</span></a></li>
              
              <li class="department dep-a">
                <a><span>Direcção Académica</span></a>
                <ul class="sections">
                  <li class="section"><a><span>Departamento de Eng. e Tec.</span></a></li>
                  <li class="section"><a><span>Departamento de Ciencias Socias e Aplicadas</span></a></li>
                  <li class="section"><a ><span>Departamento de Geociencias</span></a></li>
                  <li class="section"><a ><span>Secretaria Académica</span></a></li>
                  <li class="section"><a ><span>Biblioteca</span></a></li>
                </ul>
              </li>
              <li class="department dep-b">
                <a><span>Secretaria Geral</span></a>
                <ul class="sections">
                  <li class="section"><a ><span>Departamento de Recursos Humanos</span></a></li>
                  <li class="section"><a ><span>Departamento de Contabilidade e Financas</span></a></li>
                  <li class="section"><a ><span>Departamento de Aprovisionamento e Apoio</span></a></li>
                  <li class="section"><a ><span>Departamento de Accao Social</span></a></li>
                  <li class="section"><a ><span>Secretaria Administrativa</span></a></li>
                </ul>
              </li>
              <li class="department dep-c">
                <a><span>Direcção Laboratórios
                </span></a>
                <ul class="sections">
                  <li class="section"><a ><span>Manuntenção</span></a></li>
                 
                </ul>
              </li>
              <li class="department dep-d">
                <a ><span>Direcção Científica e de Extensão</span></a>
                <ul class="sections">
                  <li class="section"><a ><span>Departamento de Investigacao e Pos Graduacao</span></a></li>
                  <li class="section"><a ><span>Departamento da Extensão</span></a></li>
                  
                </ul>
              </li>
              <li class="department dep-e">
                <a><span>Department E</span></a>
                <ul class="sections">
                  <li class="section"><a ><span>Section E1</span></a></li>
                  <li class="section"><a ><span>Section E2</span></a></li>
                  <li class="section"><a ><span>Section E3</span></a></li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>	
      </li>
    </ul>			
  </figure>
</div> */}
        </div>
    )
}
export default Organisation


{/* <div className='orgContainer'>
            {/* <TreeNode label={<Leaf title={'Conselho de Direcção'} number={10}/>} /> */}
                // <Tree lineHeight='70px' lineColor='orange' lineWidth='5px' label={<Leaf title={'Direcção Geral'} number={10}/>}>

                // {/* second tree */}
                
                // <TreeNode label={<Leaf1 title={'Gabinete de Direcção Geral'} number={328}/>}>
                //     <TreeNode label={<Leaf1 title={'Direcção Académica'} number={328}/>}>
                //     <TreeNode label={<Leaf1 title={'Secretaria Geral'} number={328}/>} />
                //     <TreeNode label={<Leaf1 title={'Secretaria Geral'} number={328}/>} />
                //     <TreeNode label={<Leaf1 title={'Secretaria Geral'} number={328}/>} />
                //     </TreeNode>
                //     <TreeNode label={<Leaf1 title={'Secretaria Geral'} number={328}/>} />
                //     <TreeNode label={<Leaf1 title={'Direcção Laboratórios Profissionalizantes'} number={328}/>} />
                //     <TreeNode label={<Leaf1 title={'Direcção Científicos e de Extensão'} number={328}/>} />
                // </TreeNode>
                // <TreeNode label={<Leaf2 title={'Assessorias'} />}/>
                // </Tree>
                {/* <Tree label={<Leaf title={'Conselho Universtário'} number={10}/>}></Tree> */}
            // </div> */}

            // const Leaf = ({title, number}) => {
            //     return (
            //         <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            //             <div className='leafContainer'>
            //                 <div className='leafImage'><span>{title[0]}{`${title}`.split(' ').length > 0 && `${title}`.split(' ')[1][0]}</span></div>
            //                 <div className='leafTitle'>{title}</div>
            //                 <div className='leafStat'><span className='leafValue'>{number}</span>
            //                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
            //               <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
            //             </svg></div>
            //                 {/* <div className='leaftStats'><span className='leafStat'>Staff: </span><span className='leaftValue'>{number}
            //                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
            //               <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
            //             </svg></span></div> */}
            //             </div>
            //         </div>
            //     )
            // }
            // const Leaf1 = ({title, number}) => {
            //     return (
            //         <div style={{display: 'flex', justifyContent: 'center'}}>
            //             <div className='leafContainer'>
            //                 <div className='leafImage'><span>{title[0]}{`${title}`.split(' ').length > 0 && `${title}`.split(' ')[`${title}`.split(' ').length - 1][0]}</span></div>
            //                 <div className='leafTitle'>{title}</div>
            //                 <div className='leafStat'><span className='leafValue'>{number}</span>
            //                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
            //               <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
            //             </svg></div>
                        
            //             </div>
            //         </div>
            //     )
            // }
            // const Leaf2 = ({ title, list}) => {
            //     return (
            //         <div className='leafContainer'>
            //             <div className='leafImage'><span>{title[0]}{`${title}`.split(' ').length > 0 && `${title}`.split(' ')[`${title}`.split(' ').length - 1][0]}</span></div>
            //             <div className='leafTitle'>{title}</div>
            //             <div className='leafStat'><span className='leafValue'>{'3'}</span>
            //             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
            //   <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
            // </svg></div>
                        
            //         </div>
            //     )
            // }