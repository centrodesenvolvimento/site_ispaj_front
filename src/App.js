import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Services from './components/services';
import Principles from './components/principles';
import Reviews from './components/reviews';
import News from './components/news';
import Footer from './components/footer';
import Globe from './components/globe';
import { Route, Router, Routes, useLocation } from 'react-router-dom';
import About from './pages/about';
import Swiper from './components/swiper';
import Events from './components/events';
import EventsPage from './pages/eventsPage';
import EventsPage1 from './pages/eventPage1.js'
import Exams from './pages/exams.js';
import Admissions from './pages/admissions.js';
import Director from './components/director';
import Courses from './pages/courses';
import Message from './pages/message';
import NewsPage from './pages/newsPage';
import Login from './pages/login';
import Admin from './pages/admin';
import AdminCalendar from './components/adminCalendar';
import NewsArticle from './pages/newsArticle';
import Soon from './pages/soon';
import Impact from './pages/impact';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from './api/api';
import Bolsa from './pages/bolsa';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogOverlay, AlertDialogTitle } from './@/components/ui/alert-dialog';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogTitle } from './@/components/ui/dialog';
import Admissions2 from './pages/admissions2';

function App() {
  const [departments, setDepartments] = useState([])
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
const [dialogOpen, setDialogOpen] = useState(true)
const [avisos, setAvisos] = useState([])
const updateVisits = () => {
  // axios.get(`${baseURL}/api/info`)
  //     .then(res => {
  //       let monthstats = [...res.data][0]?.info?.monthstats
  //       let newMonthStats = monthstats.map((item) => {
  //         if (months[new Date().getMonth()] == item.month){
  //           return {month: months[new Date().getMonth()], visits: item.visits + 1}
  //         }
  //         return item
  //       })
  //       const visitedOnce = (sessionStorage.getItem('visitedOnce')) || false
  //       if (!visitedOnce){
  //         axios.get(`${baseURL}/api/info`)
  //         .then(res => {
  //           axios.post(`${baseURL}/api/editInfo/1`, {
  //             info: {
  //               email: [...res.data][0]?.info?.email,
  //               email2: [...res.data][0]?.info?.email2,
  //               numero: [...res.data][0]?.info?.numero,
  //               numero2: [...res.data][0]?.info?.numero2,
  //               localizacao: [...res.data][0]?.info?.localizacao,
  //               monthstats: newMonthStats
  //             }
  //           })
  //           .then(res => {
  //             sessionStorage.setItem('visitedOnce', true)
  //           })
  //         })
  //       }

        
  //     })

  console.log('running')
      const visitedOnce = (sessionStorage.getItem('visitedOnce')) || false
        if (!visitedOnce){
          axios.post(`${baseURL}/api/addMonthlyView`, {
            dateAdded: new Date()
          })
          .then(res => {
            sessionStorage.setItem('visitedOnce', true)
          })
          .catch(err => {
            sessionStorage.setItem('visitedOnce', true)
          })
          sessionStorage.setItem('visitedOnce', true)

        }
}
  
  useEffect(() => {
      
      axios.get(`${baseURL}/api/departamentos`)
      .then(res => {
          console.log('res', res.data)
          setDepartments([...res.data])
      })

      updateVisits()
      
      
  }, [])
  
  return (
    <Routes>
      <Route path='/' element={<div className="App" style={{display: 'flex', flexDirection: 'column'}}>
          <Header />
          <Swiper />
          <Director />
          <Services departments={departments}/>
          {/* #F3F3F3 */}
          <div style={{ marginBottom: -50}}>
          <Principles departments={departments}/>
          </div>
          <div>
            <News />
          </div>
          <Reviews />
          <Events />
          {/* <Globe /> */}
          
          <Footer />
        </div>}/>
        <Route path='/sobre' element={<About />}/>
        <Route path='/eventos' element={<EventsPage />}/>        
        <Route path='/eventos/event/:title' element={<EventsPage />} />
        <Route path='/admissoes' element={<Admissions />} />
        <Route path='/cursos' element={<Courses />} />
        <Route path='/cursos/curso/:title' element={<Courses />} />
        <Route path='/mensagem_do_presidente' element={<Message />} />
        <Route path='/noticias' element={<NewsPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/home' element={<Admin />} />
        <Route path='/admin/sobre/sobre' element={<Admin />} />
        <Route path='/admin/sobre/estruturaOrg' element={<Admin />} />
        <Route path='/admin/sobre/estruturaAdmin' element={<Admin />} />
        <Route path='/admin/sobre/history' element={<Admin />} />
        <Route path='/admin/sobre/organigrama' element={<Admin />} />
        <Route path='/admin/sobre/estatutos' element={<Admin />} />
        <Route path='/admin/departamentos' element={<Admin />} />
        <Route path='/admin/departamentos/departamento' element={<Admin />} />
        <Route path='/sugestoes_e_reclamacoes' element={<Admissions2 />} />
        <Route path='/admin/calendario' element={<Admin />} />
        <Route path='/admin/admissoes/emolumentos' element={<Admin />} />
        <Route path='/admin/admissoes/calendario' element={<Admin />} />
        <Route path='/admin/admissoes/exames' element={<Admin />} />
        <Route path='/admin/admissoes/perguntas' element={<Admin />} />
        <Route path='/admin/news' element={<Admin />} />
        <Route path='/admin/avisos' element={<Admin />} />



        <Route path='/soon' element={<Soon />} />
        <Route path='/impact' element={<Impact />} />
        <Route path='/noticias/:id' element={<NewsArticle />} />
        <Route path='/colaboradores/bolsas' element={<Bolsa />} />

    </Routes>
  );
}

export default App;


// in package.json
// "scripts": {
  //   "start": "react-scripts start",
  //   "build": "react-scripts build",
  //   "test": "react-scripts test",
  //   "eject": "react-scripts eject"
  // },