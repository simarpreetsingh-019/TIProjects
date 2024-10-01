import React from "react";

//INTERNAL IMPORT
import { Header, Footer, Copyright } from "../PageComponents/Components";
import {
    Stepper,
} from "../PageComponents/TokenizePage";

const tokenize = () => {
  return (
    <div class="template-color-1 nft-body-connect">
      <Header />
      <Stepper/>
      <Footer />
      <Copyright />
    </div>
  );
};

export default tokenize;
