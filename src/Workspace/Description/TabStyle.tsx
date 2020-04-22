import React, { useState } from "react";
import {
  makeStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import RunePanel from "./Panel";
import AppBar from "@material-ui/core/AppBar";

//button and content array
type Props = {
  tabButtonArr: JSX.Element[];
  tabContentArr: JSX.Element[];
};

//styleTabsProps
interface StyledTabsProps {
  value: number;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > div": {
      maxWidth: 40,
      width: "100%",
      backgroundColor: "#635ee7",
    },
  },
})((props: StyledTabsProps) => (
  <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />
));

//StyledTabProps
interface StyledTabProps {
  button: JSX.Element;
  id: string;
  "aria-controls": string;
}

const StyledTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: "none",
      color: "#fff",
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(15),
      marginRight: theme.spacing(1),
      "&:focus": {
        opacity: 1,
      },
    },
  })
)((props: StyledTabProps) => <Tab icon={props.button} {...props} />);

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo2: {
    backgroundColor: "#000000",
  },
}));

function a11yProps(index: any) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box color="white" p={3}>
          {children}
        </Box>
      )}
    </Typography>
  );
}

const TabStyle: React.FC<Props> = (Props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const [state, changeState] = useState(false);
  const handlePanel = () => changeState(!state);

  const buttonList = () => (
    <div>
      <StyledTabs
        value={value}
        onChange={handleChange}
        aria-label="scrollable force tabs example"
      >
        {Props.tabButtonArr.map((btn) => (
          <StyledTab
            button={btn}
            {...a11yProps(Props.tabButtonArr.indexOf(btn))}
          />
        ))}
      </StyledTabs>
    </div>
  );

  const contentList = () => (
    <div>
      {Props.tabContentArr.map((contnt) => {
        return (
          <TabPanel value={value} index={Props.tabContentArr.indexOf(contnt)}>
            {contnt}
          </TabPanel>
        );
      })}
    </div>
  );

  return (
    <div className={classes.demo2}>
      {buttonList()}
      {contentList()}
    </div>
  );
};

export default TabStyle;
