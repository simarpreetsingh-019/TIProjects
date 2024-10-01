import React from "react";

//INTERNAL IMPORT
import { Header, Footer, Copyright } from "../PageComponents/Components";
import {
  SwapMain,
} from "../PageComponents/SwapPage";

const swap = () => {
  return (
    <div class="template-color-1 nft-body-connect">
      <Header />
      <SwapMain />
      <Footer />
      <Copyright />
    </div>
  );
};

export default swap;
