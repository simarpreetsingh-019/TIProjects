import React from "react";

//INTERNAL IMPORT
import { Header, Footer, Copyright } from "../PageComponents/Components";
import { UpcomingOne, UpcomingTwo } from "../PageComponents/UpcomingPage";

const upcoming = () => {
  return (
    <div class="template-color-1 nft-body-connect">
      <Header />
      <UpcomingOne />
      <UpcomingTwo />
      <Footer />
      <Copyright />
    </div>
  );
};

export default upcoming;
