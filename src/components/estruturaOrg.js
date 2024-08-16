import { useEffect, useState } from 'react'
import '../css/about.css'
import '../css/estruturaOrg.css'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../@/components/ui/dialog"
import { ScrollArea } from "../@/components/ui/scroll-area"
import Skeleton from 'react-loading-skeleton'
import { baseURL } from '../api/api'



const EstruturaOrg = ({aboutContent}) => {
    const [members, setMembers] = useState([
        {
          nome: "Ana Silva",
          cargo: "Professor",
          imagem: "ana_silva.jpg"
        },
        {
          nome: "Bruno Almeida",
          cargo: "Estudante",
          imagem: "bruno_almeida.jpg"
        },
        {
          nome: "Carla Santos",
          cargo: "Diretor de Departamento",
          imagem: "carla_santos.jpg"
        },
        {
          nome: "Daniel Ferreira",
          cargo: "Coordenador de Curso",
          imagem: "daniel_ferreira.jpg"
        },
        {
          nome: "Eduarda Costa",
          cargo: "Secretária",
          imagem: "eduarda_costa.jpg"
        },
        {
          nome: "Fábio Gomes",
          cargo: "Técnico de Laboratório",
          imagem: "fabio_gomes.jpg"
        },
        {
          nome: "Gabriela Pinto",
          cargo: "Professor Assistente",
          imagem: "gabriela_pinto.jpg"
        },
        {
          nome: "Henrique Sousa",
          cargo: "Estudante",
          imagem: "henrique_sousa.jpg"
        },
        {
          nome: "Inês Rocha",
          cargo: "Bibliotecária",
          imagem: "ines_rocha.jpg"
        },
        {
          nome: "Joaquim Carvalho",
          cargo: "Professor",
          imagem: "joaquim_carvalho.jpg"
        },
        {
          nome: "Luana Martins",
          cargo: "Coordenadora de Pesquisa",
          imagem: "luana_martins.jpg"
        },
        {
          nome: "Miguel Ribeiro",
          cargo: "Diretor Acadêmico",
          imagem: "miguel_ribeiro.jpg"
        },
        {
          nome: "Nuno Mendes",
          cargo: "Estudante",
          imagem: "nuno_mendes.jpg"
        },
        {
          nome: "Olívia Teixeira",
          cargo: "Professor",
          imagem: "olivia_teixeira.jpg"
        },
        {
          nome: "Pedro Nascimento",
          cargo: "Coordenador de Extensão",
          imagem: "pedro_nascimento.jpg"
        },
        {
          nome: "Quésia Barros",
          cargo: "Estudante",
          imagem: "quesia_barros.jpg"
        },
        {
          nome: "Renato Lima",
          cargo: "Professor Assistente",
          imagem: "renato_lima.jpg"
        },
        {
          nome: "Sofia Araújo",
          cargo: "Técnica Administrativa",
          imagem: "sofia_araujo.jpg"
        },
        {
          nome: "Tiago Correia",
          cargo: "Diretor de Comunicação",
          imagem: "tiago_correia.jpg"
        },
        {
          nome: "Úrsula Fernandes",
          cargo: "Professora",
          imagem: "ursula_fernandes.jpg"
        },
        {
          nome: "Vítor Moreira",
          cargo: "Coordenador de Estágio",
          imagem: "vitor_moreira.jpg"
        },
        {
          nome: "Wesley Lopes",
          cargo: "Estudante",
          imagem: "wesley_lopes.jpg"
        },
        {
          nome: "Xavier Oliveira",
          cargo: "Professor",
          imagem: "xavier_oliveira.jpg"
        },
        {
          nome: "Yasmin Neves",
          cargo: "Secretária",
          imagem: "yasmin_neves.jpg"
        }
      ])
    const [singulares, setSingulares] = useState([])
    const [colegiais, setColegiais] = useState([])

    
    useEffect(() => {
      let sing = aboutContent?.orgaos_singulares
      let col = aboutContent?.orgaos_colegiais
      setSingulares(sing)
      console.log(sing)
      setColegiais(col)
      
    }, [])
    return (
        <div className='sectionContainer'>
            <div className='container'>
                <div className='info' style={{height: '100%'}}>
                    <div className='preTitle'>Estrutura Orgânica</div>
                    <div className='title'>A organização estrutural do ISPAJ</div>
                    <div className='description'>obedece o estabelecido no Decreto Presidencial nº 310/20 de 7 de Dezembro.

Nesta conformidade, o ISPAJ assenta a sua organização interna na óptica de adequação, nos termos do Art. 89º do Decreto Presidencial nº 310/20 de 7 de Dezembro, compreendendo:</div>
                </div>

                {/*  */}
            </div>
            <div className='container1'>
                <div className='preTitle'>Orgãos Singulares de Gestão:</div>

                {aboutContent?.orgaos_singulares && [...aboutContent?.orgaos_singulares].length > 0 ? <div className='orgGrid'>
                    {aboutContent?.orgaos_singulares && [...aboutContent.orgaos_singulares].filter((item) => {
                            if (item.show == undefined){
                                return item
                            }else if (item.show == true){
                                return item
                            }
                        }).filter((item) => item.presidente == 'true')[0] && 
                        <section className='president'>
                        <div className='cont'>
                           <img src={aboutContent?.orgaos_singulares && `${baseURL}/storage/images/${[...aboutContent.orgaos_singulares].filter((item) => {
                            if (item.show == undefined){
                                return item
                            }else if (item.show == true){
                                return item
                            }
                        }).filter((item) => item.presidente == 'true')[0]?.imagem}`}/>
                           
                        </div>
                        <div className='info'>
                            <div className='preTitle'>Presidente</div>
                            {aboutContent?.orgaos_singulares && [...aboutContent.orgaos_singulares].filter((item) => {
                            if (item.show == undefined){
                                return item
                            }else if (item.show == true){
                                return item
                            }
                        }).filter((item) => item.presidente == 'true')[0] ? <div className='title'>{aboutContent?.orgaos_singulares && [...aboutContent.orgaos_singulares].filter((item) => {
                          if (item.show == undefined){
                              return item
                          }else if (item.show == true){
                              return item
                          }
                      }).filter((item) => item.presidente == 'true')[0]?.nome}</div>: <Skeleton className='title'/>}
                            {aboutContent?.orgaos_singulares && [...aboutContent.orgaos_singulares].filter((item) => {
                            if (item.show == undefined){
                                return item
                            }else if (item.show == true){
                                return item
                            }
                        }).filter((item) => item.presidente == 'true')[0] ? <div className='description'>{aboutContent?.orgaos_singulares && [...aboutContent.orgaos_singulares].filter((item) => {
                          if (item.show == undefined){
                              return item
                          }else if (item.show == true){
                              return item
                          }
                      }).filter((item) => item.presidente == 'true')?.[0].descricao}</div>: <Skeleton className='description' count={3}/>}
                        </div>
                    </section>}
                    {aboutContent?.orgaos_singulares && [...aboutContent.orgaos_singulares].filter((item) => {
                            if (item.show == undefined){
                                return item
                            }else if (item.show == true){
                                return item
                            }
                        }).filter((item) => item.presidente == 'true')[0]&& <section className='subordinates' id='subordinate1'>
                        {aboutContent?.orgaos_singulares && [...aboutContent.orgaos_singulares].filter((item) => {
                            if (item.show == undefined){
                                return item
                            }else if (item.show == true){
                                return item
                            }
                        }).filter((item) => item.presidente == 'true').length > 0 && <div className='cont'>
                          <img src={aboutContent?.orgaos_singulares && `${baseURL}/storage/images/${[...aboutContent.orgaos_singulares].filter((item) => {
                            if (item.show == undefined){
                                return item
                            }else if (item.show == true){
                                return item
                            }
                        }).filter((item) => item.presidente == 'true')[0]?.imagem}`}/>
                        </div>}
                        <div>
                            <div className='imgContainer'>{aboutContent?.orgaos_singulares && [...aboutContent.orgaos_singulares].filter((item) => {
                            if (item.show == undefined){
                                return item
                            }else if (item.show == true){
                                return item
                            }
                        }).filter((item) => item.presidente == 'true')[0]?.nome[0]}{aboutContent?.orgaos_singulares && `${aboutContent?.orgaos_singulares && [...aboutContent.orgaos_singulares].filter((item) => {
                          if (item.show == undefined){
                              return item
                          }else if (item.show == true){
                              return item
                          }
                      }).filter((item) => item.presidente == 'true')[0]?.nome}`.split(' ')[1][0]}</div>
                        </div>
                        {<div className='title'>{aboutContent?.orgaos_singulares && [...aboutContent.orgaos_singulares].filter((item) => {
                            if (item.show == undefined){
                                return item
                            }else if (item.show == true){
                                return item
                            }
                        }).filter((item) => item.presidente == 'true')[0]?.nome}</div>}
                            <div className='description'>{aboutContent?.orgaos_singulares && [...aboutContent.orgaos_singulares].filter((item) => {
                            if (item.show == undefined){
                                return item
                            }else if (item.show == true){
                                return item
                            }
                        }).filter((item) => item.presidente == 'true')[0]?.descricao}</div>
                    </section>}
                    
                    {aboutContent?.orgaos_singulares && [...aboutContent.orgaos_singulares].filter((item) => {
                            if (item.show == undefined){
                                return item
                            }else if (item.show == true){
                                return item
                            }
                        }).filter((item) => item.presidente != 'true').reverse().map((item, index)=> {
                      return (
                        <section className='subordinates'>
                        <div>
                            <div className='imgContainer' style={{textTransform: 'uppercase'}}>{`${item?.cargo}`.split(' ').map((chars) => {
                                    return chars[0]
                                })}</div>
                        </div> 
                        <div className='title'>{item.cargo}</div>
                        <div className='description'>{item.descricao}</div>
                        {item.hasMembers == 'true' && <Dialog>
  <DialogTrigger><div className='seeMore' style={{margin: 0, width: '100%', maxWidth: '100%', fontSize: 14}}>Ver Membros</div></DialogTrigger>
  <DialogContent style={{maxWidth: 1300, width: '90%', flexDirection: 'column', display: 'flex', height: '80vh', overflow: 'hidden',}}>
  <span style={{height: '100%'}}>
      <ScrollArea style={{height: '100%',marginTop: 20}}>
        <span className='modalComponent'>
            <div className='header' style={{display: 'flex', flexDirection: 'row'}}>
                <div className='imgContainer' style={{textTransform: 'uppercase'}}>{`${item?.cargo}`.split(' ').map((chars) => {
                                    return chars[0]
                                })}</div>
                <div className='title'>{item.cargo}</div>
            </div>
            <div className='description'>{item.descricao}</div>
            <div className='subTitle'>Membros</div>
            <div></div>
            <div className='members' style={{display: 'flex', flexDirection: 'row', gap: 40, flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
                {item?.membros && [...item?.membros].length > 0 ? [...item.membros].map((item, index) => {
                    return (
                      <span className='member' style={{minWidth: 120, maxWidth: 120}}>
                            <span className='memberImage'>
                                <img src={`${baseURL}/storage/images/${item?.imagem}`}/>
                            </span>
                            <div className='memberName'>{item?.nome}</div>
                            <div className='memberRole'>{item?.cargo}</div>
                        </span>
                    )
                }): 
                <div>Nenhum membro ainda.</div>}
            </div>
      
        </span>
         </ScrollArea>
  </span>
  </DialogContent>
 
</Dialog>}
                    </section>
                      )
                    })}
                    {/* <section className='subordinates'>
                        <div>
                            <div className='imgContainer'>VP</div>
                        </div>
                        <div className='title'>Vice-Presidente</div>
                        <div className='description'>para as áreas Científica e Académica, responsáveis pela coordenação e orientação geral das actividades da área de própria competência</div>
                    </section>
                    <section className='subordinates'>
                        <div>
                            <div className='imgContainer'>DF</div>
                        </div>
                        <div className='title'>Director Geral para Administração e Finanças</div>
                        <div className='description'>para as áreas Científica e Académica, responsáveis pela coordenação e orientação geral das actividades da área de própria competência</div>
                    </section>
                    <section className='subordinates'>
                        <div>
                            <div className='imgContainer'>DO</div>
                        </div>
                        <div className='title'>Directores das Unidades Orgânicas</div>
                        <div className='description'>de carácter Científico e Pedagógico, com a devida autonomia e responsáveis pela coordenação e orientação das actividades da área de própria competência.</div>
                        <Dialog>
  <DialogTrigger><div className='seeMore' style={{margin: 0, width: '100%', maxWidth: '100%', fontSize: 14}}>Ver Membros</div></DialogTrigger>
  <DialogContent style={{maxWidth: 1300, width: '90%', flexDirection: 'column', display: 'flex', height: '80vh', overflow: 'hidden',}}>
  <span style={{height: '100%'}}>
      <ScrollArea style={{height: '100%',marginTop: 20}}>
        <span className='modalComponent'>
            <div className='header' style={{display: 'flex', flexDirection: 'row'}}>
                <div className='imgContainer'>DO</div>
                <div className='title'>Directores das Unidades Orgânicas</div>
            </div>
            <div className='description'>de carácter Científico e Pedagógico, com a devida autonomia e responsáveis pela coordenação e orientação das actividades da área de própria competência.</div>
            <div className='subTitle'>Membros</div>
            <div></div>
            <div className='members' style={{display: 'flex', flexDirection: 'row', gap: 40, flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
                {members.map((item, index) => {
                    return (
                      <span className='member' style={{minWidth: 120, maxWidth: 120}}>
                            <span className='memberImage'>
                                <img src='https://th.bing.com/th/id/OIP.lwKaubRw-2mETpanfVKRgwHaE8?rs=1&pid=ImgDetMain'/>
                            </span>
                            <div className='memberName'>{item.nome}</div>
                            <div className='memberRole'>{item.cargo}</div>
                        </span>
                    )
                })}
            </div>
      
        </span>
         </ScrollArea>
  </span>
  </DialogContent>
 
</Dialog>
                    </section> */}
                </div> :
                ['.', '.', '.'].map((item) => {
                  return (
                    <section className='subordinates'>
                        <div>
                            <div className='imgContainer'></div>
                        </div>
                        <Skeleton className='title'/>
                        <Skeleton className='description' count={3}/>

                    </section>
                  )
                })}
                <div style={{marginTop: 20}} className='preTitle'>Orgãos Colegiais de gestão e consulta</div>
                <div className='orgGrid1'>
                {aboutContent?.orgaos_colegiais && [...aboutContent?.orgaos_colegiais].length > 0 ? 
                [...aboutContent?.orgaos_colegiais].filter((item) => {
                  if (item.show == undefined){
                      return item
                  }else if (item.show == "true"){
                      return item
                  }
              }).map((item, index) => {
                  return (
                    <section className='subordinates'>
                <div>
                <div className='imgContainer' style={{textTransform: 'uppercase'}}>{`${item?.cargo}`.split(' ').map((chars) => {
                                    return chars[0]
                                })}</div>
                </div>
                <div className='title'>{item.cargo}</div>
                <div className='description'>{item.descricao}</div>
                {true && <Dialog>
  <DialogTrigger><div className='seeMore' style={{margin: 0, width: '100%', maxWidth: '100%', fontSize: 14}}>Ver Membros</div></DialogTrigger>
  <DialogContent style={{maxWidth: 1300, width: '90%', flexDirection: 'column', display: 'flex', height: '80vh', overflow: 'hidden',}}>
  <span style={{height: '100%'}}>
      <ScrollArea style={{height: '100%',marginTop: 20}}>
        <span className='modalComponent'>
            <div className='header' style={{display: 'flex', flexDirection: 'row'}}>
                <div className='imgContainer' style={{textTransform: 'uppercase'}}>{`${item?.cargo}`.split(' ').map((chars) => {
                                    return chars[0]
                                })}</div>
                <div className='title'>{item.cargo}</div>
            </div>
            <div className='description'>{item.descricao}</div>
            <div className='subTitle'>Membros</div>
            <div></div>
            <div className='members' style={{display: 'flex', flexDirection: 'row', gap: 40, flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
                {item?.membros && [...item?.membros].length > 0 ? [...item.membros].map((item, index) => {
                    return (
                      <span className='member' style={{minWidth: 120, maxWidth: 120}}>
                            <span className='memberImage'>
                                <img src={`${baseURL}/storage/images/${item?.imagem}`}/>
                            </span>
                            <div className='memberName'>{item?.nome}</div>
                            <div className='memberRole'>{item?.cargo}</div>
                        </span>
                    )
                }): 
                <div>Nenhum membro ainda.</div>}
            </div>
      
        </span>
         </ScrollArea>
  </span>
  </DialogContent>
 
</Dialog>}
            </section>
                  )
                })
                : 
            ['.', '.', '.'].map((item) => {
              return (
                <section className='subordinates'>
                    <div>
                        <div className='imgContainer'></div>
                    </div>
                    <Skeleton className='title'/>
                    <Skeleton className='description' count={3}/>

                </section>
              )
            }) }
                </div>
            </div>
        </div>
    )
}

export default EstruturaOrg

{/* <div className='orgGrid1'>
                <section className='subordinates'>
                        <div>
                            <div className='imgContainer'>CD</div>
                        </div>
                        <div className='title'>Conselho de Direcção</div>
                        <div className='description'>para as áreas Científica e Académica, responsáveis pela coordenação e orientação geral das actividades da área de própria competência</div>
                        <Dialog>
  <DialogTrigger><div className='seeMore' style={{margin: 0, width: '100%', maxWidth: '100%', fontSize: 14}}>Ver Membros</div></DialogTrigger>
  <DialogContent style={{maxWidth: 1300, width: '90%', flexDirection: 'column', display: 'flex', height: '80vh', overflow: 'hidden'}}>
  <span style={{height: '100%'}}>
      <ScrollArea style={{height: '100%',marginTop: 20}}>
        <span className='modalComponent'>
            <div className='header' style={{display: 'flex', flexDirection: 'row'}}>
                <div className='imgContainer'>CD</div>
                <div className='title'>Conselho de Direcção</div>
            </div>
            <div className='description'>de carácter Científico e Pedagógico, com a devida autonomia e responsáveis pela coordenação e orientação das actividades da área de própria competência.</div>
            <div className='subTitle'>Membros</div>
            <div></div>
            <div className='members' style={{display: 'flex', flexDirection: 'row', gap: 40, flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
                {members.map((item, index) => {
                    return (
                        <span className='member' style={{minWidth: 120, maxWidth: 120}}>
                            <span className='memberImage'>
                                <img src='https://th.bing.com/th/id/OIP.lwKaubRw-2mETpanfVKRgwHaE8?rs=1&pid=ImgDetMain'/>
                            </span>
                            <div className='memberName'>{item.nome}</div>
                            <div className='memberRole'>{item.cargo}</div>
                        </span>
                    )
                })}
            </div>
      
        </span>
         </ScrollArea>
  </span>
  </DialogContent>
 
</Dialog>
                    </section>
                    <section className='subordinates'>
                        <div>
                            <div className='imgContainer'>CC</div>
                        </div>
                        <div className='title'>Conselho Cientifico</div>
                        <div className='description'>para as áreas Científica e Académica, responsáveis pela coordenação e orientação geral das actividades da área de própria competência</div>
                        <Dialog>
  <DialogTrigger><div className='seeMore' style={{margin: 0, width: '100%', maxWidth: '100%', fontSize: 14, alignSelf: 'flex-end'}}>Ver Membros</div></DialogTrigger>
  <DialogContent style={{maxWidth: 1300, width: '90%', flexDirection: 'column', display: 'flex', height: '80vh', overflow: 'hidden'}}>
  <span style={{height: '100%'}}>
      <ScrollArea style={{height: '100%',marginTop: 20}}>
        <span className='modalComponent'>
            <div className='header' style={{display: 'flex', flexDirection: 'row'}}>
                <div className='imgContainer'>CC</div>
                <div className='title'>Conselho Cientifico</div>
            </div>
            <div className='description'>de carácter Científico e Pedagógico, com a devida autonomia e responsáveis pela coordenação e orientação das actividades da área de própria competência.</div>
            <div className='subTitle'>Membros</div>
            <div></div>
            <div className='members' style={{display: 'flex', flexDirection: 'row', gap: 40, flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
                {members.map((item, index) => {
                    return (
                      <span className='member' style={{minWidth: 120, maxWidth: 120}}>
                            <span className='memberImage'>
                                <img src='https://th.bing.com/th/id/OIP.lwKaubRw-2mETpanfVKRgwHaE8?rs=1&pid=ImgDetMain'/>
                            </span>
                            <div className='memberName'>{item.nome}</div>
                            <div className='memberRole'>{item.cargo}</div>
                        </span>
                    )
                })}
            </div>
      
        </span>
         </ScrollArea>
  </span>
  </DialogContent>
 
</Dialog>
                    </section>
                    <section className='subordinates'>
                        <div>
                            <div className='imgContainer'>CP</div>
                        </div>
                        <div className='title'>Conselho Pedagógico
</div>
                        <div className='description'>de carácter Científico e Pedagógico, com a devida autonomia e responsáveis pela coordenação e orientação das actividades da área de própria competência.</div>
                        <Dialog>
  <DialogTrigger><div className='seeMore' style={{margin: 0, width: '100%', maxWidth: '100%', fontSize: 14}}>Ver Membros</div></DialogTrigger>
  <DialogContent style={{maxWidth: 1300, width: '90%', flexDirection: 'column', display: 'flex', height: '80vh', overflow: 'hidden'}}>
  <span style={{height: '100%'}}>
      <ScrollArea style={{height: '100%',marginTop: 20}}>
        <span className='modalComponent'>
            <div className='header' style={{display: 'flex', flexDirection: 'row'}}>
                <div className='imgContainer'>CP</div>
                <div className='title'>Conselho Pedagógico</div>
            </div>
            <div className='description'>de carácter Científico e Pedagógico, com a devida autonomia e responsáveis pela coordenação e orientação das actividades da área de própria competência.</div>
            <div className='subTitle'>Membros</div>
            <div></div>
            <div className='members' style={{display: 'flex', flexDirection: 'row', gap: 40, flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
                {members.map((item, index) => {
                    return (
                      <span className='member' style={{minWidth: 120, maxWidth: 120}}>
                            <span className='memberImage'>
                                <img src='https://th.bing.com/th/id/OIP.lwKaubRw-2mETpanfVKRgwHaE8?rs=1&pid=ImgDetMain'/>
                            </span>
                            <div className='memberName'>{item.nome}</div>
                            <div className='memberRole'>{item.cargo}</div>
                        </span>
                    )
                })}
            </div>
      
        </span>
         </ScrollArea>
  </span>
  </DialogContent>
 
</Dialog>
                    </section>
                </div> */}