import Blog from '../components/Blog';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function BlogPage() {
  return (
    <>
      <Sidebar />
      <Header />
      <main>
        <Blog />
      </main>
      <Footer />
    </>
  );
}
