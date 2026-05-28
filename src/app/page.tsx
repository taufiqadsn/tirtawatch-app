import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProblemCards from "../components/ProblemCards";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import Faq from "../components/Faq";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <ProblemCards />
      <HowItWorks />
      <Testimonials />
      <Faq />
      <Footer />
    </main>
  );
}
