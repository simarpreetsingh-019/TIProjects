import React from "react";
import Link from "next/link";
import { Loader } from "../Components";

const AuthorThree = ({ properties, author }) => {
  return (
    <div class="rn-authore-profile-area">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="tab-wrapper-one">
              <nav class="tab-button-one">
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                  <button
                    class="nav-link"
                    id="nav-home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-home"
                    type="button"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="false"
                  >
                    All Properties
                  </button>
                  <button
                    class="nav-link active"
                    id="nav-profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-profile"
                    type="button"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="true"
                  >
                    Owned
                  </button>
                  {/* <button
                    class="nav-link"
                    id="nav-contact-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-contact"
                    type="button"
                    role="tab"
                    aria-controls="nav-contact"
                    aria-selected="false"
                  >
                    Created
                  </button>
                  <button
                    class="nav-link"
                    id="nav-liked-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-liked"
                    type="button"
                    role="tab"
                    aria-controls="nav-liked"
                    aria-selected="false"
                  >
                    Liked
                  </button> */}
                </div>
              </nav>
            </div>
          </div>
        </div>

        <div class="tab-content rn-bid-content" id="nav-tabContent">
          <div
            class="tab-pane row g-5 d-flex fade"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
          >
            {properties?.length == 0 ? (
              <Loader />
            ) : (
              <>
                {properties?.map((property, i) => (
                  <div class="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
                    <div class="product-style-one no-overlay with-placeBid">
                      <div class="card-thumbnail">
                        <Link href={`/detail?property=${property.productID}`}>
                          <img src={property.image} alt="NFT_portfolio" />
                        </Link>
                      </div>
                      <div class="product-share-wrapper">
                        <div class="profile-share">
                          {property.reviewers.map((el, i) => (
                            <a
                              class="avatar"
                              data-tooltip={`${el.slice(0, 15)}..`}
                            >
                              <img
                                src={`/client/client-${i + 1}.png`}
                                alt="Nft_Profile"
                              />
                            </a>
                          ))}
                          {property.reviewers.length !== 0 && (
                            <a class="more-author-text" href="#">
                              Interested Users
                            </a>
                          )}
                        </div>
                      </div>
                      <a href="#">
                        <span class="product-name">
                          {property.title.length >= 25
                            ? `${property.title.slice(0, 22)}...`
                            : property.title}
                        </span>
                      </a>
                      <span class="latest-bid">
                        Category: {property.category}
                      </span>
                      <div class="bid-react-area">
                        <div class="last-bid">{property.price} XTZ</div>
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
                          <span class="number">
                            {property.reviewers.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div
            class="tab-pane row g-5 d-flex fade show active"
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
          >
            {author?.length == 0 ? (
              <Loader />
            ) : (
              <>
                {author?.map((property, i) => (
                  <div class="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
                    <div class="product-style-one no-overlay with-placeBid">
                      <div class="card-thumbnail">
                        <a href={`/detail?property=${property.productID}`}>
                          <img src={property.image} alt="NFT_portfolio" />
                        </a>
                        <a
                          href={`/update?property=${property.productID}`}
                          class="btn btn-primary"
                        >
                          Update
                        </a>
                      </div>
                      <div class="product-share-wrapper">
                        <div class="profile-share">
                          {property.reviewers.map((el, i) => (
                            <a
                              class="avatar"
                              data-tooltip={`${el.slice(0, 15)}..`}
                            >
                              <img
                                src={`/client/client-${i + 1}.png`}
                                alt="Nft_Profile"
                              />
                            </a>
                          ))}
                          {property.reviewers.length !== 0 && (
                            <a class="more-author-text" href="#">
                              Interested Users
                            </a>
                          )}
                        </div>
                      </div>
                      <a href="#">
                        <span class="product-name">
                          {property.title.length >= 25
                            ? `${property.title.slice(0, 22)}...`
                            : property.title}
                        </span>
                      </a>
                      <span class="latest-bid">
                        Category: {property.category}
                      </span>
                      <div class="bid-react-area">
                        <div class="last-bid">{property.price} XTZ</div>
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
                          <span class="number">
                            {property.reviewers.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {/* <div
            class="tab-pane row g-5 d-flex fade"
            id="nav-contact"
            role="tabpanel"
            aria-labelledby="nav-contact-tab"
          >
            <div class="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
              <div class="product-style-one no-overlay with-placeBid">
                <div class="card-thumbnail">
                  <a href="product-details.html">
                    <img
                      src="/portfolio/portfolio-06.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                  <a href="product-details.html" class="btn btn-primary">
                    Place Bid
                  </a>
                </div>
                <div class="product-share-wrapper">
                  <div class="profile-share">
                    <a
                      href="author.html"
                      class="avatar"
                      data-tooltip="Sadikur Ali"
                    >
                      <img src="/client/client-2.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="Ali">
                      <img src="/client/client-3.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="Sadikur">
                      <img src="/client/client-4.png" alt="Nft_Profile" />
                    </a>
                    <a class="more-author-text" href="#">
                      9+ Place Bit.
                    </a>
                  </div>
                  <div class="share-btn share-btn-activation dropdown">
                    <button
                      class="icon"
                      type="button"
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
                  <span class="product-name">BadBo66</span>
                </a>
                <span class="latest-bid">Highest bid 6/20</span>
                <div class="bid-react-area">
                  <div class="last-bid">0.234wETH</div>
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

            <div class="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
              <div class="product-style-one no-overlay with-placeBid">
                <div class="card-thumbnail">
                  <a href="product-details.html">
                    <img
                      src="/portfolio/portfolio-04.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                  <a href="product-details.html" class="btn btn-primary">
                    Place Bid
                  </a>
                </div>
                <div class="product-share-wrapper">
                  <div class="profile-share">
                    <a
                      href="author.html"
                      class="avatar"
                      data-tooltip="Updane Jack"
                    >
                      <img src="/client/client-1.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="Jack">
                      <img src="/client/client-10.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="Updane">
                      <img src="/client/client-11.png" alt="Nft_Profile" />
                    </a>
                    <a class="more-author-text" href="#">
                      10+ Place Bit.
                    </a>
                  </div>
                  <div class="share-btn share-btn-activation dropdown">
                    <button
                      class="icon"
                      type="button"
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

            <div class="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
              <div class="product-style-one no-overlay with-placeBid">
                <div class="card-thumbnail">
                  <a href="product-details.html">
                    <img
                      src="/portfolio/portfolio-06.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                  <a href="product-details.html" class="btn btn-primary">
                    Place Bid
                  </a>
                </div>
                <div class="product-share-wrapper">
                  <div class="profile-share">
                    <a
                      href="author.html"
                      class="avatar"
                      data-tooltip="Rabbanin"
                    >
                      <img src="/client/client-1.png" alt="Nft_Profile" />
                    </a>
                    <a
                      href="author.html"
                      class="avatar"
                      data-tooltip="Sadik Rabbanin"
                    >
                      <img src="/client/client-10.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="Sadika">
                      <img src="/client/client-11.png" alt="Nft_Profile" />
                    </a>
                    <a class="more-author-text" href="#">
                      10+ Place Bit.
                    </a>
                  </div>
                  <div class="share-btn share-btn-activation dropdown">
                    <button
                      class="icon"
                      type="button"
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
                  <span class="product-name">ModaL6</span>
                </a>
                <span class="latest-bid">Highest bid 2/20</span>
                <div class="bid-react-area">
                  <div class="last-bid">0.344wETH</div>
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

            <div class="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
              <div class="product-style-one no-overlay with-placeBid">
                <div class="card-thumbnail">
                  <a href="product-details.html">
                    <img
                      src="/portfolio/portfolio-04.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                  <a href="product-details.html" class="btn btn-primary">
                    Place Bid
                  </a>
                </div>
                <div class="product-share-wrapper">
                  <div class="profile-share">
                    <a href="author.html" class="avatar" data-tooltip="Saladin">
                      <img src="/client/client-1.png" alt="Nft_Profile" />
                    </a>
                    <a
                      href="author.html"
                      class="avatar"
                      data-tooltip="David Saladin"
                    >
                      <img src="/client/client-10.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="David">
                      <img src="/client/client-9.png" alt="Nft_Profile" />
                    </a>
                    <a class="more-author-text" href="#">
                      21+ Place Bit.
                    </a>
                  </div>
                  <div class="share-btn share-btn-activation dropdown">
                    <button
                      class="icon"
                      type="button"
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
                  <span class="product-name">Tabs38</span>
                </a>
                <span class="latest-bid">Highest bid 3/30</span>
                <div class="bid-react-area">
                  <div class="last-bid">0.544wETH</div>
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
                    <span class="number">422</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
              <div class="product-style-one no-overlay with-placeBid">
                <div class="card-thumbnail">
                  <a href="product-details.html">
                    <img
                      src="/portfolio/portfolio-05.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                  <a href="product-details.html" class="btn btn-primary">
                    Place Bid
                  </a>
                </div>
                <div class="product-share-wrapper">
                  <div class="profile-share">
                    <a
                      href="author.html"
                      class="avatar"
                      data-tooltip="Jope Baiden"
                    >
                      <img src="/client/client-10.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="Jope">
                      <img src="/client/client-11.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="Baiden">
                      <img src="/client/client-9.png" alt="Nft_Profile" />
                    </a>
                    <a class="more-author-text" href="#">
                      12+ Place Bit.
                    </a>
                  </div>
                  <div class="share-btn share-btn-activation dropdown">
                    <button
                      class="icon"
                      type="button"
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
                  <span class="product-name">TopBad</span>
                </a>
                <span class="latest-bid">Highest bid 6/20</span>
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
                    <span class="number">124</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
              <div class="product-style-one no-overlay with-placeBid">
                <div class="card-thumbnail">
                  <a href="product-details.html">
                    <img
                      src="/portfolio/portfolio-06.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                  <a href="product-details.html" class="btn btn-primary">
                    Place Bid
                  </a>
                </div>
                <div class="product-share-wrapper">
                  <div class="profile-share">
                    <a
                      href="author.html"
                      class="avatar"
                      data-tooltip="Tawhid Sabir"
                    >
                      <img src="/client/client-1.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="Tawhid">
                      <img src="/client/client-10.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="Sabir">
                      <img src="/client/client-11.png" alt="Nft_Profile" />
                    </a>
                    <a class="more-author-text" href="#">
                      5+ Place Bit.
                    </a>
                  </div>
                  <div class="share-btn share-btn-activation dropdown">
                    <button
                      class="icon"
                      type="button"
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
                  <span class="product-name">NameStroam</span>
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
                    <span class="number">532</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
              <div class="product-style-one no-overlay with-placeBid">
                <div class="card-thumbnail">
                  <a href="product-details.html">
                    <img
                      src="/portfolio/portfolio-07.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                  <a href="product-details.html" class="btn btn-primary">
                    Place Bid
                  </a>
                </div>
                <div class="product-share-wrapper">
                  <div class="profile-share">
                    <a
                      href="author.html"
                      class="avatar"
                      data-tooltip="Total Mars"
                    >
                      <img src="/client/client-6.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="Total">
                      <img src="/client/client-5.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="Mars">
                      <img src="/client/client-10.png" alt="Nft_Profile" />
                    </a>
                    <a class="more-author-text" href="#">
                      9+ Place Bit.
                    </a>
                  </div>
                  <div class="share-btn share-btn-activation dropdown">
                    <button
                      class="icon"
                      type="button"
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
                  <span class="product-name">Scourd</span>
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

            <div class="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
              <div class="product-style-one no-overlay with-placeBid">
                <div class="card-thumbnail">
                  <a href="product-details.html">
                    <img
                      src="/portfolio/portfolio-05.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                  <a href="product-details.html" class="btn btn-primary">
                    Place Bid
                  </a>
                </div>
                <div class="product-share-wrapper">
                  <div class="profile-share">
                    <a
                      href="author.html"
                      class="avatar"
                      data-tooltip="David Worner"
                    >
                      <img src="/client/client-1.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="Worner">
                      <img src="/client/client-10.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="David">
                      <img src="/client/client-11.png" alt="Nft_Profile" />
                    </a>
                    <a class="more-author-text" href="#">
                      16+ Place Bit.
                    </a>
                  </div>
                  <div class="share-btn share-btn-activation dropdown">
                    <button
                      class="icon"
                      type="button"
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
                  <span class="product-name">Resord</span>
                </a>
                <span class="latest-bid">Highest bid 1/20</span>
                <div class="bid-react-area">
                  <div class="last-bid">0.264wETH</div>
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
                    <span class="number">622</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
              <div class="product-style-one no-overlay with-placeBid">
                <div class="card-thumbnail">
                  <a href="product-details.html">
                    <img
                      src="/portfolio/portfolio-03.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                  <a href="product-details.html" class="btn btn-primary">
                    Place Bid
                  </a>
                </div>
                <div class="product-share-wrapper">
                  <div class="profile-share">
                    <a
                      href="author.html"
                      class="avatar"
                      data-tooltip="Sobuj Shaikh"
                    >
                      <img src="/client/client-10.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="Sobuj">
                      <img src="/client/client-11.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="Shaikh">
                      <img src="/client/client-1.png" alt="Nft_Profile" />
                    </a>
                    <a class="more-author-text" href="#">
                      22+ Place Bit.
                    </a>
                  </div>
                  <div class="share-btn share-btn-activation dropdown">
                    <button
                      class="icon"
                      type="button"
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
                  <span class="product-name">Jackpot</span>
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

            <div class="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
              <div class="product-style-one no-overlay with-placeBid">
                <div class="card-thumbnail">
                  <a href="product-details.html">
                    <img
                      src="/portfolio/portfolio-03.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                  <a href="product-details.html" class="btn btn-primary">
                    Place Bid
                  </a>
                </div>
                <div class="product-share-wrapper">
                  <div class="profile-share">
                    <a
                      href="author.html"
                      class="avatar"
                      data-tooltip="MArk Jone"
                    >
                      <img src="/client/client-4.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="MArk">
                      <img src="/client/client-5.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="Jone">
                      <img src="/client/client-8.png" alt="Nft_Profile" />
                    </a>
                    <a class="more-author-text" href="#">
                      13+ Place Bit.
                    </a>
                  </div>
                  <div class="share-btn share-btn-activation dropdown">
                    <button
                      class="icon"
                      type="button"
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
                  <span class="product-name">Xtreames</span>
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
                    <span class="number">922</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="tab-pane row g-5 d-flex fade"
            id="nav-liked"
            role="tabpanel"
            aria-labelledby="nav-contact-tab"
          >
            <div class="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
              <div class="product-style-one no-overlay with-placeBid">
                <div class="card-thumbnail">
                  <a href="product-details.html">
                    <img
                      src="/portfolio/portfolio-06.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                  <a href="product-details.html" class="btn btn-primary">
                    Place Bid
                  </a>
                </div>
                <div class="product-share-wrapper">
                  <div class="profile-share">
                    <a
                      href="author.html"
                      class="avatar"
                      data-tooltip="Tawhid Sabir"
                    >
                      <img src="/client/client-1.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="Tawhid">
                      <img src="/client/client-10.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="Sabir">
                      <img src="/client/client-11.png" alt="Nft_Profile" />
                    </a>
                    <a class="more-author-text" href="#">
                      5+ Place Bit.
                    </a>
                  </div>
                  <div class="share-btn share-btn-activation dropdown">
                    <button
                      class="icon"
                      type="button"
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
                  <span class="product-name">NameStroam</span>
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
                    <span class="number">532</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
              <div class="product-style-one no-overlay with-placeBid">
                <div class="card-thumbnail">
                  <a href="product-details.html">
                    <img
                      src="/portfolio/portfolio-07.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                  <a href="product-details.html" class="btn btn-primary">
                    Place Bid
                  </a>
                </div>
                <div class="product-share-wrapper">
                  <div class="profile-share">
                    <a
                      href="author.html"
                      class="avatar"
                      data-tooltip="Total Mars"
                    >
                      <img src="/client/client-6.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="Total">
                      <img src="/client/client-5.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="Mars">
                      <img src="/client/client-10.png" alt="Nft_Profile" />
                    </a>
                    <a class="more-author-text" href="#">
                      9+ Place Bit.
                    </a>
                  </div>
                  <div class="share-btn share-btn-activation dropdown">
                    <button
                      class="icon"
                      type="button"
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
                  <span class="product-name">Scourd</span>
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

            <div class="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
              <div class="product-style-one no-overlay with-placeBid">
                <div class="card-thumbnail">
                  <a href="product-details.html">
                    <img
                      src="/portfolio/portfolio-05.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                  <a href="product-details.html" class="btn btn-primary">
                    Place Bid
                  </a>
                </div>
                <div class="product-share-wrapper">
                  <div class="profile-share">
                    <a
                      href="author.html"
                      class="avatar"
                      data-tooltip="David Worner"
                    >
                      <img src="/client/client-1.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="Worner">
                      <img src="/client/client-10.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="David">
                      <img src="/client/client-11.png" alt="Nft_Profile" />
                    </a>
                    <a class="more-author-text" href="#">
                      16+ Place Bit.
                    </a>
                  </div>
                  <div class="share-btn share-btn-activation dropdown">
                    <button
                      class="icon"
                      type="button"
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
                  <span class="product-name">Resord</span>
                </a>
                <span class="latest-bid">Highest bid 1/20</span>
                <div class="bid-react-area">
                  <div class="last-bid">0.264wETH</div>
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
                    <span class="number">622</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
              <div class="product-style-one no-overlay with-placeBid">
                <div class="card-thumbnail">
                  <a href="product-details.html">
                    <img
                      src="/portfolio/portfolio-07.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                  <a href="product-details.html" class="btn btn-primary">
                    Place Bid
                  </a>
                </div>
                <div class="product-share-wrapper">
                  <div class="profile-share">
                    <a
                      href="author.html"
                      class="avatar"
                      data-tooltip="Sobuj Shaikh"
                    >
                      <img src="/client/client-10.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="Sobuj">
                      <img src="/client/client-11.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="Shaikh">
                      <img src="/client/client-1.png" alt="Nft_Profile" />
                    </a>
                    <a class="more-author-text" href="#">
                      22+ Place Bit.
                    </a>
                  </div>
                  <div class="share-btn share-btn-activation dropdown">
                    <button
                      class="icon"
                      type="button"
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
                  <span class="product-name">Jackpot</span>
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

            <div class="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
              <div class="product-style-one no-overlay with-placeBid">
                <div class="card-thumbnail">
                  <a href="product-details.html">
                    <img
                      src="/portfolio/portfolio-08.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                  <a href="product-details.html" class="btn btn-primary">
                    Place Bid
                  </a>
                </div>
                <div class="product-share-wrapper">
                  <div class="profile-share">
                    <a
                      href="author.html"
                      class="avatar"
                      data-tooltip="MArk Jone"
                    >
                      <img src="/client/client-4.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="MArk">
                      <img src="/client/client-5.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="Jone">
                      <img src="/client/client-8.png" alt="Nft_Profile" />
                    </a>
                    <a class="more-author-text" href="#">
                      13+ Place Bit.
                    </a>
                  </div>
                  <div class="share-btn share-btn-activation dropdown">
                    <button
                      class="icon"
                      type="button"
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
                  <span class="product-name">Xtreames</span>
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
                    <span class="number">922</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
              <div class="product-style-one no-overlay with-placeBid">
                <div class="card-thumbnail">
                  <a href="product-details.html">
                    <img
                      src="/portfolio/portfolio-06.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                  <a href="product-details.html" class="btn btn-primary">
                    Place Bid
                  </a>
                </div>
                <div class="product-share-wrapper">
                  <div class="profile-share">
                    <a
                      href="author.html"
                      class="avatar"
                      data-tooltip="Tawhid Sabir"
                    >
                      <img src="/client/client-1.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="Tawhid">
                      <img src="/client/client-10.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="Sabir">
                      <img src="/client/client-11.png" alt="Nft_Profile" />
                    </a>
                    <a class="more-author-text" href="#">
                      5+ Place Bit.
                    </a>
                  </div>
                  <div class="share-btn share-btn-activation dropdown">
                    <button
                      class="icon"
                      type="button"
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
                  <span class="product-name">NameStroam</span>
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
                    <span class="number">532</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
              <div class="product-style-one no-overlay with-placeBid">
                <div class="card-thumbnail">
                  <a href="product-details.html">
                    <img
                      src="/portfolio/portfolio-07.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                  <a href="product-details.html" class="btn btn-primary">
                    Place Bid
                  </a>
                </div>
                <div class="product-share-wrapper">
                  <div class="profile-share">
                    <a
                      href="author.html"
                      class="avatar"
                      data-tooltip="Total Mars"
                    >
                      <img src="/client/client-6.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="Total">
                      <img src="/client/client-5.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="Mars">
                      <img src="/client/client-10.png" alt="Nft_Profile" />
                    </a>
                    <a class="more-author-text" href="#">
                      9+ Place Bit.
                    </a>
                  </div>
                  <div class="share-btn share-btn-activation dropdown">
                    <button
                      class="icon"
                      type="button"
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
                  <span class="product-name">Scourd</span>
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

            <div class="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
              <div class="product-style-one no-overlay with-placeBid">
                <div class="card-thumbnail">
                  <a href="product-details.html">
                    <img
                      src="/portfolio/portfolio-05.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                  <a href="product-details.html" class="btn btn-primary">
                    Place Bid
                  </a>
                </div>
                <div class="product-share-wrapper">
                  <div class="profile-share">
                    <a
                      href="author.html"
                      class="avatar"
                      data-tooltip="David Worner"
                    >
                      <img src="/client/client-1.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="Worner">
                      <img src="/client/client-10.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="David">
                      <img src="/client/client-11.png" alt="Nft_Profile" />
                    </a>
                    <a class="more-author-text" href="#">
                      16+ Place Bit.
                    </a>
                  </div>
                  <div class="share-btn share-btn-activation dropdown">
                    <button
                      class="icon"
                      type="button"
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
                  <span class="product-name">Resord</span>
                </a>
                <span class="latest-bid">Highest bid 1/20</span>
                <div class="bid-react-area">
                  <div class="last-bid">0.264wETH</div>
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
                    <span class="number">622</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
              <div class="product-style-one no-overlay with-placeBid">
                <div class="card-thumbnail">
                  <a href="product-details.html">
                    <img
                      src="/portfolio/portfolio-01.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                  <a href="product-details.html" class="btn btn-primary">
                    Place Bid
                  </a>
                </div>
                <div class="product-share-wrapper">
                  <div class="profile-share">
                    <a
                      href="author.html"
                      class="avatar"
                      data-tooltip="Sobuj Shaikh"
                    >
                      <img src="/client/client-10.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="Sobuj">
                      <img src="/client/client-11.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="Shaikh">
                      <img src="/client/client-1.png" alt="Nft_Profile" />
                    </a>
                    <a class="more-author-text" href="#">
                      22+ Place Bit.
                    </a>
                  </div>
                  <div class="share-btn share-btn-activation dropdown">
                    <button
                      class="icon"
                      type="button"
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
                  <span class="product-name">Jackpot</span>
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

            <div class="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
              <div class="product-style-one no-overlay with-placeBid">
                <div class="card-thumbnail">
                  <a href="product-details.html">
                    <img
                      src="/portfolio/portfolio-01.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                  <a href="product-details.html" class="btn btn-primary">
                    Place Bid
                  </a>
                </div>
                <div class="product-share-wrapper">
                  <div class="profile-share">
                    <a
                      href="author.html"
                      class="avatar"
                      data-tooltip="MArk Jone"
                    >
                      <img src="/client/client-4.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="MArk">
                      <img src="/client/client-5.png" alt="Nft_Profile" />
                    </a>
                    <a href="author.html" class="avatar" data-tooltip="Jone">
                      <img src="/client/client-8.png" alt="Nft_Profile" />
                    </a>
                    <a class="more-author-text" href="#">
                      13+ Place Bit.
                    </a>
                  </div>
                  <div class="share-btn share-btn-activation dropdown">
                    <button
                      class="icon"
                      type="button"
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
                  <span class="product-name">Xtreames</span>
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
                    <span class="number">922</span>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AuthorThree;
