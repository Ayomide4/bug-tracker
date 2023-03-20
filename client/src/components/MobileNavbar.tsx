import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

export default function MobileNavbar(props: any) {

  console.log(props.hidden, 'mobile')
  return (
    <div className="absolute top-0 right-0">
      <div
        onClick={props.handleClick}
        className={props.hidden ? "absolute hidden top-7 right-5 cursor-pointer md:hidden" : "absolute  top-7 right-5 cursor-pointer md:hidden"}
      >
        <GiHamburgerMenu size={30} />
      </div>
    </div>
  );
}
