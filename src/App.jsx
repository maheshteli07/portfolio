import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import Loader from './components/Loader'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Achievements from './sections/Achievements'
import Contact from './sections/Contact'

function App() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <Cursor />
      <Loader />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Achievements />
      <Contact />
      <Footer />
    </>
  )
}

export default App
