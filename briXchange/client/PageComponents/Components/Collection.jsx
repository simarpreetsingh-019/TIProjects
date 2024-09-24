import React from "react";
import Link from "next/link";

const Collection = ({ housing, rental, farmhouse, office }) => {
  const topCollection = [
    {
      name: "Housing",
      link: "/housing",
      item: housing,
    },
    {
      name: "Office",
      link: "/office",
      item: office,
    },
    {
      name: "Farmhouse",
      link: "/farmhouse",
      item: farmhouse,
    },
    {
      name: "Rental",
      link: "/rental",
      item: rental,
    },
  ];
  return (
    <div class="rn-collection-area rn-section-gapTop">
      <div class="container">
        <div class="row mb--50 align-items-center">
          <div class="col-lg-6 col-md-6 col-sm-6 col-12">
            <h3
              class="title mb--0"
              data-sal-delay="150"
              data-sal="slide-up"
              data-sal-duration="800"
            >
              Top Collection
            </h3>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-12 mt_mobile--15">
            <div
              class="view-more-btn text-start text-sm-end"
              data-sal-delay="150"
              data-sal="slide-up"
              data-sal-duration="800"
            >
              <a class="btn-transparent" href="#">
                VIEW ALL
              </a>
            </div>
          </div>
        </div>

        <div class="row g-5">
          {topCollection.map((collection, i) => (
            <div
              key={i + 1}
              data-sal="slide-up"
              data-sal-delay="150"
              data-sal-duration="800"
              class="col-lg-4 col-xl-3 col-md-6 col-sm-6 col-12"
            >
              <Link
                href={{
                  pathname: `/category${collection.link}`,
                  query: { name: `${collection.name}` },
                }}
                class="rn-collection-inner-one"
              >
                <div class="collection-wrapper">
                  <div class="collection-big-thumbnail">
                    <img
                      src={`/portfolio/portfolio-${i + 15}.jpg`}
                      alt="Nft_Profile"
                    />
                  </div>
                  <div class="collenction-small-thumbnail">
                    <img
                      src={`/portfolio/portfolio-${i + 16}.jpg`}
                      alt="Nft_Profile"
                    />
                    <img
                      src={`/portfolio/portfolio-${i + 17}.jpg`}
                      alt="Nft_Profile"
                    />
                    <img
                      src={`/portfolio/portfolio-${i + 11}.jpg`}
                      alt="Nft_Profile"
                    />
                  </div>
                  <div class="collection-profile">
                    <img
                      src={`/client/client-${i + 1}.png`}
                      alt="Nft_Profile"
                    />
                  </div>
                  <div class="collection-deg">
                    <h6 class="title">{collection.name}</h6>
                    <span class="items">{collection.item} Items</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
