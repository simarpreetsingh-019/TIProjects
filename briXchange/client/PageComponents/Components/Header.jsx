import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useStateContext } from "../../context";

const Header = () => {
  const { currentAccount, connectWallet, userBlance } = useStateContext();

  return (
    <>
      <header className="rn-header haeder-default header--sticky">
        <div className="container">
          <div className="header-inner">
            <div className="header-left">
              <div className="logo-thumbnail logo-custom-css">
                <Link className="logo-light" href="/">
                  <img src="/logo/logo-white.png" alt="nft-logo" />
                </Link>
                <Link className="logo-dark" href="/">
                  <img src="/logo/logo-dark.png" alt="nft-logo" />
                </Link>
              </div>
              <div className="mainmenu-wrapper">
                <nav id="sideNav" className="mainmenu-nav d-none d-xl-block">
                  <ul className="mainmenu">
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li>
                      <Link href="https://bri-x-chang.vercel.app/swap">BTC to WBTC</Link>
                    </li>
                    <li>
                      <Link href="https://bri-x-chang.vercel.app/reverse">WBTC to BTC</Link>
                    </li>
                    <li>
                      <a>Explore</a>
                      <ul className="submenu">
                        <li>
                          <Link href="/active">
                            Activity<i className="feather-fast-forward"></i>
                          </Link>
                        </li>
                        <li>
                          <a href="/creator">
                            Creator
                            <i className="feather-fast-forward"></i>
                          </a>
                        </li>
                        <li>
                          <a className="live-expo" href="/explor">
                            Explore
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a>Other Pages</a>
                      <ul className="submenu">
                        <li>
                          <Link href="/ranking">
                            Ranking<i className="feather-fast-forward"></i>
                          </Link>
                        </li>
                        <li>
                          <a href="/product">
                            Product
                            <i className="feather-fast-forward"></i>
                          </a>
                        </li>
                        <li>
                          <a className="live-expo" href="/privacy">
                            Privacy
                          </a>
                        </li>
                        <li>
                          <a className="live-expo" href="/news">
                            News
                          </a>
                        </li>
                        <li>
                          <a className="live-expo" href="/fourm">
                            Fourm
                          </a>
                        </li>
                        <li>
                          <a className="live-expo" href="/connect">
                            Connect
                          </a>
                        </li>
                        <li>
                          <a className="live-expo" href="/collection">
                            Collection
                          </a>
                        </li>
                        <li>
                          <a className="live-expo" href="/blog">
                            Blog
                          </a>
                        </li>
                        <li>
                          <a className="live-expo" href="/blogdetail">
                            Blogdetail
                          </a>
                        </li>
                        <li>
                          <a className="live-expo" href="/error">
                            404
                          </a>
                        </li>
                        {/* <li>
                          <a className="live-expo" href="/forget">
                            Forget
                          </a>
                        </li>
                        <li>
                          <a className="live-expo" href="/login">
                            Login
                          </a>
                        </li>
                        <li>
                          <a className="live-expo" href="/signup">
                            Signup
                          </a>
                        </li> */}
                      </ul>
                    </li>
                    <li>
                      <Link href="/about">About</Link>
                    </li>
                    <li>
                      <Link href="/contact">Contact</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="header-right">
              <div className="setting-option d-none d-lg-block">
                <form className="search-form-wrapper" action="#">
                  <input
                    type="search"
                    placeholder="Search Here"
                    aria-label="Search"
                  />
                  <div className="search-icon">
                    <button>
                      <i className="feather-search"></i>
                    </button>
                  </div>
                </form>
              </div>
              <div className="setting-option rn-icon-list d-block d-lg-none">
                <div className="icon-box search-mobile-icon">
                  <button>
                    <i className="feather-search"></i>
                  </button>
                </div>
                <form id="header-search-1" className="large-mobile-blog-search">
                  <div className="rn-search-mobile form-group">
                    <button type="submit" className="search-button">
                      <i className="feather-search"></i>
                    </button>
                    <input type="text" placeholder="Search ..." />
                  </div>
                </form>
              </div>

              {/* //CONNECT WALLET */}

              {currentAccount ? (
                ""
              ) : (
                <div
                  className="setting-option header-btn rbt-site-header"
                  id="rbt-site-header"
                >
                  <div className="icon-box">
                    <button
                      onClick={() => connectWallet()}
                      className="btn btn-primary-alta btn-small"
                    >
                      Wallet connect
                    </button>
                  </div>
                </div>
              )}

              {/* //END CONNECT WALLET */}
              <div className="setting-option rn-icon-list notification-badge">
                <div className="icon-box">
                  <a href={`/active`}>
                    <i className="feather-bell"></i>
                    <span className="badge">6</span>
                  </a>
                </div>
              </div>

              {currentAccount ? (
                <div>
                  <div className="setting-option rn-icon-list user-account">
                    <div className="icon-box">
                      <a>
                        <img src="/icons/boy-avater.png" alt="Images" />
                      </a>
                      <div className="rn-dropdown">
                        <div className="rn-inner-top">
                          <h4 className="title">
                            <a href="/author">
                              {currentAccount.slice(0, 15)}...
                            </a>
                          </h4>
                          <span>
                            <a href="#">Set Display Name</a>
                          </span>
                        </div>
                        <div className="rn-product-inner">
                          <ul className="product-list">
                            <li className="single-product-list">
                              <div className="thumbnail">
                                <a href="product-details.html">
                                  <img
                                    src="/portfolio/portfolio-07.jpg"
                                    alt="Nft Product Images"
                                  />
                                </a>
                              </div>
                              <div className="content">
                                <h6 className="title">
                                  <Link className="live-expo" href="/author">
                                    Balance
                                  </Link>
                                </h6>
                                <span className="price">
                                  {userBlance?.slice(0, 6)} XTZ
                                </span>
                              </div>
                              <div className="button"></div>
                            </li>
                            <li className="single-product-list">
                              <div className="thumbnail">
                                <Link className="live-expo" href="/author">
                                  <img
                                    src="/portfolio/portfolio-01.jpg"
                                    alt="Nft Product Images"
                                  />
                                </Link>
                              </div>
                              <div className="content">
                                <h6 className="title">
                                  <Link className="live-expo" href="/author">
                                    Profile
                                  </Link>
                                </h6>
                                <span className="price">Active One</span>
                              </div>
                              <div className="button"></div>
                            </li>
                            <li className="single-product-list">
                              <div className="thumbnail">
                                <Link className="live-expo" href="/create">
                                  <img
                                    src="/portfolio/portfolio-04.jpg"
                                    alt="Nft Product Images"
                                  />
                                </Link>
                              </div>
                              <div className="content">
                                <h6 className="title">
                                  <Link className="live-expo" href="/create">
                                    Create
                                  </Link>
                                </h6>
                                <span className="price">Property</span>
                              </div>
                              <div className="button"></div>
                            </li>
                          </ul>
                        </div>
                        <div className="add-fund-button mt--20 pb--20">
                          <a className="btn btn-primary-alta w-100" href="/connect">
                            Add Your More Funds
                          </a>
                        </div>
                        <ul className="list-inner">
                          <li>
                            <a href="/author">My Profile</a>
                          </li>
                          <li>
                            <a href="/edit-profile">Edit Profile</a>
                          </li>
                          <li>
                            <a href="/connect">Manage funds</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className="setting-option mobile-menu-bar d-block d-xl-none">
                <div className="hamberger">
                  <button className="hamberger-button">
                    <i className="feather-menu"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className="popup-mobile-menu">
        <div className="inner">
          <div className="header-top">
            <div className="logo logo-custom-css">
              <a className="logo-light" href="index.html">
                <img src="/logo/logo-white.png" alt="nft-logo" />
              </a>
              <a className="logo-dark" href="index.html">
                <img src="/logo/logo-dark.png" alt="nft-logo" />
              </a>
            </div>
            <div className="close-menu">
              <button className="close-button">
                <i className="feather-x"></i>
              </button>
            </div>
          </div>
          <nav>
            <ul className="mainmenu">
              <li>
                <a className="nav-link its_new" href="/">
                  Home
                </a>
              </li>
              <li>
                <a className="nav-link its_new" href="/swap">
                  BTC to WBTC
                </a>
              </li>
              <li>
                <a className="nav-link its_new" href="/swap">
                  WBTC to BTC
                </a>
              </li>
              <li>
                <a className="nav-link its_new" href="/explor">
                  Explore
                </a>
              </li>
              <li>
                <a className="nav-link its_new" href="/">
                  Pages
                </a>
              </li>
              <li>
                <a className="nav-link its_new" href="/blog">
                  Blog
                </a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
              
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;