import React from "react";

const SignUpTwo = () => {
  return (
    <div class="login-area rn-section-gapTop">
      <div class="container">
        <div class="row g-5">
          <div class="offset-2 col-lg-4 col-md-6 ml_md--0 ml_sm--0 col-sm-12">
            <div class="form-wrapper-one registration-area">
              <h4>Sign up</h4>
              <form>
                <div class="mb-5">
                  <label for="firstName" class="form-label">
                    First name
                  </label>
                  <input type="text" id="firstName" />
                </div>
                <div class="mb-5">
                  <label for="sastName" class="form-label">
                    Last name
                  </label>
                  <input type="email" id="sastName" />
                </div>
                <div class="mb-5">
                  <label for="exampleInputEmail1" class="form-label">
                    Email address
                  </label>
                  <input type="email" id="exampleInputEmail1" />
                </div>
                <div class="mb-5">
                  <label for="newPassword" class="form-label">
                    Create Password
                  </label>
                  <input type="password" id="newPassword" />
                </div>
                <div class="mb-5">
                  <label for="exampleInputPassword1" class="form-label">
                    Re Password
                  </label>
                  <input type="password" id="exampleInputPassword1" />
                </div>
                <div class="mb-5 rn-check-box">
                  <input
                    type="checkbox"
                    class="rn-check-box-input"
                    id="exampleCheck1"
                  />
                  <label class="rn-check-box-label" for="exampleCheck1">
                    Allow to all tearms & condition
                  </label>
                </div>
                <button type="submit" class="btn btn-primary mr--15">
                  Sign Up
                </button>
                <a href="login.html" class="btn btn-primary-alta">
                  Log In
                </a>
              </form>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="social-share-media form-wrapper-one">
              <h6>Another way to sign up</h6>
              <p>
                {" "}
                Lorem ipsum dolor sit, amet sectetur adipisicing elit.cumque.
              </p>
              <button class="another-login login-facebook">
                {" "}
                <img
                  class="small-image"
                  src="assets/images/icons/google.png"
                  alt=""
                />{" "}
                <span>Log in with Google</span>
              </button>
              <button class="another-login login-facebook">
                {" "}
                <img
                  class="small-image"
                  src="assets/images/icons/facebook.png"
                  alt=""
                />{" "}
                <span>Log in with Facebook</span>
              </button>
              <button class="another-login login-twitter">
                {" "}
                <img
                  class="small-image"
                  src="assets/images/icons/tweeter.png"
                  alt=""
                />{" "}
                <span>Log in with Twitter</span>
              </button>
              <button class="another-login login-linkedin">
                {" "}
                <img
                  class="small-image"
                  src="assets/images/icons/linkedin.png"
                  alt=""
                />{" "}
                <span>Log in with linkedin</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpTwo;
