import Image from "next/image";
import Header from "./components/Header";
import ValuationTool from "./components/ValuationTool";
import Contact from "./components/Contact";
import Testimonial from "./components/Testimonial";
import ScrollToTop from "./components/ScrollToTop"; 

export default function Home() {
  return (
    <div>
      <Header />
      <ValuationTool />
      <Testimonial />
      <Contact />
      <ScrollToTop /> 
    </div>
  );
}