import React from "react";

const CreateOne = ({ title }) => {
  return (
    <div class="rn-breadcrumb-inner ptb--30">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 col-md-6 col-12">
            <h5 class="title text-center text-md-start">{title}</h5>
          </div>
          <div class="col-lg-6 col-md-6 col-12">
            <ul class="breadcrumb-list">
              <li class="item">
                <a href="index.html">Home</a>
              </li>
              <li class="separator">
                <i class="feather-chevron-right"></i>
              </li>
              <li class="item current">{title}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOne;
