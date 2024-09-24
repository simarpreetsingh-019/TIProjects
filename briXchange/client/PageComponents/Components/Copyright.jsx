import React from "react";

const Copyright = () => {
  return (
    <>
      <div class="copy-right-one ptb--20 bg-color--1">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6 col-md-12 col-sm-12">
              <div class="copyright-left">
                <span>©2024 briXchange, Inc. All rights reserved.</span>
                <ul class="privacy">
                  <li>
                    <a href="terms-condition.html">Terms</a>
                  </li>
                  <li>
                    <a href="privacy-policy.html">Privacy Policy</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-6 col-md-12 col-sm-12">
              <div class="copyright-right"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="mouse-cursor cursor-outer"></div>
      <div class="mouse-cursor cursor-inner"></div>

      <div class="rn-progress-parent">
        <svg
          class="rn-back-circle svg-inner"
          width="100%"
          height="100%"
          viewBox="-1 -1 102 102"
        >
          <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
        </svg>
      </div>
    </>
  );
};

export default Copyright;
