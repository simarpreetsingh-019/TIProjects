import React from "react";

const NewsTwo = () => {
  return (
    <div class="newsletter-area rn-section-gapTop">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <div class="newsletter-wrapper">
              <h2 class="title">Sign up for The Tide, briXchange's newsletter!</h2>
              <p class="discription">
                Sign up to receive our monthly newsletter, featuring updates
                from the team, new decentralized applications and NFT projects,
                and trends we’re seeing in the space.
              </p>
              <input type="email" placeholder="Your Email Address..." />
              <a class="btn btn-primary mt--30" href="#">
                Subscribe
              </a>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="newsletter-right">
              <img src="/portfolio/portfolio-01.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTwo;
