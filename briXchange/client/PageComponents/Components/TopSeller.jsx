import React from "react";

const TopSeller = ({ creators }) => {
  return (
    <div class="rn-top-top-seller-area nice-selector-transparent rn-section-gapTop">
      <div class="container">
        <div class="row mb--30">
          <div class="col-12 justify-sm-center d-flex">
            <h3
              class="title"
              data-sal-delay="150"
              data-sal="slide-up"
              data-sal-duration="800"
            >
              Top Property Seller
            </h3>
          </div>
        </div>
        <div class="row justify-sm-center g-5 top-seller-list-wrapper">
          {creators.map((seller, i) => (
            <div
              data-sal=""
              data-sal-delay="150"
              data-sal-duration="800"
              class="col-5 col-lg-3 col-md-4 col-sm-6 top-seller-list"
            >
              <div class="top-seller-inner-one">
                <div class="top-seller-wrapper">
                  <div class="thumbnail varified">
                    <a href="author.html">
                      <img
                        src={`/client/client-${i + 1}.png`}
                        alt="Nft_Profile"
                      />
                    </a>
                  </div>
                  <div class="top-seller-content">
                    <a href="author.html">
                      <h6 class="name">{seller.owner.slice(0, 10)}..</h6>
                    </a>
                    <span class="count-number">{seller.total} XTZ </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {[1, 2, 3, 4, 5, 6, 7].map((el, i) => (
            <div
              data-sal=""
              data-sal-delay="150"
              data-sal-duration="800"
              class="col-5 col-lg-3 col-md-4 col-sm-6 top-seller-list"
            >
              <div class="top-seller-inner-one">
                <div class="top-seller-wrapper">
                  <div class="thumbnail varified">
                    <a href="author.html">
                      <img
                        src={`/client/client-${i + 1}.png`}
                        alt="Nft_Profile"
                      />
                    </a>
                  </div>
                  <div class="top-seller-content">
                    <a href="author.html">
                      <h6 class="name">Brodband</h6>
                    </a>
                    <span class="count-number">{`$${i + 1}500,000`} </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopSeller;
