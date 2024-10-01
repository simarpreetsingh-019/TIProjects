import React from "react";

//INTERNAL IMPORT
import { Header, Footer, Copyright } from "../PageComponents/Components";
import {
  ReverseSwapMain,
} from "../PageComponents/ReverseSwapPage";

const reverse = () => {
  return (
    <div class="template-color-1 nft-body-connect">
      <Header />
      <ReverseSwapMain />
      <Footer />
      <Copyright />
    </div>
  );
};

export default reverse;
