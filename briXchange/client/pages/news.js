import React from "react";

//INTERNAL IMPORT
import { Header, Footer, Copyright } from "../PageComponents/Components";
import { NewsOne, NewsThree, NewsTwo } from "../PageComponents/NewsPage";

const news = () => {
  return (
    <div class="template-color-1 nft-body-connect">
      <Header />
      <NewsOne />
      <NewsTwo />
      <NewsThree />
      <Footer />
      <Copyright />
    </div>
  );
};

export default news;
