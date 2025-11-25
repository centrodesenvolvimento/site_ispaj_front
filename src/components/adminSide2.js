import { useState } from 'react'
import '../css/adminSide2.css'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../@/components/ui/accordion"

import { Popover, PopoverContent, PopoverTrigger } from '../@/components/ui/popover'

const AdminSide2 = () => {

    const navigate = useNavigate()
    const location = useLocation()
    return (
        <div className="adminSide2">
            <div className={location.pathname.endsWith('/admin') ? 'option1' : 'option'} onClick={() => {
              navigate('/admin')
              localStorage.setItem('path', 'Dashboard')
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-border-all" viewBox="0 0 16 16">
  <path d="M0 0h16v16H0zm1 1v6.5h6.5V1zm7.5 0v6.5H15V1zM15 8.5H8.5V15H15zM7.5 15V8.5H1V15z"/>
</svg>
            Painel
            </div>
            <div onClick={() => {
              navigate('/admin/home')
              localStorage.setItem('path', 'home')
            }} className={location.pathname.endsWith('/admin/home') ? 'option1' : 'option'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
</svg>
            Página Inicial
            </div>
            <div onClick={() => {
              navigate('/admin/calendario')
              localStorage.setItem('path', 'home')
            }} className={location.pathname.includes('admin/calendario') ? 'option1' : 'option'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
</svg>
            Calendário
            </div>
            
            
            <Accordion type="single" collapsible>
              <AccordionItem style={{borderBottom: 'none', textDecoration: 'none'}} value="item-1">
                <AccordionTrigger style={{borderBottom: 'none', textDecoration: 'none'}} className={location.pathname.includes('/admin/sobre') ? 'option1' : 'option'}>
                  <span style={{display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', fontSize: 14, fontWeight: 400}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-person" viewBox="0 0 16 16">
                      <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                      <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5z"/>
                    </svg>
                    Sobre
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div onClick={() => {
                    navigate('/admin/sobre/sobre')
                  }} className={location.pathname.includes('admin/sobre/sobre') ? 'option3' :'option2'}>Sobre nós</div>
                  <div className={location.pathname.includes('admin/sobre/estruturaOrg') ? 'option3' :'option2'} onClick={() => {
                    navigate('/admin/sobre/estruturaOrg')
                  }}>Estrutura Orgánica</div>
                  <div className={location.pathname.includes('admin/sobre/estruturaAdmin') ? 'option3' :'option2'} onClick={() => {
                    navigate('/admin/sobre/estruturaAdmin')
                  }}>Estrutura Administrativa</div>
                  <div className={location.pathname.includes('admin/sobre/history') ? 'option3' :'option2'} onClick={() => {
                    navigate('/admin/sobre/history')
                  }}>Historial</div>
                  <div className={location.pathname.includes('admin/sobre/organigrama') ? 'option3' :'option2'} onClick={() => {
                    navigate('/admin/sobre/organigrama')
                  }}>Organigrama</div>
                  <div className={location.pathname.includes('admin/sobre/estatutos') ? 'option3' :'option2'} onClick={() => {
                    navigate('/admin/sobre/estatutos')
                  }}>Estatutos e Regulamentos</div>

                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem style={{borderBottom: 'none', textDecoration: 'none'}} value="item-1">
                <AccordionTrigger style={{borderBottom: 'none', textDecoration: 'none'}} className={location.pathname.includes('/admin/admissoes') ? 'option1' : 'option'}>
                  <span style={{display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', fontSize: 14, fontWeight: 400}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-raised-hand" viewBox="0 0 16 16">
  <path d="M6 6.207v9.043a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H6.236a1 1 0 0 1-.447-.106l-.33-.165A.83.83 0 0 1 5 2.488V.75a.75.75 0 0 0-1.5 0v2.083c0 .715.404 1.37 1.044 1.689L5.5 5c.32.32.5.754.5 1.207"/>
  <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
</svg>
                    Admissões
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div onClick={() => {
                    navigate('/admin/admissoes/emolumentos')
                  }} className={location.pathname.includes('admin/admissoes/emolumentos') ? 'option3' :'option2'}>Emolumentos/Propinas</div>
                  <div className={location.pathname.includes('admin/admissoes/calendario') ? 'option3' :'option2'} onClick={() => {
                    navigate('/admin/admissoes/calendario')
                  }}>Calendário Académico</div>
                  <div className={location.pathname.includes('admin/admissoes/exames') ? 'option3' :'option2'} onClick={() => {
                    navigate('/admin/admissoes/exames')
                  }}>Exames de Acesso</div>
                  <div className={location.pathname.includes('admin/admissoes/perguntas') ? 'option3' :'option2'} onClick={() => {
                    navigate('/admin/admissoes/perguntas')
                  }}>Perguntas</div>
                  

                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div onClick={() => {
              navigate('/admin/departamentos')
              localStorage.setItem('path', 'home')
            }} className={location.pathname.includes('admin/departamentos') ? 'option1' : 'option'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-building" viewBox="0 0 16 16">
  <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
  <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z"/>
</svg>
            Departamentos
            </div>
            <div onClick={() => {
              navigate('/admin/news')
              localStorage.setItem('path', 'home')
            }} className={location.pathname.includes('admin/news') ? 'option1' : 'option'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-newspaper" viewBox="0 0 16 16">
  <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5z"/>
  <path d="M2 3h10v2H2zm0 3h4v3H2zm0 4h4v1H2zm0 2h4v1H2zm5-6h2v1H7zm3 0h2v1h-2zM7 8h2v1H7zm3 0h2v1h-2zm-3 2h2v1H7zm3 0h2v1h-2zm-3 2h2v1H7zm3 0h2v1h-2z"/>
</svg>

            Notícias
            </div>
            {/* <div className={location.pathname.includes('/admin/notificacoes') ? 'option1' : 'option'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
</svg>
            Notificações
            </div> */}
            
        </div>
    )
}
export default AdminSide2