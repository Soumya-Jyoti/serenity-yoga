import Footer from '../components/Footer';
import Hero from '../components/landing/Hero';
import TrustBar from '../components/landing/TrustBar';
import Features from '../components/landing/Features';
import About from '../components/landing/About';
import ClassStyles from '../components/landing/ClassStyles';
import Schedule from '../components/landing/Schedule';
import Testimonials from '../components/landing/Testimonials';
import ContactForm from '../components/landing/ContactForm';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <TrustBar />
      <Features />
      <About />
      <ClassStyles />
      <Schedule />
      <Testimonials />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Landing;
