import React from "react";

const ContactFour = () => {
  return (
    <div class="rn-contact-map-area position-relative rn-section-gapTop">
      <div class="container">
        <div class="row g-5">
          <div
            class="col-12"
            data-sal="slide-up"
            data-sal-delay="150"
            data-sal-duration="800"
          >
            <iframe
              src="https://maps.google.com/maps?q=Avadi%2C+Chennai&t=k&z=13&ie=UTF8&iwloc=&output=embed"
              height="550"
              // style="border:0;"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFour;
