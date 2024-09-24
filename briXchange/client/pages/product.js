import React from "react";

//INTERNAL IMPORT
import { Header, Footer, Copyright } from "../PageComponents/Components";
import {
  ProductFour,
  ProductOne,
  ProductThree,
  ProductTwo,
} from "../PageComponents/ProductPAge";

const about = () => {
  return (
    <div class="template-color-1 nft-body-connect">
      <Header />
      <ProductOne />
      <ProductTwo />
      <ProductThree />
      <ProductFour />
      <Footer />
      <Copyright />
    </div>
  );
};

export default about;
