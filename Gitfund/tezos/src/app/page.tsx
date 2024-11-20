
import Menu from "../components/header/menu";
import {CoverDemo} from "../components/header/head1";
import {GlobeDemo} from "@/components/header/head2";
import  {AppleCardsCarouselDemo} from "@/components/header/head";
import {TypewriterEffectSmoothDemo} from "@/components/header/bottom";
import Footer from "@/components/header/Footer";
export default function Home() {
  return (
      <>
          <Menu/>
          <CoverDemo/>
          <GlobeDemo/>
          <AppleCardsCarouselDemo/>
          <TypewriterEffectSmoothDemo/>
          <Footer/>
      </>);
}
