import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Skills from '../components/Skills';

export default function StackPage() {
  return (
    <>
      <Sidebar />
      <Header />
      <main>
        <Skills />
      </main>
      <Footer />
    </>
  );
}
