import React from "react";

//INTERNAL IMPORT
import { Header, Footer, Copyright } from "../PageComponents/Components";
import {
  Banner,
  Action,
  Blog,
  Quote,
  Statistick,
} from "../PageComponents/AboutPage";

const about = () => {
  return (
    <div class="template-color-1 nft-body-connect">
      <Header />
      <Banner />
      <Action />
      <Blog />
      <Quote />
      <Statistick />
      <Footer />
      <Copyright />
    </div>
  );
};

export default about;
