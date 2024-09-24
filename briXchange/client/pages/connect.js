import React from "react";

//INTERNAL IMPORT
import { ConnectOne, ConnectTwo } from "../PageComponents/ConnectPage";
import { Header, Footer, Copyright } from "../PageComponents/Components";

const connect = () => {
  return (
    <div class="template-color-1 nft-body-connect">
      <Header />
      <ConnectOne />
      <ConnectTwo />
      <Footer />
      <Copyright />
    </div>
  );
};

export default connect;
