import React from "react";
import image3 from "../assets/images/image3.png";
import { useState } from "react";

function UserProfile({ onLogout }) {
  return (
    <div className="flex justify-between whitespace-nowrap max-md:mt-10">
      <div className="flex gap-[10px] items-center">
        <img
          loading="lazy"
          src={image3}
          className="object-contain shrink-0 w-12 aspect-square"
          alt="user-icon"
        />
      </div>
    </div>
  );
}

export default UserProfile;
