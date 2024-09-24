import React, { useEffect, useState } from "react";

//INTERNAL IMPORT
import {
  AuthorFive,
  AuthorFour,
  AuthorOne,
  AuthorThree,
  AuthorTwo,
} from "../PageComponents/AuthorPage";
import { Header, Footer, Copyright } from "../PageComponents/Components";

import { useStateContext } from "../context";

const author = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [author, setAuthor] = useState([]);

  const { currentAccount, getUserPropertiesFunction, getPropertiesData } =
    useStateContext();

  //GET DATA
  const fetchProperty = async () => {
    setIsLoading(true);
    const data = await getPropertiesData();
    const dataAuthor = await getUserPropertiesFunction();
    setAuthor(dataAuthor);
    setProperties(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProperty();
  }, []);

  return (
    <div class="template-color-1 nft-body-connect">
      <Header />
      <AuthorOne />
      <AuthorTwo address={currentAccount} author={author} />
      <AuthorThree properties={properties} author={author} />
      <AuthorFour />
      <AuthorFive />
      <Footer />
      <Copyright />
    </div>
  );
};

export default author;
