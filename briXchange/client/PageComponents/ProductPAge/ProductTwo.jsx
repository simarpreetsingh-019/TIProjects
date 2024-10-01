import React from "react";

const ProductTwo = () => {
  return (
    <div class="rn-product-area rn-section-gapTop">
      <div class="container">
        {/* <div class="row mb--50 align-items-center">
          <div class="col-lg-6 col-md-6 col-sm-6 col-12">
            <h3
              class="title mb--0"
              data-sal-delay="150"
              data-sal="slide-up"
              data-sal-duration="800"
            >
              Explore Product
            </h3>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-12 mt_mobile--15">
            <div
              class="view-more-btn text-start text-sm-end"
              data-sal-delay="150"
              data-sal="slide-up"
              data-sal-duration="800"
            >
              <button class="discover-filter-button discover-filter-activation btn btn-primary">
                Filter<i class="feather-filter"></i>
              </button>
            </div>
          </div>
        </div> */}

        <div class="default-exp-wrapper default-exp-expand">
          <div class="inner">
            <div class="filter-select-option">
              <label class="filter-leble">LIKES</label>
            </div>

            <div class="filter-select-option">
              <label class="filter-leble">Category</label>
            </div>

            <div class="filter-select-option">
              <label class="filter-leble">Collections</label>
            </div>

            <div class="filter-select-option">
              <label class="filter-leble">Sale type</label>
            </div>

            <div class="filter-select-option">
              <label class="filter-leble">Price Range</label>
              <div class="price_filter s-filter clear">
                <form>
                  <div class="slider__range--output">
                    <div class="price__output--wrap">
                      <div class="price--output">
                        <span>Price :</span>
                        <input type="text" id="amount" readonly />
                      </div>
                      <div class="price--filter">
                        <a class="btn btn-primary btn-small" href="#">
                          Filter
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div class="row g-5">
          <div
            data-sal="slide-up"
            data-sal-delay="150"
            data-sal-duration="800"
            class="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
          >
            <div class="product-style-one no-overlay">
              <div class="card-thumbnail">
                <a href="product-details.html">
                  <img src="/portfolio/portfolio-01.jpg" alt="NFT_portfolio" />
                </a>
              </div>
              <div class="product-share-wrapper">
                <div class="profile-share">
                  <a href="author.html" class="avatar" data-tooltip="Jone lee">
                    <img src="/client/client-1.png" alt="Nft_Profile" />
                  </a>
                  <a href="author.html" class="avatar" data-tooltip="Jone lee">
                    <img src="/client/client-2.png" alt="Nft_Profile" />
                  </a>
                  <a href="author.html" class="avatar" data-tooltip="Jone lee">
                    <img src="/client/client-3.png" alt="Nft_Profile" />
                  </a>
                  <a class="more-author-text" href="#">
                    9+ Place Bit.
                  </a>
                </div>
                <div class="share-btn share-btn-activation dropdown">
                  <button
                    class="icon"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <svg
                      viewBox="0 0 14 4"
                      fill="none"
                      width="16"
                      height="16"
                      class="sc-bdnxRM sc-hKFxyN hOiKLt"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3.5 2C3.5 2.82843 2.82843 3.5 2 3.5C1.17157 3.5 0.5 2.82843 0.5 2C0.5 1.17157 1.17157 0.5 2 0.5C2.82843 0.5 3.5 1.17157 3.5 2ZM8.5 2C8.5 2.82843 7.82843 3.5 7 3.5C6.17157 3.5 5.5 2.82843 5.5 2C5.5 1.17157 6.17157 0.5 7 0.5C7.82843 0.5 8.5 1.17157 8.5 2ZM11.999 3.5C12.8274 3.5 13.499 2.82843 13.499 2C13.499 1.17157 12.8274 0.5 11.999 0.5C11.1706 0.5 10.499 1.17157 10.499 2C10.499 2.82843 11.1706 3.5 11.999 3.5Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </button>

                  <div class="share-btn-setting dropdown-menu dropdown-menu-end">
                    <button
                      type="button"
                      class="btn-setting-text share-text"
                      data-bs-toggle="modal"
                      data-bs-target="#shareModal"
                    >
                      Share
                    </button>
                    <button
                      type="button"
                      class="btn-setting-text report-text"
                      data-bs-toggle="modal"
                      data-bs-target="#reportModal"
                    >
                      Report
                    </button>
                  </div>
                </div>
              </div>
              <a href="product-details.html">
                <span class="product-name">Preatent</span>
              </a>
              <span class="latest-bid">Highest bid 1/20</span>
              <div class="bid-react-area">
                <div class="last-bid">0.244wETH</div>
                <div class="react-area">
                  <svg
                    viewBox="0 0 17 16"
                    fill="none"
                    width="16"
                    height="16"
                    class="sc-bdnxRM sc-hKFxyN kBvkOu"
                  >
                    <path
                      d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z"
                      stroke="currentColor"
                      stroke-width="2"
                    ></path>
                  </svg>
                  <span class="number">322</span>
                </div>
              </div>
            </div>
          </div>

          <div
            data-sal="slide-up"
            data-sal-delay="200"
            data-sal-duration="800"
            class="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
          >
            <div class="product-style-one no-overlay">
              <div class="card-thumbnail">
                <a href="product-details.html">
                  <img src="/portfolio/portfolio-02.jpg" alt="NFT_portfolio" />
                </a>
              </div>
              <div class="product-share-wrapper">
                <div class="profile-share">
                  <a href="author.html" class="avatar" data-tooltip="mr. Davei">
                    <img src="/client/client-4.png" alt="Nft_Profile" />
                  </a>
                  <a href="author.html" class="avatar" data-tooltip="Mrs.Laumi">
                    <img src="/client/client-5.png" alt="Nft_Profile" />
                  </a>
                  <a href="author.html" class="avatar" data-tooltip="Shanon">
                    <img src="/client/client-6.png" alt="Nft_Profile" />
                  </a>
                  <a class="more-author-text" href="#">
                    11+ Place Bit.
                  </a>
                </div>
                <div class="share-btn share-btn-activation dropdown">
                  <button
                    class="icon"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <svg
                      viewBox="0 0 14 4"
                      fill="none"
                      width="16"
                      height="16"
                      class="sc-bdnxRM sc-hKFxyN hOiKLt"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3.5 2C3.5 2.82843 2.82843 3.5 2 3.5C1.17157 3.5 0.5 2.82843 0.5 2C0.5 1.17157 1.17157 0.5 2 0.5C2.82843 0.5 3.5 1.17157 3.5 2ZM8.5 2C8.5 2.82843 7.82843 3.5 7 3.5C6.17157 3.5 5.5 2.82843 5.5 2C5.5 1.17157 6.17157 0.5 7 0.5C7.82843 0.5 8.5 1.17157 8.5 2ZM11.999 3.5C12.8274 3.5 13.499 2.82843 13.499 2C13.499 1.17157 12.8274 0.5 11.999 0.5C11.1706 0.5 10.499 1.17157 10.499 2C10.499 2.82843 11.1706 3.5 11.999 3.5Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </button>

                  <div class="share-btn-setting dropdown-menu dropdown-menu-end">
                    <button
                      type="button"
                      class="btn-setting-text share-text"
                      data-bs-toggle="modal"
                      data-bs-target="#shareModal"
                    >
                      Share
                    </button>
                    <button
                      type="button"
                      class="btn-setting-text report-text"
                      data-bs-toggle="modal"
                      data-bs-target="#reportModal"
                    >
                      Report
                    </button>
                  </div>
                </div>
              </div>
              <a href="product-details.html">
                <span class="product-name">Diamond Dog</span>
              </a>
              <span class="latest-bid">Highest bid 5/11</span>
              <div class="bid-react-area">
                <div class="last-bid">0.892wETH</div>
                <div class="react-area">
                  <svg
                    viewBox="0 0 17 16"
                    fill="none"
                    width="16"
                    height="16"
                    class="sc-bdnxRM sc-hKFxyN kBvkOu"
                  >
                    <path
                      d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z"
                      stroke="currentColor"
                      stroke-width="2"
                    ></path>
                  </svg>
                  <span class="number">420</span>
                </div>
              </div>
            </div>
          </div>

          <div
            data-sal="slide-up"
            data-sal-delay="250"
            data-sal-duration="800"
            class="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
          >
            <div class="product-style-one no-overlay">
              <div class="card-thumbnail">
                <a href="product-details.html">
                  <img src="/portfolio/portfolio-03.jpg" alt="NFT_portfolio" />
                </a>
              </div>
              <div class="product-share-wrapper">
                <div class="profile-share">
                  <a href="author.html" class="avatar" data-tooltip="mr. Jone">
                    <img src="/client/client-7.png" alt="Nft_Profile" />
                  </a>
                  <a href="author.html" class="avatar" data-tooltip="Laumi">
                    <img src="/client/client-8.png" alt="Nft_Profile" />
                  </a>
                  <a href="author.html" class="avatar" data-tooltip="Tom">
                    <img src="/client/client-9.png" alt="Nft_Profile" />
                  </a>
                  <a class="more-author-text" href="#">
                    12+ Place Bit.
                  </a>
                </div>
                <div class="share-btn share-btn-activation dropdown">
                  <button
                    class="icon"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <svg
                      viewBox="0 0 14 4"
                      fill="none"
                      width="16"
                      height="16"
                      class="sc-bdnxRM sc-hKFxyN hOiKLt"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3.5 2C3.5 2.82843 2.82843 3.5 2 3.5C1.17157 3.5 0.5 2.82843 0.5 2C0.5 1.17157 1.17157 0.5 2 0.5C2.82843 0.5 3.5 1.17157 3.5 2ZM8.5 2C8.5 2.82843 7.82843 3.5 7 3.5C6.17157 3.5 5.5 2.82843 5.5 2C5.5 1.17157 6.17157 0.5 7 0.5C7.82843 0.5 8.5 1.17157 8.5 2ZM11.999 3.5C12.8274 3.5 13.499 2.82843 13.499 2C13.499 1.17157 12.8274 0.5 11.999 0.5C11.1706 0.5 10.499 1.17157 10.499 2C10.499 2.82843 11.1706 3.5 11.999 3.5Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </button>

                  <div class="share-btn-setting dropdown-menu dropdown-menu-end">
                    <button
                      type="button"
                      class="btn-setting-text share-text"
                      data-bs-toggle="modal"
                      data-bs-target="#shareModal"
                    >
                      Share
                    </button>
                    <button
                      type="button"
                      class="btn-setting-text report-text"
                      data-bs-toggle="modal"
                      data-bs-target="#reportModal"
                    >
                      Report
                    </button>
                  </div>
                </div>
              </div>
              <a href="product-details.html">
                <span class="product-name">OrBid6</span>
              </a>
              <span class="latest-bid">Highest bid 2/31</span>
              <div class="bid-react-area">
                <div class="last-bid">0.2128wETH</div>
                <div class="react-area">
                  <svg
                    viewBox="0 0 17 16"
                    fill="none"
                    width="16"
                    height="16"
                    class="sc-bdnxRM sc-hKFxyN kBvkOu"
                  >
                    <path
                      d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z"
                      stroke="currentColor"
                      stroke-width="2"
                    ></path>
                  </svg>
                  <span class="number">12</span>
                </div>
              </div>
            </div>
          </div>

          <div
            data-sal="slide-up"
            data-sal-delay="300"
            data-sal-duration="800"
            class="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
          >
            <div class="product-style-one no-overlay">
              <div class="card-thumbnail">
                <a href="product-details.html">
                  <img src="/portfolio/portfolio-04.jpg" alt="NFT_portfolio" />
                </a>
                <div class="countdown" data-date="2024-11-09">
                  <div class="countdown-container days">
                    <span class="countdown-value">87</span>
                    <span class="countdown-heading">D's</span>
                  </div>
                  <div class="countdown-container hours">
                    <span class="countdown-value">23</span>
                    <span class="countdown-heading">H's</span>
                  </div>
                  <div class="countdown-container minutes">
                    <span class="countdown-value">38</span>
                    <span class="countdown-heading">Min's</span>
                  </div>
                  <div class="countdown-container seconds">
                    <span class="countdown-value">27</span>
                    <span class="countdown-heading">Sec</span>
                  </div>
                </div>
              </div>

              <div class="product-share-wrapper">
                <div class="profile-share">
                  <a href="author.html" class="avatar" data-tooltip="mr. Davei">
                    <img src="/client/client-9.png" alt="Nft_Profile" />
                  </a>
                  <a href="author.html" class="avatar" data-tooltip="Mrs.Laumi">
                    <img src="/client/client-10.png" alt="Nft_Profile" />
                  </a>
                  <a href="author.html" class="avatar" data-tooltip="Shanon">
                    <img src="/client/client-11.png" alt="Nft_Profile" />
                  </a>
                  <a class="more-author-text" href="#">
                    13+ Place Bit.
                  </a>
                </div>
                <div class="share-btn share-btn-activation dropdown">
                  <button
                    class="icon"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <svg
                      viewBox="0 0 14 4"
                      fill="none"
                      width="16"
                      height="16"
                      class="sc-bdnxRM sc-hKFxyN hOiKLt"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3.5 2C3.5 2.82843 2.82843 3.5 2 3.5C1.17157 3.5 0.5 2.82843 0.5 2C0.5 1.17157 1.17157 0.5 2 0.5C2.82843 0.5 3.5 1.17157 3.5 2ZM8.5 2C8.5 2.82843 7.82843 3.5 7 3.5C6.17157 3.5 5.5 2.82843 5.5 2C5.5 1.17157 6.17157 0.5 7 0.5C7.82843 0.5 8.5 1.17157 8.5 2ZM11.999 3.5C12.8274 3.5 13.499 2.82843 13.499 2C13.499 1.17157 12.8274 0.5 11.999 0.5C11.1706 0.5 10.499 1.17157 10.499 2C10.499 2.82843 11.1706 3.5 11.999 3.5Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </button>

                  <div class="share-btn-setting dropdown-menu dropdown-menu-end">
                    <button
                      type="button"
                      class="btn-setting-text share-text"
                      data-bs-toggle="modal"
                      data-bs-target="#shareModal"
                    >
                      Share
                    </button>
                    <button
                      type="button"
                      class="btn-setting-text report-text"
                      data-bs-toggle="modal"
                      data-bs-target="#reportModal"
                    >
                      Report
                    </button>
                  </div>
                </div>
              </div>
              <a href="product-details.html">
                <span class="product-name">Morgan11</span>
              </a>
              <span class="latest-bid">Highest bid 3/16</span>
              <div class="bid-react-area">
                <div class="last-bid">0.265wETH</div>
                <div class="react-area">
                  <svg
                    viewBox="0 0 17 16"
                    fill="none"
                    width="16"
                    height="16"
                    class="sc-bdnxRM sc-hKFxyN kBvkOu"
                  >
                    <path
                      d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z"
                      stroke="currentColor"
                      stroke-width="2"
                    ></path>
                  </svg>
                  <span class="number">20</span>
                </div>
              </div>
            </div>
          </div>

          <div
            data-sal="slide-up"
            data-sal-delay="350"
            data-sal-duration="800"
            class="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
          >
            <div class="product-style-one no-overlay">
              <div class="card-thumbnail">
                <a href="product-details.html">
                  <img src="/portfolio/portfolio-05.jpg" alt="NFT_portfolio" />
                </a>
              </div>
              <div class="product-share-wrapper">
                <div class="profile-share">
                  <a href="author.html" class="avatar" data-tooltip="Terasa">
                    <img src="/client/client-8.png" alt="Nft_Profile" />
                  </a>
                  <a href="author.html" class="avatar" data-tooltip="Sakib">
                    <img src="/client/client-7.png" alt="Nft_Profile" />
                  </a>
                  <a href="author.html" class="avatar" data-tooltip="Miraj">
                    <img src="/client/client-3.png" alt="Nft_Profile" />
                  </a>
                  <a class="more-author-text" href="#">
                    15+ Place Bit.
                  </a>
                </div>
                <div class="share-btn share-btn-activation dropdown">
                  <button
                    class="icon"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <svg
                      viewBox="0 0 14 4"
                      fill="none"
                      width="16"
                      height="16"
                      class="sc-bdnxRM sc-hKFxyN hOiKLt"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3.5 2C3.5 2.82843 2.82843 3.5 2 3.5C1.17157 3.5 0.5 2.82843 0.5 2C0.5 1.17157 1.17157 0.5 2 0.5C2.82843 0.5 3.5 1.17157 3.5 2ZM8.5 2C8.5 2.82843 7.82843 3.5 7 3.5C6.17157 3.5 5.5 2.82843 5.5 2C5.5 1.17157 6.17157 0.5 7 0.5C7.82843 0.5 8.5 1.17157 8.5 2ZM11.999 3.5C12.8274 3.5 13.499 2.82843 13.499 2C13.499 1.17157 12.8274 0.5 11.999 0.5C11.1706 0.5 10.499 1.17157 10.499 2C10.499 2.82843 11.1706 3.5 11.999 3.5Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </button>

                  <div class="share-btn-setting dropdown-menu dropdown-menu-end">
                    <button
                      type="button"
                      class="btn-setting-text share-text"
                      data-bs-toggle="modal"
                      data-bs-target="#shareModal"
                    >
                      Share
                    </button>
                    <button
                      type="button"
                      class="btn-setting-text report-text"
                      data-bs-toggle="modal"
                      data-bs-target="#reportModal"
                    >
                      Report
                    </button>
                  </div>
                </div>
              </div>
              <a href="product-details.html">
                <span class="product-name">mAtal8</span>
              </a>
              <span class="latest-bid">Highest bid 6/50</span>
              <div class="bid-react-area">
                <div class="last-bid">0.244wETH</div>
                <div class="react-area">
                  <svg
                    viewBox="0 0 17 16"
                    fill="none"
                    width="16"
                    height="16"
                    class="sc-bdnxRM sc-hKFxyN kBvkOu"
                  >
                    <path
                      d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z"
                      stroke="currentColor"
                      stroke-width="2"
                    ></path>
                  </svg>
                  <span class="number">205</span>
                </div>
              </div>
            </div>
          </div>

          <div
            data-sal="slide-up"
            data-sal-delay="400"
            data-sal-duration="800"
            class="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
          >
            <div class="product-style-one no-overlay">
              <div class="card-thumbnail">
                <a href="product-details.html">
                  <img src="/portfolio/portfolio-06.jpg" alt="NFT_portfolio" />
                </a>
              </div>
              <div class="product-share-wrapper">
                <div class="profile-share">
                  <a href="author.html" class="avatar" data-tooltip="Moris">
                    <img src="/client/client-8.png" alt="Nft_Profile" />
                  </a>
                  <a href="author.html" class="avatar" data-tooltip="Jsufia">
                    <img src="/client/client-1.png" alt="Nft_Profile" />
                  </a>
                  <a href="author.html" class="avatar" data-tooltip="Mordan">
                    <img src="/client/client-2.png" alt="Nft_Profile" />
                  </a>
                  <a class="more-author-text" href="#">
                    9+ Place Bit.
                  </a>
                </div>
                <div class="share-btn share-btn-activation dropdown">
                  <button
                    class="icon"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <svg
                      viewBox="0 0 14 4"
                      fill="none"
                      width="16"
                      height="16"
                      class="sc-bdnxRM sc-hKFxyN hOiKLt"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3.5 2C3.5 2.82843 2.82843 3.5 2 3.5C1.17157 3.5 0.5 2.82843 0.5 2C0.5 1.17157 1.17157 0.5 2 0.5C2.82843 0.5 3.5 1.17157 3.5 2ZM8.5 2C8.5 2.82843 7.82843 3.5 7 3.5C6.17157 3.5 5.5 2.82843 5.5 2C5.5 1.17157 6.17157 0.5 7 0.5C7.82843 0.5 8.5 1.17157 8.5 2ZM11.999 3.5C12.8274 3.5 13.499 2.82843 13.499 2C13.499 1.17157 12.8274 0.5 11.999 0.5C11.1706 0.5 10.499 1.17157 10.499 2C10.499 2.82843 11.1706 3.5 11.999 3.5Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </button>

                  <div class="share-btn-setting dropdown-menu dropdown-menu-end">
                    <button
                      type="button"
                      class="btn-setting-text share-text"
                      data-bs-toggle="modal"
                      data-bs-target="#shareModal"
                    >
                      Share
                    </button>
                    <button
                      type="button"
                      class="btn-setting-text report-text"
                      data-bs-toggle="modal"
                      data-bs-target="#reportModal"
                    >
                      Report
                    </button>
                  </div>
                </div>
              </div>
              <a href="product-details.html">
                <span class="product-name">Platonum</span>
              </a>
              <span class="latest-bid">Highest bid 1/10</span>
              <div class="bid-react-area">
                <div class="last-bid">0.450wETH</div>
                <div class="react-area">
                  <svg
                    viewBox="0 0 17 16"
                    fill="none"
                    width="16"
                    height="16"
                    class="sc-bdnxRM sc-hKFxyN kBvkOu"
                  >
                    <path
                      d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z"
                      stroke="currentColor"
                      stroke-width="2"
                    ></path>
                  </svg>
                  <span class="number">65</span>
                </div>
              </div>
            </div>
          </div>

          <div
            data-sal="slide-up"
            data-sal-delay="450"
            data-sal-duration="800"
            class="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
          >
            <div class="product-style-one no-overlay">
              <div class="card-thumbnail">
                <a href="product-details.html">
                  <img src="/portfolio/portfolio-07.jpg" alt="NFT_portfolio" />
                </a>
                <div class="countdown" data-date="2024-12-09">
                  <div class="countdown-container days">
                    <span class="countdown-value">35</span>
                    <span class="countdown-heading">D's</span>
                  </div>
                  <div class="countdown-container hours">
                    <span class="countdown-value">42</span>
                    <span class="countdown-heading">H's</span>
                  </div>
                  <div class="countdown-container minutes">
                    <span class="countdown-value">10</span>
                    <span class="countdown-heading">Min's</span>
                  </div>
                  <div class="countdown-container seconds">
                    <span class="countdown-value">23</span>
                    <span class="countdown-heading">Sec</span>
                  </div>
                </div>
              </div>
              <div class="product-share-wrapper">
                <div class="profile-share">
                  <a href="author.html" class="avatar" data-tooltip="Thinm">
                    <img src="/client/client-6.png" alt="Nft_Profile" />
                  </a>
                  <a href="author.html" class="avatar" data-tooltip="Jubin">
                    <img src="/client/client-10.png" alt="Nft_Profile" />
                  </a>
                  <a href="author.html" class="avatar" data-tooltip="Nautial">
                    <img src="/client/client-1.png" alt="Nft_Profile" />
                  </a>
                  <a class="more-author-text" href="#">
                    14+ Place Bit.
                  </a>
                </div>
                <div class="share-btn share-btn-activation dropdown">
                  <button
                    class="icon"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <svg
                      viewBox="0 0 14 4"
                      fill="none"
                      width="16"
                      height="16"
                      class="sc-bdnxRM sc-hKFxyN hOiKLt"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3.5 2C3.5 2.82843 2.82843 3.5 2 3.5C1.17157 3.5 0.5 2.82843 0.5 2C0.5 1.17157 1.17157 0.5 2 0.5C2.82843 0.5 3.5 1.17157 3.5 2ZM8.5 2C8.5 2.82843 7.82843 3.5 7 3.5C6.17157 3.5 5.5 2.82843 5.5 2C5.5 1.17157 6.17157 0.5 7 0.5C7.82843 0.5 8.5 1.17157 8.5 2ZM11.999 3.5C12.8274 3.5 13.499 2.82843 13.499 2C13.499 1.17157 12.8274 0.5 11.999 0.5C11.1706 0.5 10.499 1.17157 10.499 2C10.499 2.82843 11.1706 3.5 11.999 3.5Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </button>

                  <div class="share-btn-setting dropdown-menu dropdown-menu-end">
                    <button
                      type="button"
                      class="btn-setting-text share-text"
                      data-bs-toggle="modal"
                      data-bs-target="#shareModal"
                    >
                      Share
                    </button>
                    <button
                      type="button"
                      class="btn-setting-text report-text"
                      data-bs-toggle="modal"
                      data-bs-target="#reportModal"
                    >
                      Report
                    </button>
                  </div>
                </div>
              </div>
              <a href="product-details.html">
                <span class="product-name">PlatOrgan</span>
              </a>
              <span class="latest-bid">Highest bid 2/22</span>
              <div class="bid-react-area">
                <div class="last-bid">0.311wETH</div>
                <div class="react-area">
                  <svg
                    viewBox="0 0 17 16"
                    fill="none"
                    width="16"
                    height="16"
                    class="sc-bdnxRM sc-hKFxyN kBvkOu"
                  >
                    <path
                      d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z"
                      stroke="currentColor"
                      stroke-width="2"
                    ></path>
                  </svg>
                  <span class="number">56</span>
                </div>
              </div>
            </div>
          </div>

          <div
            data-sal="slide-up"
            data-sal-delay="500"
            data-sal-duration="800"
            class="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
          >
            <div class="product-style-one no-overlay">
              <div class="card-thumbnail">
                <a href="product-details.html">
                  <img src="/portfolio/portfolio-05.jpg" alt="NFT_portfolio" />
                </a>
              </div>
              <div class="product-share-wrapper">
                <div class="profile-share">
                  <a href="author.html" class="avatar" data-tooltip="Tabriz">
                    <img src="/client/client-6.png" alt="Nft_Profile" />
                  </a>
                  <a href="author.html" class="avatar" data-tooltip="Juskin">
                    <img src="/client/client-8.png" alt="Nft_Profile" />
                  </a>
                  <a href="author.html" class="avatar" data-tooltip="Money">
                    <img src="/client/client-9.png" alt="Nft_Profile" />
                  </a>
                  <a class="more-author-text" href="#">
                    14+ Place Bit.
                  </a>
                </div>
                <div class="share-btn share-btn-activation dropdown">
                  <button
                    class="icon"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <svg
                      viewBox="0 0 14 4"
                      fill="none"
                      width="16"
                      height="16"
                      class="sc-bdnxRM sc-hKFxyN hOiKLt"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3.5 2C3.5 2.82843 2.82843 3.5 2 3.5C1.17157 3.5 0.5 2.82843 0.5 2C0.5 1.17157 1.17157 0.5 2 0.5C2.82843 0.5 3.5 1.17157 3.5 2ZM8.5 2C8.5 2.82843 7.82843 3.5 7 3.5C6.17157 3.5 5.5 2.82843 5.5 2C5.5 1.17157 6.17157 0.5 7 0.5C7.82843 0.5 8.5 1.17157 8.5 2ZM11.999 3.5C12.8274 3.5 13.499 2.82843 13.499 2C13.499 1.17157 12.8274 0.5 11.999 0.5C11.1706 0.5 10.499 1.17157 10.499 2C10.499 2.82843 11.1706 3.5 11.999 3.5Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </button>
                  <div class="share-btn-setting dropdown-menu dropdown-menu-end">
                    <button
                      type="button"
                      class="btn-setting-text share-text"
                      data-bs-toggle="modal"
                      data-bs-target="#shareModal"
                    >
                      Share
                    </button>
                    <button
                      type="button"
                      class="btn-setting-text report-text"
                      data-bs-toggle="modal"
                      data-bs-target="#reportModal"
                    >
                      Report
                    </button>
                  </div>
                </div>
              </div>
              <a href="product-details.html">
                <span class="product-name">Orgajis</span>
              </a>
              <span class="latest-bid">Highest bid 2/10</span>
              <div class="bid-react-area">
                <div class="last-bid">0.244wETH</div>
                <div class="react-area">
                  <svg
                    viewBox="0 0 17 16"
                    fill="none"
                    width="16"
                    height="16"
                    class="sc-bdnxRM sc-hKFxyN kBvkOu"
                  >
                    <path
                      d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z"
                      stroke="currentColor"
                      stroke-width="2"
                    ></path>
                  </svg>
                  <span class="number">89</span>
                </div>
              </div>
            </div>
          </div>

          <div
            data-sal="slide-up"
            data-sal-delay="550"
            data-sal-duration="800"
            class="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
          >
            <div class="product-style-one no-overlay">
              <div class="card-thumbnail">
                <a href="product-details.html">
                  <img src="/portfolio/portfolio-04.jpg" alt="NFT_portfolio" />
                </a>
              </div>
              <div class="product-share-wrapper">
                <div class="profile-share">
                  <a href="author.html" class="avatar" data-tooltip="Morokko">
                    <img src="/client/client-6.png" alt="Nft_Profile" />
                  </a>
                  <a href="author.html" class="avatar" data-tooltip="Levnon">
                    <img src="/client/client-1.png" alt="Nft_Profile" />
                  </a>
                  <a
                    href="author.html"
                    class="avatar"
                    data-tooltip="Trim sawdi"
                  >
                    <img src="/client/client-10.png" alt="Nft_Profile" />
                  </a>
                  <a class="more-author-text" href="#">
                    12+ Place Bit.
                  </a>
                </div>
                <div class="share-btn share-btn-activation dropdown">
                  <button
                    class="icon"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <svg
                      viewBox="0 0 14 4"
                      fill="none"
                      width="16"
                      height="16"
                      class="sc-bdnxRM sc-hKFxyN hOiKLt"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3.5 2C3.5 2.82843 2.82843 3.5 2 3.5C1.17157 3.5 0.5 2.82843 0.5 2C0.5 1.17157 1.17157 0.5 2 0.5C2.82843 0.5 3.5 1.17157 3.5 2ZM8.5 2C8.5 2.82843 7.82843 3.5 7 3.5C6.17157 3.5 5.5 2.82843 5.5 2C5.5 1.17157 6.17157 0.5 7 0.5C7.82843 0.5 8.5 1.17157 8.5 2ZM11.999 3.5C12.8274 3.5 13.499 2.82843 13.499 2C13.499 1.17157 12.8274 0.5 11.999 0.5C11.1706 0.5 10.499 1.17157 10.499 2C10.499 2.82843 11.1706 3.5 11.999 3.5Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </button>

                  <div class="share-btn-setting dropdown-menu dropdown-menu-end">
                    <button
                      type="button"
                      class="btn-setting-text share-text"
                      data-bs-toggle="modal"
                      data-bs-target="#shareModal"
                    >
                      Share
                    </button>
                    <button
                      type="button"
                      class="btn-setting-text report-text"
                      data-bs-toggle="modal"
                      data-bs-target="#reportModal"
                    >
                      Report
                    </button>
                  </div>
                </div>
              </div>
              <a href="product-details.html">
                <span class="product-name">#720</span>
              </a>
              <span class="latest-bid">Highest bid 1/1</span>
              <div class="bid-react-area">
                <div class="last-bid">0.244wETH</div>
                <div class="react-area">
                  <svg
                    viewBox="0 0 17 16"
                    fill="none"
                    width="16"
                    height="16"
                    class="sc-bdnxRM sc-hKFxyN kBvkOu"
                  >
                    <path
                      d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z"
                      stroke="currentColor"
                      stroke-width="2"
                    ></path>
                  </svg>
                  <span class="number">502</span>
                </div>
              </div>
            </div>
          </div>

          <div
            data-sal="slide-up"
            data-sal-delay="600"
            data-sal-duration="800"
            class="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
          >
            <div class="product-style-one no-overlay">
              <div class="card-thumbnail">
                <a href="product-details.html">
                  <img src="/portfolio/portfolio-04.jpg" alt="NFT_portfolio" />
                </a>
              </div>
              <div class="product-share-wrapper">
                <div class="profile-share">
                  <a
                    href="author.html"
                    class="avatar"
                    data-tooltip="Mark David"
                  >
                    <img src="/client/client-1.png" alt="Nft_Profile" />
                  </a>
                  <a
                    href="author.html"
                    class="avatar"
                    data-tooltip="Sunil Satti"
                  >
                    <img src="/client/client-8.png" alt="Nft_Profile" />
                  </a>
                  <a href="author.html" class="avatar" data-tooltip="Jone lee">
                    <img src="/client/client-7.png" alt="Nft_Profile" />
                  </a>
                  <a class="more-author-text" href="#">
                    5+ Place Bit.
                  </a>
                </div>
                <div class="share-btn share-btn-activation dropdown">
                  <button
                    class="icon"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <svg
                      viewBox="0 0 14 4"
                      fill="none"
                      width="16"
                      height="16"
                      class="sc-bdnxRM sc-hKFxyN hOiKLt"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3.5 2C3.5 2.82843 2.82843 3.5 2 3.5C1.17157 3.5 0.5 2.82843 0.5 2C0.5 1.17157 1.17157 0.5 2 0.5C2.82843 0.5 3.5 1.17157 3.5 2ZM8.5 2C8.5 2.82843 7.82843 3.5 7 3.5C6.17157 3.5 5.5 2.82843 5.5 2C5.5 1.17157 6.17157 0.5 7 0.5C7.82843 0.5 8.5 1.17157 8.5 2ZM11.999 3.5C12.8274 3.5 13.499 2.82843 13.499 2C13.499 1.17157 12.8274 0.5 11.999 0.5C11.1706 0.5 10.499 1.17157 10.499 2C10.499 2.82843 11.1706 3.5 11.999 3.5Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </button>

                  <div class="share-btn-setting dropdown-menu dropdown-menu-end">
                    <button
                      type="button"
                      class="btn-setting-text share-text"
                      data-bs-toggle="modal"
                      data-bs-target="#shareModal"
                    >
                      Share
                    </button>
                    <button
                      type="button"
                      class="btn-setting-text report-text"
                      data-bs-toggle="modal"
                      data-bs-target="#reportModal"
                    >
                      Report
                    </button>
                  </div>
                </div>
              </div>
              <a href="product-details.html">
                <span class="product-name">Orthogon#720</span>
              </a>
              <span class="latest-bid">Highest bid 1/1</span>
              <div class="bid-react-area">
                <div class="last-bid">0.244wETH</div>
                <div class="react-area">
                  <svg
                    viewBox="0 0 17 16"
                    fill="none"
                    width="16"
                    height="16"
                    class="sc-bdnxRM sc-hKFxyN kBvkOu"
                  >
                    <path
                      d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z"
                      stroke="currentColor"
                      stroke-width="2"
                    ></path>
                  </svg>
                  <span class="number">308</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTwo;
