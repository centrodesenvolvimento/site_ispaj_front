import './App.css';
import './css/about.css'
import './css/bolsas.css'
import './css/dashboard.css'
import './css/estatutos.css'
import './css/estruturaAdmin.css'
import './css/estruturaOrg.css'
import './css/events.css'
import './css/eventsPage.css'
import './css/exams.css'
import './css/faq.css'
import './css/fees.css'
import './css/footer.css'
import './css/header.css'
import './css/health.css'
import './css/history.css'
import './css/loadingScreen.css'
import './css/login.css'
import './css/news.css'
import './css/newsArticle.css'
import './css/newsPage.css'
import './css/organisation.css'
import './css/principles.css'
import './css/reviews.css'
import './css/services.css'
import './css/soon.css'
import './css/sugestions.css'
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from './api/api';
import LoadingScreen from './pages/loadingScreen';

const Home = lazy(() => import('./pages/home'));
const About = lazy(() => import('./pages/about'));
const EventsPage = lazy(() => import('./pages/eventsPage'));
const Admissions = lazy(() => import('./pages/admissions'));
const Polos = lazy(() => import('./pages/polos'));
const Message = lazy(() => import('./pages/message'));
const NewsPage = lazy(() => import('./pages/newsPage'));
const Login = lazy(() => import('./pages/login'));
const Admin = lazy(() => import('./pages/admin'));
const NewsArticle = lazy(() => import('./pages/newsArticle'));
const Soon = lazy(() => import('./pages/soon'));
const Impact = lazy(() => import('./pages/impact'));
const Bolsa = lazy(() => import('./pages/bolsa'));
const Admissions2 = lazy(() => import('./pages/admissions2'));

function App() {
  const [departments, setDepartments] = useState([])
  
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

  // //('running')
      const visitedOnce = (sessionStorage.getItem('visitedOnce')) || false
        if (!visitedOnce){
          axios.post(`${baseURL}/api/addMonthlyView`, {
            dateAdded: new Date()
          })
          .then(res => {
            sessionStorage.setItem('visitedOnce', true)
          })
          .catch(err => {
            //('visitedError', err)
            // sessionStorage.setItem('visitedOnce', true)
          })
          sessionStorage.setItem('visitedOnce', true)

        }
}
  
  useEffect(() => {
      
      axios.get(`${baseURL}/api/departamentos`)
      .then(res => {
          //('res', res.data)
          setDepartments([...res.data])
      })

      updateVisits()
      
      
  }, [])
  
  return (
    
      <Routes>
        <Route path='/' element={<Home departments={departments}/>}/>
          <Route path='/sobre' element={<About />}/>
          <Route path='/eventos' element={<EventsPage />}/>
          <Route path='/eventos/event/:title' element={<EventsPage />} />
          <Route path='/admissoes' element={<Admissions />} />
          <Route path='/polos' element={<Polos />} />
          <Route path='/polos/polo/:title' element={<Polos />} />
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
//     "start": "react-scripts start",
//     "build": "react-scripts build",
//     "test": "react-scripts test",
//     "eject": "react-scripts eject"
//   },