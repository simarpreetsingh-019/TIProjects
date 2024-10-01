import React from "react";

const FourmTwo = () => {
  return (
    <div class="forum-top rn-section-gap bg-color--1">
      <div class="container">
        <div class="row g-5 align-items-center d-flex">
          <div class="col-lg-6 offset-lg-3">
            <div class="forum-search">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search Hear..."
                  aria-label="Recipient's username"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-primary-alta btn-outline-secondary"
                    type="button"
                  >
                    Search Hear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourmTwo;
