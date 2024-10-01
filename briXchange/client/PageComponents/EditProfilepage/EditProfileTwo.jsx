import React from "react";

const EditProfileTwo = () => {
  return (
    <div class="edit-profile-area rn-section-gapTop">
      <div class="container">
        <div class="row plr--70 padding-control-edit-wrapper pl_md--0 pr_md--0 pl_sm--0 pr_sm--0">
          <div class="col-12 d-flex justify-content-between mb--30 align-items-center">
            <h4 class="title-left">Edit Your Profile</h4>
            <a class="btn btn-primary ml--10">Preview</a>
          </div>
        </div>
        <div class="row plr--70 padding-control-edit-wrapper pl_md--0 pr_md--0 pl_sm--0 pr_sm--0">
          <div class="col-lg-3 col-md-3 col-sm-12">
            <nav class="left-nav rbt-sticky-top-adjust-five">
              <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <button
                  class="nav-link active"
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >
                  {/* <i class="feather-edit"></i> */}
                  Edit Profile Image
                </button>
                <button
                  class="nav-link"
                  id="nav-home-tabs"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-homes"
                  type="button"
                  role="tab"
                  aria-controls="nav-homes"
                  aria-selected="false"
                >
                  {/* <i class="feather-user"></i> */}
                  Personal Information
                </button>
                <button
                  class="nav-link"
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >
                  {" "}
                  {/* <i class="feather-unlock"></i> */}
                  Change Password
                </button>
                <button
                  class="nav-link"
                  id="nav-contact-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-contact"
                  type="button"
                  role="tab"
                  aria-controls="nav-contact"
                  aria-selected="false"
                >
                  {/* <i class="feather-bell"></i> */}
                  Notification Setting
                </button>
              </div>
            </nav>
          </div>
          <div class="col-lg-9 col-md-9 col-sm-12 mt_sm--30">
            <div
              class="tab-content tab-content-edit-wrapepr"
              id="nav-tabContent"
            >
              <div
                class="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <div class="nuron-information">
                  <div class="profile-change row g-5">
                    <div class="profile-left col-lg-4">
                      <div class="profile-image mb--30">
                        <h6 class="title">Change Your Profile Picture</h6>
                        <img
                          id="rbtinput1"
                          src="/profile/profile-01.jpg"
                          alt="Profile-NFT"
                        />
                      </div>
                      <div class="button-area">
                        <div class="brows-file-wrapper">
                          <input name="fatima" id="fatima" type="file" />

                          <label for="fatima" title="No File Choosen">
                            <span class="text-center color-white">
                              Upload Profile
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div class="profile-left right col-lg-8">
                      <div class="profile-image mb--30">
                        <h6 class="title">Change Your Cover Photo</h6>
                        <img
                          id="rbtinput2"
                          src="/profile/cover-04.png"
                          alt="Profile-NFT"
                        />
                      </div>
                      <div class="button-area">
                        <div class="brows-file-wrapper">
                          <input name="nipa" id="nipa" type="file" />

                          <label for="nipa" title="No File Choosen">
                            <span class="text-center color-white">
                              Upload Cover
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="tab-pane fade"
                id="nav-homes"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <div class="nuron-information">
                  <div class="profile-form-wrapper">
                    <div class="input-two-wrapper mb--15">
                      <div class="first-name half-wid">
                        <label for="contact-name" class="form-label">
                          First Name
                        </label>
                        <input
                          name="contact-name"
                          id="contact-name"
                          type="text"
                          value="Mr."
                        />
                      </div>
                      <div class="last-name half-wid">
                        <label for="contact-name-last" class="form-label">
                          Last Name
                        </label>
                        <input
                          name="contact-name"
                          id="contact-name-last"
                          type="text"
                          value="Sunayra"
                        />
                      </div>
                    </div>
                    <div class="email-area">
                      <label for="Email" class="form-label">
                        Edit Your Email
                      </label>
                      <input
                        name="email"
                        id="Email"
                        type="email"
                        value="example@gmail.com"
                      />
                    </div>
                  </div>

                  <div class="edit-bio-area mt--20">
                    <label for="Discription" class="form-label">
                      Edit Your Bio
                    </label>
                    <textarea id="Discription">
                      Hello, I am Alamin, A Front-end Developer...
                    </textarea>
                  </div>

                  <div class="input-two-wrapepr-prifile">
                    <div class="role-area mt--15">
                      <label for="Role" class="form-label mb--10">
                        Your Role
                      </label>
                      <input
                        name="Role"
                        id="Role"
                        type="text"
                        value="Front-end Developer"
                      />
                    </div>
                  </div>

                  <div class="input-two-wrapper mt--15">
                    <div class="half-wid currency"></div>
                    <div class="half-wid phone-number">
                      <label for="PhoneNumber" class="form-label">
                        Phone Number
                      </label>
                      <input
                        name="contact-name"
                        id="PhoneNumber"
                        type="text"
                        value="+880100000000"
                      />
                    </div>
                  </div>
                  <div class="input-two-wrapper mt--15">
                    <div class="half-wid currency"></div>
                    <div class="half-wid phone-number">
                      <label for="PhoneNumbers" class="form-label">
                        Address
                      </label>
                      <input
                        name="contact-name"
                        id="PhoneNumbers"
                        type="text"
                        value="USA Cidni"
                      />
                    </div>
                  </div>
                  <div class="button-area save-btn-edit">
                    <a
                      href="#"
                      class="btn btn-primary-alta mr--15"
                      onclick="customAlert.alert('Cancel Edit Profile?')"
                    >
                      Cancel
                    </a>
                    <a
                      href="#"
                      class="btn btn-primary"
                      onclick="customAlert.alert('Successfully Saved Your Profile?')"
                    >
                      Save
                    </a>
                  </div>
                </div>
              </div>

              <div
                class="tab-pane fade"
                id="nav-profile"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
              >
                <div class="nuron-information">
                  <div class="condition">
                    <h5 class="title">Create Your Password</h5>
                    <p class="condition">
                      Passwords are a critical part of information and network
                      security. Passwords serve to protect user accounts but a
                      poorly chosen password, if compromised, could put the
                      entire network at risk.
                    </p>
                    <hr />
                    <div class="email-area">
                      <label for="Email2" class="form-label">
                        Enter Email
                      </label>
                      <input name="email" id="Email2" type="email" value="" />
                    </div>
                  </div>
                  <div class="input-two-wrapper mt--15">
                    <div class="old-password half-wid">
                      <label for="oldPass" class="form-label">
                        Enter Old Password
                      </label>
                      <input name="pass" id="oldPass" type="password" />
                    </div>
                    <div class="new-password half-wid">
                      <label for="NewPass" class="form-label">
                        Create New Password
                      </label>
                      <input name="password" id="NewPass" type="password" />
                    </div>
                  </div>
                  <div class="email-area mt--15">
                    <label for="rePass" class="form-label">
                      Confirm Password
                    </label>
                    <input
                      name="Password"
                      id="rePass"
                      type="password"
                      value=""
                    />
                  </div>
                  <a
                    href="#"
                    class="btn btn-primary save-btn-edit"
                    onclick="customAlert.alert('Successfully Changed Password?')"
                  >
                    Save
                  </a>
                </div>
              </div>

              <div
                class="tab-pane fade "
                id="nav-contact"
                role="tabpanel"
                aria-labelledby="nav-contact-tab"
              >
                <div class="nuron-information">
                  <h5 class="title">Make Sure Your Notification setting </h5>
                  <p class="notice-disc">
                    Notification Center is where you can find app notifications
                    and Quick Settings—which give you quick access to commonly
                    used settings and apps. You can change your notification
                    settings at any time from the Settings app. Select Start ,
                    then select Settings
                  </p>
                  <hr />

                  <div class="notice-parent-wrapper d-flex">
                    <div class="notice-child-wrapper">
                      <div class="single-notice-setting">
                        <div class="input">
                          <input
                            type="checkbox"
                            id="themeSwitch"
                            name="theme-switch"
                            class="theme-switch__input"
                          />
                          <label for="themeSwitch" class="theme-switch__label">
                            <span></span>
                          </label>
                        </div>
                        <div class="content-text">
                          <p>Order Confirmation Notice</p>
                        </div>
                      </div>

                      <div class="single-notice-setting mt--15">
                        <div class="input">
                          <input
                            type="checkbox"
                            id="themeSwitchs"
                            name="theme-switch"
                            class="theme-switch__input"
                          />
                          <label for="themeSwitchs" class="theme-switch__label">
                            <span></span>
                          </label>
                        </div>
                        <div class="content-text">
                          <p>New Items Notification</p>
                        </div>
                      </div>

                      <div class="single-notice-setting mt--15">
                        <div class="input">
                          <input
                            type="checkbox"
                            id="OrderNotice"
                            name="theme-switch"
                            class="theme-switch__input"
                          />
                          <label for="OrderNotice" class="theme-switch__label">
                            <span></span>
                          </label>
                        </div>
                        <div class="content-text">
                          <p>New Bid Notification</p>
                        </div>
                      </div>

                      <div class="single-notice-setting mt--15">
                        <div class="input">
                          <input
                            type="checkbox"
                            id="newPAy"
                            name="theme-switch"
                            class="theme-switch__input"
                          />
                          <label for="newPAy" class="theme-switch__label">
                            <span></span>
                          </label>
                        </div>
                        <div class="content-text">
                          <p>Payment Card Notification</p>
                        </div>
                      </div>

                      <div class="single-notice-setting mt--15">
                        <div class="input">
                          <input
                            type="checkbox"
                            id="EndBid"
                            name="theme-switch"
                            class="theme-switch__input"
                          />
                          <label for="EndBid" class="theme-switch__label">
                            <span></span>
                          </label>
                        </div>
                        <div class="content-text">
                          <p>Ending Bid Notification Before 5 min</p>
                        </div>
                      </div>

                      <div class="single-notice-setting mt--15">
                        <div class="input">
                          <input
                            type="checkbox"
                            id="Approve"
                            name="theme-switch"
                            class="theme-switch__input"
                          />
                          <label for="Approve" class="theme-switch__label">
                            <span></span>
                          </label>
                        </div>
                        <div class="content-text">
                          <p>Notification for approving product</p>
                        </div>
                      </div>
                    </div>

                    <div class="notice-child-wrapper"></div>
                  </div>

                  <a
                    href="#"
                    class="btn btn-primary save-btn-edit"
                    onclick="customAlert.alert('Successfully saved Your Notificationm setting')"
                  >
                    Save
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileTwo;
