import React, { useContext } from "react";

import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { SideBarContext } from "./SideBarContext";

/**
 * Props
 */

interface completeNavBarProps {}

const CompleteNavBar: React.FC<completeNavBarProps> = (completeNavBarProps) => {
  //subscribe to the context
  const { state } = useContext(SideBarContext);
  let sideBar;
  if (state.sideDrawerState) {
    sideBar = <SideBar />;
  }

  return (
    <div style={{ zIndex: 2, height: 50 }}>
      <NavBar />
      {sideBar}
    </div>
  );
};

export default CompleteNavBar;
