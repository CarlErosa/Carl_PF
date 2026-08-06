import Achievements from './components/Achievements';
import Blog from './components/Blog';
import Certifications from './components/Certifications';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Sidebar from './components/Sidebar';
import Skills from './components/Skills';

export default function Home() {
  return (
    <>
      <Sidebar />
      <Header />
      <main>
        <Hero />
        <Blog />
        <Skills />
        <Experience />
        <Certifications />
        <Achievements />
        <Projects />
      </main>
      <Footer />
    </>
  );
}
