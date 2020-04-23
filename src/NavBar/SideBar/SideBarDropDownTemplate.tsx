import React, { useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import ListItemText from "@material-ui/core/ListItemText";

import { Store, IGlobalAction } from "../../reducers/Store";

const useStyles = makeStyles({
  list: {
    width: 250,
    height: 700,
    backgroundColor: "#000000",
    fontFamily: "sans-serif",
  },
  fullList: {
    width: "auto",
  },
});

type Anchor = "top";

type Props = {
  dropDownType: string;
  options: string[];
  sideBarString: string;
};

const SideBarDropDownTemplate: React.FC<Props> = ({
  dropDownType,
  options,
  sideBarString,
}) => {
  const { globalState, dispatch } = useContext(Store);

  const str = sideBarString;
  const change = (input: string): IGlobalAction => {
    if (str === "source") {
      return dispatch({
        type: dropDownType,
        source: input,
      });
    } else if (str === "library") {
      return dispatch({
        type: dropDownType,
        library: input,
      });
    } else {
      return dispatch({
        type: dropDownType,
        language: input,
      });
    }
  };

  //drop down
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
  });
  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {options.map((text) => (
          <ListItem button key={text} onClick={() => change(text)}>
            <ListItemText primary={text} style={{ color: "white" }} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {(["top"] as Anchor[]).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            onClick={toggleDrawer(anchor, true)}
            style={{ color: "white" }}
          >
            {str === "source"
              ? globalState.source
              : str === "library"
              ? globalState.library
              : globalState.language}
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default SideBarDropDownTemplate;
