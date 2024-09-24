import React from "react";
import Countdown from "react-countdown";
import { Loader } from "../../PageComponents/Components";
const DetailTwo = ({
  property,
  parsedReviews,
  setLikeReviews,
  likeReviews,
  likeReviewCall,
  buyingProperty,
  address,
  isLoading,
  buyLoading,
}) => {
  const timeComment = new Date(new Date() - Math.random() * 1e12);

  return (
    <div class="product-details-area rn-section-gapTop">
      <div class="container">
        <div class="row g-5">
          <div class="col-lg-7 col-md-12 col-sm-12">
            <div class="product-tab-wrapper rbt-sticky-top-adjust">
              <div class="pd-tab-inner">
                <div
                  class="nav rn-pd-nav rn-pd-rt-content nav-pills"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    class="nav-link active"
                    id="v-pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-home"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                  >
                    <span class="rn-pd-sm-thumbnail">
                      <img
                        src="/portfolio/portfolio-01.jpg"
                        alt="Nft_Profile"
                      />
                    </span>
                  </button>
                  <button
                    class="nav-link"
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    <span class="rn-pd-sm-thumbnail">
                      <img
                        src="/portfolio/portfolio-02.jpg"
                        alt="Nft_Profile"
                      />
                    </span>
                  </button>
                  <button
                    class="nav-link"
                    id="v-pills-messages-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-messages"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-messages"
                    aria-selected="false"
                  >
                    <span class="rn-pd-sm-thumbnail">
                      <img
                        src="/portfolio/portfolio-03.jpg"
                        alt="Nft_Profile"
                      />
                    </span>
                  </button>
                </div>

                <div class="tab-content rn-pd-content" id="v-pills-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="v-pills-home"
                    role="tabpanel"
                    aria-labelledby="v-pills-home-tab"
                  >
                    <div class="rn-pd-thumbnail">
                      {isLoading ? (
                        <Loader />
                      ) : (
                        <img src={property?.image} alt="Nft_Profile" />
                      )}
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="v-pills-profile"
                    role="tabpanel"
                    aria-labelledby="v-pills-profile-tab"
                  >
                    <div class="rn-pd-thumbnail">
                      <img
                        src="/portfolio/portfolio-02.jpg"
                        alt="Nft_Profile"
                      />
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="v-pills-messages"
                    role="tabpanel"
                    aria-labelledby="v-pills-messages-tab"
                  >
                    <div class="rn-pd-thumbnail">
                      <img
                        src="/portfolio/portfolio-03.jpg"
                        alt="Nft_Profile"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-5 col-md-12 col-sm-12 mt_md--50 mt_sm--60">
            <div class="rn-pd-content-area">
              <div class="pd-title-area">
                <h4 class="title">{property?.title?.slice(0, 25)}..</h4>
                <div class="pd-react-area">
                  <div class="heart-count">
                    <span>{parsedReviews?.length}</span>
                  </div>
                  <div class="count">
                    <div class="share-btn share-btn-activation dropdown">
                      <button
                        class="icon"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <svg
                          viewBox="0 0 14 4"
                          fill="none"
                          width="16"
                          height="16"
                          class="sc-bdnxRM sc-hKFxyN hOiKLt"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3.5 2C3.5 2.82843 2.82843 3.5 2 3.5C1.17157 3.5 0.5 2.82843 0.5 2C0.5 1.17157 1.17157 0.5 2 0.5C2.82843 0.5 3.5 1.17157 3.5 2ZM8.5 2C8.5 2.82843 7.82843 3.5 7 3.5C6.17157 3.5 5.5 2.82843 5.5 2C5.5 1.17157 6.17157 0.5 7 0.5C7.82843 0.5 8.5 1.17157 8.5 2ZM11.999 3.5C12.8274 3.5 13.499 2.82843 13.499 2C13.499 1.17157 12.8274 0.5 11.999 0.5C11.1706 0.5 10.499 1.17157 10.499 2C10.499 2.82843 11.1706 3.5 11.999 3.5Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </button>

                      <div class="share-btn-setting dropdown-menu dropdown-menu-end">
                        <button
                          type="button"
                          class="btn-setting-text share-text"
                          data-bs-toggle="modal"
                          data-bs-target="#shareModal"
                        >
                          Share
                        </button>
                        {property?.owner.toLowerCase() == address && (
                          <button
                            type="button"
                            class="btn-setting-text report-text"
                            data-bs-toggle="modal"
                            data-bs-target="#reportModal"
                          >
                            Update Price
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h6 class="title-name">
                #{property?.productID} Portal , Info bellow
              </h6>
              <div class="catagory-collection">
                <div class="catagory">
                  <span>
                    Catagory <span class="color-body">10% royalties</span>
                  </span>
                  <div class="top-seller-inner-one">
                    <div class="top-seller-wrapper">
                      <div class="thumbnail">
                        <a href="#">
                          <img src="/client/client-1.png" alt="Nft_Profile" />
                        </a>
                      </div>
                      <div class="top-seller-content">
                        <a href="#">
                          <h6 class="name">Only 10% Own</h6>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="collection">
                  <span>Collections</span>
                  <div class="top-seller-inner-one">
                    <div class="top-seller-wrapper">
                      <div class="thumbnail">
                        <a href="#">
                          <img src="/client/client-2.png" alt="Nft_Profile" />
                        </a>
                      </div>
                      <div class="top-seller-content">
                        <a href="#">
                          <h6 class="name">{property?.category}</h6>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="rn-bid-details">
                <div class="tab-wrapper-one">
                  <nav class="tab-button-one">
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                      <button
                        class="nav-link"
                        id="nav-home-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-home"
                        type="button"
                        role="tab"
                        aria-controls="nav-home"
                        aria-selected="false"
                      >
                        Comments
                      </button>
                      <button
                        class="nav-link active"
                        id="nav-profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-profile"
                        type="button"
                        role="tab"
                        aria-controls="nav-profile"
                        aria-selected="true"
                      >
                        Details
                      </button>
                      <button
                        class="nav-link"
                        id="nav-contact-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-contact"
                        type="button"
                        role="tab"
                        aria-controls="nav-contact"
                        aria-selected="false"
                      >
                        Users interest
                      </button>
                    </div>
                  </nav>
                  <div class="tab-content rn-bid-content" id="nav-tabContent">
                    <div
                      class="tab-pane fade"
                      id="nav-home"
                      role="tabpanel"
                      aria-labelledby="nav-home-tab"
                    >
                      {parsedReviews?.map((review, i) => (
                        <div
                          onClick={(e) =>
                            likeReviewCall(property, review.reviewIndex)
                          }
                          key={i + 1}
                          class="top-seller-inner-one"
                        >
                          <div class="top-seller-wrapper">
                            <div class="thumbnail">
                              <a href="#">
                                <img
                                  src={`/client/client-${i + 1}.png`}
                                  alt="Nft_Profile"
                                />
                              </a>
                            </div>
                            <div class="top-seller-content">
                              <span>{review?.reviewer.slice(0, 35)}... </span>
                              <div class="react-area">
                                <svg
                                  viewBox="0 0 17 16"
                                  fill="none"
                                  width="16"
                                  height="16"
                                  class="sc-bdnxRM sc-hKFxyN kBvkOu"
                                >
                                  <path
                                    d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z"
                                    stroke="currentColor"
                                    stroke-width="2"
                                  ></path>
                                </svg>
                                <span class="number">
                                  <strong>{review?.likes} </strong> (
                                  {i + 1 + 0.5} hours ago)
                                </span>
                              </div>
                              <span class="count-number">
                                {review?.comment.slice(0, 70)}
                                {review?.comment.length >= 93 ? "..." : ""}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div
                      class="tab-pane fade show active"
                      id="nav-profile"
                      role="tabpanel"
                      aria-labelledby="nav-profile-tab"
                    >
                      <div class="rn-pd-bd-wrapper">
                        <div class="top-seller-inner-one">
                          <h6 class="name-title">Owner</h6>
                          <div class="top-seller-wrapper">
                            <div class="thumbnail">
                              <a href="#">
                                <img
                                  src="/client/client-1.png"
                                  alt="Nft_Profile"
                                />
                              </a>
                            </div>
                            <div class="top-seller-content">
                              <a href="#">
                                <h6 class="name">
                                  {property?.owner?.slice(0, 20)}..
                                </h6>
                              </a>
                            </div>
                          </div>
                        </div>

                        <div class="rn-pd-sm-property-wrapper">
                          <div class="pd-property-inner">
                            <h6 class="pd-property-title"> Title</h6>
                            <span class="color-white value">
                              {property?.title}
                            </span>
                          </div>
                          <div class="pd-property-inner">
                            <h6 class="pd-property-title"> Description</h6>

                            <span class="color-white value">
                              {property?.description}
                            </span>
                          </div>
                          <div class="pd-property-inner">
                            <h6 class="pd-property-title"> Address</h6>

                            <span class="color-white value">
                              {property?.address}
                            </span>
                          </div>
                          <div class="pd-property-inner">
                            <h6 class="pd-property-title">
                              {" "}
                              Price 18 Decimal Points: {property?.price} XTZ
                            </h6>
                          </div>
                          <div class="pd-property-inner">
                            <h6 class="pd-property-title">
                              {" "}
                              Property ID: {property?.productID}
                            </h6>
                          </div>
                        </div>

                        <div class="rn-pd-sm-property-wrapper">
                          <h6 class="pd-property-title">Catagory</h6>
                          <div class="catagory-wrapper">
                            <div class="pd-property-inner">
                              <span class="color-body type">TYPE</span>
                              <span class="color-white value ">
                                {property?.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="nav-contact"
                      role="tabpanel"
                      aria-labelledby="nav-contact-tab"
                    >
                      {parsedReviews?.map((interest, i) => (
                        <div key={i + 1} class="top-seller-inner-one">
                          <div class="top-seller-wrapper">
                            <div class="thumbnail">
                              <a href="#">
                                <img
                                  src={`/client/client-${i + 1}.png`}
                                  alt="Nft_Profile"
                                />
                              </a>
                            </div>
                            <div class="top-seller-content">
                              <span class="count-number">
                                {interest?.reviewer.slice(0, 40)}...
                              </span>
                              <span>{i + 1} hours ago</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div class="place-bet-area">
                  <div class="rn-bet-create">
                    <div class="bid-list winning-bid">
                      <h6 class="title">Recent Comment</h6>
                      {parsedReviews
                        ?.reverse()
                        .map((recentReview, i) => (
                          <div class="top-seller-inner-one">
                            <div class="top-seller-wrapper">
                              <div class="thumbnail">
                                <a href="#">
                                  <img
                                    src="/client/client-7.png"
                                    alt="Nft_Profile"
                                  />
                                </a>
                              </div>
                              <div class="top-seller-content">
                                <span class="heighest-bid">
                                  {recentReview?.reviewer.slice(0, 20)}...
                                </span>
                                <span class="count-number">
                                  {" "}
                                  {recentReview?.comment.length >= 50
                                    ? `${recentReview?.comment.slice(0, 60)}...`
                                    : recentReview?.comment}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))
                        .slice(0, 1)}
                    </div>
                    <div class="bid-list left-bid">
                      <h6 class="title">Property Stats</h6>
                      <div class=" mt--15" data-date="2025-12-09">
                        <div class="countdown-container days">
                          <span class="countdown-value">Price: </span>
                          <span class="countdown-heading">
                            {property?.price} XTZ
                          </span>
                        </div>
                        <div class="countdown-container hours">
                          <span class="countdown-value">Comments: </span>
                          <span class="countdown-heading">
                            {parsedReviews?.length}
                          </span>
                        </div>
                        <div class="countdown-container minutes">
                          <span class="countdown-value"> Interest: </span>
                          <span class="countdown-heading">
                            {parsedReviews?.length}
                          </span>
                        </div>
                        <div class="countdown-container seconds">
                          Time Left: <Countdown date={Date.now() + 23455000} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => buyingProperty()}
                    type="button"
                    class="btn btn-primary-alta mt--30"
                  >
                    {buyLoading ? (
                      <Loader />
                    ) : (
                      <>
                        {address?.toLowerCase() == property?.owner.toLowerCase()
                          ? "You can't buy your owned Property"
                          : `${property?.price} XTZ Buy Property`}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary-alta mt--30"
                    data-bs-toggle="modal"
                    data-bs-target="#placebidModal"
                  >
                    Add Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTwo;
