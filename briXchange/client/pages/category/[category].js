import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

///INTERNAL IMPORT
import { Title, Collection } from "../../PageComponents/CollectionPage";
import { Header, Footer, Copyright } from "../../PageComponents/Components";

//INTERNAL IMPORT
import { useStateContext } from "../../context";

const collection = () => {
  const router = useRouter();

  const { query } = router;

  console.log(router);

  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);

  const { address, contract, getPropertiesData } = useStateContext();

  //GET DATA
  const fetchProperty = async () => {
    setIsLoading(true);
    const data = await getPropertiesData();
    setProperties(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProperty();
  }, []);

  //CATEGORIES

  const category = [];

  if (!isLoading) {
    properties?.map((el) => {
      if (el.category === query.name) {
        category.push(el);
      }
    });
  }

  console.log(category);

  return (
    <div class="template-color-1 nft-body-connect">
      <Header />
      <Title title={query.name} />
      <Collection category={category} isLoading={isLoading} />
      <Footer />
      <Copyright />
    </div>
  );
};

export default collection;
