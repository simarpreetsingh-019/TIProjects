import React from "react";

const AuthorFive = () => {
  return (
    <div
      class="rn-popup-modal report-modal-wrapper modal fade"
      id="reportModal"
      tabindex="-1"
      aria-hidden="true"
    >
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      >
        {/* <i data-feather="x"></i> */}
      </button>
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content report-content-wrapper">
          <div class="modal-header report-modal-header">
            <h5 class="modal-title">Why are you reporting?</h5>
          </div>
          <div class="modal-body">
            <p>
              Describe why you think this item should be removed from
              marketplace
            </p>
            <div class="report-form-box">
              <h6 class="title">Message</h6>
              <textarea name="message" placeholder="Write issues"></textarea>
              <div class="report-button">
                <button type="button" class="btn btn-primary mr--10 w-auto">
                  Report
                </button>
                <button
                  type="button"
                  class="btn btn-primary-alta w-auto"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorFive;
