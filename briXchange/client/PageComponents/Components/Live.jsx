import React from "react";
import Link from "next/link";

const Live = ({ properties }) => {
  return (
    <div class="rn-live-bidding-area rn-section-gapTop">
      <div class="container">
        <div class="row mb--30">
          <div class="col-lg-12">
            <div class="section-title">
              <h3
                class="title mb--0 live-bidding-title"
                data-sal-delay="150"
                data-sal="slide-up"
                data-sal-duration="800"
              >
                New Properties
              </h3>
            </div>
          </div>
        </div>
        <div class="row g-5">
          {properties
            ?.map((property, i) => (
              <div
                class="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                data-sal-delay="150"
                data-sal=""
                data-sal-duration="800"
              >
                <div
                  class="product-style-one"
                  data-sal=""
                  data-sal-duration="800"
                  data-sal-delay="150"
                >
                  <div class="card-thumbnail">
                    <a href={`/detail?property=${property.productID}`}>
                      <img src={property.image} alt="NFT_portfolio" />
                    </a>
                  </div>
                  <div class="product-share-wrapper">
                    <div class="profile-share">
                      {property.reviewers.map((el, i) => (
                        <a class="avatar" data-tooltip={`${el.slice(0, 15)}..`}>
                          <img
                            src={`/client/client-${i + 1}.png`}
                            alt="Nft_Profile"
                          />
                        </a>
                      ))}
                      {property.reviewers.length !== 0 && (
                        <a class="more-author-text" href="#">
                          Interested Users
                        </a>
                      )}
                    </div>
                  </div>
                  <a href="#">
                    <span class="product-name">
                      {property.title.length >= 25
                        ? `${property.title.slice(0, 22)}...`
                        : property.title}
                    </span>
                  </a>
                  <span class="latest-bid">Category: {property.category}</span>
                  <div class="bid-react-area">
                    <div class="last-bid">{property.price} XTZ</div>
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
                      <span class="number">{property.reviewers.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
            .slice(0, 5)}
        </div>
      </div>
    </div>
  );
};

export default Live;
