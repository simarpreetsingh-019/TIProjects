import React from "react";

const CreatorOne = ({ creators }) => {
  return (
    <div class="rn-creator-title-area rn-section-gapTop">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 col-md-6 col-sm-6 col-12">
            <h2 class="title mb--0">Our Best Creators</h2>
          </div>
        </div>
        <div class="row g-5 mt--30 creator-list-wrapper">
          {creators.map((el, i) => (
            <div
              class="creator-single col-lg-3 col-md-4 col-sm-6"
              data-sal=""
              data-sal-delay="150"
              data-sal-duration="800"
            >
              <div class="top-seller-inner-one explore">
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
                      <h6 class="name">{el.owner.slice(0, 10)}...</h6>
                    </a>
                    <span class="count-number">{el.total}</span>
                  </div>
                </div>
                <a class="over-link" href="author.html"></a>
              </div>
            </div>
          ))}

          <div
            class="creator-single col-lg-3 col-md-4 col-sm-6"
            data-sal="slide-up"
            data-sal-delay="250"
            data-sal-duration="800"
          >
            <div class="top-seller-inner-one explore">
              <div class="top-seller-wrapper">
                <div class="thumbnail">
                  <a href="author.html">
                    <img src="/client/client-3.png" alt="Nft_Profile" />
                  </a>
                </div>
                <div class="top-seller-content">
                  <a href="author.html">
                    <h6 class="name">JOne Lee</h6>
                  </a>
                  <span class="count-number">$900,000</span>
                </div>
              </div>
              <a class="over-link" href="author.html"></a>
            </div>
          </div>

          <div
            class="creator-single col-lg-3 col-md-4 col-sm-6"
            data-sal="slide-up"
            data-sal-delay="300"
            data-sal-duration="800"
          >
            <div class="top-seller-inner-one explore">
              <div class="top-seller-wrapper">
                <div class="thumbnail varified">
                  <a href="author.html">
                    <img src="/client/client-4.png" alt="Nft_Profile" />
                  </a>
                </div>
                <div class="top-seller-content">
                  <a href="author.html">
                    <h6 class="name">Malinga</h6>
                  </a>
                  <span class="count-number">$2400,000</span>
                </div>
              </div>
              <a class="over-link" href="author.html"></a>
            </div>
          </div>

          <div
            class="creator-single col-lg-3 col-md-4 col-sm-6"
            data-sal="slide-up"
            data-sal-delay="350"
            data-sal-duration="800"
          >
            <div class="top-seller-inner-one explore">
              <div class="top-seller-wrapper">
                <div class="thumbnail">
                  <a href="author.html">
                    <img src="/client/client-5.png" alt="Nft_Profile" />
                  </a>
                </div>
                <div class="top-seller-content">
                  <a href="author.html">
                    <h6 class="name">Favis</h6>
                  </a>
                  <span class="count-number">$290,000</span>
                </div>
              </div>
              <a class="over-link" href="author.html"></a>
            </div>
          </div>

          <div
            class="creator-single col-lg-3 col-md-4 col-sm-6"
            data-sal="slide-up"
            data-sal-delay="400"
            data-sal-duration="800"
          >
            <div class="top-seller-inner-one explore">
              <div class="top-seller-wrapper">
                <div class="thumbnail">
                  <a href="author.html">
                    <img src="/client/client-6.png" alt="Nft_Profile" />
                  </a>
                </div>
                <div class="top-seller-content">
                  <a href="author.html">
                    <h6 class="name">Fakir</h6>
                  </a>
                  <span class="count-number">$299,00,000</span>
                </div>
              </div>
              <a class="over-link" href="author.html"></a>
            </div>
          </div>

          <div
            class="creator-single col-lg-3 col-md-4 col-sm-6"
            data-sal="slide-up"
            data-sal-delay="450"
            data-sal-duration="800"
          >
            <div class="top-seller-inner-one explore">
              <div class="top-seller-wrapper">
                <div class="thumbnail varified">
                  <a href="author.html">
                    <img src="/client/client-7.png" alt="Nft_Profile" />
                  </a>
                </div>
                <div class="top-seller-content">
                  <a href="author.html">
                    <h6 class="name">Sajib</h6>
                  </a>
                  <span class="count-number">$1100,000</span>
                </div>
              </div>
              <a class="over-link" href="author.html"></a>
            </div>
          </div>

          <div
            class="creator-single col-lg-3 col-md-4 col-sm-6"
            data-sal="slide-up"
            data-sal-delay="500"
            data-sal-duration="800"
          >
            <div class="top-seller-inner-one explore">
              <div class="top-seller-wrapper">
                <div class="thumbnail">
                  <a href="author.html">
                    <img src="/client/client-9.png" alt="Nft_Profile" />
                  </a>
                </div>
                <div class="top-seller-content">
                  <a href="author.html">
                    <h6 class="name">Mikel</h6>
                  </a>
                  <span class="count-number">$2500,000</span>
                </div>
              </div>
              <a class="over-link" href="author.html"></a>
            </div>
          </div>

          <div
            class="creator-single col-lg-3 col-md-4 col-sm-6"
            data-sal="slide-up"
            data-sal-delay="550"
            data-sal-duration="800"
          >
            <div class="top-seller-inner-one explore">
              <div class="top-seller-wrapper">
                <div class="thumbnail varified">
                  <a href="author.html">
                    <img src="/client/client-8.png" alt="Nft_Profile" />
                  </a>
                </div>
                <div class="top-seller-content">
                  <a href="author.html">
                    <h6 class="name">Kolik</h6>
                  </a>
                  <span class="count-number">$9900,000</span>
                </div>
              </div>
              <a class="over-link" href="author.html"></a>
            </div>
          </div>

          <div
            class="creator-single col-lg-3 col-md-4 col-sm-6"
            data-sal="slide-up"
            data-sal-delay="600"
            data-sal-duration="800"
          >
            <div class="top-seller-inner-one explore">
              <div class="top-seller-wrapper">
                <div class="thumbnail">
                  <a href="author.html">
                    <img src="/client/client-1.png" alt="Nft_Profile" />
                  </a>
                </div>
                <div class="top-seller-content">
                  <a href="author.html">
                    <h6 class="name">LAkiba</h6>
                  </a>
                  <span class="count-number">$652,000</span>
                </div>
              </div>
              <a class="over-link" href="author.html"></a>
            </div>
          </div>

          <div
            class="creator-single col-lg-3 col-md-4 col-sm-6"
            data-sal="slide-up"
            data-sal-delay="650"
            data-sal-duration="800"
          >
            <div class="top-seller-inner-one explore">
              <div class="top-seller-wrapper">
                <div class="thumbnail">
                  <a href="author.html">
                    <img src="/client/client-6.png" alt="Nft_Profile" />
                  </a>
                </div>
                <div class="top-seller-content">
                  <a href="author.html">
                    <h6 class="name">Murkis</h6>
                  </a>
                  <span class="count-number">$2500,000</span>
                </div>
              </div>
              <a class="over-link" href="author.html"></a>
            </div>
          </div>

          <div
            class="creator-single col-lg-3 col-md-4 col-sm-6"
            data-sal="slide-up"
            data-sal-delay="700"
            data-sal-duration="800"
          >
            <div class="top-seller-inner-one explore">
              <div class="top-seller-wrapper">
                <div class="thumbnail varified">
                  <a href="author.html">
                    <img src="/client/client-1.png" alt="Nft_Profile" />
                  </a>
                </div>
                <div class="top-seller-content">
                  <a href="author.html">
                    <h6 class="name">Mr.Faks</h6>
                  </a>
                  <span class="count-number">$5900,000</span>
                </div>
              </div>
              <a class="over-link" href="author.html"></a>
            </div>
          </div>

          <div
            class="creator-single col-lg-3 col-md-4 col-sm-6"
            data-sal="slide-up"
            data-sal-delay="750"
            data-sal-duration="800"
          >
            <div class="top-seller-inner-one explore">
              <div class="top-seller-wrapper">
                <div class="thumbnail">
                  <a href="author.html">
                    <img src="/client/client-9.png" alt="Nft_Profile" />
                  </a>
                </div>
                <div class="top-seller-content">
                  <a href="author.html">
                    <h6 class="name">Ranbir</h6>
                  </a>
                  <span class="count-number">$2500,000</span>
                </div>
              </div>
              <a class="over-link" href="author.html"></a>
            </div>
          </div>

          <div
            class="creator-single col-lg-3 col-md-4 col-sm-6"
            data-sal="slide-up"
            data-sal-delay="800"
            data-sal-duration="800"
          >
            <div class="top-seller-inner-one explore">
              <div class="top-seller-wrapper">
                <div class="thumbnail">
                  <a href="author.html">
                    <img src="/client/client-11.png" alt="Nft_Profile" />
                  </a>
                </div>
                <div class="top-seller-content">
                  <a href="author.html">
                    <h6 class="name">Dabvira</h6>
                  </a>
                  <span class="count-number">$26600,000</span>
                </div>
              </div>
              <a class="over-link" href="author.html"></a>
            </div>
          </div>

          <div
            class="creator-single col-lg-3 col-md-4 col-sm-6"
            data-sal="slide-up"
            data-sal-delay="850"
            data-sal-duration="800"
          >
            <div class="top-seller-inner-one explore">
              <div class="top-seller-wrapper">
                <div class="thumbnail varified">
                  <a href="author.html">
                    <img src="/client/client-5.png" alt="Nft_Profile" />
                  </a>
                </div>
                <div class="top-seller-content">
                  <a href="author.html">
                    <h6 class="name">Jaki SAh</h6>
                  </a>
                  <span class="count-number">$6500,000</span>
                </div>
              </div>
              <a class="over-link" href="author.html"></a>
            </div>
          </div>

          <div
            class="creator-single col-lg-3 col-md-4 col-sm-6"
            data-sal="slide-up"
            data-sal-delay="900"
            data-sal-duration="800"
          >
            <div class="top-seller-inner-one explore">
              <div class="top-seller-wrapper">
                <div class="thumbnail">
                  <a href="author.html">
                    <img src="/client/client-10.png" alt="Nft_Profile" />
                  </a>
                </div>
                <div class="top-seller-content">
                  <a href="author.html">
                    <h6 class="name">Torpedo</h6>
                  </a>
                  <span class="count-number">$8500,000</span>
                </div>
              </div>
              <a class="over-link" href="author.html"></a>
            </div>
          </div>
        </div>
        <div class="row">
          <div
            class="col-lg-12"
            data-sal="slide-up"
            data-sal-delay="950"
            data-sal-duration="800"
          >
            <nav
              class="pagination-wrapper"
              aria-label="Page navigation example"
            >
              <ul class="pagination">
                <li class="page-item">
                  <a class="page-link" href="#">
                    Previous
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link active" href="#">
                    1
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    2
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    3
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorOne;
