import React, { useContext } from "react";

import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import DehazeIcon from "@material-ui/icons/Dehaze";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import { SideBarContext, IAction } from "./SideBarContext";
import SourceDropDown from "./SourceDropDown";
import RunButton from "./RunButton";
import PhoneRunButton from "./PhoneRunButton";

import "./NavBar.css";
import Grid from "@material-ui/core/Grid";

/**
 * States
 */

let sourceOptions: string[] = ["Source1", "Source2", "Source3", "Source4"];
let libraryOptions: string[] = [
  "NONE",
  "RUNES",
  "CURVES",
  "SOUNDS",
  "BINARYTREES",
  "PIX&FLIX",
  "MACHINELEARNING",
  "All"
];

const NavBar: React.FC = () => {
  const { state, dispatch } = useContext(SideBarContext);
  const toggleButton = (): IAction =>
    dispatch({
      type: "BUTTON_PRESSED"
    });
    

  return (
    <header className="navBar">
      <nav className="navBar_navigation">
        <Grid container justify="space-between" spacing={2}>
          <Grid item>
            <div className="toggleButton">
              <IconButton onClick={toggleButton} edge="start">
                <DehazeIcon
                  style={{
                    color: "white",
                    height: "45px",
                    display: state.sideDrawerState ? "none" : "flex"
                  }}
                />
                <ClearIcon
                  style={{
                    color: "white",
                    height: "45px",
                    alignSelf: "flex-start",
                    display: state.sideDrawerState ? "flex" : "none"
                  }}
                />
              </IconButton>
            </div>
          </Grid>
          <Grid item>
            <div className="listPlusLogo">
              <div>
                <img src="/images/logo.png" className="navBar_logo" />
              </div>

              <div className="navBar_navigation-items">
                <ul>
                  <li>
                    <SourceDropDown
                      dropDownType="CHANGE_SOURCE"
                      options={sourceOptions}
                      sideBarString={"source"}
                    />
                  </li>
                  <li>
                    <SourceDropDown
                      dropDownType="CHANGE_LIBRARY"
                      options={libraryOptions}
                      sideBarString={"library"}
                    />
                  </li>
                  <li>
                    <a href="/">Session</a>
                  </li>
                  <li>
                    <a href="/">Share</a>
                  </li>

                  <li>
                    <a>
                      <RunButton />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Grid>
          <Grid item>
            <div className="playButton">
              <PhoneRunButton />
            </div>
          </Grid>
        </Grid>
      </nav>
    </header>
  );
};

export default NavBar;
