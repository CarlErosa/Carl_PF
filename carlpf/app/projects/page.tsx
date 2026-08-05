import Footer from '../components/Footer';
import Header from '../components/Header';
import Projects from '../components/Projects';
import Sidebar from '../components/Sidebar';

export default function ProjectsPage() {
  return (
    <>
      <Sidebar />
      <Header />
      <main>
        <Projects showAll />
      </main>
      <Footer />
    </>
  );
}
