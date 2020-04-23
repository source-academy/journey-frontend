import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Store, IGlobalAction } from "../reducers/Store";

type Props = {
  dropDownType: string;
  options: string[];
  sideBarString: string;
};

const DropDownTemplate: React.FC<Props> = ({
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
    } else {
      return dispatch({
        type: dropDownType,
        time: input,
      });
    }
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuList = (
    <div>
      {options.map((text) => (
        <MenuItem
          style={{ fontSize: "12px" }}
          button
          onClick={() => {
            handleClose();
            return change(text);
          }}
        >
          {text}
        </MenuItem>
      ))}
    </div>
  );

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ padding: 0, color: "white" }}
      >
        {str === "source" ? globalState.source : globalState.time}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {menuList}
      </Menu>
    </div>
  );
};

export default DropDownTemplate;
