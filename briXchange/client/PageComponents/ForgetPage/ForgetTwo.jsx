import React from "react";

const ForgetTwo = () => {
  return (
    <div class="forget-password-area rn-section-gapTop">
      <div class="container">
        <div class="row g-5">
          <div class="offset-lg-4 col-lg-4">
            <div class="form-wrapper-one">
              <div class="logo-thumbnail logo-custom-css mb--50">
                <a class="logo-light" href="index.html">
                  <img src="/logo/logo-white.png" alt="nft-logo" />
                </a>
                <a class="logo-dark" href="index.html">
                  <img src="/logo/logo-dark.png" alt="nft-logo" />
                </a>
              </div>

              <div class="mb-5">
                <label for="exampleInputEmail1" class="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  id="exampleInputEmail1"
                  placeholder="Enter your email"
                />
              </div>
              <div class="mb-5">
                <input
                  type="checkbox"
                  class="rn-check-box-input"
                  id="exampleCheck1"
                />
                <label class="rn-check-box-label" for="exampleCheck1">
                  I agree to the{" "}
                  <a href="privacy-policy.html">privacy policy</a>{" "}
                </label>
              </div>

              <div class="mb-5">
                <button class="btn btn-large btn-primary">Send</button>
              </div>

              <span class="mt--20 notice">
                Note: We will send a password to your email
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetTwo;
