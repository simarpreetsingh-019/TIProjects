import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import { Header, Footer, Copyright } from "../PageComponents/Components";
import {
  DetailEight,
  DetailFive,
  DetailFour,
  DetailOne,
  DetailSeven,
  DetailSix,
  DetailThree,
  DetailTwo,
} from "../PageComponents/DetailPage";

import { Loader, GlobalLoder } from "../PageComponents/Components";

import { useStateContext } from "../context";

const detail = () => {
  const [property, setProperty] = useState();
  const [parsedReviews, setParsedReviews] = useState();
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatePriceLoading, setUpdatePriceLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);

  const {
    currentAccount,
    addReviewFunction,
    getProductReviewsFunction,
    likeReviewFunction,
    buyPropertyFunction,
    getPropertyFunction,
    getPropertiesData,
    updatePriceFunction,
    loader,
  } = useStateContext();

  const router = useRouter();
  const { query } = router;

  //GET PROPERTY DATA
  const fetchProperty = async () => {
    const data = await getPropertyFunction(query.property);
    const dataReviews = await getProductReviewsFunction(query.property);
    const dataProperties = await getPropertiesData();
    setProperties(dataProperties);
    setProperty(data);
    setParsedReviews(dataReviews);
    setIsLoading(false);
  };

  useEffect(() => {
    if (query) fetchProperty();
  }, [query]);

  //ADD REVIEW
  const [review, setReview] = useState({
    productID: "",
    rating: 4,
    comment: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setReview({ ...review, [fieldName]: e.target.value });
  };

  const createReview = async () => {
    setCommentLoading(true);
    const data = await addReviewFunction({
      ...review,
      productID: property.productID,
    });
    setCommentLoading(false);
  };

  //LIKE REVIEW
  const [likeReviews, setLikeReviews] = useState({
    productID: "",
    reviewIndex: "",
  });
  const likeReviewCall = async (property, reviewIndex) => {
    const data = await likeReviewFunction(property.productID, reviewIndex);
  };

  //BUY PROPERTY
  const buying = {
    productID: property?.productID,
    amount: property?.price,
  };
  const buyingProperty = async () => {
    setBuyLoading(true);
    const data = await buyPropertyFunction(buying);
    setBuyLoading(false);
  };

  //UPDATE PRICE
  const [updatePropertyPrice, setUpdatePropertyPrice] = useState({
    productID: property?.productID,
    price: "",
  });
  const updatepropertyPrice = async () => {
    setUpdatePriceLoading(true);
    const data = await updatePriceFunction({
      ...updatePropertyPrice,
      productID: property?.productID,
    });
    setUpdatePriceLoading(false);
    window.location.reload();
  };
  //
  return (
    <div class="template-color-1 nft-body-connect">
      <Header />
      <DetailOne />

      <DetailTwo
        property={property}
        parsedReviews={parsedReviews}
        setLikeReviews={setLikeReviews}
        likeReviewCall={likeReviewCall}
        buyingProperty={buyingProperty}
        address={currentAccount}
        isLoading={isLoading}
        buyLoading={buyLoading}
      />

      <DetailThree properties={properties} />
      <DetailFive />
      <DetailSix />
      <DetailSeven
        property={property}
        setUpdatePropertyPrice={setUpdatePropertyPrice}
        updatepropertyPrice={updatepropertyPrice}
        updatePriceLoading={updatePriceLoading}
      />
      <DetailEight
        createReview={createReview}
        handleFormFieldChange={handleFormFieldChange}
        commentLoading={commentLoading}
      />

      <Footer />
      <Copyright />
      {loader && <GlobalLoder />}
    </div>
  );
};

export default detail;
