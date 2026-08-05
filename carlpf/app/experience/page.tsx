import Experience from '../components/Experience';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function ExperiencePage() {
  return (
    <>
      <Sidebar />
      <Header />
      <main>
        <Experience showAll />
      </main>
      <Footer />
    </>
  );
}
