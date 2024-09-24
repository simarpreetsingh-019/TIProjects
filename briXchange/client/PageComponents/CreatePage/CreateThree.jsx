import React from "react";

const CreateThree = ({ data, handleSubmit }) => {
  return (
    <div
      class="rn-popup-modal upload-modal-wrapper modal fade"
      id="collectionModal"
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
        <div class="modal-content share-wrapper">
          <div class="modal-body">
            <a href="product-details.html" class="rn-collection-inner-one">
              <div class="collection-wrapper">
                <div class="collection-big-thumbnail">
                  <img src={data.images} alt="Nft_Profile" />
                </div>
                <div class="collenction-small-thumbnail">
                  <img
                    src="/collection/collection-sm-01.jpg"
                    alt="Nft_Profile"
                  />
                  <img
                    src="/collection/collection-sm-02.jpg"
                    alt="Nft_Profile"
                  />
                  <img
                    src="/collection/collection-sm-03.jpg"
                    alt="Nft_Profile"
                  />
                </div>
                <div class="collection-profile">
                  <img src="/client/client-15.png" alt="Nft_Profile" />
                </div>
                <div class="collection-deg">
                  <h6 class="title">{data.propertyTitle}</h6>
                  <span class="items">{data.price} XTZ</span>
                </div>
                <div class="col-lg-12"></div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateThree;
