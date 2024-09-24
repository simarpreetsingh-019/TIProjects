import React from "react";
import { Loader } from "../Components";

const DetailSeven = ({
  property,
  setUpdatePropertyPrice,
  updatePropertyPrice,
  updatepropertyPrice,
  updatePriceLoading,
}) => {
  return (
    <div
      class="rn-popup-modal report-modal-wrapper modal fade"
      id="reportModal"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content report-content-wrapper">
          <div class="modal-header report-modal-header">
            <h5 class="modal-title">Update Property Price</h5>
          </div>
          <div class="modal-body">
            <p>
              Hey {property?.owner.slice(0, 15)}... , Kindly update your
              property price
            </p>
            <div class="report-form-box">
              <h6 class="title">Price</h6>
              <textarea
                name="message"
                placeholder={`Old Price: ${property?.price} XTZ`}
                onChange={(e) =>
                  setUpdatePropertyPrice({
                    ...updatePropertyPrice,
                    price: e.target.value,
                  })
                }
              ></textarea>
              <div class="report-button">
                <button
                  onClick={() => updatepropertyPrice()}
                  type="button"
                  class="btn btn-primary mr--10 w-auto"
                >
                  {updatePriceLoading ? <Loader /> : "Update Price"}
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

export default DetailSeven;
