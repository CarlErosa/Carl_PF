import Achievements from '../components/Achievements';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function HackathonsPage() {
  return (
    <>
      <Sidebar />
      <Header />
      <main>
        <Achievements />
      </main>
      <Footer />
    </>
  );
}
