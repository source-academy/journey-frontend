import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import DeveloperModeIcon from "@material-ui/icons/DeveloperMode";
import TextsmsIcon from "@material-ui/icons/Textsms";
import PhoneRunButton from "./PhoneRunButton";

interface completeNavBarProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      top: "auto",
      bottom: 0,
      backgroundColor: "black",
      opacity: 0.8,
    },
    buttons: {
      color: "white",
    },
    flex: {
      flexGrow: 1,
    },
    fabButton: {
      position: "absolute",
      zIndex: 1,
      top: -20,
      right: 30,
      margin: "0 0 0 auto",
    },
  })
);

const BottomBar: React.FC<completeNavBarProps> = (completeNavBarProps) => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.flex} />
          <Link href="#main-editor" className={classes.flex}>
            <IconButton className={classes.buttons}>
              <SportsEsportsIcon />
            </IconButton>
          </Link>
          <Link href="#repl" className={classes.flex}>
            <IconButton className={classes.buttons}>
              <DeveloperModeIcon />
            </IconButton>
          </Link>
          <Link href="#question" className={classes.flex}>
            <IconButton className={classes.buttons}>
              <TextsmsIcon />
            </IconButton>
          </Link>
          <div className={classes.flex} />
          <Link href="#repl" className={classes.flex}>
            <Fab
              color="secondary"
              aria-label="add"
              className={classes.fabButton}
            >
              <PhoneRunButton />
            </Fab>
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default BottomBar;
