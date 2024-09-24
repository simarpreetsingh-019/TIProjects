import React from "react";

const AuthorTwo = ({ address, author }) => {
  return (
    <div class="rn-author-area mb--30 mt_dec--120">
      <div class="container">
        <div class="row padding-tb-50 align-items-center d-flex">
          <div class="col-lg-12">
            <div class="author-wrapper">
              <div class="author-inner">
                <div class="user-thumbnail">
                  <img src="/profile/profile-01.jpg" alt="" />
                </div>
                <div class="rn-author-info-content">
                  <h4 class="title">{address?.slice(0, 20)}...</h4>
                  <a href="#" class="social-follw">
                    {/* <i data-feather="twitter"></i> */}
                    <span class="user-name">it0bsession</span>
                  </a>
                  <div class="follow-area">
                    <div class="follow followers">
                      <span>
                        186k{" "}
                        <a href="#" class="color-body">
                          followers
                        </a>
                      </span>
                    </div>
                    <div class="follow following">
                      <span>
                        {author?.length}{" "}
                        <a href="#" class="color-body">
                          Owned Property
                        </a>
                      </span>
                    </div>
                  </div>
                  <div class="author-button-area">
                    <span class="btn at-follw follow-button">Follow</span>
                    <span
                      class="btn at-follw share-button"
                      data-bs-toggle="modal"
                      data-bs-target="#shareModal"
                    ></span>
                    <div class="count at-follw">
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
                            class="btn-setting-text report-text"
                            data-bs-toggle="modal"
                            data-bs-target="#reportModal"
                          >
                            Report
                          </button>
                          <button
                            type="button"
                            class="btn-setting-text report-text"
                          >
                            Claim Owenership
                          </button>
                        </div>
                      </div>
                    </div>
                    <a
                      href="edit-profile.html"
                      class="btn at-follw follow-button edit-btn"
                    ></a>
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

export default AuthorTwo;
