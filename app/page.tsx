import Image from "next/image";
import Header from "./components/Header";
import ValuationTool from "./components/ValuationTool";
import Contact from "./components/Contact";
import Testimonial from "./components/Testimonial";
import ScrollToTop from "./components/ScrollToTop"; 
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <ValuationTool />
      <Testimonial />
      <Contact />
      <Footer/>
      <ScrollToTop /> 
    </div>
  );
}