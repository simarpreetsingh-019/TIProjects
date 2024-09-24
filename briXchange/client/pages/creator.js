import React, { useState, useEffect } from "react";

//INTERNAL IMPORT
import { CreatorOne } from "../PageComponents/CreatorPage";
import { useStateContext } from "../context";
import { getTopCreators } from "../utils";

import {
  Header,
  Footer,
  Copyright,
  Loader,
} from "../PageComponents/Components";

const creator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);

  const { getPropertiesData } = useStateContext();

  //GET DATA
  const fetchProperty = async () => {
    setIsLoading(true);
    const data = await getPropertiesData();
    setProperties(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProperty();
  });

  const creators = getTopCreators(properties);
  console.log(creators);
  return (
    <div class="template-color-1 nft-body-connect">
      <Header />
      <CreatorOne creators={creators} />
      <Footer />
      <Copyright />
    </div>
  );
};

export default creator;
