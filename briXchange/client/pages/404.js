import React from "react";

//INTERNAL IMPORT
import { Header, Footer, Copyright } from "../PageComponents/Components";

const pageNotFound = () => {
  return (
    <div class="template-color-1 nft-body-connect">
      <Header />
      <div class="rn-not-found-area rn-section-gapTop">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="rn-not-found-wrapper">
                <h2 class="large-title">404</h2>
                <h3 class="title">Page not found!</h3>
                <p>The page you are looking for not available.</p>
                <a href="index.html" class="btn btn-primary btn-large">
                  Go Back To Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* //PART TWO */}
      <div
        class="rn-popup-modal share-modal-wrapper modal fade"
        id="shareModal"
        tabindex="-1"
        aria-hidden="true"
      >
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          {/* <i data-feather="x"></i> */}
        </button>
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content share-wrapper">
            <div class="modal-header share-area">
              <h5 class="modal-title">Share this NFT</h5>
            </div>
            <div class="modal-body">
              <ul class="social-share-default">
                <li>
                  <a href="#">
                    <span class="icon">
                      {/* <i data-feather="facebook"></i> */}
                    </span>
                    <span class="text">facebook</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span class="icon">
                      {/* <i data-feather="twitter"></i> */}
                    </span>
                    <span class="text">twitter</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span class="icon">
                      {/* <i data-feather="linkedin"></i> */}
                    </span>
                    <span class="text">linkedin</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span class="icon">
                      {/* <i data-feather="instagram"></i> */}
                    </span>
                    <span class="text">instagram</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span class="icon">
                      {/* <i data-feather="youtube"></i> */}
                    </span>
                    <span class="text">youtube</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* //PART 3 */}
      <div
        class="rn-popup-modal report-modal-wrapper modal fade"
        id="reportModal"
        tabindex="-1"
        aria-hidden="true"
      >
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          {/* <i data-feather="x"></i> */}
        </button>
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content report-content-wrapper">
            <div class="modal-header report-modal-header">
              <h5 class="modal-title">Why are you reporting?</h5>
            </div>
            <div class="modal-body">
              <p>
                Describe why you think this item should be removed from
                marketplace
              </p>
              <div class="report-form-box">
                <h6 class="title">Message</h6>
                <textarea name="message" placeholder="Write issues"></textarea>
                <div class="report-button">
                  <button type="button" class="btn btn-primary mr--10 w-auto">
                    Report
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary-alta w-auto"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Copyright />
    </div>
  );
};

export default pageNotFound;
