import React, { useContext } from "react";
import { Store, IGlobalAction } from "../reducers/Store"
import IconButton from "@material-ui/core/IconButton";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import Link from "@material-ui/core/Link";

import Runner from "./../library_function/Runner";
import "./NavBar.css";

/**
 * States
 */

const RunButton: React.FC = () => {
  const { globalState, dispatch } = useContext(Store);
  const handleRun = (): IGlobalAction => {
    const newComponent: React.ReactElement = (
      <Runner code={globalState.playgroundEditorValue} />
    );
    return dispatch({
      type: "RUN",
      runComponent: newComponent
    });
  };
  return (
    <Link href="#repl">
      <IconButton onClick={handleRun}>
        <DirectionsRunIcon
          style={{
            color: "white",
            height: "45px"
          }}
        />
      </IconButton>
    </Link>
  );
};

export default RunButton;
