import Blog from '../components/Blog';
import BackHome from '../components/BackHome';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function BlogPage() {
  return (
    <>
      <Sidebar />
      <Header />
      <main>
        <BackHome />
        <Blog />
      </main>
      <Footer />
    </>
  );
}
