import Image from "next/image";
import Header from "./components/Header";
import ValuationTool from "./components/ValuationTool";
import Testimonial from "./components/Testimonial";


export default function Home() {
  return (
    <div>
      <Header/>
      <ValuationTool/>
      <Testimonial/>


    </div>
  );
}
