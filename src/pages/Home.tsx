import Navbar from '../components/layout/Navbar';
import Banner from '../components/home/Banner';
import About from '../components/home/About';
import Projects from '../components/home/Projects';
import Education from '../components/home/Education';
import Footer from '../components/layout/Footer';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Banner />
      <About />
      <Projects />
      <Education />
      <Footer />
    </div>
  );
};

export default Home;
