import React from "react";

//INTERNAL IMPORT
import { Title, Collection } from "../PageComponents/CollectionPage";
import { Header, Footer, Copyright } from "../PageComponents/Components";

const collection = () => {
  return (
    <div class="template-color-1 nft-body-connect">
      <Header />
      <Title />
      <Collection />
      <Footer />
      <Copyright />
    </div>
  );
};

export default collection;
