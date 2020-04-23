import React from "react";

import "./index.css";
import SideBarDropDownTemplate from "./SideBarDropDownTemplate";
/**
 * Props
 */

interface sideBarProps {}
let sourceOptions: string[] = ["Source1", "Source2", "Source3", "Source4"];
let libraryOptions: string[] = [
  "NONE",
  "RUNES",
  "CURVES",
  "SOUNDS",
  "BINARYTREES",
  "PIX&FLIX",
  "MACHINELEARNING, ALL",
];
let languageOptions: string[] = [
  "Source",
  "C++",
  "Java",
  "Typescript",
  "Javascript",
  "Python",
];

const SideBar: React.FC<sideBarProps> = (sideBarProps) => {
  return (
    <div>
      <nav className="side-drawer">
        <ul>
          <li>
            <SideBarDropDownTemplate
              dropDownType="CHANGE_SOURCE"
              options={sourceOptions}
              sideBarString={"source"}
            />
          </li>
          <li>
            <SideBarDropDownTemplate
              dropDownType="CHANGE_LIBRARY"
              options={libraryOptions}
              sideBarString={"library"}
            />
          </li>
          <li>
            <SideBarDropDownTemplate
              dropDownType="CHANGE_LANGUAGE"
              options={languageOptions}
              sideBarString={"language"}
            />
          </li>
          <li>
            <a href="/">TextBook</a>
          </li>
          <li>
            <a href="/">Run</a>
          </li>
          <li>
            <a href="/">Share</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
