import React from "react";
import Link from "next/link";

const Banner = () => {
  const category = [
    {
      name: "Housing",
      link: "/housing",
      worth: 535.566,
    },
    {
      name: "Office",
      link: "/office",
      worth: 6435.66,
    },
    {
      name: "Farmhouse",
      link: "/farmhouse",
      worth: 12445.566,
    },
    {
      name: "Rental",
      link: "/rental",
      worth: 34535.566,
    },
    {
      name: "Commercial",
      link: "/commercial",
      worth: 553435.566,
    },
    {
      name: "Country",
      link: "/country",
      worth: 1234535,
    },
  ];
  return (
    <div class="banner-three slider-style-3 pt--70">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-5">
            <div class="wrapper">
              <div class="slider ">
                <div class="slider-thumbnail thumbnail-overlay">
                  <a>
                    <img
                      class="w-100"
                      src="/portfolio/portfolio-11.jpg"
                      alt="NFT_portfolio"
                    />
                  </a>
                  <div class="read-wrapper">
                    <h5>
                      <a>@CryptoVentureInnovators</a>
                    </h5>
                    <span>Join Membership</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-7">
            <div class="row g-4">
              {category.map((el, i) => (
                <div key={i + 1} class="col-lg-4 col-md-6 col-sm-6 col-12">
                  <div class="slide-small-wrapper">
                    <div class="thumbnail thumbnail-overlay">
                      <Link
                        href={{
                          pathname: `/category${el.link}`,
                          query: { name: `${el.name}` },
                        }}
                      >
                        <img
                          class="w-100"
                          src={`/portfolio/portfolio-${i + 12}.jpg`}
                          alt="Nft_Profile"
                        />
                      </Link>
                    </div>
                    <div class="read-wrapper">
                      <h5 class="title">
                        <Link href="#">{el.name}</Link>
                      </h5>
                      <span>{el.worth} XTZ</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
