import React from "react";
import Link from "next/link";
import { Loader } from "../../PageComponents/Components";
const Collection = ({ category, isLoading }) => {
  console.log(category);
  return (
    <div class="rn-collection-area rn-section-gapTop">
      {isLoading ? (
        <Loader />
      ) : (
        <div class="container">
          <div class="row g-5">
            {category?.map((el, i) => (
              <div
                data-sal=""
                data-sal-delay="150"
                data-sal-duration="800"
                class="col-lg-4 col-xl-3 col-md-6 col-sm-6 col-12"
              >
                <a
                  href={`/detail?property=${el.productID}`}
                  class="rn-collection-inner-one"
                >
                  <div class="collection-wrapper">
                    <div class="collection-big-thumbnail">
                      <img src={el.image} alt="Nft_Profile" />
                    </div>
                    <div class="collenction-small-thumbnail">
                      {[1, 2, 3].map((el, i) => (
                        <img
                          src={`/collection/collection-sm-0${i + 1}.jpg`}
                          alt="Nft_Profile"
                        />
                      ))}
                    </div>
                    <div class="collection-profile">
                      <img src={`/client/client-15.png`} alt="Nft_Profile" />
                    </div>
                    <div class="collection-deg">
                      <h6 class="title">{el.title}</h6>
                      <span class="items">{el.price} XTZ</span>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
          <div class="row">
            <div
              class="col-lg-12"
              data-sal=""
              data-sal-delay="550"
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
      )}
    </div>
  );
};

export default Collection;
