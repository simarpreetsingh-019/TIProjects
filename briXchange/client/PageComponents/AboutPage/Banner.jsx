import React from "react";

const Banner = () => {
  return (
    <div class="rn-about-banner-area rn-section-gapTop">
      <div class="container mb--30">
        <div class="row">
          <div class="col-12">
            <h2
              class="title about-title-m"
              data-sal="slide-up"
              data-sal-duration="800"
              data-sal-delay="150"
            >
              Direct Teams. <br />
              For Your Dedicated Dreams
            </h2>
          </div>
        </div>
      </div>
      <div class="container-fluid about-fluidimg ">
        <div class="row">
          <div class="img-wrapper">
            <div class="bg_image--22 bg_image"></div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row g-5">
          <div class="col-lg-6">
            <div class="h--100">
              <div class="rn-about-card mt_dec--50 widge-wrapper rbt-sticky-top-adjust">
                <div class="inner">
                  <div className="text-center max-w-3xl mx-auto my-16">
                    <h2
                      className="text-5xl font-bold text-white mb-8"
                      data-sal="slide-up"
                      data-sal-duration="800"
                      data-sal-delay="150"
                    >
                      Why We Do This
                    </h2>
                    <p
                      className="text-2xl text-white leading-relaxed mb-10"
                      data-sal="slide-up"
                      data-sal-duration="800"
                      data-sal-delay="150"
                    >
                      NFTs are virtual tokens that represent ownership of
                      something inherently distinct and scarce, whether it be a
                      physical or digital item, such as artwork, a soundtrack, a
                      collectible, an in-game item or real estate. Unlike
                      regular cryptocurrencies like bitcoin or fiat money like
                      the INR.
                    </p>
                    <a
                      href="blog.html"
                      class="btn btn-primary-alta btn-large sal-animate mt--20"
                      data-sal="slide-up"
                      data-sal-duration="800"
                      data-sal-delay="150"
                    >
                      See Our Blog
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="h--100">
              <div class="rn-about-card mt_dec--50 widge-wrapper rbt-sticky-top-adjust">
                <div class="inner">
                  <div className="text-center max-w-3xl mx-auto my-16">
                    <h2
                      className="text-5xl font-bold text-white mb-8"
                      data-sal="slide-up"
                      data-sal-duration="800"
                      data-sal-delay="150"
                    >
                      Helping You <br /><br />
                      Grow In Every Stage
                    </h2>
                    <p
                      className="text-2xl text-white leading-relaxed mb-10"
                      data-sal="slide-up"
                      data-sal-duration="800"
                      data-sal-delay="150"
                    >
                      At briXchange, we're committed to supporting your growth at every step of your journey. Our platform provides the tools, resources, and community you need to thrive in the dynamic world of NFTs. Whether you're a creator, collector, or enthusiast, we're here to help you navigate and succeed in this exciting digital landscape.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
