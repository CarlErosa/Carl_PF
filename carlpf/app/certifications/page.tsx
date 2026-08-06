import BackHome from '../components/BackHome';
import Certifications from '../components/Certifications';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function CertificationsPage() {
  return (
    <>
      <Sidebar />
      <Header />
      <main>
        <BackHome />
        <Certifications showAll />
      </main>
      <Footer />
    </>
  );
}
