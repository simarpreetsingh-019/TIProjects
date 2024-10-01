import React from "react";

const Statistick = () => {
  return (
    <div class="rn-statistick-area rn-section-gapTop">
      <div class="container">
        <div class="row mb--30">
          <div class="col-12 text-center">
            <h3>briXchange Statistics</h3>
          </div>
        </div>
        <div class="row g-5">
          <div class="offset-lg-2 col-lg-4 col-md-6">
            <div class="single-counter-up text-center">
              <h3 class="counter">
                <span data-count="309">40</span>
              </h3>
              <div class="botton-title">briXchange All NFT's</div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="single-counter-up text-center">
              <h3 class="counter">
                <span data-count="508">200</span>
              </h3>
              <div class="botton-title">All Creators</div>
            </div>
          </div>
          <div class="offset-lg-2 col-lg-4 col-md-6">
            <div class="single-counter-up text-center">
              <h3 class="counter">
                <span data-count="1032">700</span>
              </h3>
              <div class="botton-title">briXchange Earning</div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="single-counter-up text-center">
              <h3 class="counter">
                <span data-count="650">1000</span>
              </h3>
              <div class="botton-title">Level One Seller</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistick;
