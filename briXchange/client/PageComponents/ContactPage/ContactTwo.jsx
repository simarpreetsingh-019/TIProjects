import React from "react";

const ContactTwo = () => {
  return (
    <div class="rn-contact-top-area rn-section-gapTop bg_color--5">
      <div class="container">
        <div class="row g-5">
          <div
            class="col-lg-12"
            data-sal="slide-up"
            data-sal-delay="150"
            data-sal-duration="800"
          >
            <div className="text-center max-w-2xl mx-auto my-12">
              <h2 className="text-5xl font-bold text-white mb-6">
                Quick Contact Address
              </h2>
              <p className="text-2xl text-white leading-relaxed">
                No.18, Rajaram Plaza, Avadi, Chennai
                <br />
                Tamil Nadu, Chennai - 600072
              </p>
            </div>
          </div>
        </div>
        <div class="row g-5">
          <div
            class="col-lg-4 col-md-6 col-sm-6 col-12"
            data-sal="slide-up"
            data-sal-delay="150"
            data-sal-duration="800"
          >
            <div class="rn-address">
              <div class="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-headphones"
                >
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                </svg>
              </div>
              <div class="inner">
                <h4 class="title">Contact Phone Number</h4>
                <p>
                  <a href="tel:+444555666777">+91 79239 47581</a>
                </p>
                <p>
                  <a href="tel:+222222222333">+91 98657 25172</a>
                </p>
              </div>
            </div>
          </div>
          <div
            class="col-lg-4 col-md-6 col-sm-6 col-12"
            data-sal="slide-up"
            data-sal-delay="200"
            data-sal-duration="800"
          >
            <div class="rn-address">
              <div class="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-mail"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div class="inner">
                <h4 class="title">Our Email Address</h4>
                <p>
                  <a href="mailto:admin@gmail.com">ahkharsha@gmail.com</a>
                </p>
                <p>
                  <a href="mailto:example@gmail.com">n.sarancs@gmail.com</a>
                </p>
              </div>
            </div>
          </div>
          <div
            class="col-lg-4 col-md-6 col-sm-6 col-12"
            data-sal="slide-up"
            data-sal-delay="250"
            data-sal-duration="800"
          >
            <div class="rn-address">
              <div class="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-map-pin"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div class="inner">
                <h4 class="title">Our Location</h4>
                <p>
                  Avadi, Chennai <br /> Tamil Nadu, Chennai - 600072
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactTwo;
