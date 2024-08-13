import Skeleton from 'react-loading-skeleton'
import '../css/about.css'
import '../css/estruturaAdmin.css'
const EstruturaAdmin = ({aboutContent}) => {
    return (
        <div className='sectionContainer'>
            <div className='container'>
                <div className='info' style={{height: '100%'}}>
                    <div className='preTitle'>Estrutura Administrativa</div>
                    <div className='title'>A nossa instituição</div>
                    <div className='description'>dispõe do seguinte pessoal docente e não docente para o seu funcionamento regular:</div>
                </div>

                {/*  */}
            </div>
            <div className='container1'>
                <div className='preTitle'>Docentes:</div>
                <div className='adminGrid'>
                <section className='subordinates' style={{justifyContent: 'space-between'}}>
                        <div>
                            <div className='imgContainer'>DCS</div>
                        </div>
                        <div className='title'>Professores em cargo no Departamento de Ciências e Saúde</div>

                        {aboutContent?.administracao ? <div className='gridValue'>{aboutContent?.administracao?.saude}</div> : <Skeleton className='gridValue'/>}
                    </section>
                    <section className='subordinates' style={{justifyContent: 'space-between'}}>
                        <div>
                            <div className='imgContainer'>DE</div>
                        </div>
                        <div className='title'>Professores em cargo no Departamento de Engenharia</div>
                        {aboutContent?.administracao ? <div className='gridValue'>{aboutContent?.administracao?.engenharia}</div> : <Skeleton className='gridValue'/>}                    </section>
                    <section className='subordinates' style={{justifyContent: 'space-between'}}>
                        <div>
                            <div className='imgContainer'>DSCE</div>
                        </div>
                        <div className='title'>Professores em cargo no Departamento de Ciências Sociais e Económicas</div>
                        {aboutContent?.administracao ? <div className='gridValue'>{aboutContent?.administracao?.sociais}</div> : <Skeleton className='gridValue'/>} </section>
                    
                </div>
                <div className='preTitle' style={{marginTop: 20}}>Não Docentes:</div>
                <div className='adminGrid'>
                <section className='subordinates' style={{justifyContent: 'space-between'}}>
                        <div>
                            <div className='imgContainer'>ND</div>
                        </div>
                        <div className='title'>Funcionários com qualificação de não docentes</div>
                        {aboutContent?.administracao ? <div className='gridValue'>{aboutContent?.administracao?.nao_docentes}</div> : <Skeleton className='gridValue'/>}                    </section>
                    
                </div>

            </div>
        </div>
    )
}
export default EstruturaAdmin