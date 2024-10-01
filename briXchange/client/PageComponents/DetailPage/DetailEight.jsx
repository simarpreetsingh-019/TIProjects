import React from "react";
import { Loader } from "../Components";
const DetailEight = ({
  createReview,
  handleFormFieldChange,
  commentLoading,
}) => {
  return (
    <div
      class="rn-popup-modal placebid-modal-wrapper modal fade"
      id="placebidModal"
      tabindex="-1"
      aria-hidden="true"
    >
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Give Review</h3>
          </div>
          <div class="modal-body">
            <p>Kindly Provide your review for a better user Experience</p>
            <div class="placebid-form-box">
              <h5 class="title">Your Comment</h5>
              <div class="bid-content">
                <div class="bid-content-top">
                  <div class="bid-content-left">
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="5"
                      onChange={(e) => handleFormFieldChange("comment", e)}
                    ></textarea>
                  </div>
                </div>

                <div class="bid-content-mid">
                  <span>
                    Your feed back will help user of the property to provide
                    better service
                  </span>
                </div>
              </div>
              <div class="bit-continue-button">
                <button
                  onClick={() => createReview()}
                  class="btn btn-primary w-100"
                >
                  {commentLoading ? <Loader /> : "Add Review"}
                </button>
                <button
                  type="button"
                  class="btn btn-primary-alta mt--10"
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

export default DetailEight;
