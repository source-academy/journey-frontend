import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import IntroductionTab from "./IntroductionTab";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
import ListVisualizer from "./ListVisualizer";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SubstVisualizer from "./SubstVisualizer";
import SearchIcon from "@material-ui/icons/Search";
import PublicIcon from "@material-ui/icons/Public";
import EnvVisualizer from "./EnvVisualizer";
import Inspector from "./Inspector";
import TabStyle from "./TabStyle";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import Panel from "./Panel";
import { Store, IGlobalAction } from "../../reducers/Store";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxHeight: "80vh",
    overflowY: "scroll",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Description() {
  const toggleStepper = (): IGlobalAction => {
    return dispatch({
      type: "TOGGLESTEPPER",
    });
  };

  const closeStepper = (): IGlobalAction => {
    return dispatch({
      type: "CLOSESTEPPER",
    });
  };

  const cardClasses = useStyles();
  const { globalState, dispatch } = useContext(Store);
  let tabButtonArr: JSX.Element[];
  let tabContentArr: JSX.Element[];
  if (globalState.source === "Source3" || globalState.source === "Source4") {
    tabButtonArr = [
      <ImportContactsIcon />,
      <AspectRatioIcon />,
      <VisibilityIcon />,
      <SearchIcon />,
      <PublicIcon />,
    ];
    tabContentArr = [
      <IntroductionTab />,
      <Panel />,
      <ListVisualizer />,
      <Inspector />,
      <EnvVisualizer />,
    ];
  } else if (globalState.source === "Source2") {
    tabButtonArr = [
      <ImportContactsIcon onClick={closeStepper} />,
      <AspectRatioIcon onClick={closeStepper} />,
      <VisibilityIcon onClick={closeStepper} />,
      <SettingsEthernetIcon onClick={toggleStepper} />,
    ];
    tabContentArr = [
      <IntroductionTab />,
      <Panel />,
      <ListVisualizer />,
      <SubstVisualizer content={["function", "f(x)"]} />,
    ];
  } else {
    tabButtonArr = [
      <ImportContactsIcon onClick={closeStepper} />,
      <AspectRatioIcon onClick={closeStepper} />,
      <SettingsEthernetIcon onClick={toggleStepper} />,
    ];
    tabContentArr = [
      <IntroductionTab />,
      <Panel />,
      <SubstVisualizer content={["function", "f(x)"]} />,
    ];
  }

  return (
    <Card className={cardClasses.root}>
      <CardContent>
        <TabStyle tabButtonArr={tabButtonArr} tabContentArr={tabContentArr} />
      </CardContent>
    </Card>
  );
}
