import Image from "next/image";
import Header from "./components/Header";
import ValuationTool from "./components/ValuationTool";
import Contact from "./components/Contact";
// import Testimonial from "./components/Testimonial";
import ScrollToTop from "./components/ScrollToTop"; 
import Footer from "./components/Footer";
import WorkingValuationTool from "./components/WorkingValuationTool";
import LoadingAnimation from "./components/LoadingAnimation";
import ValuationPageFooter from "./components/ValuationPageFooter";

export default function Home() {
  return (
    <div>
      <LoadingAnimation/>
      <Header />
      <ValuationTool />
      <WorkingValuationTool/>
      {/* <Testimonial /> */}
      <Contact />
      {/* <Footer/> */}
      <ValuationPageFooter/>
      <ScrollToTop /> 
    </div>
  );
}