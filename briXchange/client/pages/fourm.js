import React from "react";

//INTERNAL IMPORT
import { Header, Footer, Copyright } from "../PageComponents/Components";
import {
  FourmFour,
  FourmOne,
  FourmThree,
  FourmTwo,
} from "../PageComponents/FourmPage";

const forget = () => {
  return (
    <div class="template-color-1 nft-body-connect">
      <Header />
      <FourmOne />
      <FourmTwo />
      <FourmThree />
      <FourmFour />
      <Footer />
      <Copyright />
    </div>
  );
};

export default forget;
