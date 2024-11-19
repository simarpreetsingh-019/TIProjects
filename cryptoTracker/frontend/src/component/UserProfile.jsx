// import React from 'react';

import { useState } from "react";

function UserProfile ({onLogout})
{

  return (
    <div className="flex justify-between whitespace-nowrap max-md:mt-10"  >
    <div className="flex gap-[10px] items-center" >
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5c5b5033678c83173f3e2e5685372332ea71c484967e9438720ecc1ba656a6ca?placeholderIfAbsent=true&apiKey=9825bd02a58246fc9d930bec7baef96a"
        className="object-contain shrink-0 w-12 aspect-square"
        alt="user-icon"

      />
    </div>


  </div>

  );
}

export default UserProfile;
