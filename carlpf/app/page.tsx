import About from './components/About';
import Footer from './components/Footer';
import Hackathons from './components/Hackathons';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Hackathons />
        <Projects />
      </main>
      <Footer />
    </>
  );
}
