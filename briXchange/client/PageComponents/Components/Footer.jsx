import React from "react";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <div class="rn-footer-one rn-section-gap bg-color--1 mt--100 mt_md--80 mt_sm--80">
      <div class="container">
        <div class="row gx-5">
          <div class="col-lg-3 col-md-6 col-sm-6 col-12">
            <div class="widget-content-wrapper">
              <div class="footer-left">
                <div class="logo-thumbnail logo-custom-css">
                  <a class="logo-light" href="/">
                    <img src="/logo/logo-white.png" alt="nft-logo" />
                  </a>
                  <a class="logo-dark" href="/">
                    <img src="/logo/logo-dark.png" alt="nft-logo" />
                  </a>
                </div>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<GitHubIcon />}
                  href="https://github.com/ahkharsha/briXchange"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    mt: 2,
                    borderColor: "#00a3ff",
                    color: "#00a3ff",
                    "&:hover": {
                      backgroundColor: "rgba(0,163,255,0.1)",
                    },
                  }}
                >
                  briXchange - GitHub
                </Button>
                <p class="rn-footer-describe">
                  Created with the collaboration of over 60 of the world's best
                  briXchange Artists.
                </p>
              </div>
              <div class="widget-bottom mt--40 pt--40">
                <h6 class="title">Get The Latest briXchange Updates</h6>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control bg-color--2"
                    placeholder="Your username"
                    aria-label="Recipient's username"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-primary-alta btn-outline-secondary"
                      type="button"
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
                <div class="newsletter-dsc">
                  <p>Email is safe. We don't spam.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 col-sm-6 col-12 mt_mobile--40">
            <div class="footer-widget widget-quicklink">
              <h6 class="widget-title">briXchange</h6>
              <ul class="footer-list-one">
                <li class="single-list">
                  <a href="#">Protocol Explore</a>
                </li>
                <li class="single-list">
                  <a href="#">System Token</a>
                </li>
                <li class="single-list">
                  <a href="#">Otimize Time</a>
                </li>
                <li class="single-list">
                  <a href="#">Visual Checking</a>
                </li>
                <li class="single-list">
                  <a href="#">Fadeup System</a>
                </li>
                <li class="single-list">
                  <a href="#">Activity Log</a>
                </li>
                <li class="single-list">
                  <a href="#">System Auto Since</a>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 col-sm-6 col-12 mt_md--40 mt_sm--40">
            <div class="footer-widget widget-information">
              <h6 class="widget-title">Information</h6>
              <ul class="footer-list-one">
                <li class="single-list">
                  <a href="#">Market Explore</a>
                </li>
                <li class="single-list">
                  <a href="#">Ready Token</a>
                </li>
                <li class="single-list">
                  <a href="#">Main Option</a>
                </li>
                <li class="single-list">
                  <a href="#">Product Checking</a>
                </li>
                <li class="single-list">
                  <a href="blog.html">Blog Grid</a>
                </li>
                <li class="single-list">
                  <a href="about.html">About Us</a>
                </li>
                <li class="single-list">
                  <a href="#">Fix Bug </a>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 col-sm-6 col-12 mt_md--40 mt_sm--40">
            <div class="footer-widget">
              <h6 class="widget-title">Recent Sold Out</h6>
              <ul class="footer-recent-post">
                <li class="recent-post">
                  <div class="thumbnail">
                    <a href="product-details.html">
                      <img
                        src="/portfolio/portfolio-01.jpg"
                        alt="Product Images"
                      />
                    </a>
                  </div>
                  <div class="content">
                    <h6 class="title">
                      <a href="product-details.html">#21 The Wonder</a>
                    </h6>
                    <p>Highest bid 1/20</p>
                    <span class="price">0.244wETH</span>
                  </div>
                </li>
                <li class="recent-post">
                  <div class="thumbnail">
                    <a href="product-details.html">
                      <img
                        src="/portfolio/portfolio-02.jpg"
                        alt="Product Images"
                      />
                    </a>
                  </div>
                  <div class="content">
                    <h6 class="title">
                      <a href="product-details.html">Diamond Dog</a>
                    </h6>
                    <p>Highest bid 1/20</p>
                    <span class="price">0.022wETH</span>
                  </div>
                </li>
                <li class="recent-post">
                  <div class="thumbnail">
                    <a href="product-details.html">
                      <img
                        src="/portfolio/portfolio-03.jpg"
                        alt="Product Images"
                      />
                    </a>
                  </div>
                  <div class="content">
                    <h6 class="title">
                      <a href="product-details.html">Morgan11</a>
                    </h6>
                    <p>Highest bid 1/20</p>
                    <span class="price">0.892wETH</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
