import React from "react";

//INTERNAL IMPORT
import Style from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={Style.loaderBox}>
      <div class={Style.loader}>
        <div class={Style.bar1}></div>
        <div class={Style.bar2}></div>
        <div class={Style.bar3}></div>
        <div class={Style.bar4}></div>
        <div class={Style.bar5}></div>
        <div class={Style.bar6}></div>
        <div class={Style.bar7}></div>
        <div class={Style.bar8}></div>
        <div class={Style.bar9}></div>
        <div class={Style.bar10}></div>
        <div class={Style.bar11}></div>
        <div class={Style.bar12}></div>
      </div>
    </div>
  );
};

export default Loader;
