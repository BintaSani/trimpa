import Image from "next/image";
import Nav from "@/components/nav-bar/nav";
import Hero from "@/components/hero/hero";
import Adventure from "@/components/adventure/adventure";
import Explore from "@/components/explore/explore";
import Testimonials from "@/components/testimonial/testimonials";
import Footer from "@/components/footer/footer";
import PromoBanner from "@/components/promo-Banner/promobanner";
import { UIProvider } from "../../context/uicontext";


export default function Home() {
  return (
    <UIProvider>
      <div className="">
        <div className="h-[100vh] flex flex-col">
          <PromoBanner/>
          <Nav />
          <Hero/>
        </div>
        <Adventure/>
        <Explore/>
        <div className="flex mb-10 justify-center items-center">
          <button className=" bg-[var(--color-purple-blue)] text-white px-5 py-2 h-full rounded-md">Explore more stays</button>
        </div>
        <Testimonials/>
        <Footer/>
      </div>
    </UIProvider>
  );
}
